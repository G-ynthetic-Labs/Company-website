// src/features/game/state/gameReducer.ts
import { GameState, PieceType, Position, TurnPhase, Difficulty, GameMode } from '../types';
import { calculateMoves } from '../core/game_logic/moveCalculator';
import { getInitialGameState } from '../core/game_logic/gameStateInitializer';
import { posEquals } from '../core/game_logic/gameConstants';

export type Action =
    | { type: 'SELECT_PIECE'; id: string }
    | { type: 'MOVE_PIECE'; to: Position; isAiMove?: boolean }
    | { type: 'RESET'; mode: GameMode; difficulty: Difficulty }
    | { type: 'SET_AI_THINKING'; isThinking: boolean }
    | { type: 'PROMOTE_PIECE'; newType?: PieceType; restoreId?: string };

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'RESET': {
            console.log(`♻️ [REDUCER] Resetting Game. Mode: ${action.mode}, Diff: ${action.difficulty}`);
            const newState = getInitialGameState();
            return {
                ...newState,
                gameMode: action.mode,
                difficulty: action.difficulty
            };
        }

        case 'SELECT_PIECE': {
            if (state.pendingPromotion) return state;

            // CHECK: Is the player/AI clicking the active Phase 2 piece? (Meaning: Finish Move)
            const isMoveFinished = state.turnPhase?.active && state.turnPhase.pieceId === action.id;

            if (isMoveFinished) {
                return {
                    ...state,
                    turnPhase: null,
                    selectedId: null,
                    validMoves: [],
                    turn: state.turn === 'white' ? 'black' : 'white',
                    moveHistory: [...state.moveHistory, 'Phase End (Stop)']
                };
            }

            const piece = state.pieces.find(p => p.id === action.id);
            if (!piece || piece.color !== state.turn) return state;

            // Calculate moves (with TurnPhase context if applicable, though normally Phase 2 implies selection is locked to active piece)
            return { ...state, selectedId: action.id, validMoves: calculateMoves(piece, state.pieces, null), turnPhase: null };
        }

        case 'MOVE_PIECE': {
            const movingPiece = state.pieces.find(p => p.id === state.selectedId);
            if (!movingPiece) {
                console.warn("⚠️ [REDUCER] Move failed: No piece selected.");
                return state;
            }

            // CHECK: Is the target the same as current position? (Meaning: Finish Move)
            const isMoveFinished = state.turnPhase?.active && posEquals(action.to, movingPiece.position);

            if (isMoveFinished) {
                return {
                    ...state,
                    turnPhase: null,
                    selectedId: null,
                    validMoves: [],
                    turn: state.turn === 'white' ? 'black' : 'white',
                    moveHistory: [...state.moveHistory, 'Phase End (Stop)']
                };
            }

            // Calculate Move Vector
            const dx = action.to.x - movingPiece.position.x;
            const dy = action.to.y - movingPiece.position.y;
            const dz = action.to.z - movingPiece.position.z;
            const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));

            const targetIndex = state.pieces.findIndex(p => posEquals(p.position, action.to));
            let newPieces = [...state.pieces];
            let newCaptured = [...state.capturedPieces];

            // Capture Logic
            if (targetIndex !== -1) {
                newCaptured.push(newPieces[targetIndex]);
                newPieces.splice(targetIndex, 1);

                const movedIndex = newPieces.findIndex(p => p.id === movingPiece.id);
                newPieces[movedIndex] = {
                    ...newPieces[movedIndex],
                    position: action.to,
                    hasMoved: true,
                    lastMoveVector: { x: dx, y: dy, z: dz }
                };

                // --- FIRST BLOOD & MATCH STATS ---
                const updatedMatchStats = { ...state.matchStats };
                updatedMatchStats.totalCaptures = (updatedMatchStats.totalCaptures || 0) + 1;
                if (!updatedMatchStats.firstBloodBy) {
                    updatedMatchStats.firstBloodBy = state.turn;
                    updatedMatchStats.firstBloodTurn = updatedMatchStats.turnCount || 0;
                    console.log(`🩸 FIRST BLOOD by ${state.turn} on turn ${updatedMatchStats.firstBloodTurn}!`);
                }

                return {
                    ...state, pieces: newPieces, capturedPieces: newCaptured,
                    selectedId: null, validMoves: [], turnPhase: null,
                    turn: state.turn === 'white' ? 'black' : 'white',
                    matchStats: updatedMatchStats,
                    moveHistory: [...state.moveHistory, `${movingPiece.type} captures`]
                };
            }

            // Regular Move
            const movedPieceIndex = newPieces.findIndex(p => p.id === movingPiece.id);
            const updatedPiece = {
                ...newPieces[movedPieceIndex],
                position: action.to,
                hasMoved: true,
                lastMoveVector: { x: dx, y: dy, z: dz }
            };
            newPieces[movedPieceIndex] = updatedPiece;

            // Phase Check (Rook/Bishop/FractalKnight)
            let enterPhase2 = false;
            if (!state.turnPhase?.active) {
                if ((movingPiece.type === PieceType.ROOK || movingPiece.type === PieceType.BISHOP) && dist < 4) enterPhase2 = true;
                if (movingPiece.type === PieceType.FRACTAL_KNIGHT) enterPhase2 = true;
            }

            if (enterPhase2) {
                const phaseData: TurnPhase = {
                    active: true,
                    pieceId: movingPiece.id,
                    intermediatePos: action.to,
                    distanceMoved: dist,
                    firstMoveVector: { x: dx, y: dy, z: dz }
                };
                // Recalculate moves for Phase 2 immediate display
                return {
                    ...state,
                    pieces: newPieces,
                    turnPhase: phaseData,
                    selectedId: movingPiece.id,
                    validMoves: calculateMoves(updatedPiece, newPieces, phaseData)
                };
            }

            return {
                ...state, pieces: newPieces, capturedPieces: newCaptured,
                selectedId: null, validMoves: [], turnPhase: null,
                turn: state.turn === 'white' ? 'black' : 'white',
                moveHistory: [...state.moveHistory, `${movingPiece.type} moved`]
            };
        }

        case 'SET_AI_THINKING': {
            return { ...state, isAiThinking: action.isThinking };
        }

        case 'PROMOTE_PIECE': {
            return state;
        }

        default: return state;
    }
};