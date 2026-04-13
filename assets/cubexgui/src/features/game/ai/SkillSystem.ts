// src/ai/SkillSystem.ts
import { TI } from '../core/TensorConfig';

export enum EffectType {
    LEARNING_RATE = 'LR',
    DECAY_RATE = 'DECAY',
    IMPORTANCE = 'IMP'
}

export interface SkillEffect {
    targetIndices: number[]; // Array of TI indices
    type: EffectType;
    multiplier: number;
}

export interface Skill {
    id: string;
    name: string;
    tier: number;
    cost: number;
    effects: SkillEffect[];
    description: string;
}

// --- Helper to get Dynamic/Learning Range ---
const getEmbedRange = () => {
    const indices: number[] = [];
    for (let i = TI.DYNAMIC_START; i <= TI.DYNAMIC_END; i++) indices.push(i);
    return indices;
};

export const SKILL_LIBRARY: Record<string, Skill> = {
    pattern_recognition: {
        id: 'pattern_recognition',
        name: 'Pattern Recognition',
        tier: 1,
        cost: 1,
        description: 'Faster consolidation of recurring patterns.',
        effects: [
            { targetIndices: getEmbedRange(), type: EffectType.LEARNING_RATE, multiplier: 1.25 },
            { targetIndices: [TI.PATTERN_HASH], type: EffectType.IMPORTANCE, multiplier: 1.5 }
        ]
    },
    aggressor: {
        id: 'aggressor',
        name: 'Aggressor',
        tier: 2,
        cost: 2,
        description: 'Prioritizes attack patterns and locks them into memory faster.',
        effects: [
            { targetIndices: [TI.THREAT_SCORE, TI.OPPORTUNITY, TI.THREAT_INCOMING], type: EffectType.LEARNING_RATE, multiplier: 1.6 },
            { targetIndices: [TI.THREAT_SCORE, TI.OPPORTUNITY], type: EffectType.IMPORTANCE, multiplier: 1.5 }
        ]
    },
    tactical_memory: {
        id: 'tactical_memory',
        name: 'Tactical Memory',
        tier: 1,
        cost: 1,
        description: 'Embeddings persist longer.',
        effects: [
            { targetIndices: getEmbedRange(), type: EffectType.DECAY_RATE, multiplier: 0.5 },
            { targetIndices: [TI.WIN_CORRELATION, TI.LOSS_CORRELATION], type: EffectType.DECAY_RATE, multiplier: 0.5 }
        ]
    },
    // --- FRACTAL RRR SKILLS ---
    risk_acolyte: {
        id: 'risk_acolyte',
        name: 'Risk Acolyte',
        tier: 1,
        cost: 1,
        description: 'Unlocks visibility of Direct Threats and Vulnerabilities.',
        effects: [
            { targetIndices: [TI.R1_DIRECT_THREAT, TI.R2_VULNERABILITY, TI.R6_DANGER_ZONES], type: EffectType.IMPORTANCE, multiplier: 1.0 } // 0 -> 1.0 Visibility
        ]
    },
    reward_hunter: {
        id: 'reward_hunter',
        name: 'Reward Hunter',
        tier: 1,
        cost: 1,
        description: 'Unlocks visibility of Opportunities and Positional Advantages.',
        effects: [
            { targetIndices: [TI.W1_OPPORTUNITY, TI.W2_POSITIONAL, TI.W5_PROMOTION], type: EffectType.IMPORTANCE, multiplier: 1.0 }
        ]
    },
    relational_bond: {
        id: 'relational_bond',
        name: 'Relational Bond',
        tier: 1,
        cost: 1,
        description: 'Unlocks visibility of Synergy and Coordination.',
        effects: [
            { targetIndices: [TI.L1_SYNERGY, TI.L2_SUPPORT, TI.L5_COORDINATION], type: EffectType.IMPORTANCE, multiplier: 1.0 }
        ]
    },
    // --- FUNDAMENTAL SKILLS (Sight Unlocks) ---
    force_disciple: {
        id: 'force_disciple',
        name: 'Force Disciple',
        tier: 1,
        cost: 1,
        description: 'Unlocks the ability to perceive Force-based fundamentals (Might, Impact).',
        effects: [
            { targetIndices: [TI.F1_MIGHT, TI.F2_IMPACT, TI.F3_PRESSURE], type: EffectType.IMPORTANCE, multiplier: 1.0 }
        ]
    },
    flow_adept: {
        id: 'flow_adept',
        name: 'Flow Adept',
        tier: 1,
        cost: 1,
        description: 'Unlocks the ability to perceive Flow-based fundamentals (Adapt, Reflex).',
        effects: [
            { targetIndices: [TI.O1_ADAPT, TI.O2_REFLEX, TI.O3_FLUX], type: EffectType.IMPORTANCE, multiplier: 1.0 }
        ]
    },
    form_keeper: {
        id: 'form_keeper',
        name: 'Form Keeper',
        tier: 1,
        cost: 1,
        description: 'Unlocks the ability to perceive Form-based fundamentals (Clarity, Balance).',
        effects: [
            { targetIndices: [TI.M1_CLARITY, TI.M2_BALANCE, TI.M3_STASIS], type: EffectType.IMPORTANCE, multiplier: 1.0 }
        ]
    }
};

/**
 * Gets a visibility mask (Set of indices) based on active skills.
 * Indices not in this set should be treated as "Invisible" (0 value).
 */
export const getVisibilityMask = (activeSkills: Skill[]): Set<number> => {
    const mask = new Set<number>();

    // Base Indices (Always visible)
    [TI.STATE_ID, TI.OWNER_ID, TI.LAST_CHANGE_TURN, TI.IS_VALID_MOVE].forEach(i => mask.add(i));

    activeSkills.forEach(skill => {
        skill.effects.forEach(effect => {
            if (effect.type === EffectType.IMPORTANCE && effect.multiplier > 0) {
                effect.targetIndices.forEach(idx => mask.add(idx));
            }
        });
    });

    return mask;
};