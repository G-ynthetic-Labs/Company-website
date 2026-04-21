// cubexgui/src/features/game/types.ts

// --- CORE ENGINE PRIMITIVES ---
export type PlayerColor = 'white' | 'black';
export type Axis = 'X' | 'Y' | 'Z';
export const CUBE_SIZE = 8;

export interface Position { x: number; y: number; z: number; }
// FIX: Unify Vector3 with Position (The Python array remnant is removed)
export type Vector3 = Position;

export enum PieceColor { WHITE = 'white', BLACK = 'black' }
export enum Faction { NONE = 0, GOLD = 1, SILVER = 2 }

export enum PieceSkill {
  FRACTAL_DRIFT = 1,
  PRISM_REFRACT = 2,
  QUANTUM_LEAP = 3
}

export interface TelemetryData {
  movesMade: number;
  distanceTraveled: number;
  captures: number;
  avgRRRScore: number;
  peakDangerSurvived: number;
  history: Position[];
}

// --- EVALUATION TYPES ---
export interface MpwEvaluation {
  risk: number;
  reward: number;
  relation: number;
}
export interface RrrScore {
  offense: -1 | 0 | 1;
  defense: -1 | 0 | 1;
  strategy: -1 | 0 | 1;
}

export type StanceLabel = 'Balanced' | 'Hyper Aggressive' | 'Hyper Defensive' | 'Reactive' | 'Fortified' | 'Tactical' | 'Hyper Retaliatory';

// --- PIECE TYPES ---
export enum PieceType {
  KING = 'King',
  QUEEN = 'Queen',
  FRACTAL_KNIGHT = 'FractalKnight',
  ROOK = 'Rook',
  BISHOP = 'Bishop',
  KNIGHT = 'Knight',
  PAWN = 'Pawn'
}

export type GameMode = 'HvH' | 'HvAI' | 'AIvAI';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// --- Core Piece Definition (Engine State) ---
export interface Piece {
  id: string;
  type: PieceType;
  color: PlayerColor;
  position: Position;
  hasMoved: boolean;
  faction?: 'gold' | 'silver';
  lastMoveVector?: Vector3; // Now correctly expects {x, y, z}

  // Hierarchy & Morale
  commanderId?: string;
  generalId?: string;
  isMercenary?: boolean;
  currentMorale?: number;

  // Direct link to telemetry data (used by Roster)
  stats?: PieceStats;
}

export interface KnightState {
  legsRemaining: number[]; axesUsed: Axis[]; movesTaken: Position[];
}
export interface TurnPhase {
  active: boolean; pieceId: string; intermediatePos?: Position; distanceMoved?: number;
  firstMoveVector?: Position; knightState?: KnightState;
}
export interface PromotionState {
  active: boolean; pawnId: string; from: Position; to: Position;
}

// --- EXPANDED TELEMETRY MODELS (Full Product Specification) ---

export interface PieceStats {
  id: string;
  pieceType: string;
  color: 'white' | 'black';
  allegiance: 'gold' | 'silver' | 'commander' | 'independent' | string;
  position: [number, number, number];

  // State & Lifecycle
  morale: number;
  captured: boolean;
  promoted: boolean;
  rank: string | null;
  games_survived: number;
  special_moves_used: number;

  // Movement / Action
  squaresMoved: number;
  materialCaptured: number;
  kills: number;
  kills_by_type: Record<string, number>;

  // Threat / Board Presence
  threatenedBy: Set<string>; // ID of piece threatening it
  coveringAllies: Set<string>; // ID of pieces covering it
  isExposed: boolean; // threats > covers
  isSupported: boolean; // has coverage

  bully: number;
  formationCoherence: number;
  forwardScout: number;
  _inEnemyTerritoryTurns: number; // Internal tracking

  // Morale Behavior
  diligent: number; // Tracks turns below 40 morale
  survivor: boolean;

  // Symbolic Narrative
  achievements: Set<string>;
  roleTag: 'offensive' | 'defensive' | 'strategic' | 'inactive';
}

export interface TeamStats {
  name: string;
  color: 'white' | 'black';
  morale: number;
  totalKills: number;
  totalLosses: number;
  specialsUsed: number;
  checksMade: number;
  timesInCheck: number;
  kingSurvived: boolean;
  bodyDoubleUsed: boolean;

  // Board Control 
  boardControlScore: number;

  // Symbolic 
  medals: Set<string>;
  moraleEvents: string[];
}

export interface MatchStats {
  turnCount: number;
  winner: 'white' | 'black' | null;
  endReason: string | null;
  startTime: number | null;
  endTime: number | null;

  // Milestones 
  firstBloodBy: PlayerColor | null;
  firstBloodTurn: number | null;
  mostValuablePiece: string | null;
  finalSurvivors: string[];

  // Morale Story 
  moraleCrashes: number[];
  highestComeback: Record<string, number>;

  // Totals 
  totalMoves: number;
  totalCaptures: number;
  totalSpecials: number;

  // RRR Deltas
  riskDelta: number;
  rewardDelta: number;
  relationDelta: number;
}


// Stats & Meta (UI Mocks/Detailed Metrics for Dashboard)
export type Coord = [number, number, number];
export interface MetricBreakdown {
  label: string; whiteValue: number; blackValue: number; netDelta: number;
}
export interface DetailedMetrics {
  risk: { whiteMaterial: number; blackMaterial: number; breakdown: { type: string; value: number; whiteCount: number; blackCount: number }[]; delta: number; status: number; };
  reward: { whiteControl: number; blackControl: number; components: MetricBreakdown[]; delta: number; status: number; };
  relation: { whiteMorale: number; blackMorale: number; breakdown: { type: string; value: number; whiteCount: number; blackCount: number }[]; subteams: { white: { gold: number; silver: number }; black: { gold: number; silver: number }; }; delta: number; status: number; };
}
export interface LayerData { z: number; cells: CellData[][]; }
export interface CellData {
  x: number; y: number; z: number; pieceId?: string; threatCount: { white: number; black: number };
  coverageCount: { white: number; black: number }; controlOwner: 'white' | 'black' | 'neutral' | 'contested';
}

export interface GameState {
  pieces: Piece[];
  capturedPieces: Piece[];
  selectedId: string | null;
  validMoves: Position[];
  turn: PlayerColor;
  moveHistory: string[];
  turnPhase: TurnPhase | null;
  pendingPromotion: PromotionState | null;
  gameMode: GameMode;
  difficulty: Difficulty;
  isAiThinking: boolean;

  matchStats: MatchStats;
  detailedMetrics: DetailedMetrics;
  whiteStats: TeamStats;
  blackStats: TeamStats;
  boardLayers: LayerData[];

  // Full list of piece stats for Roster component
  pieceTelemetry: PieceStats[];
}