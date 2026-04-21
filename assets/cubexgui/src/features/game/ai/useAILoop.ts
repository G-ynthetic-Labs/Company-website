// src/features/game/ai/useAILoop.ts
import { useEffect } from 'react';
import { GameState, Difficulty } from '../types';
import { getAiMoveWithContext } from '../core/game_logic/gameLogic';
import { Action } from '../state/gameReducer';

export const useAILoop = (state: GameState, dispatch: React.Dispatch<Action>) => {
    useEffect(() => {
        // 1. SAFETY: Prevent multiple triggers if AI is already thinking
        if (state.isAiThinking) return;

        const isAiTurn = state.gameMode === 'HvAI' && state.turn === 'black';
        const isSpectatorMode = state.gameMode === 'AIvAI';

        if ((isAiTurn || isSpectatorMode) && !state.pendingPromotion) {
            console.log(`⚡ [AI LOOP] ${state.turn.toUpperCase()} Thinking...`);

            dispatch({ type: 'SET_AI_THINKING', isThinking: true });

            // Run in timeout to allow UI render update
            setTimeout(async () => {
                console.log("🧠 [AI LOOP] Requesting best move from AI Kernel...");
                const move = await getAiMoveWithContext(state, state.difficulty);

                if (move) {
                    console.log(`🎯 [AI LOOP] Move Received: ${move.fromId} -> [${move.to.x}, ${move.to.y}, ${move.to.z}]`);

                    // 2. PHASE 2 FIX: 
                    // If we are in Phase 2, the piece is ALREADY selected. 
                    // Selecting it again triggers the "End Phase" shortcut in the reducer.
                    // We must skip selection if turnPhase is active.
                    const isPhase2 = state.turnPhase?.active;

                    if (!isPhase2) {
                        dispatch({ type: 'SELECT_PIECE', id: move.fromId });
                    }

                    setTimeout(() => {
                        console.log("🚀 [AI LOOP] Dispatching Execute Move...");
                        dispatch({ type: 'MOVE_PIECE', to: move.to, isAiMove: true });
                        dispatch({ type: 'SET_AI_THINKING', isThinking: false });
                    }, 300); // Visual delay
                } else {
                    console.warn("⚠️ [AI LOOP] No valid moves returned from Kernel!");
                    // Checkmate/Stalemate logic would trigger here
                    dispatch({ type: 'SET_AI_THINKING', isThinking: false });
                }
            }, 500); // Thinking delay
        }
    }, [state.turn, state.gameMode, state.pendingPromotion, state.turnPhase, state.isAiThinking, state.difficulty, dispatch]);
};