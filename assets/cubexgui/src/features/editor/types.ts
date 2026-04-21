// src/features/editor/types.ts
// NOTE: This content is the full definition block for the Editor Module types.
export enum EditorMode {
  MODELING = 'MODELING',
  ANIMATION = 'ANIMATION',
  COMPOSITION = 'COMPOSITION',
  LORE = 'LORE',
  GAMESTATE = 'GAMESTATE'
}

export enum PieceType {
  KING = 'King',
  QUEEN = 'Queen',
  FRACTAL_KNIGHT = 'Fractal Knight',
  BISHOP = 'Bishop',
  KNIGHT = 'Knight',
  ROOK = 'Rook',
  PAWN = 'Pawn'
}

export enum Faction {
  GOLD = 'Gold',
  SILVER = 'Silver'
}

export enum PrimitiveType {
  CUBE = 'Cube',
  SPHERE = 'Sphere',
  CYLINDER = 'Cylinder',
  CONE = 'Cone',
  TORUS = 'Torus',
  PLANE = 'Plane',
  CAPSULE = 'Capsule',
  ICOSAHEDRON = 'Icosahedron',
  RING = 'Ring',
  DODECAHEDRON = 'Dodecahedron'
}

export interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface MaterialConfig {
  color: string;
  metalness: number;
  roughness: number;
  emissive: string;
  emissiveIntensity: number;
  wireframe?: boolean;
}

export interface PiecePart {
  id: string;
  type: PrimitiveType;
  name: string;
  transform: Transform;
  material: MaterialConfig;
  geometryParams: Record<string, number>;
}

export interface GameLogicStats {
  risk: number; // Material Value
  reward: number; // Board Control Potential
  relation: number; // Morale Value
  rrrState: {
    offense: -1 | 0 | 1;
    defense: -1 | 0 | 1;
    strategy: -1 | 0 | 1;
  };
}

export interface SillyTavernCard {
  name: string;
  description: string;
  personality: string;
  first_mes: string;
  scenario: string;
  mes_example: string;
  creator_notes: string;
  system_prompt: string;
  tags: string[];
}

export interface PieceLore {
  card: SillyTavernCard;
  chatHistory: { role: 'user' | 'model'; text: string }[];
}

export interface PieceAnimation {
  idle: 'none' | 'hover' | 'pulse' | 'spin' | 'wobble';
  speed: number;
}

// ChessPiece is the key type needed for the Vantage service
export interface ChessPiece {
  id: string;
  type: PieceType;
  faction: Faction;
  parts: PiecePart[];
  gameStats: GameLogicStats;
  lore: PieceLore;
  animation: PieceAnimation;
  thumbnail?: string;
}

export interface TensorCube {
  id: string;
  base: string[];
  t1: string[];
  t2: string[];
  t3: string[];
  active: boolean;
}

export type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
};