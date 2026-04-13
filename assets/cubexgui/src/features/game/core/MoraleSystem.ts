// cubexgui/src/features/game/core/MoraleSystem.ts
import { PieceColor, MpwEvaluation, StanceLabel, Position } from '../types';
import type { GamePiece } from './Pieces';

export interface TeamMorale {
  color: PieceColor;
  totalConfidence: number; // AI heuristic (Risk/Reward/Relation balance)
  narrativeMorale: number; // Narrative summary (2x scale)
  momentum: number;
  boardControl: number;
  threatPressure: number;
  posture: StanceLabel;
}

type PieceMap = Map<string, GamePiece>;

/**
 * MoraleEngine
 * - updateHierarchy: recompute commander/subordinate relationships and apply mercenary masks.
 * - computePieceSupportSize: bottom-up counting of active subordinates.
 */
export class MoraleEngine {
  public static getInitialMorale(color: PieceColor): TeamMorale {
    return {
      color,
      totalConfidence: 41, // Max AI Morale (King 21 + 2 Generals 10)
      narrativeMorale: 82,
      boardControl: 0,
      threatPressure: 0,
      momentum: 0,
      posture: 'Balanced'
    };
  }

  /**
   * Run a full Hierarchy Refresh:
   * - Keep captured pieces in graveyard; only active pieces are in activePieces.
   * - For every active subordinate, set isMercenary = false if its commander/general is active, else true.
   * - Returns a mapping pieceId -> moraleCount (1 + number of active subordinates) for use by higher-level aggregation.
   *
   * @param activePieces Map<string, GamePiece>  (active pieces on board)
   * @param graveyard Map<string, GamePiece>     (capturedPieces)
   */
  public static updateHierarchy(activePieces: PieceMap, graveyard: PieceMap) {
    // Build a lookup for active IDs
    const activeIds = new Set(Array.from(activePieces.keys()));

    // Build children lists for each commander/general
    const children = new Map<string, string[]>(); // ownerId -> [subordinateId,...]
    activePieces.forEach(p => {
      // commanderId and generalId may be null
      if (p.commanderId) {
        children.set(p.commanderId, [...(children.get(p.commanderId) || []), p.id]);
      }
      if (p.generalId) {
        children.set(p.generalId, [...(children.get(p.generalId) || []), p.id]);
      }
    });

    // Apply mercenary masks: any subordinate whose commander/general isn't active becomes mercenary
    activePieces.forEach(p => {
      const commanderPresent = !!(p.commanderId && activeIds.has(p.commanderId));
      const generalPresent = !!(p.generalId && activeIds.has(p.generalId));
      // If either leader is present, consider it 'masked off' (not mercenary). Otherwise mercenary.
      const shouldBeMerc = !(commanderPresent || generalPresent);
      p.isMercenary = shouldBeMerc;
      // If mercenary, you may also zero out faction bonuses by leaving p.faction but disallowing use.
    });

    // Bottom-up calculation: compute support counts for each leader.
    // We'll compute recursive sizes using memoization to avoid cycles.
    const memo = new Map<string, number>();
    const getSupportSize = (id: string): number => {
      if (memo.has(id)) return memo.get(id)!;
      const kids = children.get(id) || [];
      let sum = 0;
      for (const kidId of kids) {
        // only active subordinates count
        if (activePieces.has(kidId)) {
          sum += 1; // subordinate itself
          // If the subordinate also has subordinates (e.g. commander with pawn children),
          // include those recursively
          sum += getSupportSize(kidId);
        }
      }
      memo.set(id, sum);
      return sum;
    };

    // compute and return a map of moraleWeight per piece
    const moraleWeights = new Map<string, number>();
    activePieces.forEach(p => {
      // BASE MORALE SUMMATION RULES:
      let baseMorale = 0;

      const pAny = p as any;
      const isPawn = p.type.toLowerCase().includes('pawn');
      const isCommander = p.type.toLowerCase().includes('rook') || p.type.toLowerCase().includes('bishop') || p.type.toLowerCase().includes('knight');
      const isGeneral = p.type.toLowerCase().includes('queen') || p.type.toLowerCase().includes('fractal');
      const isKing = p.type.toLowerCase().includes('king') && !isGeneral;

      if (isPawn) {
        baseMorale = 1;
      } else if (isCommander) {
        // 1 + active subordinate pawns
        const pawns = (children.get(p.id) || []).filter(cid => activePieces.get(cid)?.type.toLowerCase().includes('pawn'));
        baseMorale = 1 + pawns.length;
      } else if (isGeneral) {
        // 1 + active commanders + active subordinate pawns
        const support = getSupportSize(p.id);
        baseMorale = 1 + support;
      } else if (isKing) {
        baseMorale = 21;
      }

      moraleWeights.set(p.id, Math.max(0, baseMorale));
    });

    return moraleWeights;
  }

  /**
   * Map the output of evaluation engine into TeamMorale
   */
  public static mapToTeamMorale(color: PieceColor, evalData: MpwEvaluation, posture: StanceLabel): TeamMorale {
    return {
      color,
      totalConfidence: evalData.relation,
      narrativeMorale: evalData.relation * 2, // 2x Scale for Narrative
      boardControl: evalData.reward,
      threatPressure: evalData.risk,
      momentum: 0,
      posture
    };
  }
}
