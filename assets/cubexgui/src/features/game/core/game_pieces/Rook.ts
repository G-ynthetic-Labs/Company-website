// src/features/game/core/pieces/Rook.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PieceColor, Vector3, PieceSkill } from '../../types';

export class Rook extends GamePiece {
  constructor(id: string, color: PieceColor, x: number, y: number, z: number) {
    super(id, PieceType.ROOK, color, { x, y, z });
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    const moves: Vector3[] = [];
    const directions: Vector3[] = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
    ];

    directions.forEach(dir => {
      // RULE: If Phase 2 (previousMoveVector exists), we CANNOT move parallel to it.
      // This enforces the "Dogleg" (90 degree turn).
      if (this.previousMoveVector) {
        const pv = this.previousMoveVector;
        // If current dir axis matches previous vector axis, skip it.
        // (e.g. if we moved X, we can't move X or -X again)
        if ((dir.x !== 0 && pv.x !== 0) ||
          (dir.y !== 0 && pv.y !== 0) ||
          (dir.z !== 0 && pv.z !== 0)) {
          return;
        }
      }

      // RULE: Use maxMoveLimit (which is 8 normally, but reduced in Phase 2)
      for (let dist = 1; dist <= this.maxMoveLimit; dist++) {
        const nextPos = {
          x: this.position.x + (dir.x * dist),
          y: this.position.y + (dir.y * dist),
          z: this.position.z + (dir.z * dist)
        };

        if (!this._isInBounds(nextPos, boardSize)) break;
        if (ctx.isAlly(nextPos, this.color)) break;

        moves.push(nextPos);

        if (ctx.isEnemy(nextPos, this.color)) break;

        const canFractal = this.phase >= 2 || this.learnedSkills.has(PieceSkill.FRACTAL_DRIFT);
        // [REFINED DOGLEG] Only show Phase 2 legs IF we are already in Phase 2
        if (canFractal && this.previousMoveVector && dist < 4 && ctx.isEmpty(nextPos)) {
          this._addFractalLegs(nextPos, dir, boardSize, moves, ctx);
        }
      }
    });
    return moves;
  }

  private _addFractalLegs(start: Vector3, currentDir: Vector3, size: number, moves: Vector3[], ctx: MoveContext): void {
    const orthogonals: Vector3[] = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
    ];

    orthogonals.forEach(ortho => {
      // Fractal Drift must be orthogonal to current direction
      const dot = (currentDir.x * ortho.x) + (currentDir.y * ortho.y) + (currentDir.z * ortho.z);
      if (dot !== 0) return;

      for (let dist = 1; dist < size; dist++) {
        const legPos = {
          x: start.x + (ortho.x * dist),
          y: start.y + (ortho.y * dist),
          z: start.z + (ortho.z * dist)
        };
        if (this._isInBounds(legPos, size)) {
          if (ctx.isAlly(legPos, this.color)) break;
          moves.push(legPos);
          if (ctx.isEnemy(legPos, this.color)) break;
        }
        else break;
      }
    });
  }
}