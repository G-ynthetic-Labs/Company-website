// src/features/game/ai/AIProfiles.ts
import { TI } from '../core/TensorConfig';
import { StanceLabel } from '../types';

export interface TensorBias {
    indices: number[];
    multiplier: number;
}

export interface AIProfile {
    id: string;
    name: string;
    description: string;
    systemPrompt: string; // The "Voice" for Vantage Chat
    metricBiases: TensorBias[]; // The "Brain" weights for Move Selection
    preferredStance?: StanceLabel; // New: Links RRR Stance to Profile
    statGrowth: {
        force: number; // STR-variant (Warrior)
        flow: number;  // INT-variant (Mage)
        form: number;  // WIS-variant (Paladin)
    };
    // --- COMBAT ATTRIBUTES ---
    combatGrowth: {
        bloodlust: number;  // Capture drive & First Blood incentive
        cunning: number;    // Trap/feint aptitude
        discipline: number; // Formation coherence & defense
    };
}

export const PIECE_PERSONAS: Record<string, AIProfile> = {
    // --- DIFFICULTY PRESETS ---
    'opportunist': {
        id: 'opportunist',
        name: 'The Opportunist',
        description: 'Seeks immediate material gain. Often overextends. (Easy Mode)',
        systemPrompt: 'You are a greedy mercenary. You take every free piece you see.',
        preferredStance: 'Hyper Aggressive',
        statGrowth: { force: 0.8, flow: 0.1, form: 0.1 },
        combatGrowth: { bloodlust: 0.8, cunning: 0.1, discipline: 0.1 },
        metricBiases: [
            { indices: [TI.OPPORTUNITY], multiplier: 3.0 },
            { indices: [TI.THREAT_SCORE], multiplier: 0.5 },
            { indices: [TI.STRUCTURAL_STAB], multiplier: -1.0 }
        ]
    },
    'balanced': {
        id: 'balanced',
        name: 'The Tactician',
        description: 'Standard play. Balances material and control. (Medium Mode)',
        systemPrompt: 'You are a disciplined soldier. You fight by the book.',
        preferredStance: 'Balanced',
        statGrowth: { force: 0.4, flow: 0.3, form: 0.3 },
        combatGrowth: { bloodlust: 0.3, cunning: 0.4, discipline: 0.3 },
        metricBiases: [
            { indices: [TI.CONTROL_VAL], multiplier: 1.2 },
            { indices: [TI.THREAT_SCORE], multiplier: 1.2 },
            { indices: [TI.SYNERGY_SCORE], multiplier: 1.0 }
        ]
    },
    'strategist': {
        id: 'strategist',
        name: 'The Grandmaster',
        description: 'Deep positional understanding. Values long-term influence. (Hard Mode)',
        systemPrompt: 'You are a master of the board. You suffocate the enemy slowly.',
        preferredStance: 'Tactical',
        statGrowth: { force: 0.2, flow: 0.4, form: 0.4 },
        combatGrowth: { bloodlust: 0.2, cunning: 0.6, discipline: 0.2 },
        metricBiases: [
            { indices: [TI.SYNERGY_SCORE], multiplier: 2.0 },
            { indices: [TI.INFLUENCE_GRAD], multiplier: 1.5 },
            { indices: [TI.WIN_CORRELATION], multiplier: 1.5 },
            { indices: [TI.OPPORTUNITY], multiplier: 1.0 }
        ]
    },

    // --- CHARACTER ARCHETYPES ---
    'guardian': {
        id: 'guardian',
        name: 'The Shield',
        description: 'Prioritizes safety and structure. Anchors the defense.',
        systemPrompt: 'You are a careful protector. You prefer staying near allies and holding the line.',
        preferredStance: 'Fortified',
        statGrowth: { force: 0.6, flow: 0.1, form: 0.3 },
        combatGrowth: { bloodlust: 0.1, cunning: 0.1, discipline: 0.8 },
        metricBiases: [
            { indices: [TI.STRUCTURAL_STAB, TI.DEFENSE_VECTOR_SUM], multiplier: 2.5 },
            { indices: [TI.DIRECT_THREAT], multiplier: -3.0 }
        ]
    },
    'sentinel': {
        id: 'sentinel',
        name: 'The Sentinel',
        description: 'Stationary watcher. Values commanding key points over movement.',
        systemPrompt: 'You are a watchtower. You find a strong position and refuse to move unless necessary.',
        preferredStance: 'Fortified',
        statGrowth: { force: 0.5, flow: 0.1, form: 0.4 },
        combatGrowth: { bloodlust: 0.1, cunning: 0.3, discipline: 0.6 },
        metricBiases: [
            { indices: [TI.CONTROL_VAL], multiplier: 2.0 },
            { indices: [TI.VELOCITY], multiplier: -1.5 },
            { indices: [TI.DEFENSE_VECTOR_SUM], multiplier: 1.5 }
        ]
    },
    'royal': {
        id: 'royal',
        name: 'The Sovereign',
        description: 'Absolute survival priority. The game ends if this unit falls.',
        systemPrompt: 'You are the King. Your survival is the only thing that matters.',
        preferredStance: 'Hyper Defensive',
        statGrowth: { force: 0.2, flow: 0.2, form: 0.6 },
        combatGrowth: { bloodlust: 0.0, cunning: 0.2, discipline: 0.8 },
        metricBiases: [
            { indices: [TI.DIRECT_THREAT], multiplier: -10.0 },
            { indices: [TI.STRUCTURAL_STAB], multiplier: 3.0 }
        ]
    },
    'berserker': {
        id: 'berserker',
        name: 'The Berserker',
        description: 'Pure aggression. Seeks to maximize threat and entropy.',
        systemPrompt: 'You are a wild warrior. You seek glory in combat and care little for your own safety.',
        preferredStance: 'Hyper Aggressive',
        statGrowth: { force: 1.0, flow: 0.0, form: 0.0 },
        combatGrowth: { bloodlust: 1.0, cunning: 0.0, discipline: 0.0 },
        metricBiases: [
            { indices: [TI.OPPORTUNITY, TI.DIRECT_THREAT], multiplier: 2.5 },
            { indices: [TI.ENTROPY], multiplier: 1.5 }
        ]
    },
    'assassin': {
        id: 'assassin',
        name: 'The Viper',
        description: 'Precision striker. Values high-value trades and open lines.',
        systemPrompt: 'You are a cold assassin. You wait for the perfect strike on high-value targets.',
        preferredStance: 'Tactical',
        statGrowth: { force: 0.4, flow: 0.4, form: 0.2 },
        combatGrowth: { bloodlust: 0.5, cunning: 0.4, discipline: 0.1 },
        metricBiases: [
            { indices: [TI.WIN_CORRELATION], multiplier: 2.0 },
            { indices: [TI.LOS_OPENNESS], multiplier: 1.5 },
            { indices: [TI.PATH_COST], multiplier: -2.0 }
        ]
    },
    'duelist': {
        id: 'duelist',
        name: 'The Duelist',
        description: 'Seeks isolated 1v1 engagements. Avoids clusters.',
        systemPrompt: 'You are a master fencer. You look for isolated enemies to challenge.',
        preferredStance: 'Tactical',
        statGrowth: { force: 0.5, flow: 0.3, form: 0.2 },
        combatGrowth: { bloodlust: 0.6, cunning: 0.3, discipline: 0.1 },
        metricBiases: [
            { indices: [TI.ATTACK_VECTOR_SUM], multiplier: 2.0 },
            { indices: [TI.DEFENSE_VECTOR_SUM], multiplier: -0.5 },
            { indices: [TI.MOBILITY_FLUX], multiplier: 1.2 }
        ]
    },
    'explorer': {
        id: 'explorer',
        name: 'The Scout',
        description: 'Seeks new territory and mobility. High risk tolerance.',
        systemPrompt: 'You are a brave explorer. You love finding open space and probing enemy lines.',
        preferredStance: 'Reactive',
        statGrowth: { force: 0.3, flow: 0.5, form: 0.2 },
        combatGrowth: { bloodlust: 0.2, cunning: 0.5, discipline: 0.3 },
        metricBiases: [
            { indices: [TI.INFLUENCE_GRAD], multiplier: 2.0 },
            { indices: [TI.MOBILITY_FLUX], multiplier: 2.5 },
            { indices: [TI.OPPORTUNITY], multiplier: 1.0 }
        ]
    },
    'architect': {
        id: 'architect',
        name: 'The Builder',
        description: 'Values geometry and long-term synergy.',
        systemPrompt: 'You are a master planner. You care about controlling the center and creating formations.',
        preferredStance: 'Balanced',
        statGrowth: { force: 0.2, flow: 0.3, form: 0.5 },
        combatGrowth: { bloodlust: 0.0, cunning: 0.3, discipline: 0.7 },
        metricBiases: [
            { indices: [TI.CONTROL_VAL], multiplier: 2.0 },
            { indices: [TI.SYNERGY_SCORE], multiplier: 1.8 }
        ]
    },
    'trickster': {
        id: 'trickster',
        name: 'The Trickster',
        description: 'Unpredictable. Loves chaos and high entropy states.',
        systemPrompt: 'You are a chaotic spirit. You make moves that confuse the enemy.',
        preferredStance: 'Hyper Retaliatory',
        statGrowth: { force: 0.0, flow: 1.0, form: 0.0 },
        combatGrowth: { bloodlust: 0.3, cunning: 0.7, discipline: 0.0 },
        metricBiases: [
            { indices: [TI.ENTROPY], multiplier: 3.0 },
            { indices: [TI.WIN_CORRELATION], multiplier: 0.5 },
            { indices: [TI.LAST_CHANGE_TURN], multiplier: -1.0 }
        ]
    },
    'phantom': {
        id: 'phantom',
        name: 'The Phantom',
        description: 'Elusive. Avoids all contact and influence.',
        systemPrompt: 'You are a ghost. You wish to remain unseen and untouched.',
        preferredStance: 'Hyper Defensive',
        statGrowth: { force: 0.1, flow: 0.6, form: 0.3 },
        combatGrowth: { bloodlust: 0.0, cunning: 0.6, discipline: 0.4 },
        metricBiases: [
            { indices: [TI.DIRECT_THREAT], multiplier: -4.0 },
            { indices: [TI.INFLUENCE_GRAD], multiplier: -1.0 },
            { indices: [TI.PATH_COST], multiplier: -3.0 }
        ]
    },
    'commander': {
        id: 'commander',
        name: 'The Warlord',
        description: 'Buffs allies. Wants to maximize friendly influence.',
        systemPrompt: 'You are a field commander. Your presence inspires your troops.',
        preferredStance: 'Balanced',
        statGrowth: { force: 0.2, flow: 0.2, form: 0.6 },
        combatGrowth: { bloodlust: 0.1, cunning: 0.2, discipline: 0.7 },
        metricBiases: [
            { indices: [TI.SYNERGY_SCORE], multiplier: 3.0 },
            { indices: [TI.INFLUENCE_GRAD], multiplier: 2.0 }
        ]
    },
    'oracle': {
        id: 'oracle',
        name: 'The Oracle',
        description: 'Calculated. Only moves if Win Correlation is extremely high.',
        systemPrompt: 'You see the future. You only act when the outcome is certain.',
        preferredStance: 'Balanced',
        statGrowth: { force: 0.0, flow: 0.4, form: 0.6 },
        combatGrowth: { bloodlust: 0.0, cunning: 0.8, discipline: 0.2 },
        metricBiases: [
            { indices: [TI.WIN_CORRELATION], multiplier: 5.0 },
            { indices: [TI.OPPORTUNITY], multiplier: -1.0 }
        ]
    }
};