// src/features/game/core/gameLogic.ts
// The Core Game Logic Interface

import { GameState, Piece, Position, TurnPhase, Axis, Difficulty, PieceType } from '../../types';

// --- Imports from New Modules ---
import { CUBE_SIZE, posEquals, isValidPos, ORTHOGONAL, DIAGONAL, TRIAGONAL } from './gameConstants';
import { getInitialGameState } from './gameStateInitializer';
import { calculateMoves } from './moveCalculator';
import { getAIMove, getAIPromotionChoice } from '../.././ai/AIKernel';

// --- AI Engine Setup (Retained Here for Global State Management) ---
import { KnowledgeGraph } from '../.././ai/KnowledgeGraph';
import { ProfileManager } from '../.././ai/ProfileManager';
import { TI } from '../TensorConfig';

// --- GLOBAL AI INSTANCE ---
// We keep this outside the React cycle to persist memory/learning across renders
export const AI_BRAIN = new KnowledgeGraph();
export const AI_PROFILER = new ProfileManager(AI_BRAIN);

let lastLoadedDifficulty: Difficulty | null = null;

// Helper to sync difficulty to profile
const syncDifficultyProfile = (diff: Difficulty) => {
    if (diff === lastLoadedDifficulty) return;

    console.log(`⚡ [GAME LOGIC] Switching AI Profile to match difficulty: ${diff}`);

    // Load specific personalities based on difficulty settings
    if (diff === 'Easy') {
        AI_PROFILER.loadProfile('opportunist'); // Reactive, makes mistakes
    } else if (diff === 'Medium') {
        AI_PROFILER.loadProfile('balanced'); // Standard play
    } else if (diff === 'Hard') {
        AI_PROFILER.loadProfile('strategist'); // Deep positional play
    }

    lastLoadedDifficulty = diff;
};

// --- Exported Functions (Re-exported from Modules) ---

// Helpers & Constants (Re-exporting for external consumers of gameLogic.ts)
export { CUBE_SIZE, posEquals, isValidPos, ORTHOGONAL, DIAGONAL, TRIAGONAL };

// Game State Initializer
export { getInitialGameState };

// Movement Logic
export { calculateMoves };

// AI Logic (Adapting export to use the global AI instances)
export const getAiMoveWithContext = async (state: GameState, difficulty: Difficulty): Promise<{ fromId: string, to: Position } | null> => {
    console.log(`🔌 [GAME LOGIC] Handing off to AI Kernel...`);
    return await getAIMove(state, difficulty, AI_BRAIN, syncDifficultyProfile);
};
export { getAIPromotionChoice };