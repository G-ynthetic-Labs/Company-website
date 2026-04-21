// src/features/game/ai/experimental/SynthesisRules.ts
import { DomainTag, SynergyGroup, SynthesisRule, SynthesisRuleType } from './DomainTypes';
import { TI } from '../../core/TensorConfig';

// --- THE CROSS-DOMAIN SYNTHESIS TABLE ---
export const SYNTHESIS_RULES: SynthesisRule[] = [
    {
        id: 'tactical_positioning',
        domains: ['Tactics', 'PositionalPlay'],
        type: SynthesisRuleType.ADDITIVE,
        requiredPoints: 3,
        description: 'AI begins detecting multi-turn setups automatically.',
        targetIndices: [TI.SYNERGY_SCORE],
        bonusMultiplier: 0.15 // +15% Synergy awareness
    },
    {
        id: 'lethal_space',
        domains: ['Tactics', 'SpaceControl'],
        type: SynthesisRuleType.MULTIPLICATIVE,
        requiredPoints: 2,
        description: 'Fast play becomes more dangerous when AI has room.',
        targetIndices: [TI.THREAT_SCORE, TI.OPPORTUNITY],
        bonusMultiplier: 0.10
    },
    {
        id: 'structural_foresight',
        domains: ['Structure', 'Prediction'],
        type: SynthesisRuleType.STRUCTURAL,
        requiredPoints: 4,
        description: 'AI understands long-term structural weaknesses.',
        targetIndices: [TI.STRUCTURAL_STAB],
        bonusFlat: 0.2 // Flat boost to stability baseline
    },
    {
        id: 'future_sight',
        domains: ['PatternRecognition', 'Prediction'],
        type: SynthesisRuleType.PREDICTIVE,
        requiredPoints: 4,
        description: 'AI foresees tactical motifs it has not explicitly seen.',
        targetIndices: [TI.WIN_CORRELATION, TI.LOSS_CORRELATION],
        bonusMultiplier: 0.25
    },
    {
        id: 'punish_errors',
        domains: ['TacticalEvaluation', 'Reaction'], // Note: Reaction is usually a Synergy, but we map it here
        type: SynthesisRuleType.BEHAVIORAL,
        requiredPoints: 3,
        description: 'AI becomes unbelievably good at punishing errors.',
        targetIndices: [TI.OPPORTUNITY],
        bonusMultiplier: 0.30
    }
];

// --- EMERGENT RESONANCE LOGIC ---
export class SynthesisEngine {

    // Tally points per domain based on active skills
    public static calculateDomainPoints(activeSkills: any[]): Record<string, number> {
        const domainCounts: Record<string, number> = {};

        activeSkills.forEach(skill => {
            if (skill.domain) {
                const points = skill.level || 1; // Assuming skills have levels
                domainCounts[skill.domain] = (domainCounts[skill.domain] || 0) + points;
            }
        });
        return domainCounts;
    }

    // Return all active emergent rules
    public static getActiveRules(domainCounts: Record<string, number>): SynthesisRule[] {
        return SYNTHESIS_RULES.filter(rule => {
            const [d1, d2] = rule.domains;
            const p1 = domainCounts[d1 as string] || 0;
            const p2 = domainCounts[d2 as string] || 0;
            return p1 >= rule.requiredPoints && p2 >= rule.requiredPoints;
        });
    }

    // Calculate High-Level Latent Resonance (3+ Active Domains)
    public static calculateResonanceBonus(domainCounts: Record<string, number>): number {
        let activeDomains = 0;
        for (const key in domainCounts) {
            if (domainCounts[key] >= 3) activeDomains++;
        }

        if (activeDomains >= 3) {
            // Formula: +0.10 * (# active domains)
            return 0.10 * activeDomains;
        }
        return 0;
    }
}
