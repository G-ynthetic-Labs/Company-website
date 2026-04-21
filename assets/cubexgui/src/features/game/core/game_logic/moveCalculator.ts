// game/core/game_logic/moveCalculator.ts
import { Piece, PieceType, Position, TurnPhase, Axis, PlayerColor, PieceColor } from '../../types';
import { ORTHOGONAL, DIAGONAL, TRIAGONAL, posEquals, isValidPos, CUBE_SIZE } from './gameConstants';
import { Pawn, Rook, Bishop, Knight, Queen, King, FractalKnight } from '../Pieces';
import { GamePiece, MoveContext } from '../game_pieces/BasePiece';

export const calculateMoves = (piece: Piece, pieces: Piece[], turnPhase: TurnPhase | null): Position[] => {
  // Determine the position to start move calculation from (either current or intermediate for Phase 2)
  const p = turnPhase && turnPhase.active && turnPhase.intermediatePos ? turnPhase.intermediatePos : piece.position;
  const isPhase2 = turnPhase && turnPhase.active;

  // --- Move Context Helpers ---
  const isOccupied = (pos: Position) => pieces.some(other => posEquals(other.position, pos));
  const isEnemy = (pos: Position) => pieces.some(other => posEquals(other.position, pos) && other.color !== piece.color);
  const isAlly = (pos: Position) => pieces.some(other => posEquals(other.position, pos) && other.color === piece.color);
  const isEmpty = (pos: Position) => !isOccupied(pos);
  const moveContext: MoveContext = { isEmpty, isEnemy, isAlly };

  const pieceColorEnum = piece.color === 'white' ? PieceColor.WHITE : PieceColor.BLACK;

  let PieceClass: any;
  switch (piece.type) {
    case PieceType.PAWN: PieceClass = Pawn; break;
    case PieceType.ROOK: PieceClass = Rook; break;
    case PieceType.BISHOP: PieceClass = Bishop; break;
    case PieceType.KNIGHT: PieceClass = Knight; break;
    case PieceType.FRACTAL_KNIGHT: PieceClass = FractalKnight; break;
    case PieceType.QUEEN: PieceClass = Queen; break;
    case PieceType.KING: PieceClass = King; break;
    default: return [];
  }

  const tempPiece: GamePiece = new PieceClass(
    piece.id,
    pieceColorEnum,
    p.x, p.y, p.z,
    true // [OPTIMIZATION] Simulation Mode
  );

  tempPiece.hasMoved = piece.hasMoved;
  tempPiece.lastMoveVector = piece.lastMoveVector ?? null;

  // INJECT PHASE 2 CONSTRAINTS
  if (isPhase2 && turnPhase) {
    tempPiece.phase = 2;
    tempPiece.maxMoveLimit = 8 - (turnPhase.distanceMoved || 0);
    tempPiece.previousMoveVector = turnPhase.firstMoveVector || null;
  } else {
    tempPiece.phase = 1;
    tempPiece.maxMoveLimit = 8;
    tempPiece.previousMoveVector = null;
  }

  const legalMoves = tempPiece.getPotentialMoves(CUBE_SIZE, moveContext);

  // --- NEW: ALLOW "STOP HERE" (End Turn) ---
  // If in Phase 2, staying in the current spot is a valid "move" to end the phase.
  if (isPhase2) {
    // Check if current spot is safe (should be, unless we are calculating check/mates, but for movement it's valid)
    legalMoves.push(p);
  }

  return legalMoves;
};