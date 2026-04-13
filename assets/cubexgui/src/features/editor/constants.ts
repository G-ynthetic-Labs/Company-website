// cubexgui/src/features/editor/constants.ts

import { PieceType, Faction, ChessPiece, PrimitiveType, EditorMode, SillyTavernCard } from './types';

export const INITIAL_CAMERA_POSITION: [number, number, number] = [5, 5, 5];

export const PIECE_LIMITS = {
  [PieceType.KING]: 1,
  [PieceType.QUEEN]: 1,
  [PieceType.FRACTAL_KNIGHT]: 1,
  [PieceType.BISHOP]: 2,
  [PieceType.KNIGHT]: 2,
  [PieceType.ROOK]: 2,
  [PieceType.PAWN]: 6,
};

// Risk (Material) Values
export const RISK_VALUES: Record<PieceType, number> = {
  [PieceType.KING]: 1000, 
  [PieceType.QUEEN]: 18,
  [PieceType.FRACTAL_KNIGHT]: 14,
  [PieceType.BISHOP]: 9,
  [PieceType.KNIGHT]: 8,
  [PieceType.ROOK]: 10,
  [PieceType.PAWN]: 3, // UPDATED: Value reflecting high mobility
};

// Relation (Morale) Values
export const MORALE_VALUES: Record<PieceType, number> = {
  [PieceType.KING]: 21,
  [PieceType.QUEEN]: 10,
  [PieceType.FRACTAL_KNIGHT]: 10,
  [PieceType.BISHOP]: 3,
  [PieceType.KNIGHT]: 3,
  [PieceType.ROOK]: 3,
  [PieceType.PAWN]: 1,
};

export const DEFAULT_MATERIAL = {
  color: '#ffffff',
  metalness: 0.5,
  roughness: 0.5,
  emissive: '#000000',
  emissiveIntensity: 0,
  wireframe: false,
};

export const PRIMITIVE_DEFAULTS: Record<PrimitiveType, Record<string, number>> = {
  [PrimitiveType.CUBE]: { width: 1, height: 1, depth: 1, widthSegments: 1, heightSegments: 1, depthSegments: 1 },
  [PrimitiveType.SPHERE]: { radius: 0.6, widthSegments: 32, heightSegments: 16 },
  [PrimitiveType.CYLINDER]: { radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 32, heightSegments: 1 },
  [PrimitiveType.CONE]: { radius: 0.5, height: 1, radialSegments: 32, heightSegments: 1 },
  [PrimitiveType.TORUS]: { radius: 0.5, tube: 0.2, radialSegments: 16, tubularSegments: 32 },
  [PrimitiveType.PLANE]: { width: 1, height: 1, widthSegments: 1, heightSegments: 1 },
  [PrimitiveType.CAPSULE]: { radius: 0.4, length: 1, capSegments: 4, radialSegments: 16 },
  [PrimitiveType.ICOSAHEDRON]: { radius: 0.6, detail: 0 },
  [PrimitiveType.RING]: { innerRadius: 0.3, outerRadius: 0.7, thetaSegments: 32, phiSegments: 1 },
  [PrimitiveType.DODECAHEDRON]: { radius: 0.6, detail: 0 },
};

export const DEFAULT_SILLY_TAVERN_CARD: SillyTavernCard = {
  name: "New Entity",
  description: "",
  personality: "",
  first_mes: "Awaiting activation...",
  scenario: "",
  mes_example: "",
  creator_notes: "",
  system_prompt: "",
  tags: ["Chess Piece", "AI"]
};

export const MOCK_ID = () => Math.random().toString(36).substring(2, 9);

export const DEFAULT_PIECE: ChessPiece = {
  id: 'default-king',
  type: PieceType.KING,
  faction: Faction.GOLD,
  parts: [
    {
      id: 'base',
      type: PrimitiveType.CYLINDER,
      name: 'Base',
      transform: { position: [0, 0.2, 0], rotation: [0, 0, 0], scale: [1, 0.2, 1] },
      material: { ...DEFAULT_MATERIAL, color: '#FFD700' },
      geometryParams: PRIMITIVE_DEFAULTS[PrimitiveType.CYLINDER]
    },
    {
      id: 'body',
      type: PrimitiveType.CUBE,
      name: 'Body',
      transform: { position: [0, 1.2, 0], rotation: [0, 0, 0], scale: [0.6, 1.8, 0.6] },
      material: { ...DEFAULT_MATERIAL, color: '#FFD700' },
      geometryParams: PRIMITIVE_DEFAULTS[PrimitiveType.CUBE]
    },
    {
      id: 'crown',
      type: PrimitiveType.CONE,
      name: 'Crown',
      transform: { position: [0, 2.5, 0], rotation: [0, 0, 0], scale: [0.8, 0.8, 0.8] },
      material: { ...DEFAULT_MATERIAL, color: '#FFA500', emissive: '#FF4400', emissiveIntensity: 0.2 },
      geometryParams: PRIMITIVE_DEFAULTS[PrimitiveType.CONE]
    }
  ],
  gameStats: {
    risk: 1000,
    reward: 50,
    relation: 21,
    rrrState: { offense: 0, defense: 0, strategy: 0 }
  },
  lore: {
    card: { ...DEFAULT_SILLY_TAVERN_CARD, name: "Auric The Unyielding" },
    chatHistory: [],
  },
  animation: {
    idle: 'hover',
    speed: 1,
  }
};