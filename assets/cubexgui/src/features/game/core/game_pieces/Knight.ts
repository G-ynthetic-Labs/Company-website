// src/features/game/core/pieces/Knight.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PieceColor, Vector3, PieceSkill } from '../../types';

export class Knight extends GamePiece {
  constructor(id: string, color: PieceColor, x: number, y: number, z: number, typeOverride: PieceType = PieceType.KNIGHT) {
    super(id, typeOverride, color, { x, y, z });
  }

  // Complex L-Move Logic (Used by both standard and Fractal Knight)
  private _getComplexMoves(boardSize: number, ctx: MoveContext): Vector3[] {
    const moves: Vector3[] = [];
    const { x, y, z } = this.position;

    const applyPermutations = (baseComponents: number[]) => {
      const [a, b, c] = baseComponents;
      const perms = new Set<string>();
      const axisPerms = [[a, b, c], [a, c, b], [b, a, c], [b, c, a], [c, a, b], [c, b, a]];

      axisPerms.forEach(p => {
        const [px, py, pz] = p;
        [-1, 1].forEach(sx => {
          [-1, 1].forEach(sy => {
            [-1, 1].forEach(sz => {
              perms.add(JSON.stringify({ x: px * sx, y: py * sy, z: pz * sz }));
            });
          });
        });
      });
      return Array.from(perms).map(s => JSON.parse(s) as Vector3);
    };

    if (this.type === PieceType.KNIGHT) {
      // Standard Knight: 3, 2, 0 L-shape move, as specified by the user.
      const standardVectors = applyPermutations([3, 2, 0]);
      standardVectors.forEach(v => {
        const target = { x: x + v.x, y: y + v.y, z: z + v.z };
        if (this._isInBounds(target, boardSize) && !ctx.isAlly(target, this.color)) {
          moves.push(target);
        }
      });
    } else if (this.type === PieceType.FRACTAL_KNIGHT) {
      // Fractal Knight: Phase 1 (4, 2, 0) and Phase 2 (3, 2, 2) retains its abilities.

      // Phase 1: Modified to [4, 2, 0] Extended L-Shape
      // [REFINED DOGLEG] Only show Phase 1 if we haven't moved yet in this turn
      if (!this.previousMoveVector) {
        const phase1Vectors = applyPermutations([4, 2, 0]);
        phase1Vectors.forEach(v => {
          const target = { x: x + v.x, y: y + v.y, z: z + v.z };
          if (this._isInBounds(target, boardSize) && !ctx.isAlly(target, this.color)) {
            moves.push(target);
          }
        });
      }

      // Phase 2: Quantum Leap 2-3-3
      const canLeap = this.phase >= 2 || this.learnedSkills.has(PieceSkill.QUANTUM_LEAP);
      // [REFINED DOGLEG] Only show Phase 2 if we ARE in a multi-phase move
      if (canLeap && this.previousMoveVector) {
        const phase2Vectors = applyPermutations([3, 2, 2]);
        phase2Vectors.forEach(v => {
          const target = { x: x + v.x, y: y + v.y, z: z + v.z };
          if (this._isInBounds(target, boardSize) && !ctx.isAlly(target, this.color)) {
            moves.push(target);
          }
        });
      }
    }

    return moves;
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    return this._getComplexMoves(boardSize, ctx);
  }

  /**
   * Knight Move = Quantum Jump / Teleport.
   * Does NOT report "Passing Through" to the Tensor Field.
   */
  public override getTrajectory(target: Vector3): Vector3[] {
    return [this.position, target];
  }
}