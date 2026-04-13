// src/ai/SkillData.ts
import { TI } from '../core/TensorConfig';
import { DomainTag, SynergyGroup } from './experimental/DomainTypes';
import { EffectType, SkillEffect } from './SkillSystem';

// --- Logic Definitions (Used by Knowledge Graph) ---

export interface Multiplier {
    indices: number[];
    value: number; // Base value
    perPoint: number; // Scaling per level/point
}

export interface AdvancedSkill {
    id: string;
    name: string;
    maxLevel: number;
    domain: DomainTag;
    synergyGroup: SynergyGroup;
    effects: {
        type: EffectType;
        multipliers: Multiplier[];
    }[];
}

export const ADVANCED_SKILLS: AdvancedSkill[] = [
    // 🟥 AGGRESSOR SKILLS
    {
        id: 'aggressor_1',
        name: 'Aggressor I',
        maxLevel: 5,
        domain: 'Tactics',
        synergyGroup: 'Control',
        effects: [{
            type: EffectType.LEARNING_RATE,
            multipliers: [
                { indices: [TI.THREAT_SCORE], value: 0.0, perPoint: 0.10 },
                { indices: [TI.VELOCITY], value: 0.0, perPoint: 0.05 },
                { indices: [TI.OPPORTUNITY], value: 0.03, perPoint: 0.03 }
            ]
        }]
    },
    {
        id: 'aggressor_2',
        name: 'Aggressor II',
        maxLevel: 5,
        domain: 'Tactics',
        synergyGroup: 'Pressure',
        effects: [{
            type: EffectType.IMPORTANCE,
            multipliers: [
                { indices: [TI.THREAT_SCORE], value: 0.0, perPoint: 0.20 },
                { indices: [TI.MOBILITY_FLUX], value: 0.0, perPoint: 0.10 },
                { indices: [TI.THREAT_INCOMING], value: 0.0, perPoint: 0.07 }
            ]
        }]
    },
    // 🟦 DEFENDER SKILLS
    {
        id: 'defender_1',
        name: 'Defensive Planner I',
        maxLevel: 5,
        domain: 'PositionalPlay',
        synergyGroup: 'Stability',
        effects: [{
            type: EffectType.IMPORTANCE,
            multipliers: [
                { indices: [TI.STRUCTURAL_STAB], value: 0.0, perPoint: 0.15 },
                { indices: [TI.ENTROPY], value: 0.0, perPoint: -0.08 },
                { indices: [TI.CONTROL_VAL], value: 0.0, perPoint: 0.06 }
            ]
        }]
    },
    // 🟨 STRATEGIST SKILLS
    {
        id: 'strategist_1',
        name: 'Influence Mapper I',
        maxLevel: 5,
        domain: 'SpaceControl',
        synergyGroup: 'Network',
        effects: [{
            type: EffectType.LEARNING_RATE,
            multipliers: [
                { indices: [TI.INFLUENCE_GRAD], value: 0.0, perPoint: 0.10 },
                { indices: [TI.IMPORTANCE_WT], value: 0.0, perPoint: 0.08 },
                { indices: [TI.LINK_STRENGTH], value: 0.0, perPoint: 0.07 }
            ]
        }]
    },
    {
        id: 'strategist_2',
        name: 'Macro-Pattern Memory',
        maxLevel: 3,
        domain: 'PatternRecognition',
        synergyGroup: 'Coherence',
        effects: [{
            type: EffectType.DECAY_RATE,
            multipliers: [
                { indices: [TI.SYNERGY_SCORE], value: 0.10, perPoint: 0.10 },
                { indices: [TI.PATTERN_HASH], value: 0.12, perPoint: 0.12 }
            ]
        }]
    },
    // 🟪 PREDICTOR SKILLS
    {
        id: 'predictor_1',
        name: 'Predictive Change Modeling',
        maxLevel: 5,
        domain: 'Prediction',
        synergyGroup: 'Temporal',
        effects: [{
            type: EffectType.LEARNING_RATE,
            multipliers: [
                { indices: [TI.VELOCITY], value: 0.12, perPoint: 0.12 },
                { indices: [TI.LAST_CHANGE_TURN], value: 0.09, perPoint: 0.09 }
            ]
        }]
    }
];

// --- Campaign Definitions (Used by UI/SkillTree) ---

export type SkillType = 'Passive' | 'Active';

// Must match 'Skill' interface from SkillSystem.ts
export interface CampaignSkill {
    id: string;
    name: string;
    unlockLevel: number;
    tier: number;
    cost: number;
    type: SkillType;
    arc: string;
    description: string;
    effects: SkillEffect[]; // Now included to satisfy ProfileManager
}

// Helper to get Dynamic Range
const embedRange = () => {
    const indices: number[] = [];
    for (let i = TI.DYNAMIC_START; i <= TI.DYNAMIC_END; i++) indices.push(i);
    return indices;
};

export const CAMPAIGN_SKILLS: CampaignSkill[] = [
    // --- FOUNDATIONS ARC (1-10) ---
    {
        id: 'foundations_1',
        name: 'Pattern Recognition I',
        unlockLevel: 1,
        tier: 1,
        cost: 1,
        type: 'Passive',
        arc: 'Foundations',
        description: 'Begin recognizing repeating board patterns.',
        effects: [
            { targetIndices: [TI.PATTERN_HASH], type: EffectType.IMPORTANCE, multiplier: 1.2 }
        ]
    },
    {
        id: 'foundations_2',
        name: 'Scout Protocol I',
        unlockLevel: 2,
        tier: 1,
        cost: 1,
        type: 'Active',
        arc: 'Foundations',
        description: 'Increases learning rate on volatile/active cubes.',
        effects: [
            { targetIndices: [TI.VELOCITY, TI.ENTROPY], type: EffectType.LEARNING_RATE, multiplier: 1.5 }
        ]
    },
    {
        id: 'foundations_3',
        name: 'Tactical Memory I',
        unlockLevel: 3,
        tier: 1,
        cost: 1,
        type: 'Passive',
        arc: 'Foundations',
        description: 'Slows decay for embeddings & pattern correlations.',
        effects: [
            { targetIndices: embedRange(), type: EffectType.DECAY_RATE, multiplier: 0.8 }
        ]
    },
    {
        id: 'foundations_4',
        name: 'Basic Mobility Insight',
        unlockLevel: 4,
        tier: 1,
        cost: 1,
        type: 'Passive',
        arc: 'Foundations',
        description: 'Boosts mobility & influence metric importance.',
        effects: [
            { targetIndices: [TI.MOBILITY_FLUX, TI.INFLUENCE_GRAD], type: EffectType.IMPORTANCE, multiplier: 1.3 }
        ]
    },
    {
        id: 'foundations_5',
        name: 'Local Stability Sense',
        unlockLevel: 5,
        tier: 1,
        cost: 1,
        type: 'Passive',
        arc: 'Foundations',
        description: 'Improves StabilityScore & filters noisy updates.',
        effects: [
            { targetIndices: [TI.STRUCTURAL_STAB], type: EffectType.LEARNING_RATE, multiplier: 1.2 },
            { targetIndices: [TI.ENTROPY], type: EffectType.DECAY_RATE, multiplier: 0.9 }
        ]
    },

    // --- TACTICAL ARC (11-20) ---
    {
        id: 'aggressor_1',
        name: 'Aggressor I',
        unlockLevel: 11,
        tier: 2,
        cost: 2,
        type: 'Passive',
        arc: 'Tactical',
        description: 'Offensive metrics get boosted importance.',
        effects: [
            { targetIndices: [TI.THREAT_SCORE, TI.OPPORTUNITY], type: EffectType.IMPORTANCE, multiplier: 1.4 }
        ]
    },
    {
        id: 'defender_1',
        name: 'Defensive Planner I',
        unlockLevel: 12,
        tier: 2,
        cost: 2,
        type: 'Passive',
        arc: 'Tactical',
        description: 'Defensive metrics get boosted importance.',
        effects: [
            { targetIndices: [TI.SUPPORT_INCOMING, TI.STRUCTURAL_STAB], type: EffectType.IMPORTANCE, multiplier: 1.4 }
        ]
    },
    {
        id: 'focused_attention',
        name: 'Focused Attention',
        unlockLevel: 13,
        tier: 2,
        cost: 2,
        type: 'Active',
        arc: 'Tactical',
        description: 'Select a key region each snapshot to learn faster.',
        effects: [
            { targetIndices: [TI.IMPORTANCE_WT], type: EffectType.IMPORTANCE, multiplier: 2.0 }
        ]
    },
    {
        id: 'consolidation_trigger',
        name: 'Consolidation Trigger',
        unlockLevel: 20,
        tier: 2,
        cost: 3,
        type: 'Active',
        arc: 'Tactical',
        description: 'Consolidates embeddings into macro-patterns.',
        effects: [
            { targetIndices: embedRange(), type: EffectType.DECAY_RATE, multiplier: 0.1 }
        ]
    },

    // --- STRATEGIC ARC (20+) ---
    {
        id: 'strategist_1',
        name: 'Influence Mapper I',
        unlockLevel: 21,
        tier: 2,
        cost: 2,
        type: 'Passive',
        arc: 'Strategic',
        description: 'Boosts influence calculations and network linking.',
        effects: [
            { targetIndices: [TI.INFLUENCE_GRAD], type: EffectType.IMPORTANCE, multiplier: 1.3 }
        ]
    },
    {
        id: 'predictor_1',
        name: 'Predictive Change',
        unlockLevel: 25,
        tier: 3,
        cost: 3,
        type: 'Passive',
        arc: 'Strategic',
        description: 'Enables forecasting of future board states.',
        effects: [
            { targetIndices: [TI.VELOCITY, TI.WIN_CORRELATION], type: EffectType.LEARNING_RATE, multiplier: 1.3 }
        ]
    }
];