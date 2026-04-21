// src/features/game/core/pieces/King.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PieceColor, Vector3 } from '../../types';

export class King extends GamePiece {
  constructor(id: string, color: PieceColor, x: number, y: number, z: number) {
    super(id, PieceType.KING, color, { x, y, z });
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    const moves: Vector3[] = [];
    
    for(let dx = -1; dx <= 1; dx++) {
      for(let dy = -1; dy <= 1; dy++) {
        for(let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue; 

          const target = {
            x: this.position.x + dx,
            y: this.position.y + dy,
            z: this.position.z + dz
          };

          if (this._isInBounds(target, boardSize) && !ctx.isAlly(target, this.color)) {
            moves.push(target);
          }
        }
      }
    }
    return moves;
  }
}
