// game/core/game_logic/gameConstants.ts
import { Position } from '../../types';

export const CUBE_SIZE = 8;

// --- Helpers ---
export const posEquals = (a: Position, b: Position) => a.x === b.x && a.y === b.y && a.z === b.z;
export const isValidPos = (p: Position) => p.x >= 0 && p.x < CUBE_SIZE && p.y >= 0 && p.y < CUBE_SIZE && p.z >= 0 && p.z < CUBE_SIZE;

// --- Movement Vectors ---
export const ORTHOGONAL = [
  {x:1,y:0,z:0}, {x:-1,y:0,z:0},
  {x:0,y:1,z:0}, {x:0,y:-1,z:0},
  {x:0,y:0,z:1}, {x:0,y:0,z:-1}
];
export const DIAGONAL = [ // 2D diagonals on all 3 planes
  {x:1,y:1,z:0}, {x:1,y:-1,z:0}, {x:-1,y:1,z:0}, {x:-1,y:-1,z:0},
  {x:1,y:0,z:1}, {x:1,y:0,z:-1}, {x:-1,y:0,z:1}, {x:-1,y:0,z:-1},
  {x:0,y:1,z:1}, {x:0,y:1,z:-1}, {x:0,y:-1,z:1}, {x:0,y:-1,z:-1}
];
export const TRIAGONAL = [ // 3D corners
  {x:1,y:1,z:1}, {x:1,y:1,z:-1}, {x:1,y:-1,z:1}, {x:1,y:-1,z:-1},
  {x:-1,y:1,z:1}, {x:-1,y:1,z:-1}, {x:-1,y:-1,z:1}, {x:-1,y:-1,z:-1}
];