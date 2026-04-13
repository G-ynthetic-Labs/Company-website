// src/features/game/hooks/useVantageChat.ts
import { useState, useCallback, useMemo } from 'react';
// FIXED: Corrected path for local service import
import { getVantageContext } from '../api/vantageService'; 
import { GameState, Position, PlayerColor } from '../types';
import { chatWithPiece } from '../../editor/services/geminiService'; 

interface Message {
    role: 'piece' | 'player';
    content: string;
}

// Mock HyperBoard interface matching the mock in vantageService.ts
interface HyperBoardMock {
    getTensorSnapshot: () => Float32Array;
    getPieceTelemetry: (id: string) => { history: Position[] };
}

export const useVantageChat = (gameState: GameState, hyperBoard: HyperBoardMock | null) => {
    const selectedId = gameState.selectedId; 
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Get active piece data
    const activePiece = useMemo(() => 
        // FIXED: Added Piece type annotation
        gameState.pieces.find(p => p.id === selectedId), 
        [gameState.pieces, selectedId]
    );

    // Initialize/Reset chat session when piece selection changes
    useMemo(() => {
        if (activePiece && !messages[activePiece.id]) {
            const initialMessage: Message = {
                role: 'piece',
                content: `(Unit ${activePiece.type}) reports: Standing by, Commander. Awaiting orders.`
            };
            setMessages(prev => ({ 
                ...prev, 
                [activePiece.id]: [initialMessage] 
            }));
        }
        if (!selectedId) setIsLoading(false); 
    }, [activePiece, messages, selectedId]);

    const sendMessage = useCallback(async (text: string) => {
        if (!activePiece || !hyperBoard || isLoading) return;
        
        const pieceId = activePiece.id;
        const currentMessages = messages[pieceId] || [];

        // 1. Optimistic UI Update (Player message)
        const playerMessage: Message = { role: 'player', content: text };
        setMessages(prev => ({ 
            ...prev, 
            [pieceId]: [...currentMessages, playerMessage] 
        }));
        setIsLoading(true);

        try {
            // 2. Assemble Scoped Context
            const vantageContext = getVantageContext(gameState, hyperBoard, pieceId);

            if (!vantageContext) {
                 throw new Error("Could not assemble vantage context.");
            }
            
            // 3. Construct Scoped LLM Prompt (The same as previous turn)
            const systemInstruction = `
                You are roleplaying as ${vantageContext.pieceCard.lore.card.name}, a ${activePiece.type} unit. 
                Your sole objective is to provide **tactical counsel** to the Commander (the user) based ONLY on your limited, local vantage point.
                
                **LOCAL VANTAGE DATA (CRITICAL CONSTRAINT - USE ONLY THIS):**
                - **Location:** Pos (${vantageContext.vantagePoint.x}, ${vantageContext.vantagePoint.y}, ${vantageContext.vantagePoint.z}).
                - **Morale/Personality:** Your Morale is ${vantageContext.pieceCard.gameStats.relation}. Your personality is: ${vantageContext.pieceCard.lore.card.personality}.
                - **Local Assessment:** ${vantageContext.localTensorDescription}
                - **Recent Movement:** Last known positions were: ${vantageContext.recentMoves.map(p => `(${p.x},${p.y},${p.z})`).join(', ')}.

                **Do NOT break character or reference global concepts** (e.g., total material counts, full board control scores, or future turns beyond local threat). 
                Keep your response concise (under 75 words) and focus on immediate local dangers or opportunities.
            `;
            
            // 4. Prepare Card Data for API Call
            const pieceCardWithVantageInstruction = {
                ...vantageContext.pieceCard,
                lore: {
                    ...vantageContext.pieceCard.lore,
                    // FIXED: Map custom chat roles ('player'/'piece') to LLM-required roles ('user'/'model')
                    chatHistory: currentMessages 
                        .map(m => ({ 
                            role: m.role === 'player' ? 'user' : 'model', 
                            text: m.content 
                        })) as { role: 'user' | 'model'; text: string }[],
                    card: {
                        ...vantageContext.pieceCard.lore.card,
                        system_prompt: systemInstruction 
                    }
                }
            };
            
            // 5. Call LLM Service 
            const llmResponse = await chatWithPiece(pieceCardWithVantageInstruction, text);

            // 6. Update UI with Piece Response
            const pieceResponse: Message = { role: 'piece', content: llmResponse };
            setMessages(prev => ({ 
                ...prev, 
                [pieceId]: [...prev[pieceId], pieceResponse] 
            }));

        } catch (error) {
            console.error("Vantage chat failed:", error);
            const errorResponse: Message = { role: 'piece', content: "My comms array is scrambled. I cannot form a coherent assessment, Commander." };
            setMessages(prev => ({ 
                ...prev, 
                [pieceId]: [...currentMessages, playerMessage, errorResponse]
            }));
        } finally {
            setIsLoading(false);
        }
    }, [activePiece, messages, gameState, hyperBoard, isLoading]);

    return {
        messages: activePiece ? messages[activePiece.id] || [] : [],
        sendMessage,
        isLoading,
        activePiece,
    };
};