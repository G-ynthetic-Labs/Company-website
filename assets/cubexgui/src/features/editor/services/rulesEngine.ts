
import { PieceType, GameLogicStats, Faction, ChessPiece } from '../types';
import { RISK_VALUES, MORALE_VALUES } from '../constants';

/**
 * Calculates the Risk, Reward, and Relation values for a piece.
 * In a real game loop, Reward (Board Control) and some Relation stats would be dynamic.
 * Here we estimate "Potential" values for the Editor context.
 */
export const calculatePieceStats = (type: PieceType, faction: Faction): GameLogicStats => {
  const risk = RISK_VALUES[type] || 1;
  const relation = MORALE_VALUES[type] || 1;
  
  // Estimate Board Control (Reward) Potential based on piece mobility type (mock values)
  let reward = 5;
  switch (type) {
    case PieceType.QUEEN: reward = 27; break; // High mobility
    case PieceType.ROOK: reward = 14; break;
    case PieceType.BISHOP: reward = 13; break;
    case PieceType.KNIGHT: reward = 8; break; // Jumping ability
    case PieceType.PAWN: reward = 2; break;
    case PieceType.KING: reward = 4; break;
    case PieceType.FRACTAL_KNIGHT: reward = 16; break;
  }

  return {
    risk,
    reward,
    relation,
    rrrState: {
      offense: 0, // Default stance
      defense: 0,
      strategy: 0
    }
  };
};

/**
 * Generates the technical context string for the LLM to understand the piece's gameplay role.
 */
export const generateGameContext = (piece: ChessPiece): string => {
  const { risk, reward, relation } = piece.gameStats;
  
  let roleDescription = "";
  if (piece.type === PieceType.KING) roleDescription = "The Linchpin. Loss condition. Dual-Faction alignment.";
  else if (piece.type === PieceType.QUEEN) roleDescription = "High Value Target. Silver General equivalent.";
  else if (piece.type === PieceType.FRACTAL_KNIGHT) roleDescription = "Chaotic Element. Gold General equivalent.";
  else if (piece.gameStats.relation >= 3) roleDescription = "Rank Commander. Affects subordinate morale.";
  else roleDescription = "Foot soldier. Mercenary potential if commander falls.";

  return `
    GAMEPLAY DATA (DO NOT BREAK CHARACTER, BUT KNOW THIS):
    - Risk Value (Material): ${risk} (Higher = Higher Priority Target)
    - Reward Value (Board Control Potential): ${reward}
    - Relation Value (Morale): ${relation}
    - Role: ${roleDescription}
    - Faction: ${piece.faction}
    
    TENSOR FIELD STANCE:
    The AI currently perceives this piece with Offense: 0, Defense: 0, Strategy: 0.
    It is waiting for game start to populate the Tensor Field Base[v1-v4].
  `;
};
