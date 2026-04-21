// game/core/pieces/Pawn.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PlayerColor, Vector3 } from '../../types';
import { posEquals } from '../game_logic/gameConstants';

export class Pawn extends GamePiece {
  constructor(id: string, color: PlayerColor, x: number, y: number, z: number) {
    super(id, PieceType.PAWN, color, { x, y, z });
    // lastMoveVector is null initially from BasePiece, correctly enabling the 'any direction' rule on the first move.
  }

  private _getPrimaryForwardY(): number {
    // White pieces move DOWN (-Y). Black pieces move UP (+Y).
    return this.color === 'white' ? -1 : 1;
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    const moves: Vector3[] = [];
    const { x, y, z } = this.position;
    
    // 1. Dynamic Backwards Vector (The opposite of the last move)
    const forbiddenBackwardsVector = this.lastMoveVector 
        ? { x: -this.lastMoveVector.x, y: -this.lastMoveVector.y, z: -this.lastMoveVector.z }
        : null;

    const isBackwards = (dir: Vector3): boolean => {
        if (!forbiddenBackwardsVector) return false;
        // Check if the move delta is EXACTLY the reverse of the last move vector
        return posEquals(dir, forbiddenBackwardsVector);
    };

    // 2. Valid MOVES (Orthogonal, 1 or 2 steps, NOT backwards)
    const orthogonals = [
        {x:1, y:0, z:0}, {x:-1, y:0, z:0},
        {x:0, y:1, z:0}, {x:0, y:-1, z:0},
        {x:0, y:0, z:1}, {x:0, y:0, z:-1}
    ];

    orthogonals.forEach(dir => {
        // Prevent moving backwards (Dynamic Rule)
        if (isBackwards(dir)) return;

        // --- Step 1 ---
        const target1 = { x: x + dir.x, y: y + dir.y, z: z + dir.z };
        
        if (this._isInBounds(target1, boardSize) && ctx.isEmpty(target1)) {
            moves.push(target1);

            // --- Step 2 (Double Move) - Only on first turn --- 
            if (!this.hasMoved) {
                const target2 = { x: x + (dir.x * 2), y: y + (dir.y * 2), z: z + (dir.z * 2) };
                
                if (this._isInBounds(target2, boardSize) && ctx.isEmpty(target2)) {
                    if (!isBackwards(dir)) { 
                        moves.push(target2);
                    }
                }
            }
        }
    });

    // 3. CAPTURES (Diagonal and Vertical)
    const primaryY = this._getPrimaryForwardY();

    for(let dx = -1; dx <= 1; dx++) {
        for(let dy = -1; dy <= 1; dy++) {
            for(let dz = -1; dz <= 1; dz++) {
                const mag = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
                const dir: Vector3 = {x: dx, y: dy, z: dz};

                // Capture conditions (mag=2 for diagonals, mag=1 with Z-change for vertical capture)
                if (mag === 2 || (mag === 1 && dz !== 0)) {
                    
                    // Enforce "forward diagonal captures" constraint on the Y-axis.
                    // This prevents capturing backwards relative to the piece's starting side (Y-axis).
                    if (dy !== 0 && Math.sign(dy) !== primaryY) {
                         continue;
                    }
                    
                    // Dynamic Rule: Prevent capturing exactly backwards from the last move
                    if (isBackwards(dir)) continue;

                    const target = { x: x+dx, y: y+dy, z: z+dz };
                    if (this._isInBounds(target, boardSize) && ctx.isEnemy(target, this.color)) {
                        moves.push(target);
                    }
                }
            }
        }
    }

    return moves;
  }
}