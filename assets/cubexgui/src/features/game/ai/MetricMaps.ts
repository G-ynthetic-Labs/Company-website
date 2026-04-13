// src/features/game/ai/MetricMaps.ts
// Full implementation of metrics/threat_map.py, metrics/coverage_map.py, metrics/axial_zone_logic.py

import { PlayerColor, PieceStats, Vector3, Position } from '../types';
import { Vector3Key, BOARD_SIZE, posToKey } from './TelemetryUtils';

type PieceID = string;
type Color = PlayerColor;

// Simplified Piece Interface for Mapping utility
export interface PieceWithMaps {
    id: PieceID;
    color: Color;
    position: Position; // FIX: Use Position object
    stats: PieceStats; 
    getValidMoves: (gameState: any) => Position[]; 
    captured: boolean;
    // Mock material method needed by StatTracker for captures
    getMaterialValue: () => number;
}

interface GameStateInterface {
    pieces: PieceWithMaps[];
    getPieceAtPos: (pos: Vector3Key) => PieceWithMaps | undefined; 
}


// --- 1. ThreatMap (For TI.ATTACK_VECTOR_SUM) ---

export class ThreatMap {
    public threats: Map<Vector3Key, Set<PieceID>>;

    constructor() {
        this.threats = new Map();
    }

    public reset(): void {
        this.threats.clear();
    }

    public scanBoard(gameState: GameStateInterface, attackerColor: Color): void {
        this.reset();
        for (const piece of gameState.pieces) {
            if (piece.color !== attackerColor || piece.stats.captured) {
                continue;
            }
            const moves = piece.getValidMoves(gameState); 
            for (const move of moves) {
                const moveKey = posToKey(move);
                if (!this.threats.has(moveKey)) {
                    this.threats.set(moveKey, new Set());
                }
                this.threats.get(moveKey)!.add(piece.id);
            }
        }
    }

    public attackersAt(positionKey: Vector3Key): Set<PieceID> {
        return this.threats.get(positionKey) || new Set();
    }
}


// --- 2. CoverageMap (For TI.DEFENSE_VECTOR_SUM) ---

export class CoverageMap {
    public coverage: Map<Vector3Key, Set<PieceID>>;

    constructor() {
        this.coverage = new Map();
    }

    public reset(): void {
        this.coverage.clear();
    }

    public scanBoard(gameState: GameStateInterface, defenderColor: Color): void {
        this.reset();
        for (const piece of gameState.pieces) {
            if (piece.color !== defenderColor || piece.stats.captured) {
                continue;
            }
            const moves = piece.getValidMoves(gameState); 
            for (const move of moves) {
                const moveKey = posToKey(move);
                const targetPiece = gameState.getPieceAtPos(moveKey);
                // Rule: A square is covered if it's empty OR contains an ally.
                if (!targetPiece || targetPiece.color === defenderColor) {
                    if (!this.coverage.has(moveKey)) {
                        this.coverage.set(moveKey, new Set());
                    }
                    this.coverage.get(moveKey)!.add(piece.id);
                }
            }
        }
    }

    public defendersAt(positionKey: Vector3Key): Set<PieceID> {
        return this.coverage.get(positionKey) || new Set();
    }
}


// --- 3. AxialZoneControl (For TI.CONTROL_VAL) ---

export type AxialZoneKey = `X${number}` | `Y${number}` | `Z${number}`;

export class AxialZoneControl {
    public zones: Map<AxialZoneKey, { white: number, black: number }>;

    constructor() {
        this.zones = new Map();
        this.reset();
    }

    public reset(): void {
        this.zones.clear();
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.zones.set(`X${i}` as AxialZoneKey, { white: 0, black: 0 });
            this.zones.set(`Y${i}` as AxialZoneKey, { white: 0, black: 0 });
            this.zones.set(`Z${i}` as AxialZoneKey, { white: 0, black: 0 });
        }
    }

    private _zoneKeys(pos: Position): AxialZoneKey[] { // FIX: pos is Position object
        // FIX: Use dot notation for access
        return [`X${pos.x}`, `Y${pos.y}`, `Z${pos.z}`] as AxialZoneKey[]; 
    }

    public scanBoard(gameState: GameStateInterface): void {
        this.reset();
        for (const piece of gameState.pieces) {
            if (piece.stats.captured) continue;
            
            for (const move of piece.getValidMoves(gameState)) { 
                for (const key of this._zoneKeys(move)) {
                    const zone = this.zones.get(key);
                    if (zone) {
                        zone[piece.color] += 1;
                    }
                }
            }
        }
    }

    public getFullControlMap(): Map<AxialZoneKey, { white: number, black: number }> {
        return this.zones;
    }
}