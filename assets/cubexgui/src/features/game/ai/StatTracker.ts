// src/features/game/ai/StatTracker.ts
// Porting metrics/stat_tracker.py and metrics/exposure_map.py

import { PieceStats, TeamStats, MatchStats, Vector3, Position } from '../types';
import { manhattanDistance, posToKey, Vector3Key } from './TelemetryUtils'; // IMPORT Vector3Key
import { ThreatMap, CoverageMap } from './MetricMaps';

// Define a simplified Piece structure the StatTracker needs to interact with
interface PieceWithTracker {
    id: string;
    color: 'white' | 'black';
    position: Position; // FIX: Use Position object
    commander?: PieceWithTracker; // For formation tracking
    morale: number;
    stats: PieceStats; // The attached stats object
    getMaterialValue: () => number; // Needed for capture material
    getValidMoves: (gameRules: any) => Position[]; // FIX: Returns Position[]
    captured: boolean;
}

// Define a simplified Engine structure
interface EngineInterface {
    getPiece: (pos: Position) => PieceWithTracker | undefined; // FIX: Uses Position object
}

const CUBE_SIZE = 8;

export class StatTracker {

    // --- Event-Based Tracking Hooks ---

    public static onPieceMove(piece: PieceWithTracker, fromPos: Position, toPos: Position, captured?: PieceWithTracker): void { // FIX: Use Position
        const dist = manhattanDistance(fromPos, toPos);
        piece.stats.squaresMoved += dist;

        if (captured) {
            const capturedValue = captured.getMaterialValue();

            piece.stats.kills += 1;
            piece.stats.materialCaptured += capturedValue;

            // RPG: Award Capture XP
            if ((piece as any).addXp) (piece as any).addXp(50);

            // Assuming pieceType is available on the captured piece
            const name = captured.stats.pieceType || "Unknown";
            piece.stats.kills_by_type[name] = (piece.stats.kills_by_type[name] || 0) + 1;
        }

        // RPG: Award Move XP
        if ((piece as any).addXp) (piece as any).addXp(10);
    }

    public static onPiecePromote(piece: PieceWithTracker): void {
        piece.stats.promoted = true;
    }

    public static onPieceSurvived(piece: PieceWithTracker): void {
        if (!piece.stats.captured) {
            piece.stats.games_survived += 1;
            piece.stats.survivor = true;
        }
    }

    public static onSpecialManeuver(piece: PieceWithTracker): void {
        piece.stats.special_moves_used += 1;
        // RPG: Award Special XP
        if ((piece as any).addXp) (piece as any).addXp(25);
    }

    public static onTeamCheck(teamStats: TeamStats): void {
        teamStats.checksMade += 1;
    }

    public static onTeamInCheck(teamStats: TeamStats): void {
        teamStats.timesInCheck += 1;
    }

    // --- End-of-Turn Behavioral Tracking ---

    public static trackForwardScout(piece: PieceWithTracker): void {
        const z = piece.position.z; // FIX: Use dot notation

        // White moves towards Z=0 (enemy territory Z<4). Black moves towards Z=7 (enemy territory Z>3).
        const inEnemyTerritory = (piece.color === 'white' ? z < 4 : z > 3);

        if (inEnemyTerritory) {
            piece.stats._inEnemyTerritoryTurns += 1;
            if (piece.stats._inEnemyTerritoryTurns === 2) { // 2 consecutive turns
                piece.stats.forwardScout += 1;
            }
        } else {
            piece.stats._inEnemyTerritoryTurns = 0;
        }
    }

    public static trackDiligence(piece: PieceWithTracker): void {
        // Morale < 40 indicates low morale/diligent behavior
        if (piece.morale < 40) {
            piece.stats.diligent += 1;
        }
    }

    public static trackFormation(piece: PieceWithTracker): void {
        if (piece.commander) {
            const commander = piece.commander;
            const dist = manhattanDistance(commander.position, piece.position); // FIX: manhattanDistance now takes Position objects
            // Coherence within 2 squares Manhattan distance
            if (dist <= 2) {
                piece.stats.formationCoherence += 1;
            }
        }
    }

    public static endOfTurnAllPieces(engine: EngineInterface): void {
        // Loop over the 8x8x8 board
        for (let x = 0; x < CUBE_SIZE; x++) {
            for (let y = 0; y < CUBE_SIZE; y++) {
                for (let z = 0; z < CUBE_SIZE; z++) {
                    const pos: Position = { x, y, z }; // FIX: Use object literal
                    const piece = engine.getPiece(pos);

                    if (piece && !piece.captured) {
                        StatTracker.trackForwardScout(piece);
                        StatTracker.trackDiligence(piece);
                        StatTracker.trackFormation(piece);
                        // RPG: Award Turn Survival XP
                        if ((piece as any).addXp) (piece as any).addXp(5);
                    }
                }
            }
        }
    }

    // --- Metrics: Exposure Evaluation (from exposure_map.py) ---

    /** * Calculates threats vs coverage for all pieces on the board and updates their PieceStats.
     * Assumes ThreatMap and CoverageMap have already been run for the current board state.
     */
    public static evaluateExposure(
        allPieces: PieceWithTracker[], // CORRECTED TYPE
        threatMap: ThreatMap,
        coverageMap: CoverageMap
    ): void {
        for (const piece of allPieces) {
            if (piece.stats.captured) continue;

            // Step 1: Reset sets 
            piece.stats.threatenedBy.clear();
            piece.stats.coveringAllies.clear();

            // FIX: Ensure posToKey returns the correct Vector3Key type
            const piecePosKey = posToKey(piece.position);

            // Step 2: Populate sets from pre-calculated maps
            const attackers = threatMap.attackersAt(piecePosKey as Vector3Key);
            const defenders = coverageMap.defendersAt(piecePosKey as Vector3Key);

            for (const attackerId of attackers) {
                piece.stats.threatenedBy.add(attackerId);
            }

            for (const defenderId of defenders) {
                // Ensure a piece doesn't count as defending itself
                if (defenderId !== piece.id) {
                    piece.stats.coveringAllies.add(defenderId);
                }
            }

            // Step 3: Calculate isExposed
            const threats = piece.stats.threatenedBy.size;
            const covers = piece.stats.coveringAllies.size;

            // Exposure = more threats than covers
            piece.stats.isExposed = threats > covers;
        }
    }
}