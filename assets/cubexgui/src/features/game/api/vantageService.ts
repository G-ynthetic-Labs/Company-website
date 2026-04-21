// game/api/vantageService.ts
import { GameState, Piece, Position } from '../types';
import { ChessPiece } from '../../editor/types'; 
import { HyperBoard } from '../core/HyperBoard'; 

// --- Interfaces for Engine Data Access ---
interface HyperBoardInterface {
    getTensorSnapshot: () => Float32Array;
    getPieceTelemetry: (id: string) => { history: Position[] };
}

// --- LLM PAYLOAD STRUCTURE ---
export interface VantageContext {
    pieceId: string;
    pieceCard: ChessPiece;
    vantagePoint: Position;
    localEntities: Piece[]; 
    recentMoves: Position[]; 
    localTensorDescription: string;
    fullTensorSnapshot: Float32Array; 
}

// --- HELPERS (Real Implementations or Placeholders) ---

/** Creates a minimal card structure required by chatWithPiece. Real card data would come from an external database. */
const createPieceCardStub = (id: string, type: string, relation: number): ChessPiece => {
    return {
        id,
        type: type as any,
        faction: 'Gold' as any,
        parts: [],
        gameStats: { risk: 0, reward: 0, relation: relation, rrrState: { offense: 0, defense: 0, strategy: 0 } },
        lore: {
            card: { 
                name: type, 
                description: `The unit of type ${type}.`, 
                personality: 'Silent and analytical.', 
                first_mes: 'Analyzing environment.', 
                system_prompt: 'Act as a silent tactical unit.',
                scenario: 'In deployment.',
                mes_example: '',
                creator_notes: '',
                tags: []
            },
            chatHistory: [] 
        },
        animation: { idle: 'hover' as any, speed: 1 }
    };
}

/** Filters the global piece list to find neighbors within a local K-LOS radius (3 squares). */
const getLocalEntities = (pieces: Piece[], currentPiece: Piece): Piece[] => {
    const K_LOS = 3; 
    const { x: px, y: py, z: pz } = currentPiece.position;
    
    return pieces.filter((p: Piece) => { 
        if (p.id === currentPiece.id) return false;
        const { x, y, z } = p.position;
        return (
            Math.abs(x - px) <= K_LOS && 
            Math.abs(y - py) <= K_LOS && 
            Math.abs(z - pz) <= K_LOS
        );
    });
};

/**
 * Assembles the full, scoped context payload for the LLM.
 */
export const getVantageContext = (gameState: GameState, hyperBoard: HyperBoardInterface, selectedId: string): VantageContext | null => {
    const selectedPiece = gameState.pieces.find((p: Piece) => p.id === selectedId); 
    if (!selectedPiece) return null;

    // Retrieve full PieceStats from telemetry for morale/stats
    const pieceStats = gameState.pieceTelemetry.find(p => p.id === selectedId);
    
    // Use the piece's morale from the game state/telemetry for the card stub
    const pieceMorale = pieceStats?.morale || 50; 
    
    // FIX: Use the stub creator instead of the in-place mock
    const pieceCard = createPieceCardStub(selectedId, selectedPiece.type, pieceMorale); 
    
    const localEntities = getLocalEntities(gameState.pieces, selectedPiece); 
    
    const fullTensorSnapshot = hyperBoard.getTensorSnapshot(); 
    const pieceTelemetry = hyperBoard.getPieceTelemetry(selectedId);
    
    const localEnemies = localEntities.filter((p: Piece) => p.color !== selectedPiece.color); 
    const localAllies = localEntities.filter((p: Piece) => p.color === selectedPiece.color); 
    const localTensorDescription = `Local vicinity scan at (${selectedPiece.position.x}, ${selectedPiece.position.y}, ${selectedPiece.position.z}): ${localEnemies.length} confirmed enemy contacts and ${localAllies.length} allied support units nearby. Current Morale: ${pieceCard.gameStats.relation}.`;

    return {
        pieceId: selectedId,
        pieceCard,
        vantagePoint: selectedPiece.position,
        localEntities,
        recentMoves: pieceTelemetry.history.slice(-3),
        localTensorDescription,
        fullTensorSnapshot,
    };
};