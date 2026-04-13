// src/features/game/core/game_logic/gameStateInitializer.ts
import {
  GameState,
  PieceType,
  PlayerColor,
  PieceColor,
  Faction,
  DetailedMetrics,
  MetricBreakdown,
  Piece,
  Position,
} from '../../types';
import { CUBE_SIZE } from './gameConstants';
import { Pawn, Rook, Bishop, Knight, FractalKnight, Queen, King } from '../Pieces';

export const getInitialGameState = (): GameState => {
  const pieces: Piece[] = [];
  let idCounter = 0;

  // Refactored addPiece to create a plain Piece object (UI definition)
  const addPiece = (
    type: PieceType,
    color: PlayerColor,
    x: number,
    y: number,
    z: number,
    faction: 'gold' | 'silver', // FIX: Use string union type for faction parameter
    generalId?: string
  ) => {
    const id = `${color}-${type}-${idCounter++}`;

    // Construct a Piece object directly to conform to Piece interface
    const piece: Piece = {
      id: id,
      type: type,
      color: color,
      position: { x, y, z },
      hasMoved: false,
      faction: faction, // FIX: Assign string literal to faction property
      generalId: generalId,
      // For Pawns, set the initial lastMoveVector to enable the correct move calculation on turn 1
      lastMoveVector: type === PieceType.PAWN
        ? (color === 'white' ? { x: 0, y: -1, z: 0 } : { x: 0, y: 1, z: 0 })
        : undefined
    };

    pieces.push(piece);
  };

  const MAX = CUBE_SIZE - 1;

  // --- Black setup ---
  const bKingId = `black-${PieceType.KING}-${idCounter}`;
  addPiece(PieceType.KING, 'black', 0, 0, 0, 'gold'); // King is Gold anchor

  const bFractalKnightId = `black-${PieceType.FRACTAL_KNIGHT}-${idCounter}`;
  addPiece(PieceType.FRACTAL_KNIGHT, 'black', 0, 0, 1, 'gold', bKingId); // General Gold

  const bQueenId = `black-${PieceType.QUEEN}-${idCounter}`;
  addPiece(PieceType.QUEEN, 'black', 1, 0, 0, 'silver', bKingId); // General Silver

  // Gold Commanders (Right Flank)
  const bGoldBishopId = `black-${PieceType.BISHOP}-${idCounter}`;
  addPiece(PieceType.BISHOP, 'black', 0, 0, 2, 'gold', bFractalKnightId);
  const bGoldKnightId = `black-${PieceType.KNIGHT}-${idCounter}`;
  addPiece(PieceType.KNIGHT, 'black', 0, 0, 3, 'gold', bFractalKnightId);
  const bGoldRookId = `black-${PieceType.ROOK}-${idCounter}`;
  addPiece(PieceType.ROOK, 'black', 0, 0, 4, 'gold', bFractalKnightId);

  // Silver Commanders (Left Flank)
  const bSilverBishopId = `black-${PieceType.BISHOP}-${idCounter}`;
  addPiece(PieceType.BISHOP, 'black', 2, 0, 0, 'silver', bQueenId);
  const bSilverKnightId = `black-${PieceType.KNIGHT}-${idCounter}`;
  addPiece(PieceType.KNIGHT, 'black', 3, 0, 0, 'silver', bQueenId);
  const bSilverRookId = `black-${PieceType.ROOK}-${idCounter}`;
  addPiece(PieceType.ROOK, 'black', 4, 0, 0, 'silver', bQueenId);

  // Black Pawns (2 per commander)
  const blackPawnConfig = [
    { pos: { x: 1, y: 1, z: 0 }, team: 'gold' as const, cmdId: bGoldBishopId },
    { pos: { x: 3, y: 1, z: 0 }, team: 'gold' as const, cmdId: bGoldBishopId },
    { pos: { x: 5, y: 1, z: 0 }, team: 'gold' as const, cmdId: bGoldKnightId },
    { pos: { x: 0, y: 2, z: 1 }, team: 'gold' as const, cmdId: bGoldKnightId },
    { pos: { x: 2, y: 2, z: 1 }, team: 'gold' as const, cmdId: bGoldRookId },
    { pos: { x: 4, y: 2, z: 1 }, team: 'gold' as const, cmdId: bGoldRookId },

    { pos: { x: 1, y: 3, z: 2 }, team: 'silver' as const, cmdId: bSilverBishopId },
    { pos: { x: 3, y: 3, z: 2 }, team: 'silver' as const, cmdId: bSilverBishopId },
    { pos: { x: 5, y: 3, z: 2 }, team: 'silver' as const, cmdId: bSilverKnightId },
    { pos: { x: 0, y: 4, z: 2 }, team: 'silver' as const, cmdId: bSilverKnightId },
    { pos: { x: 2, y: 4, z: 2 }, team: 'silver' as const, cmdId: bSilverRookId },
    { pos: { x: 4, y: 4, z: 2 }, team: 'silver' as const, cmdId: bSilverRookId },
  ];
  blackPawnConfig.forEach(p => {
    const id = `black-${PieceType.PAWN}-${idCounter++}`;
    pieces.push({
      id,
      type: PieceType.PAWN,
      color: 'black',
      position: p.pos,
      hasMoved: false,
      faction: p.team,
      commanderId: p.cmdId,
      lastMoveVector: { x: 0, y: 1, z: 0 }
    });
  });

  // --- White setup ---
  const wKingId = `white-${PieceType.KING}-${idCounter}`;
  addPiece(PieceType.KING, 'white', MAX, MAX, MAX, 'gold');

  const wFractalKnightId = `white-${PieceType.FRACTAL_KNIGHT}-${idCounter}`;
  addPiece(PieceType.FRACTAL_KNIGHT, 'white', MAX, MAX, MAX - 1, 'gold', wKingId);

  const wQueenId = `white-${PieceType.QUEEN}-${idCounter}`;
  addPiece(PieceType.QUEEN, 'white', MAX - 1, MAX, MAX, 'silver', wKingId);

  // White Commanders
  const wGoldBishopId = `white-${PieceType.BISHOP}-${idCounter}`;
  addPiece(PieceType.BISHOP, 'white', MAX, MAX, MAX - 2, 'gold', wFractalKnightId);
  const wGoldKnightId = `white-${PieceType.KNIGHT}-${idCounter}`;
  addPiece(PieceType.KNIGHT, 'white', MAX, MAX, MAX - 3, 'gold', wFractalKnightId);
  const wGoldRookId = `white-${PieceType.ROOK}-${idCounter}`;
  addPiece(PieceType.ROOK, 'white', MAX, MAX, MAX - 4, 'gold', wFractalKnightId);

  const wSilverBishopId = `white-${PieceType.BISHOP}-${idCounter}`;
  addPiece(PieceType.BISHOP, 'white', MAX - 2, MAX, MAX, 'silver', wQueenId);
  const wSilverKnightId = `white-${PieceType.KNIGHT}-${idCounter}`;
  addPiece(PieceType.KNIGHT, 'white', MAX - 3, MAX, MAX, 'silver', wQueenId);
  const wSilverRookId = `white-${PieceType.ROOK}-${idCounter}`;
  addPiece(PieceType.ROOK, 'white', MAX - 4, MAX, MAX, 'silver', wQueenId);

  const whitePawnConfig = [
    { pos: { x: 6, y: 6, z: 7 }, team: 'gold' as const, cmdId: wGoldBishopId },
    { pos: { x: 4, y: 6, z: 7 }, team: 'gold' as const, cmdId: wGoldBishopId },
    { pos: { x: 2, y: 6, z: 7 }, team: 'gold' as const, cmdId: wGoldKnightId },
    { pos: { x: 7, y: 5, z: 6 }, team: 'gold' as const, cmdId: wGoldKnightId },
    { pos: { x: 5, y: 5, z: 6 }, team: 'gold' as const, cmdId: wGoldRookId },
    { pos: { x: 3, y: 5, z: 6 }, team: 'gold' as const, cmdId: wGoldRookId },

    { pos: { x: 6, y: 4, z: 5 }, team: 'silver' as const, cmdId: wSilverBishopId },
    { pos: { x: 4, y: 4, z: 5 }, team: 'silver' as const, cmdId: wSilverBishopId },
    { pos: { x: 2, y: 4, z: 5 }, team: 'silver' as const, cmdId: wSilverKnightId },
    { pos: { x: 7, y: 3, z: 5 }, team: 'silver' as const, cmdId: wSilverKnightId },
    { pos: { x: 5, y: 3, z: 5 }, team: 'silver' as const, cmdId: wSilverRookId },
    { pos: { x: 3, y: 3, z: 5 }, team: 'silver' as const, cmdId: wSilverRookId },
  ];
  whitePawnConfig.forEach(p => {
    const id = `white-${PieceType.PAWN}-${idCounter++}`;
    pieces.push({
      id,
      type: PieceType.PAWN,
      color: 'white',
      position: p.pos,
      hasMoved: false,
      faction: p.team,
      commanderId: p.cmdId,
      lastMoveVector: { x: 0, y: -1, z: 0 }
    });
  });

  const initialDetailedMetrics: DetailedMetrics = {
    risk: { whiteMaterial: 0, blackMaterial: 0, breakdown: [], delta: 0, status: 0 },
    reward: { whiteControl: 0, blackControl: 0, components: [], delta: 0, status: 0 },
    relation: {
      whiteMorale: 0,
      blackMorale: 0,
      breakdown: [],
      subteams: { white: { gold: 0, silver: 0 }, black: { gold: 0, silver: 0 } },
      delta: 0,
      status: 0,
    },
  };

  return {
    pieces,
    capturedPieces: [],
    selectedId: null,
    validMoves: [],
    turn: 'white',
    moveHistory: [],
    turnPhase: null,
    pendingPromotion: null,
    gameMode: 'HvH',
    difficulty: 'Medium',
    isAiThinking: false,
    pieceTelemetry: [],
    matchStats: {
      turnCount: 0,
      winner: null,
      endReason: null,
      startTime: Date.now(),
      endTime: null,
      firstBloodBy: null,
      firstBloodTurn: null,
      mostValuablePiece: null,
      finalSurvivors: [],
      moraleCrashes: [],
      highestComeback: {},
      totalMoves: 0,
      totalCaptures: 0,
      totalSpecials: 0,
      riskDelta: 0,
      rewardDelta: 0,
      relationDelta: 0,
    },
    detailedMetrics: initialDetailedMetrics,
    whiteStats: {
      name: 'White Alliance',
      color: 'white',
      morale: 50,
      totalKills: 0,
      totalLosses: 0,
      specialsUsed: 0,
      checksMade: 0,
      timesInCheck: 0,
      kingSurvived: true,
      bodyDoubleUsed: false,
      boardControlScore: 0,
      medals: new Set(),
      moraleEvents: [],
    },
    blackStats: {
      name: 'Black Syndicate',
      color: 'black',
      morale: 50,
      totalKills: 0,
      totalLosses: 0,
      specialsUsed: 0,
      checksMade: 0,
      timesInCheck: 0,
      kingSurvived: true,
      bodyDoubleUsed: false,
      boardControlScore: 0,
      medals: new Set(),
      moraleEvents: [],
    },
    boardLayers: [],
  };
};