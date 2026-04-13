// src/features/game/ai/experimental/DomainTypes.ts

export type DomainTag =
    | 'Tactics'
    | 'PositionalPlay'
    | 'Endgame'
    | 'SpaceControl'
    | 'PatternRecognition'
    | 'Prediction'
    | 'Evaluation'
    | 'TacticalEvaluation'
    | 'PieceActivity'
    | 'Structure'
    | 'Reaction'; // Added to support Synthesis Rules

export type SynergyGroup =
    | 'Control'
    | 'Pressure'
    | 'Stability'
    | 'Network'
    | 'Coherence'
    | 'Temporal'
    | 'Forecast'
    | 'Reaction'
    | 'Flow';

export enum SynthesisRuleType {
    ADDITIVE = 'ADDITIVE',         // A + B -> New Metric
    MULTIPLICATIVE = 'MULTIPLICATIVE', // A * B -> Magnification
    STRUCTURAL = 'STRUCTURAL',     // Changes decay/update logic
    BEHAVIORAL = 'BEHAVIORAL',     // Changes AI bias/tendency
    PREDICTIVE = 'PREDICTIVE'      // Unlocks forecasting
}

export interface SynthesisRule {
    id: string;
    domains: [DomainTag, DomainTag]; // The pair that triggers this
    type: SynthesisRuleType;
    requiredPoints: number; // Threshold (e.g., 3 points in each)
    description: string;

    // The Latent Effect
    targetIndices?: number[]; // Indices affected
    bonusMultiplier?: number; // Added to multiplier
    bonusFlat?: number;       // Added to raw value
}
