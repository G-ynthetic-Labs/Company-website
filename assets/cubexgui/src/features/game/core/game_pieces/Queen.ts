// src/features/game/core/pieces/Queen.ts
import { GamePiece, MoveContext } from './BasePiece';
import { PieceType, PieceColor, Vector3 } from '../../types';
import { Rook } from './Rook';
import { Bishop } from './Bishop';

export class Queen extends GamePiece {
  private _rook: Rook;
  private _bishop: Bishop;

  constructor(id: string, color: PieceColor, x: number, y: number, z: number) {
    super(id, PieceType.QUEEN, color, { x, y, z });
    this._rook = new Rook(id + "_R", color, x, y, z); 
    this._bishop = new Bishop(id + "_B", color, x, y, z); 
  }

  public getPotentialMoves(boardSize: number = 8, ctx: MoveContext): Vector3[] {
    // 1. Sync position AND Phase constraints to sub-pieces
    this._rook.position = this.position;
    this._bishop.position = this.position;
    
    // IMPORTANT: Forward the Phase 2 constraints
    this._rook.maxMoveLimit = this.maxMoveLimit;
    this._rook.previousMoveVector = this.previousMoveVector;
    this._rook.phase = this.phase;

    this._bishop.maxMoveLimit = this.maxMoveLimit;
    this._bishop.previousMoveVector = this.previousMoveVector;
    this._bishop.phase = this.phase;
    
    // 2. Share learned skills
    this.learnedSkills.forEach(s => {
        this._rook.learnedSkills.add(s);
        this._bishop.learnedSkills.add(s);
    });

    // 3. Delegate to sub-pieces
    const rookMoves = this._rook.getPotentialMoves(boardSize, ctx);
    const bishopMoves = this._bishop.getPotentialMoves(boardSize, ctx);
    
    // 4. Triagonal Logic (3D Corners) - Queen-specific
    const triagonalMoves: Vector3[] = [];
    const corners = [
        {x:1,y:1,z:1}, {x:1,y:1,z:-1}, {x:1,y:-1,z:1}, {x:1,y:-1,z:-1},
        {x:-1,y:1,z:1}, {x:-1,y:1,z:-1}, {x:-1,y:-1,z:1}, {x:-1,y:-1,z:-1}
    ];
    corners.forEach(dir => {
        // Queens move unlimited distance on Triagonals unless constrained
        for (let dist = 1; dist <= this.maxMoveLimit; dist++) {
            const nextPos = {
              x: this.position.x + (dir.x * dist),
              y: this.position.y + (dir.y * dist),
              z: this.position.z + (dir.z * dist)
            };
            if (!this._isInBounds(nextPos, boardSize)) break;
            if (ctx.isAlly(nextPos, this.color)) break;
            
            triagonalMoves.push(nextPos);
            
            if (ctx.isEnemy(nextPos, this.color)) break;
        }
    });

    // 5. Merge and deduplicate
    const moveSet = new Set<string>();
    [...rookMoves, ...bishopMoves, ...triagonalMoves].forEach(m => moveSet.add(JSON.stringify(m)));
    
    return Array.from(moveSet).map(s => JSON.parse(s));
  }
}