// src/features/game/ai/AiPromotionService.ts
import { GameState, Piece, PieceType, PieceColor, PlayerColor } from '../types';
import { GamePiece } from '../core/Pieces'; 
import { EvaluationEngine } from './EvaluationEngine';

export class AiPromotionService {

    /**
     * Determines the best promotion choice: Standard (Queen) or Rescue (Graveyard Unit).
     * Simulates the "Structural Healing" vs "Raw Firepower".
     */
    public static decidePromotion(
        currentState: GameState, 
        pawnId: string, 
        promotionPos: {x:number, y:number, z:number}
    ): { type: 'PROMOTE_PIECE', newType?: PieceType, restoreId?: string } {
        
        const myColor = currentState.turn;
        // Filter graveyard for my pieces
        const graveyard = currentState.capturedPieces.filter(p => p.color === myColor);

        // 1. Baseline: Promote to Queen
        const scoreQueen = this._simulateStateScore(currentState, pawnId, promotionPos, PieceType.QUEEN, null);

        // 2. Evaluate Rescues
        let bestRescueScore = -Infinity;
        let bestRescueId: string | null = null;

        graveyard.forEach(casualty => {
            // Optimization: Only rescue High Value units (Commanders/Generals)
            // Rescuing a pawn is rarely worth it over a Queen.
            if (this._isHighValue(casualty.type)) {
                const score = this._simulateStateScore(currentState, pawnId, promotionPos, null, casualty);
                
                // Logging the thought process for debugging/Vantage Chat
                console.log(`[AI Sim] Rescue ${casualty.type} (${casualty.id}): Score ${score}`);

                if (score > bestRescueScore) {
                    bestRescueScore = score;
                    bestRescueId = casualty.id;
                }
            }
        });

        console.log(`[AI Decision] Queen (${scoreQueen}) vs Rescue (${bestRescueScore})`);

        // 3. Decision
        if (bestRescueId && bestRescueScore > scoreQueen) {
            return { type: 'PROMOTE_PIECE', restoreId: bestRescueId };
        }

        return { type: 'PROMOTE_PIECE', newType: PieceType.QUEEN };
    }

    private static _simulateStateScore(
        baseState: GameState, 
        pawnId: string, 
        pos: {x:number, y:number, z:number},
        newType: PieceType | null,
        restorePiece: Piece | null
    ): number {
        // Create a lightweight map of pieces for EvaluationEngine
        const simPieces = new Map<string, GamePiece>();
        
        // Add existing pieces (excluding the promoting pawn)
        baseState.pieces.forEach(p => {
            if (p.id !== pawnId) {
                simPieces.set(p.id, this._hydratePiece(p));
            }
        });

        // Add the new/restored piece
        if (restorePiece) {
            const restored = this._hydratePiece(restorePiece);
            restored.position = pos;
            simPieces.set(restored.id, restored);
        } else if (newType) {
            // Create generic Queen
            const tempId = `promo-${Date.now()}`;
            const newUnit = this._createGenericPiece(tempId, newType, baseState.turn);
            simPieces.set(tempId, newUnit);
        }

        // Estimate Reward (BC) 
        // Full movement calc is expensive in sim; estimate based on piece count * mobility factor
        const estValidMoves = simPieces.size * 10; 

        // [FIX] Convert PlayerColor string to PieceColor Enum
        const engineColor = this._mapColor(baseState.turn);

        const mpw = EvaluationEngine.calculateMpw(simPieces, engineColor, estValidMoves);
        
        // Weighted Sum: Relation is key for the "Structural Healing" strategy
        return (mpw.risk * 1.0) + (mpw.reward * 0.5) + (mpw.relation * 2.5); 
    }

    // --- Helpers ---

    private static _hydratePiece(p: Piece): GamePiece {
        // Hydrate simplified UI piece back to GamePiece for logic
        // We use a mock implementation that satisfies the GamePiece interface needed by EvalEngine
        return {
            id: p.id,
            type: p.type,
            // [FIX] Map string color to Enum
            color: this._mapColor(p.color),
            position: p.position,
            commanderId: p.commanderId,
            generalId: p.generalId,
            faction: p.faction,
            // Dynamic lookups for stats
            getMaterialValue: () => this._getStaticMaterial(p.type),
            getBaseMorale: () => this._getStaticMorale(p.type)
        } as unknown as GamePiece;
    }

    private static _createGenericPiece(id: string, type: PieceType, colorStr: string): GamePiece {
        return {
            id, 
            type, 
            // [FIX] Map string color to Enum
            color: this._mapColor(colorStr as PlayerColor),
            commanderId: null, 
            generalId: null,
            getMaterialValue: () => this._getStaticMaterial(type),
            getBaseMorale: () => this._getStaticMorale(type)
        } as unknown as GamePiece;
    }

    // [FIX] Helper to bridge UI types and Engine types
    private static _mapColor(c: PlayerColor): PieceColor {
        return c === 'white' ? PieceColor.WHITE : PieceColor.BLACK;
    }

    private static _isHighValue(t: string): boolean {
        return t !== 'Pawn';
    }

    // Static lookup tables to match GamePiece logic without full class instantiation
    private static _getStaticMaterial(t: PieceType): number {
        const values: any = { King: 1000, Queen: 18, FractalKnight: 14, Rook: 10, Bishop: 9, Knight: 8, Pawn: 1 };
        return values[t] || 1;
    }
    
    private static _getStaticMorale(t: PieceType): number {
        const values: any = { King: 21, Queen: 10, FractalKnight: 10, Rook: 3, Bishop: 3, Knight: 3, Pawn: 1 };
        return values[t] || 1;
    }
}