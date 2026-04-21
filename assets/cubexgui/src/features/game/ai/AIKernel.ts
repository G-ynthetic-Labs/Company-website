// src/features/game/ai/AIKernel.ts
import { GameState, Piece, PieceType, PlayerColor, Position, Difficulty, TurnPhase, MatchStats } from '../types';
import { KnowledgeGraph } from './KnowledgeGraph';
import { TI } from '../core/TensorConfig';
import { calculateMoves } from '../core/game_logic/moveCalculator';
import { posEquals } from '../core/game_logic/gameConstants';
import { AiPromotionService } from './AiPromotionService';
import { AethosService, PersistentAI } from './AethosService';

const PIECE_VALUES: Record<PieceType, number> = {
    [PieceType.KING]: 1000,
    [PieceType.QUEEN]: 18,
    [PieceType.FRACTAL_KNIGHT]: 14,
    [PieceType.ROOK]: 10,
    [PieceType.BISHOP]: 9,
    [PieceType.KNIGHT]: 8,
    [PieceType.PAWN]: 2  // Bumped from 1 to make pawn captures worthwhile
};

// [HELPER] Robust Move Simulator (Prevents Self-Delete Bug)
const simulateMove = (pieces: Piece[], fromId: string, to: Position): { pieces: Piece[], enterPhase2: boolean, dist: number, dx: number, dy: number, dz: number } => {
    const newPieces = [...pieces];
    const moverIndex = newPieces.findIndex(p => p.id === fromId);
    if (moverIndex === -1) return { pieces, enterPhase2: false, dist: 0, dx: 0, dy: 0, dz: 0 };

    const movingPiece = newPieces[moverIndex];
    const dx = to.x - movingPiece.position.x;
    const dy = to.y - movingPiece.position.y;
    const dz = to.z - movingPiece.position.z;
    const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));

    const targetIndex = newPieces.findIndex(p => posEquals(p.position, to));
    let captureOccurred = false;

    if (targetIndex !== -1 && targetIndex !== moverIndex) {
        newPieces.splice(targetIndex, 1);
        captureOccurred = true;
    }

    const finalMoverIndex = newPieces.findIndex(p => p.id === fromId);
    if (finalMoverIndex !== -1) {
        newPieces[finalMoverIndex] = { ...newPieces[finalMoverIndex], position: to, hasMoved: true };
    }

    // Phase Check (Dog-leg logic)
    let enterPhase2 = false;
    if (!captureOccurred) {
        if ((movingPiece.type === PieceType.ROOK || movingPiece.type === PieceType.BISHOP) && dist < 4) enterPhase2 = true;
        if (movingPiece.type === PieceType.FRACTAL_KNIGHT) enterPhase2 = true;
    }

    return { pieces: newPieces, enterPhase2, dist, dx, dy, dz };
};

// [REMOVED] calculateTotalValidMoves - Too expensive for leaf node evaluation

interface EvalContext {
    matchStats?: MatchStats;
    aiProfile?: PersistentAI;
    firstMoveCapture?: boolean;  // True if this evaluation chain started with a capture
}

const evaluateBoard = (pieces: Piece[], aiBrain: KnowledgeGraph, ctx: EvalContext = {}): number => {
    let score = 0;
    let whiteMaterial = 0; let blackMaterial = 0;

    // Combat attribute scaling (0-1 range, default 0.5 if no profile)
    const bloodlust = ctx.aiProfile ? Math.min(ctx.aiProfile.stats.bloodlust / 20, 1.0) : 0.5;
    const cunning = ctx.aiProfile ? Math.min(ctx.aiProfile.stats.cunning / 20, 1.0) : 0.5;
    const discipline = ctx.aiProfile ? Math.min(ctx.aiProfile.stats.discipline / 20, 1.0) : 0.5;

    // --- PRE-COMPUTE position sets for O(1) lookups ---
    const posKey = (px: number, py: number, pz: number) => (px << 8) | (py << 4) | pz;
    const whitePositions = new Set<number>();
    const blackPositions = new Set<number>();
    const whitePawnKeys = new Set<number>();
    const blackPawnKeys = new Set<number>();

    for (let i = 0; i < pieces.length; i++) {
        const pp = pieces[i];
        const k = posKey(pp.position.x, pp.position.y, pp.position.z);
        if (pp.color === 'white') {
            whitePositions.add(k);
            if (pp.type === PieceType.PAWN) whitePawnKeys.add(k);
        } else {
            blackPositions.add(k);
            if (pp.type === PieceType.PAWN) blackPawnKeys.add(k);
        }
    }

    pieces.forEach(p => {
        const val = PIECE_VALUES[p.type] || 1;
        if (p.color === 'white') whiteMaterial += val; else blackMaterial += val;

        const { x, y, z } = p.position;
        const threat = aiBrain.getTensorValue(x, y, z, TI.DIRECT_THREAT as any);
        const synergy = aiBrain.getTensorValue(x, y, z, TI.SYNERGY_SCORE as any);
        const killZone = aiBrain.getTensorValue(x, y, z, TI.T2_KILL_ZONE as any);
        const trapped = aiBrain.getTensorValue(x, y, z, TI.R7_TRAPPED as any);
        const tensorBonus = (synergy * 0.25) - (threat * 0.3);

        const allySet = p.color === 'white' ? whitePositions : blackPositions;
        let adjacentAllies = 0;
        for (let ddx = -1; ddx <= 1; ddx++) {
            for (let ddy = -1; ddy <= 1; ddy++) {
                for (let ddz = -1; ddz <= 1; ddz++) {
                    if (ddx === 0 && ddy === 0 && ddz === 0) continue;
                    if (allySet.has(posKey(x + ddx, y + ddy, z + ddz))) adjacentAllies++;
                }
            }
        }
        const shieldBonus = adjacentAllies * 0.15 * discipline;

        let pawnBonus = 0;
        if (p.type === PieceType.PAWN) {
            const advancement = p.color === 'white' ? (6 - y) : (y - 1);
            if (advancement > 0) pawnBonus += advancement * 0.5;
            const friendlyPawnKeys = p.color === 'white' ? whitePawnKeys : blackPawnKeys;
            let phalanx = 0;
            if (friendlyPawnKeys.has(posKey(x + 1, y, z))) phalanx++;
            if (friendlyPawnKeys.has(posKey(x - 1, y, z))) phalanx++;
            if (friendlyPawnKeys.has(posKey(x, y, z + 1))) phalanx++;
            if (friendlyPawnKeys.has(posKey(x, y, z - 1))) phalanx++;
            let chain = 0;
            if (friendlyPawnKeys.has(posKey(x + 1, y + 1, z))) chain++;
            if (friendlyPawnKeys.has(posKey(x - 1, y + 1, z))) chain++;
            if (friendlyPawnKeys.has(posKey(x + 1, y - 1, z))) chain++;
            if (friendlyPawnKeys.has(posKey(x - 1, y - 1, z))) chain++;
            pawnBonus += phalanx * 0.4 * discipline;
            pawnBonus += chain * 0.3 * discipline;
        }

        let trapBonus = 0;
        // Cunning bonus: Enemy pieces in our traps are good (+score), our pieces in traps are bad (-score)
        if (p.color === 'white') {
            trapBonus += killZone * 0.4 * cunning;
            trapBonus += trapped * 0.5 * cunning;
        } else {
            trapBonus -= killZone * 0.3;
            trapBonus -= trapped * 0.4;
        }

        const totalPieceBonus = tensorBonus + shieldBonus + pawnBonus + trapBonus;
        if (p.color === 'black') score += totalPieceBonus; else score -= totalPieceBonus;
    });

    // --- FIRST BLOOD BONUS ---
    if (ctx.matchStats && !ctx.matchStats.firstBloodBy && ctx.firstMoveCapture) {
        // Bonus for the side that draws first blood
        const firstBloodBonus = 15 * (1 + bloodlust);
        // If it's a capture this evaluation cycle, we reward it.
        // In this unified scoring, "reward" means adding to score if Black, subtracting if White.
        // Wait, 'ctx.firstMoveCapture' is set if the *current search branch* started with a capture.
        // But evaluateBoard doesn't know WHO made it.
        // Let's assume for now it's the current player.
        // Actually, evaluateBoard is called at depth 0.
        // ctx.firstMoveCapture is true if the VERY FIRST MOVE of this minimax branch was a capture.
        // The first move was made by 'aiColor' in getAIMove.
        // So this bonus is for Black.
        score += firstBloodBonus;
    }

    return score;
};

const getAllMoves = (pieces: Piece[], color: PlayerColor, turnPhase: TurnPhase | null, aiBrain: KnowledgeGraph): { fromId: string, to: Position, score?: number }[] => {
    const allMoves: { fromId: string, to: Position, score?: number }[] = [];

    if (turnPhase && turnPhase.active) {
        const activePiece = pieces.find(p => p.id === turnPhase.pieceId);
        if (activePiece && activePiece.color === color) {
            const moves = calculateMoves(activePiece, pieces, turnPhase);
            moves.forEach(m => allMoves.push({ fromId: activePiece.id, to: m }));
        }
        return allMoves;
    }

    pieces.filter(p => p.color === color).forEach(p => {
        const moves = calculateMoves(p, pieces, null);
        moves.forEach(m => allMoves.push({ fromId: p.id, to: m }));
    });
    return allMoves;
};

const minimax = (pieces: Piece[], depth: number, isMaximizing: boolean, alpha: number, beta: number, aiBrain: KnowledgeGraph, ctx: EvalContext = {}): number => {
    if (depth === 0) return evaluateBoard(pieces, aiBrain, ctx);

    const whiteKing = pieces.find(p => p.type === PieceType.KING && p.color === 'white');
    const blackKing = pieces.find(p => p.type === PieceType.KING && p.color === 'black');
    if (!whiteKing) return 50000;  // Black wins
    if (!blackKing) return -50000; // White wins

    const possibleMoves = getAllMoves(pieces, isMaximizing ? 'black' : 'white', null, aiBrain);

    possibleMoves.sort((a, b) => {
        const destA = pieces.find(p => posEquals(p.position, a.to));
        const destB = pieces.find(p => posEquals(p.position, b.to));
        const valA = destA ? PIECE_VALUES[destA.type] : 0;
        const valB = destB ? PIECE_VALUES[destB.type] : 0;
        // Tensor opportunity lookup
        const oppA = isMaximizing ? aiBrain.getTensorValue(a.to.x, a.to.y, a.to.z, TI.OPPORTUNITY as any) : 0;
        const oppB = isMaximizing ? aiBrain.getTensorValue(b.to.x, b.to.y, b.to.z, TI.OPPORTUNITY as any) : 0;
        return (valB + oppB) - (valA + oppA);
    });

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of possibleMoves) {
            const sim = simulateMove(pieces, move.fromId, move.to);

            // Detect if this move is a capture (for Bait & Hook / First Blood context)
            const isCapture = pieces.length > sim.pieces.length;
            const moveCtx = { ...ctx, firstMoveCapture: ctx.firstMoveCapture || isCapture };

            let evalScore: number;
            if (sim.enterPhase2 && depth > 0) {
                const phaseData: TurnPhase = {
                    active: true, pieceId: move.fromId, intermediatePos: move.to,
                    distanceMoved: sim.dist, firstMoveVector: { x: sim.dx, y: sim.dy, z: sim.dz }
                };
                const phaseMoves = getAllMoves(sim.pieces, 'black', phaseData, aiBrain);
                let maxPhase2 = -Infinity;
                for (const m2 of phaseMoves) {
                    const sim2 = simulateMove(sim.pieces, m2.fromId, m2.to);
                    const val = minimax(sim2.pieces, depth - 1, false, alpha, beta, aiBrain, moveCtx);
                    maxPhase2 = Math.max(maxPhase2, val);
                    alpha = Math.max(alpha, val);
                    if (beta <= alpha) break;
                }
                evalScore = phaseMoves.length > 0 ? maxPhase2 : evaluateBoard(sim.pieces, aiBrain, moveCtx);
            } else {
                evalScore = minimax(sim.pieces, depth - 1, false, alpha, beta, aiBrain, moveCtx);
            }

            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of possibleMoves) {
            const sim = simulateMove(pieces, move.fromId, move.to);

            const isCapture = pieces.length > sim.pieces.length;
            const moveCtx = { ...ctx, firstMoveCapture: ctx.firstMoveCapture || isCapture };

            let evalScore: number;
            if (sim.enterPhase2 && depth > 0) {
                const phaseData: TurnPhase = {
                    active: true, pieceId: move.fromId, intermediatePos: move.to,
                    distanceMoved: sim.dist, firstMoveVector: { x: sim.dx, y: sim.dy, z: sim.dz }
                };
                const phaseMoves = getAllMoves(sim.pieces, 'white', phaseData, aiBrain);
                let minPhase2 = Infinity;
                for (const m2 of phaseMoves) {
                    const sim2 = simulateMove(sim.pieces, m2.fromId, m2.to);
                    const val = minimax(sim2.pieces, depth - 1, true, alpha, beta, aiBrain, moveCtx);
                    minPhase2 = Math.min(minPhase2, val);
                    beta = Math.min(beta, val);
                    if (beta <= alpha) break;
                }
                evalScore = phaseMoves.length > 0 ? minPhase2 : evaluateBoard(sim.pieces, aiBrain, moveCtx);
            } else {
                evalScore = minimax(sim.pieces, depth - 1, true, alpha, beta, aiBrain, moveCtx);
            }

            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
        }
        return minEval;
    }
};

export const getAIMove = async (state: GameState, difficulty: Difficulty, aiBrain: KnowledgeGraph, syncProfile: (d: Difficulty) => void): Promise<{ fromId: string, to: Position } | null> => {
    console.log(`🤖 [AI KERNEL] Started. Difficulty: ${difficulty}`);
    syncProfile(difficulty);
    await aiBrain.processTurn(state, [], 1);

    const pieces = state.pieces;
    const aiColor = state.turn;

    const moves = getAllMoves(pieces, aiColor, state.turnPhase, aiBrain);

    console.log(`📊 [AI KERNEL] Generated ${moves.length} legal moves.`);

    if (moves.length === 0) {
        console.warn("⚠️ [AI KERNEL] No moves available.");
        return null;
    }

    if (difficulty === 'Easy') {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    // Load AI combat profile for tactical evaluation
    const difficultyToProfile: Record<string, string> = { 'Easy': 'opportunist', 'Medium': 'balanced', 'Hard': 'strategist' };
    const profileId = difficultyToProfile[difficulty] || 'balanced';
    const aiProfile = AethosService.getProfile(profileId);

    const evalCtx: EvalContext = {
        matchStats: state.matchStats,
        aiProfile: aiProfile,
        firstMoveCapture: false
    };

    let bestMove = null;
    let bestValue = -Infinity;

    const searchDepth = difficulty === 'Medium' ? 1 : 2;

    // --- MOVE ORDERING: Prioritize captures and tactical moves ---
    moves.sort((a, b) => {
        const destA = pieces.find(p => posEquals(p.position, a.to));
        const destB = pieces.find(p => posEquals(p.position, b.to));
        const captureValA = destA && destA.color !== aiColor ? PIECE_VALUES[destA.type] : 0;
        const captureValB = destB && destB.color !== aiColor ? PIECE_VALUES[destB.type] : 0;

        // Tensor opportunity lookup for tactical scoring
        const oppA = aiBrain.getTensorValue(a.to.x, a.to.y, a.to.z, TI.OPPORTUNITY as any);
        const oppB = aiBrain.getTensorValue(b.to.x, b.to.y, b.to.z, TI.OPPORTUNITY as any);

        return (captureValB + oppB) - (captureValA + oppA);
    });

    // Add small randomness only among non-capture moves to maintain variety
    const captureCount = moves.filter(m => pieces.some(p => posEquals(p.position, m.to) && p.color !== aiColor)).length;
    if (captureCount === 0) {
        // No captures available, shuffle for variety
        moves.sort(() => Math.random() - 0.5);
    }

    for (const move of moves) {
        const sim = simulateMove(pieces, move.fromId, move.to);
        const isCapture = pieces.length > sim.pieces.length;
        const moveCtx = { ...evalCtx, firstMoveCapture: isCapture };

        let boardVal: number;
        if (sim.enterPhase2 && searchDepth > 0) {
            const phaseData: TurnPhase = {
                active: true, pieceId: move.fromId, intermediatePos: move.to,
                distanceMoved: sim.dist, firstMoveVector: { x: sim.dx, y: sim.dy, z: sim.dz }
            };
            const phaseMoves = getAllMoves(sim.pieces, aiColor, phaseData, aiBrain);
            let maxP2 = -Infinity;
            for (const m2 of phaseMoves) {
                const sim2 = simulateMove(sim.pieces, m2.fromId, m2.to);
                maxP2 = Math.max(maxP2, minimax(sim2.pieces, searchDepth - 1, false, -Infinity, Infinity, aiBrain, moveCtx));
            }
            boardVal = phaseMoves.length > 0 ? maxP2 : evaluateBoard(sim.pieces, aiBrain, moveCtx);
        } else {
            boardVal = minimax(sim.pieces, searchDepth - 1, false, -Infinity, Infinity, aiBrain, moveCtx);
        }

        // --- BAIT & HOOK BONUS ---
        // If we sacrifice a low-value piece but the resulting position has high Kill Zone values
        // for the enemy's likely response square, reward the feint
        if (isCapture && aiProfile) {
            const mover = pieces.find(p => p.id === move.fromId);
            if (mover) {
                const moverVal = PIECE_VALUES[mover.type];
                const targetPiece = pieces.find(p => posEquals(p.position, move.to) && p.color !== aiColor);
                const targetVal = targetPiece ? PIECE_VALUES[targetPiece.type] : 0;

                // Check if the destination has high kill zone value (trap set up)
                const killZoneAtDest = aiBrain.getTensorValue(move.to.x, move.to.y, move.to.z, TI.T2_KILL_ZONE as any);
                if (killZoneAtDest > 0.3 && moverVal < targetVal) {
                    // Favorable trade in a kill zone = cunning bonus
                    boardVal += killZoneAtDest * 5 * (aiProfile.stats.cunning / 20);
                }
            }
        }

        if (boardVal > bestValue) {
            bestValue = boardVal;
            bestMove = move;
        }
    }

    console.log(`🏆 [AI KERNEL] Best move selected with score: ${bestValue}`);
    return bestMove;
};

export const getAIPromotionChoice = (state: GameState): { newType?: PieceType, restoreId?: string } => {
    if (!state.pendingPromotion) return { newType: PieceType.QUEEN };
    const { pawnId, to } = state.pendingPromotion;
    const decision = AiPromotionService.decidePromotion(state, pawnId, to);
    return {
        newType: decision.newType,
        restoreId: decision.restoreId
    };
};