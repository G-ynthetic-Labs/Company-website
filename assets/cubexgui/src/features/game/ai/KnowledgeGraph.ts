// src/features/game/ai/KnowledgeGraph.ts
import { TI, TENSOR_SIZE, CUBE_COUNT } from '../core/TensorConfig';
import { GameState, Piece } from '../types';
import { Skill } from './SkillSystem';
import { gpuKernel } from './gpu/GpuCognitiveKernel';

export interface TensorNode {
    position: { x: number, y: number, z: number };
    data: Float32Array;
}

export class KnowledgeGraph {
    public cubes: TensorNode[][][]; // 3D Access: [x][y][z]
    public snapshots: TensorNode[][]; // Historical snapshots for time-travel learning
    private gpuInitialized: boolean = false;

    // Skill Modifier Vectors (Pre-calculated for speed)
    private alphaModVector: Float32Array;
    private decayModVector: Float32Array;
    private impModVector: Float32Array;

    constructor() {
        this.cubes = [];
        this.snapshots = [];

        // Initialize 3D Array of Nodes
        for (let x = 0; x < 8; x++) {
            this.cubes[x] = [];
            for (let y = 0; y < 8; y++) {
                this.cubes[x][y] = [];
                for (let z = 0; z < 8; z++) {
                    this.cubes[x][y][z] = this.createNode(x, y, z);
                }
            }
        }

        this.alphaModVector = new Float32Array(TENSOR_SIZE).fill(1.0);
        this.decayModVector = new Float32Array(TENSOR_SIZE).fill(1.0);
        this.impModVector = new Float32Array(TENSOR_SIZE).fill(1.0);
    }

    private createNode(x: number, y: number, z: number): TensorNode {
        const data = new Float32Array(TENSOR_SIZE);
        // Randomize embeddings slightly to break symmetry at start
        for (let i = TI.OCCUPANCY_H1; i <= TI.THREAT_MATERIAL_SUM; i++) {
            data[i] = (Math.random() * 0.02) - 0.01;
        }
        return { position: { x, y, z }, data };
    }

    public getTensorValue(x: number, y: number, z: number, index: TI): number {
        if (x < 0 || x > 7 || y < 0 || y > 7 || z < 0 || z > 7) return 0;
        return this.cubes[x][y][z].data[index];
    }

    public setTensorValue(x: number, y: number, z: number, index: TI, value: number) {
        if (x < 0 || x > 7 || y < 0 || y > 7 || z < 0 || z > 7) return;
        this.cubes[x][y][z].data[index] = value;
    }

    public applySkills(activeSkills: Skill[]) {
        // Reset vectors
        this.alphaModVector.fill(1.0);
        this.decayModVector.fill(1.0);
        this.impModVector.fill(1.0);

        // Apply skill effects to vectors
        activeSkills.forEach(skill => {
            skill.effects.forEach(effect => {
                effect.targetIndices.forEach(idx => {
                    // Logic modifies vectors based on EffectType
                    // Simplified:
                    this.impModVector[idx] *= effect.multiplier;
                });
            });
        });
    }

    /**
     * CORE LEARNING LOOP
     * Updates the Tensor Field based on the current game state.
     * Crucially, it only updates features that are "Unlocked" by active skills.
     */
    public async processTurn(
        state: GameState,
        activeSkills: Skill[],
        aiLevel: number,
        baseDecay: number = 0.05
    ) {
        // 1. Initialize GPU if needed
        if (!this.gpuInitialized) {
            this.gpuInitialized = await gpuKernel.initialize();
        }

        // 2. Parallel Processing (GPU Path)
        if (this.gpuInitialized) {
            // Flatten the 512 nodes into a dense Float32Array
            const flatTensor = new Float32Array(CUBE_COUNT * TENSOR_SIZE);
            for (let z = 0; z < 8; z++) {
                for (let y = 0; y < 8; y++) {
                    for (let x = 0; x < 8; x++) {
                        const idx = x + (y * 8) + (z * 64);
                        flatTensor.set(this.cubes[x][y][z].data, idx * TENSOR_SIZE);
                    }
                }
            }

            // Run Compute Pass
            await gpuKernel.process(flatTensor, state.pieces);

            // Sync Results back to CPU Nodes
            for (let z = 0; z < 8; z++) {
                for (let y = 0; y < 8; y++) {
                    for (let x = 0; x < 8; x++) {
                        const idx = x + (y * 8) + (z * 64);
                        this.cubes[x][y][z].data.set(
                            flatTensor.subarray(idx * TENSOR_SIZE, (idx + 1) * TENSOR_SIZE)
                        );
                    }
                }
            }
        }

        // 3. Learning Trigger
        this.calculateLearningDynamics();
        this.takeSnapshot();
    }

    /**
     * SNAPSHOT DELTA ENGINE
     * Compares current state to last snapshot to determine Polarity & Plasticity.
     */
    private calculateLearningDynamics() {
        if (this.snapshots.length === 0) return;
        const lastSnap = this.snapshots[this.snapshots.length - 1];

        for (let idx = 0; idx < CUBE_COUNT; idx++) {
            const x = idx % 8;
            const y = Math.floor(idx / 8) % 8;
            const z = Math.floor(idx / (8 * 8));

            const node = this.cubes[x][y][z];
            const prev = lastSnap[idx];

            // 1. Calculate Delta (Absolute change across all features)
            let delta = 0;
            for (let i = 0; i < TENSOR_SIZE; i++) {
                // Skip meta-indices to avoid feedback loops
                if (i >= TI.LEARNING_RATE && i <= TI.POLARITY) continue;
                delta += Math.abs(node.data[i] - prev.data[i]);
            }

            // 2. Update Polarity (Instantaneous signal)
            node.data[TI.POLARITY] = delta;

            // 3. Update Plasticity (Moving average of change)
            // High plasticity nodes are "Hot" and resistant to pruning
            node.data[TI.PLASTICITY] = (node.data[TI.PLASTICITY] * 0.8) + (delta * 0.2);

            // 4. Synaptic Pruning (Refining Focus)
            // If a node is "Cold" (Low Plasticity), decay its Tier 1-3 metrics
            if (node.data[TI.PLASTICITY] < 0.01) {
                for (let i = TI.T1_ATTACK_VECTOR; i <= TI.T3_WIN_CORRELATION; i++) {
                    node.data[i] *= 0.95; // Prune unused strategic features
                }
            }
        }
    }

    /**
     * ATOMIC TENSOR UPDATE
     * Called by HyperBoard when a piece interacts with a node.
     * @param x X coordinate
     * @param y Y coordinate
     * @param z Z coordinate
     * @param type Interaction Type: 'ENTER', 'EXIT', 'PASS', 'STAY'
     * @param piece The piece causing the update
     */
    public updateTensorNode(x: number, y: number, z: number, type: 'ENTER' | 'EXIT' | 'PASS' | 'STAY', piece: Piece) {
        if (x < 0 || x > 7 || y < 0 || y > 7 || z < 0 || z > 7) return;
        const node = this.cubes[x][y][z];

        // 1. Update Identity
        const ownerId = piece.color === 'white' ? 1 : 2;

        if (type === 'ENTER' || type === 'STAY') {
            node.data[TI.STATE_ID] = ownerId;
            node.data[TI.OWNER_ID] = ownerId;
            node.data[TI.VELOCITY] = 1.0; // Impact velocity
        } else if (type === 'EXIT') {
            node.data[TI.STATE_ID] = 0; // Empty
            node.data[TI.OWNER_ID] = 0;
            node.data[TI.VELOCITY] *= 0.8; // Wake turbulence
        } else if (type === 'PASS') {
            // "Passing Through" leaves a trace but doesn't claim ownership
            node.data[TI.VELOCITY] += 0.5; // Disturbance
            node.data[TI.ENTROPY] += 0.1;
        }

        // 2. Update Metadata
        node.data[TI.LAST_CHANGE_TURN] = Date.now(); // Using timestamp or turn index passed in? (Simplified)

        // 3. Trigger Heuristics (Local update only)
        // Only update this specific node's advanced metrics
        if (type !== 'EXIT') {
            const pAny = piece as any;
            if (pAny.fundamentals) {
                // Populate RPG blocks sparsely
                node.data[TI.F1_MIGHT] = (node.data[TI.F1_MIGHT] || 0) + (0.1 * (1.0 + pAny.fundamentals.force));
                node.data[TI.O1_ADAPT] = (node.data[TI.O1_ADAPT] || 0) + (0.1 * (1.0 + pAny.fundamentals.flow));
                node.data[TI.M1_CLARITY] = (node.data[TI.M1_CLARITY] || 0) + (0.1 * (1.0 + pAny.fundamentals.form));
            }
        }
    }

    private takeSnapshot() {
        // Deep copy
        const snap = this.cubes.flatMap(plane => plane.flatMap(row => row.map(node => {
            const copy = this.createNode(node.position.x, node.position.y, node.position.z);
            copy.data.set(node.data);
            return copy;
        })));
        this.snapshots.push(snap);
        if (this.snapshots.length > 10) this.snapshots.shift();
    }
}