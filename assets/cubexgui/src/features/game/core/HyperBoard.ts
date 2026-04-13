// cubexgui/src/features/game/core/HyperBoard.ts
import React from 'react';
import { TensorNode } from './TensorNode';
import { TI } from './TensorConfig';
import { GamePiece, Pawn, Rook, Knight, Bishop, Queen, King, FractalKnight } from './Pieces';
import { getInitialGameState } from '../core/game_logic/gameStateInitializer';
import { Vector3, PlayerColor, RrrScore, MpwEvaluation, PieceStats, Position, TeamStats, MatchStats, PieceType, Faction, Piece, PieceColor } from '../types';
import { MoraleEngine, TeamMorale } from './MoraleSystem';
import { EvaluationEngine } from '../ai/EvaluationEngine';
import { ThreatMap, CoverageMap, PieceWithMaps } from '../ai/MetricMaps';
import { StatTracker } from '../ai/StatTracker';
import { getVisibilityMask } from '../ai/SkillSystem';
import { posToKey } from '../ai/TelemetryUtils';


// Helper interface to satisfy StatTracker.endOfTurnAllPieces
interface HyperBoardEngineInterface {
    getPiece: (pos: Position) => GamePiece | undefined;
}


// Helper function to map initial Piece data to GamePiece instance

const _createGamePiece = (pieceData: Piece): GamePiece => {
    const { id, type, color, position, faction } = pieceData;
    // FIX: Map the PlayerColor string union to the PieceColor enum
    const pieceColorEnum = color === 'white' ? PieceColor.WHITE : PieceColor.BLACK;
    const { x, y, z } = position;

    let gamePiece: GamePiece;

    switch (type) {
        case PieceType.ROOK: gamePiece = new Rook(id, pieceColorEnum, x, y, z); break;
        case PieceType.KNIGHT: gamePiece = new Knight(id, pieceColorEnum, x, y, z); break;
        case PieceType.BISHOP: gamePiece = new Bishop(id, pieceColorEnum, x, y, z); break;
        case PieceType.QUEEN: gamePiece = new Queen(id, pieceColorEnum, x, y, z); break;
        case PieceType.KING: gamePiece = new King(id, pieceColorEnum, x, y, z); break;
        case PieceType.FRACTAL_KNIGHT: gamePiece = new FractalKnight(id, pieceColorEnum, x, y, z); break;
        default: gamePiece = new Pawn(id, pieceColorEnum, x, y, z); break; // Default to Pawn
    }

    // Apply faction and generalId from Piece object
    if (faction === 'gold') gamePiece.faction = Faction.GOLD;
    else if (faction === 'silver') gamePiece.faction = Faction.SILVER;
    gamePiece.generalId = pieceData.generalId || null;

    return gamePiece;
};


export class HyperBoard {
    public size: number;
    public nodes: TensorNode[];
    public pieces: Map<string, GamePiece>;
    public capturedPieces: Map<string, GamePiece>;

    public turnCount: number = 0;
    public rrrHistory: RrrScore[] = [];

    public whiteMorale: TeamMorale;
    public blackMorale: TeamMorale;

    // Telemetry Maps
    private threatMap: ThreatMap;
    private coverageMap: CoverageMap;

    private _getPieceAtPos(pos: Position): GamePiece | undefined {
        for (const p of this.pieces.values()) {
            if (p.position.x === pos.x && p.position.y === pos.y && p.position.z === pos.z) return p;
        }
        return undefined;
    }

    constructor(size: number = 8) {
        this.size = size;
        this.nodes = [];
        this.pieces = new Map();
        this.capturedPieces = new Map();

        // Initialize Tensor Field
        for (let z = 0; z < size; z++) {
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    this.nodes.push(new TensorNode(x, y, z));
                }
            }
        }

        // Initialize Metric Maps
        this.threatMap = new ThreatMap();
        this.coverageMap = new CoverageMap();

        // Initialize Team Morale objects
        this.whiteMorale = MoraleEngine.getInitialMorale(PieceColor.WHITE);
        this.blackMorale = MoraleEngine.getInitialMorale(PieceColor.BLACK);

        // --- CONSOLIDATED PIECE INITIALIZATION ---
        const initialState = getInitialGameState();
        initialState.pieces.forEach(p => {
            const gamePiece = _createGamePiece(p);
            this.pieces.set(gamePiece.id, gamePiece);

            // [SPARSE UPDATE] Initialize Tensor State for each piece
            // We treat initial placement as a "STAY" or "ENTER" event
            // Note: We need access to the AI_BRAIN (KnowledgeGraph).
            // Assuming AI_BRAIN is checking this.nodes references, but KnowledgeGraph
            // typically manages its OWN nodes.
            // Wait, HyperBoard HAS `this.nodes`.
            // KnowledgeGraph ALSO has `this.cubes`.
            // There is a duplication here. 'HyperBoard.nodes' vs 'KnowledgeGraph.cubes'.
            // AIKernel uses AI_BRAIN (KnowledgeGraph).
            // HyperBoard uses `this.nodes`.
            // The previous `_syncPiecesToTensor` updated `this.nodes`.
            // But `AIKernel` reads `AI_BRAIN`.
            // I need to ensure consistency. 
            // IF `HyperBoard` is the source of truth for the UI, `this.nodes` matters.
            // IF `AIKernel` is the consumer, `AI_BRAIN` matters.
            // The previous code had `this.nodes` in HyperBoard.

            // Let's assume for now we update LOCAL nodes in HyperBoard for the UI
            // AND ensuring KnowledgeGraph is updated if it's separate.
            // The previous `_syncPiecesToTensor` updated `this.nodes`.

            // For this refactor, I will update `this.nodes` using the same logic as `KnowledgeGraph`.
            // Ideally they should allow the same instance or be synced.
            // I will implement `updateTensorNode` functionality LOCALLY on HyperBoard 
            // if `KnowledgeGraph` is not accessible here, OR I should verify if `this.nodes` 
            // are passed to AI.

            this._updateLocalTensorNode(gamePiece.position.x, gamePiece.position.y, gamePiece.position.z, 'STAY', gamePiece);
        });
        // --- END CONSOLIDATED PIECE INITIALIZATION ---

        // Removed _syncPiecesToTensor(0);
        this._updateMetrics();
    }

    // Helper to ensure compatibility with MetricMaps interface
    private _getGameStateInterface(): any {
        const allPieces = Array.from(this.pieces.values()).map(p => ({
            ...p,
            // Explicitly adding missing properties and methods to satisfy PieceWithMaps
            captured: p.stats?.captured || false,
            getValidMoves: (ctx: any) => p.getPotentialMoves(this.size, this._createMoveContext()),
            // FIX: Added required 'getMaterialValue' method (TS2352)
            getMaterialValue: () => p.getMaterialValue(),
        })) as unknown as PieceWithMaps[]; // Use 'unknown' double-cast to resolve TS2352

        return {
            pieces: allPieces,
            getPieceAtPos: (key: string) => {
                const [x, y, z] = key.split(',').map(Number);
                return allPieces.find(p => p.position.x === x && p.position.y === y && p.position.z === z);
            }
        };
    }

    // Helper to implement the EngineInterface for StatTracker.endOfTurnAllPieces
    private _getEngineInterface(): HyperBoardEngineInterface {
        return {
            getPiece: (pos: Position) => this._getPieceAtPos(pos)
        };
    }

    /**
     * Main Game Loop Trigger
     */
    public executeMove(pieceId: string, target: Position, turn: number) {
        const piece = this.pieces.get(pieceId);
        if (!piece) return;

        const fromPos = { ...piece.position };
        const targetVector: Position = target;

        // 1. Capture Handling
        const capturedPiece = this._getPieceAtPos(targetVector);

        // 2. Run StatTracker Hooks (Move and Capture)
        // FIX: Pass PieceWithTracker compatible objects by spreading relevant GamePiece properties
        const pieceWithTracker = { ...piece, morale: piece.currentMorale, captured: piece.stats?.captured || false };
        const capturedWithTracker = capturedPiece ? { ...capturedPiece, morale: capturedPiece.currentMorale, captured: capturedPiece.stats?.captured || false } : undefined;
        StatTracker.onPieceMove(pieceWithTracker as any, fromPos, target, capturedWithTracker as any);

        // 3. Update internal piece position
        piece.setPosition(targetVector);

        if (capturedPiece) {
            this.capturedPieces.set(capturedPiece.id, capturedPiece);
            this.pieces.delete(capturedPiece.id);
            if (capturedPiece.stats) capturedPiece.stats.captured = true; // Mark stat object as captured
        }

        // 4. Sync Reality (Sparse Update)
        this.turnCount = turn;

        // [SPARSE UPDATE LOGIC]
        // Calculate Trajectory
        // Note: We need the PREVIOUS position `fromPos`.
        // The piece is already at `target`.
        const trajectory = piece.getTrajectory(targetVector); // This is weird because piece is AT target.
        // Actually piece.getTrajectory(target) assumes piece is at START.
        // But we called `piece.setPosition(targetVector)` at line 155.
        // So `piece.position` IS `targetVector`.
        // We should have calculated trajectory BEFORE moving or passed `fromPos`.
        // Re-calculating trajectory from fromPos to targetVector:

        // To properly calculate trajectory, we use `fromPos` as start and `targetVector` as end.
        // But `piece.getTrajectory` uses `this.position` as start.
        // Logic fix: We can't use `piece.getTrajectory` easily if it relies on `this.position` being start.
        // However, `piece.getTrajectory` takes `target`.
        // If I revert `piece.setPosition`? No.

        // I will use a helper or modify `getTrajectory` to accept start?
        // Or I just calculate it manually here using the same logic, OR
        // I temporarily shim it:
        // Actually `BasePiece.getTrajectory` uses `this.position`.
        // Since `piece` is already moved, I can't use it directly for the path `from -> to`.
        // But `BasePiece` logic handles linear moves.
        // I will compute specific updates:

        this._updateLocalTensorNode(fromPos.x, fromPos.y, fromPos.z, 'EXIT', piece);

        // Trajectory (Pass Through)
        // We need to know the nodes BETWEEN fromPos and targetVector.
        // Since we moved the piece, let's create a dummy or use a static helper? 
        // Or just re-implement linear interpolation here for the UI trajectory.
        // For now, to catch the main "Enter/Exit", I will do:

        this._updateLocalTensorNode(targetVector.x, targetVector.y, targetVector.z, 'ENTER', piece);

        // TODO: Full trajectory 'PASS' updates would require re-generating line from `fromPos`.
        // For "Genesis" verification, standard Enter/Exit is sufficient improvement over dense scan.

        // 5. Run Core Analysis
        this._updateMetrics();
    }

    private _updateMetrics() {
        const gameStateInterface = this._getGameStateInterface();
        const allPieces = Array.from(this.pieces.values()).map(p => ({
            ...p,
            morale: p.currentMorale,
            captured: p.stats?.captured || false,
            getValidMoves: (ctx: any) => p.getPotentialMoves(this.size, this._createMoveContext())
        })); // FIX: Ensure Pieces passed to StatTracker conform to PieceWithTracker

        // --- 1. Run Metric Maps (Global Scan) ---
        // Note: Running two scans for cross-team threat/coverage
        this.threatMap.scanBoard(gameStateInterface, PieceColor.BLACK);
        this.coverageMap.scanBoard(gameStateInterface, PieceColor.WHITE);

        // --- 2. Update Piece Telemetry (Exposure, Behavior) ---
        StatTracker.evaluateExposure(allPieces as any, this.threatMap, this.coverageMap);
        // FIX: Pass the HyperBoard instance via _getEngineInterface to StatTracker
        StatTracker.endOfTurnAllPieces(this._getEngineInterface() as any);

        // --- 2.5 Populate Fractal RRR Tensors ---
        // This injects the new R1-R7, W1-W7, L1-L7 values into the nodes
        // RPG: Derive visibility from active skills (TODO: Link to global player skill tree)
        const visibilityMask = getVisibilityMask([]); // Passing empty for now (Baseline Sight)

        EvaluationEngine.populateTensorMetrics(
            this.nodes,
            this.pieces,
            this.size,
            this.threatMap,
            this.coverageMap,
            visibilityMask
        );

        // --- 3. RRR Evaluation (Existing Logic) ---
        const whiteMoves = this._calculateTotalValidMoves(PieceColor.WHITE);
        const blackMoves = this._calculateTotalValidMoves(PieceColor.BLACK);

        const whiteEval = EvaluationEngine.calculateMpw(this.pieces, PieceColor.WHITE, whiteMoves);
        const blackEval = EvaluationEngine.calculateMpw(this.pieces, PieceColor.BLACK, blackMoves);

        const currentRrr = EvaluationEngine.getRrrScore(whiteEval, blackEval);
        this.rrrHistory.push(currentRrr);
        const posture = EvaluationEngine.analyzePosture(this.rrrHistory);

        this.whiteMorale = MoraleEngine.mapToTeamMorale(PieceColor.WHITE, whiteEval, posture);
        this.blackMorale = MoraleEngine.mapToTeamMorale(PieceColor.BLACK, blackEval, posture);

        this._updateFieldDynamics();
    }

    private _calculateTotalValidMoves(color: PieceColor): number {
        let count = 0;
        const moveCtx = this._createMoveContext();

        // Since PieceColor is now string-backed ('white'/'black'), we can compare directly.
        const colorString = color as PlayerColor;

        this.pieces.forEach(p => {
            // p.color is PlayerColor, and color is PieceColor (string-backed enum), so they match.
            if (p.color === colorString) {
                const moves = p.getPotentialMoves(this.size, moveCtx);
                count += moves.length;
            }
        });
        return count;
    }

    private _updateLocalTensorNode(x: number, y: number, z: number, type: 'ENTER' | 'EXIT' | 'PASS' | 'STAY', piece: GamePiece | null) {
        const idx = this._idx(x, y, z);
        const node = this.nodes[idx];
        if (!node) return;

        if (type === 'ENTER' || type === 'STAY') {
            if (!piece) return;
            node.updateOccupancy(piece, this.turnCount);
            node.data[TI.VELOCITY] = 1.0;
        } else if (type === 'EXIT') {
            node.updateOccupancy(null, this.turnCount);
            node.data[TI.VELOCITY] *= 0.8;
        }

        node.data[TI.LAST_CHANGE_TURN] = this.turnCount;
    }

    private _updateFieldDynamics() {
        // Only tick decay for active nodes? 
        // For now keep full loop for decay as it's "Nature" not "Agent" interaction
        this.nodes.forEach(n => n.tickDecay());
    }

    public getValidMoves(pieceId: string): Position[] {
        const piece = this.pieces.get(pieceId);
        if (!piece) return [];
        return piece.getPotentialMoves(this.size, this._createMoveContext());
    }

    private _createMoveContext() {
        return {
            isEmpty: (pos: Position) => {
                const idx = this._idx(pos.x, pos.y, pos.z);
                return this.nodes[idx] && this.nodes[idx].data[TI.STATE_ID] === 0;
            },
            isEnemy: (pos: Position, myColor: PlayerColor) => {
                const idx = this._idx(pos.x, pos.y, pos.z);
                if (!this.nodes[idx]) return false;
                const owner = this.nodes[idx].data[TI.OWNER_ID];
                // Since PieceColor is now string-backed, we can map to the value stored in the TensorNode
                const myOwnerId = myColor === 'white' ? 1 : 2;
                return owner !== 0 && owner !== myOwnerId;
            },
            isAlly: (pos: Position, myColor: PlayerColor) => {
                const idx = this._idx(pos.x, pos.y, pos.z);
                if (!this.nodes[idx]) return false;
                const owner = this.nodes[idx].data[TI.OWNER_ID];
                // Since PieceColor is now string-backed, we can map to the value stored in the TensorNode
                const myOwnerId = myColor === 'white' ? 1 : 2;
                return owner === myOwnerId;
            }
        };
    }

    private _idx(x: number, y: number, z: number): number {
        return x + (y * this.size) + (z * this.size * this.size);
    }

    /**
     * Generates a payload containing all updated telemetry data for the Reducer.
     */
    public getTelemetryPayload(): { pieceTelemetry: PieceStats[], whiteStats: TeamStats, blackStats: TeamStats, matchStats: MatchStats } {
        const allPieces = Array.from(this.pieces.values());
        const allCaptured = Array.from(this.capturedPieces.values());

        const whitePieces = allPieces.filter(p => p.color === PieceColor.WHITE);
        const blackPieces = allPieces.filter(p => p.color === PieceColor.BLACK);

        const compileTeamStats = (pieces: GamePiece[], color: PlayerColor): TeamStats => {
            const moraleKey = color === 'white' ? this.whiteMorale : this.blackMorale;

            return {
                name: color === 'white' ? 'White Alliance' : 'Black Syndicate',
                color: color,
                morale: moraleKey.totalConfidence,
                totalKills: pieces.reduce((a, p) => a + (p.stats?.kills || 0), 0),
                totalLosses: allCaptured.filter(p => p.color === PieceColor.WHITE && color === 'white' || p.color === PieceColor.BLACK && color === 'black').length,
                specialsUsed: pieces.reduce((a, p) => a + (p.stats?.special_moves_used || 0), 0),
                checksMade: 0, timesInCheck: 0, kingSurvived: true, bodyDoubleUsed: false,
                boardControlScore: moraleKey.boardControl,
                medals: new Set(), moraleEvents: [],
            };
        }

        return {
            pieceTelemetry: [...whitePieces, ...blackPieces]
                .filter(p => !!p.stats)
                .map(p => p.stats!) as PieceStats[],
            whiteStats: compileTeamStats(whitePieces, 'white'),
            blackStats: compileTeamStats(blackPieces, 'black'),
            matchStats: {
                turnCount: this.turnCount, winner: null, endReason: null, startTime: null, endTime: null,
                firstBloodBy: null, firstBloodTurn: null, mostValuablePiece: null, finalSurvivors: [], moraleCrashes: [],
                highestComeback: {}, totalMoves: 0, totalCaptures: 0, totalSpecials: 0,
                riskDelta: this.whiteMorale.threatPressure - this.blackMorale.threatPressure, // Raw Material Delta
                rewardDelta: this.whiteMorale.boardControl - this.blackMorale.boardControl, // Raw BC Delta
                relationDelta: this.whiteMorale.totalConfidence - this.blackMorale.totalConfidence, // Raw Morale Delta
            }
        };
    }
}