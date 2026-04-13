// game/hooks/useCubexEngine.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { GamePiece } from '../core/Pieces';
import { HyperBoard } from '../core/HyperBoard';
import { Vector3, PieceType, PieceColor, Faction, GameMode, Difficulty } from '../types';
import { GameState, Piece, PlayerColor, Position } from '../types';
import { getCoordinateNotation } from '../ai/TelemetryUtils';

/**
 * ADAPTER: Converts Internal Engine Piece -> UI Piece
 */
const adaptPieceToUI = (gp: GamePiece): Piece => {
  // Map internal enum strings to UI types
  // FIX: Use Enum values instead of string literals to satisfy TypeScript
  const typeMap: Record<string, PieceType> = {
    [PieceType.PAWN]: PieceType.PAWN,
    [PieceType.ROOK]: PieceType.ROOK,
    [PieceType.KNIGHT]: PieceType.KNIGHT,
    [PieceType.BISHOP]: PieceType.BISHOP,
    [PieceType.QUEEN]: PieceType.QUEEN,
    [PieceType.KING]: PieceType.KING,
    [PieceType.FRACTAL_KNIGHT]: PieceType.FRACTAL_KNIGHT
  };

  // Convert Engine Faction Enum to UI String Literal
  let uiFaction: 'gold' | 'silver' | undefined = undefined;
  if (gp.faction === Faction.GOLD) uiFaction = 'gold';
  else if (gp.faction === Faction.SILVER) uiFaction = 'silver';

  return {
    id: gp.id,
    type: typeMap[gp.type] || PieceType.PAWN,
    color: gp.color === PieceColor.WHITE ? 'white' : 'black',
    position: { x: gp.position.x, y: gp.position.y, z: gp.position.z },
    hasMoved: gp.hasMoved,
    faction: uiFaction
  };
};

export const useCubexEngine = (boardSize: number = 8) => {
  // The Source of Truth
  const boardRef = useRef<HyperBoard | null>(null);

  // React State for UI
  // FIX: Initialize all required properties of GameState, including Dashboard metrics
  const [uiState, setUiState] = useState<GameState>({
    pieces: [],
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

    // FIX: Fully initialized MatchStats (TS2740)
    matchStats: {
      turnCount: 0,
      winner: null,
      endReason: null, // ADDED
      startTime: Date.now(), // ADDED
      endTime: null, // ADDED
      firstBloodBy: null, // ADDED
      firstBloodTurn: null, // ADDED
      mostValuablePiece: null, // ADDED
      finalSurvivors: [], // ADDED
      moraleCrashes: [], // ADDED
      highestComeback: {}, // ADDED
      totalMoves: 0,
      totalCaptures: 0,
      totalSpecials: 0, // ADDED
      riskDelta: 0,
      rewardDelta: 0,
      relationDelta: 0
    },
    detailedMetrics: {
      risk: { whiteMaterial: 0, blackMaterial: 0, breakdown: [], delta: 0, status: 0 },
      reward: { whiteControl: 0, blackControl: 0, components: [], delta: 0, status: 0 },
      relation: { whiteMorale: 0, blackMorale: 0, breakdown: [], subteams: { white: { gold: 0, silver: 0 }, black: { gold: 0, silver: 0 } }, delta: 0, status: 0 }
    },
    // FIX: Fully initialized TeamStats (TS2739)
    whiteStats: {
      name: "White Alliance",
      color: 'white',
      morale: 50,
      totalKills: 0,
      totalLosses: 0,
      checksMade: 0,
      timesInCheck: 0,
      boardControlScore: 0,
      kingSurvived: true,
      specialsUsed: 0, // ADDED
      bodyDoubleUsed: false, // ADDED
      medals: new Set(), // ADDED
      moraleEvents: [], // ADDED
    },
    // FIX: Fully initialized TeamStats (TS2739)
    blackStats: {
      name: "Black Syndicate",
      color: 'black',
      morale: 50,
      totalKills: 0,
      totalLosses: 0,
      checksMade: 0,
      timesInCheck: 0,
      boardControlScore: 0,
      kingSurvived: true,
      specialsUsed: 0, // ADDED
      bodyDoubleUsed: false, // ADDED
      medals: new Set(), // ADDED
      moraleEvents: [], // ADDED
    },
    boardLayers: [],

    // FIX: Added missing 'pieceTelemetry' property
    pieceTelemetry: [],
  });

  const [metrics, setMetrics] = useState({
    whiteMorale: 0,
    whiteControl: 0,
    blackMorale: 0,
    blackControl: 0
  });

  // Sync Engine Data -> UI State
  const syncState = useCallback(() => {
    if (!boardRef.current) return;

    const enginePieces = Array.from(boardRef.current.pieces.values());
    const uiPieces = enginePieces.map(adaptPieceToUI);
    const engineCaptured = Array.from(boardRef.current.capturedPieces.values());

    // FIX: Grab everything (MatchStats, TeamStats, PieceTelemetry)
    const telemetry = boardRef.current.getTelemetryPayload();

    setUiState(prev => ({
      ...prev,
      pieces: uiPieces,
      capturedPieces: engineCaptured.map(adaptPieceToUI),
      whiteStats: telemetry.whiteStats,
      blackStats: telemetry.blackStats,
      matchStats: telemetry.matchStats,
      pieceTelemetry: telemetry.pieceTelemetry,
      // Logic for game over, etc could go here
    }));
  }, []);

  // Initialize Engine
  useEffect(() => {
    boardRef.current = new HyperBoard(boardSize);
    syncState();
  }, [boardSize, syncState]);

  const selectPiece = useCallback((id: string) => {
    if (!boardRef.current) return;

    const piece = boardRef.current.pieces.get(id);
    if (!piece) return;

    // Turn Guard
    if ((piece.color === PieceColor.WHITE ? 'white' : 'black') !== uiState.turn) return;

    const validVectors = boardRef.current.getValidMoves(id);

    setUiState(prev => ({
      ...prev,
      selectedId: id,
      validMoves: validVectors.map(v => ({ x: v.x, y: v.y, z: v.z }))
    }));
  }, [uiState.turn]);

  const movePiece = useCallback((target: Position) => {
    if (!boardRef.current || !uiState.selectedId) return;

    const mover = boardRef.current.pieces.get(uiState.selectedId);
    if (!mover) return;

    const from = { ...mover.position };
    const targetPiece = boardRef.current.pieces.get(`${target.x},${target.y},${target.z}`); // Note: ID query might be pos-based in engine?
    // Actually piece query by position is better
    const captured = Array.from(boardRef.current.pieces.values()).find(p => p.position.x === target.x && p.position.y === target.y && p.position.z === target.z);

    // Execute Move in Core
    boardRef.current.executeMove(uiState.selectedId, target, uiState.matchStats.turnCount + 1);

    // Generate Notation
    const notation = getCoordinateNotation(
      mover.type,
      mover.color === PieceColor.WHITE ? 'white' : 'black',
      from,
      target,
      !!captured
    );

    // Update Turn & History
    setUiState(prev => ({
      ...prev,
      selectedId: null,
      validMoves: [],
      turn: prev.turn === 'white' ? 'black' : 'white',
      moveHistory: [...prev.moveHistory, notation]
    }));

    syncState();
  }, [uiState.selectedId, uiState.matchStats.turnCount, syncState]);

  const resetGame = useCallback((mode: GameMode, diff: Difficulty) => {
    boardRef.current = new HyperBoard(boardSize);
    setUiState(prev => ({
      ...prev,
      gameMode: mode,
      difficulty: diff,
      moveHistory: [],
    }));
    syncState();
  }, [boardSize, syncState]);

  const setAiThinking = useCallback((isThinking: boolean) => {
    setUiState(prev => ({ ...prev, isAiThinking: isThinking }));
  }, []);

  return {
    gameState: uiState,
    selectPiece,
    movePiece,
    resetGame,
    setAiThinking,
    engine: boardRef.current
  };
};