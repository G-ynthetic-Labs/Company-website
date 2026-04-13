// src/features/game/core/pieces/Bishop.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PieceColor, Vector3, PieceSkill } from '../../types';

export class Bishop extends GamePiece {
  constructor(id: string, color: PieceColor, x: number, y: number, z: number) {
    super(id, PieceType.BISHOP, color, { x, y, z });
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    const moves: Vector3[] = [];

    // Generate all 2D diagonal vectors (12 total)
    const twoAxisDiagonals: Vector3[] = [
      // XY Plane
      { x: 1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: 1, z: 0 }, { x: -1, y: -1, z: 0 },
      // XZ Plane
      { x: 1, y: 0, z: 1 }, { x: 1, y: 0, z: -1 }, { x: -1, y: 0, z: 1 }, { x: -1, y: 0, z: -1 },
      // YZ Plane
      { x: 0, y: 1, z: 1 }, { x: 0, y: 1, z: -1 }, { x: 0, y: -1, z: 1 }, { x: 0, y: -1, z: -1 }
    ];

    const allDirections = twoAxisDiagonals;

    allDirections.forEach(dir => {
      if (dir.x === 0 && dir.y === 0 && dir.z === 0) return;

      // RULE: Dogleg Check for Phase 2
      // If we have a previous vector, we cannot continue in the same direction or exact opposite.
      // We must change the "slope" or plane.
      if (this.previousMoveVector) {
        const pv = this.previousMoveVector;
        // Check for collinearity (same or opposite direction)
        // Simple dot product check or component check works for unit vectors
        if (dir.x === pv.x && dir.y === pv.y && dir.z === pv.z) return; // Same dir
        if (dir.x === -pv.x && dir.y === -pv.y && dir.z === -pv.z) return; // Opposite dir
      }

      // RULE: Use maxMoveLimit (Reduced in Phase 2)
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

        // Check for Prism Refract (Standard Phase 2 trigger from Base Logic)
        const canRefract = this.phase >= 2 || this.learnedSkills.has(PieceSkill.PRISM_REFRACT);
        // [REFINED DOGLEG] Only show Phase 2 legs IF we are already in Phase 2
        if (canRefract && this.previousMoveVector && dist < 4 && ctx.isEmpty(nextPos)) {
          this._addRefractedLegs(nextPos, dir, twoAxisDiagonals, boardSize, moves, ctx);
        }
      }
    });
    return moves;
  }

  // Helper method for Bishop's Prism Refract skill
  private _addRefractedLegs(start: Vector3, currentDir: Vector3, allDirs: Vector3[], size: number, moves: Vector3[], ctx: MoveContext): void {
    allDirs.forEach(newDir => {
      if (newDir.x === currentDir.x && newDir.y === currentDir.y && newDir.z === currentDir.z) return;
      if (newDir.x === -currentDir.x && newDir.y === -currentDir.y && newDir.z === -currentDir.z) return;

      for (let dist = 1; dist < size; dist++) {
        const legPos = {
          x: start.x + (newDir.x * dist),
          y: start.y + (newDir.y * dist),
          z: start.z + (newDir.z * dist)
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