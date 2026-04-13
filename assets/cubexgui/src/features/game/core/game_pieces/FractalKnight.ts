// src/features/game/core/pieces/FractalKnight.ts
import { Knight } from './Knight';
import { PieceType, PieceColor, Vector3 } from '../../types';
import { MoveContext } from './BasePiece';

export class FractalKnight extends Knight {
    constructor(id: string, color: PieceColor, x: number, y: number, z: number) {
        super(id, color, x, y, z, PieceType.FRACTAL_KNIGHT);
        this.phase = 2; // Starts evolved (for consistency with other pieces)
        this._unlockPhaseSkills();
    }
    
    public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
        // Fractal Knight logic is now handled in the superclass (Knight.ts) 
        // by checking this.type.
        return super.getPotentialMoves(boardSize, ctx);
    }
}