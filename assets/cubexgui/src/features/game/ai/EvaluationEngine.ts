// cubexgui/src/features/game/ai/EvaluationEngine.ts
import { PieceType, PieceColor, MpwEvaluation, RrrScore, StanceLabel, Position } from '../types';
import { GamePiece } from '../core/Pieces';
import { TI } from '../core/TensorConfig';
import { ThreatMap, CoverageMap } from './MetricMaps';
import { posToKey } from './TelemetryUtils';

// New material values based on refined specification
const PIECE_MATERIAL_VALUES: Record<PieceType, number> = {
    [PieceType.KING]: 40,
    [PieceType.QUEEN]: 14,
    [PieceType.FRACTAL_KNIGHT]: 9,
    [PieceType.ROOK]: 7,
    [PieceType.BISHOP]: 6,
    [PieceType.KNIGHT]: 4,
    [PieceType.PAWN]: 1
};

// Note: Morale is now handled by a recursive summation in MoraleSystem.ts
// These values are preserved for backward compatibility in simple metrics if needed.
const PIECE_MORALE_VALUES: Record<PieceType, number> = {
    [PieceType.KING]: 21,
    [PieceType.QUEEN]: 10, // General (Narrative)
    [PieceType.FRACTAL_KNIGHT]: 10, // General
    [PieceType.ROOK]: 3, // Commander (Max Mp)
    [PieceType.BISHOP]: 3,
    [PieceType.KNIGHT]: 3,
    [PieceType.PAWN]: 1
};

export class EvaluationEngine {

    /**
     * Calculates the Master Piecewise Evaluation (M-Pw).
     */
    public static calculateMpw(pieces: Map<string, GamePiece>, color: PieceColor, totalValidMoves: number): MpwEvaluation {
        const myPieces = Array.from(pieces.values()).filter(p => p.color === color);

        // --- 1. RISK (Material) ---
        let risk = myPieces.reduce((sum, p) => sum + (PIECE_MATERIAL_VALUES[p.type as PieceType] || 1), 0);

        // --- 2. REWARD (Board Control) ---
        const reward = totalValidMoves;

        // --- 3. RELATION (Morale) ---
        let relation = 0;

        myPieces.forEach(p => {
            let currentMp = PIECE_MORALE_VALUES[p.type as PieceType] || 0;

            // A. COMMANDER LOGIC
            if (this._isCommander(p.type)) {
                const myPawns = myPieces.filter(sub => sub.type === PieceType.PAWN && sub.commanderId === p.id);
                const expectedPawns = 2;
                const missingPawns = expectedPawns - myPawns.length;
                if (missingPawns > 0) {
                    currentMp -= missingPawns;
                }
            }

            // B. GENERAL LOGIC
            if (this._isGeneral(p.type)) {
                const myCommanders = myPieces.filter(sub => this._isCommander(sub.type) && sub.generalId === p.id);
                const expectedCommanders = 3;
                const missingCommanders = expectedCommanders - myCommanders.length;
                if (missingCommanders > 0) {
                    currentMp -= (missingCommanders * 3);
                }
            }

            // C. MERCENARY MASK
            if (p.type === PieceType.PAWN) {
                const generalAlive = myPieces.some(g => g.id === p.generalId);
                if (!generalAlive && p.generalId) {
                    currentMp = 1;
                }
            }

            relation += Math.max(0, currentMp);
        });

        return { risk, reward, relation };
    }

    /**
     * Converts raw M-Pw deltas into a {-1, 0, 1} RRR score.
     * Math: Opponent - Player (Positive delta = Opponent Advantage / High Player Risk)
     */
    public static getRrrScore(myMpw: MpwEvaluation, oppMpw: MpwEvaluation): RrrScore {
        // PER SPEC: Risk/Reward/Relation = Opponent - Player
        const riskDelta = oppMpw.risk - myMpw.risk;
        const rewardDelta = oppMpw.reward - myMpw.reward;
        const relationDelta = oppMpw.relation - myMpw.relation;

        const riskThreshold = 4;
        const rewardThreshold = 5;
        const relationThreshold = 6; // Adjusted to match morale scales

        return {
            offense: this._resolveThreshold(riskDelta, riskThreshold),
            defense: this._resolveThreshold(rewardDelta, rewardThreshold),
            strategy: this._resolveThreshold(relationDelta, relationThreshold)
        };
    }

    public static analyzePosture(history: RrrScore[]): StanceLabel {
        if (history.length < 3) return 'Balanced';

        const last3 = history.slice(-3);
        const offSeq = last3.map(h => h.offense);
        const strSeq = last3.map(h => h.strategy);
        const defSeq = last3.map(h => h.defense);

        if (offSeq.every(v => v === 1)) return 'Hyper Aggressive';
        if (offSeq.every(v => v === -1)) return 'Hyper Retaliatory';

        const sumOff = offSeq.reduce((a: number, b) => a + b, 0);
        const sumStr = strSeq.reduce((a: number, b) => a + b, 0);

        if (Math.abs(sumOff) <= 1 && offSeq.includes(1) && offSeq.includes(-1) && sumStr === 0) {
            return 'Reactive';
        }

        if (sumStr >= 2) return 'Tactical';
        if (defSeq.every(v => v === 1)) return 'Fortified';

        return 'Balanced';
    }

    private static _resolveThreshold(delta: number, threshold: number): -1 | 0 | 1 {
        if (delta <= -threshold) return -1;
        if (delta >= threshold) return 1;
        return 0;
    }

    private static _isCommander(t: PieceType): boolean {
        return t === PieceType.ROOK || t === PieceType.BISHOP || t === PieceType.KNIGHT;
    }

    private static _isGeneral(t: PieceType): boolean {
        return t === PieceType.QUEEN || t === PieceType.FRACTAL_KNIGHT;
    }

    /**
     * FRACTAL RRR EVALUATION
     * Populates the Tensor Field with the 21 specific Risk/Reward/Relation metrics.
     * This represents the "Objective Truth" of the board state.
     */
    public static populateTensorMetrics(
        nodes: any[],
        pieces: Map<string, GamePiece>,
        size: number,
        threatMap: ThreatMap,
        coverageMap: CoverageMap,
        visibilityMask: Set<number>
    ) {
        // 0. Reset RRR bands to 0 (simplified)
        // Realistically we might decay them, but for strict calc we reset
        // We assume nodes have .data Float32Array
        // We also need access to specialized maps if we want O(1), but we'll do O(N) piece loop for now

        // Helper: Distance
        const dist = (p1: Position, p2: Position) => Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y), Math.abs(p1.z - p2.z));
        const center = { x: 3.5, y: 3.5, z: 3.5 };

        // 1. Piece-Centric Updates
        pieces.forEach(p => {
            const { x, y, z } = p.position;
            const idx = x + (y * size) + (z * size * size);
            const node = nodes[idx];
            if (!node) return;

            // -- REWARD AXIS --
            // W2_POSITIONAL (Simple Center Bias)
            if (visibilityMask.has(20)) {
                const centerDist = Math.sqrt((x - 3.5) ** 2 + (y - 3.5) ** 2 + (z - 3.5) ** 2);
                node.data[20] = 1.0 - (centerDist / 6.0); // 20 = W2_POSITIONAL
            }

            // W4_CENTER_CONTROL
            if (visibilityMask.has(22)) {
                const centerDist = Math.sqrt((x - 3.5) ** 2 + (y - 3.5) ** 2 + (z - 3.5) ** 2);
                if (centerDist < 2) node.data[22] = 1.0;
            }

            // W5_PROMOTION (Z-axis progress for Pawns)
            if (p.type === PieceType.PAWN && visibilityMask.has(23)) {
                const progress = p.color === 'white' ? z / 7 : (7 - z) / 7;
                node.data[23] = progress; // 23 = W5
            }

            // -- RISK AXIS --
            // R5_OVEREXTENSION (Distance from nearest friendly)
            if (visibilityMask.has(16)) {
                let nearestFriend = 100;
                pieces.forEach(friend => {
                    if (friend.id !== p.id && friend.color === p.color) {
                        const d = dist(p.position, friend.position);
                        if (d < nearestFriend) nearestFriend = d;
                    }
                });
                node.data[16] = nearestFriend > 3 ? (nearestFriend - 3) * 0.2 : 0; // 16 = R5
            }

            // -- BLOCK G: RPG FUNDAMENTALS (40-60) --
            // Only populate if piece has fundamental stats (RPG pieces)
            const pAny = p as any;
            if (pAny.fundamentals) {
                // FORCE: MIGHT (40) - Proximity to enemy King
                if (visibilityMask.has(TI.F1_MIGHT)) {
                    let minKingDist = 10;
                    pieces.forEach(opp => {
                        if (opp.type === PieceType.KING && opp.color !== p.color) {
                            const d = dist(p.position, opp.position);
                            if (d < minKingDist) minKingDist = d;
                        }
                    });
                    node.data[TI.F1_MIGHT] = (1.0 - (minKingDist / 10.0)) * (1.0 + pAny.fundamentals.force);
                }

                // FLOW: ADAPT (47) - Mobility based on current position
                if (visibilityMask.has(TI.O1_ADAPT)) {
                    const mobility = p.getPotentialMoves ? p.getPotentialMoves(size, { isEmpty: () => true, isEnemy: () => true, isAlly: () => false }).length : 0;
                    node.data[TI.O1_ADAPT] = (mobility / 20.0) * (1.0 + pAny.fundamentals.flow);
                }

                // FORM: CLARITY (54) - Structural stability (Exposure Inverse)
                if (visibilityMask.has(TI.M1_CLARITY)) {
                    const exposure = p.stats?.isExposed ? 0.5 : 1.0;
                    node.data[TI.M1_CLARITY] = exposure * (1.0 + pAny.fundamentals.form);
                }
            }
        });

        // 2. Global / Map-Based Updates (Pressure & Control)
        nodes.forEach((node, idx) => {
            const x = idx % size;
            const y = Math.floor(idx / size) % size;
            const z = Math.floor(idx / (size * size));
            const key = posToKey({ x, y, z });

            const attackers = threatMap.attackersAt(key);
            const defenders = coverageMap.defendersAt(key);

            let attackerVal = 0;
            let defenderVal = 0;

            attackers.forEach(id => {
                const p = pieces.get(id);
                if (p) attackerVal += (PIECE_MATERIAL_VALUES[p.type as PieceType] || 1);
            });
            defenders.forEach(id => {
                const p = pieces.get(id);
                if (p) defenderVal += (PIECE_MATERIAL_VALUES[p.type as PieceType] || 1);
            });

            // Update node using the new TensorNode method
            node.updateMaterialPressure(defenderVal, attackerVal);

            // R6_DANGER_ZONES (Occupied or threatened by enemy)
            if (attackerVal > defenderVal) {
                node.data[TI.R6_DANGER_ZONES] = 1.0;
            } else {
                node.data[TI.R6_DANGER_ZONES] = 0.0;
            }
        });
    }
}
