import { GoogleGenAI, Schema, Type } from "@google/genai";
import { ChessPiece, SillyTavernCard } from '../types';
import { generateGameContext } from './rulesEngine';

const getAI = () => {
  // FIX: Access environment variables via import.meta.env for Vite
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No VITE_GEMINI_API_KEY found in .env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLore = async (piece: ChessPiece): Promise<SillyTavernCard | null> => {
  const ai = getAI();
  if (!ai) return null;

  const gameContext = generateGameContext(piece);

  const prompt = `
    You are an expert Sci-Fi/Fantasy Character Designer for a AAA sentient chess game.
    Generate a "Silly Tavern" style character card for this piece.

    PIECE DATA:
    Type: ${piece.type}
    Faction: ${piece.faction}
    Visuals: ${piece.parts.length} mechanical parts, composed of ${piece.parts.map(p => p.type).join(', ')}.
    
    ${gameContext}

    REQUIREMENTS:
    - Name: Creative, fitting the faction (Gold=Royal/Divine, Silver=Tech/Eldritch).
    - Description: Physical and aura description.
    - Personality: Deep, complex, fitting its Morale and Risk value.
    - First Message: An in-character opening line when the game starts.
    - Scenario: The context of the eternal war between Gold and Silver.
    - System Prompt: Instructions for an LLM to roleplay this specific unit.

    Return JSON matching the schema.
  `;

  // Define Schema for structured output
  const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          personality: { type: Type.STRING },
          first_mes: { type: Type.STRING },
          scenario: { type: Type.STRING },
          mes_example: { type: Type.STRING },
          creator_notes: { type: Type.STRING },
          system_prompt: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["name", "description", "personality", "first_mes", "system_prompt"]
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { 
          responseMimeType: 'application/json',
          responseSchema: responseSchema
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as SillyTavernCard;
    }
    return null;
  } catch (error) {
    console.error("Gemini Lore Generation Error:", error);
    return null;
  }
};

export const chatWithPiece = async (piece: ChessPiece, userMessage: string): Promise<string> => {
  const ai = getAI();
  if (!ai) return "Error: API Key missing.";

  const history = piece.lore.chatHistory.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const gameContext = generateGameContext(piece);

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
        ${piece.lore.card.system_prompt}
        
        CHARACTER CARD DATA:
        Name: ${piece.lore.card.name}
        Personality: ${piece.lore.card.personality}
        Scenario: ${piece.lore.card.scenario}
        
        ${gameContext}
        
        Keep responses concise (under 50 words) and strictly in character.
        `,
      },
      history: history.map(h => ({ role: h.role, parts: h.parts })),
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I cannot speak right now. My connection to the void is severed.";
  }
};