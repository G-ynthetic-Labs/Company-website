// src/features/game/ai/ProfileManager.ts
import { KnowledgeGraph } from './KnowledgeGraph';
import { PIECE_PERSONAS, AIProfile, TensorBias } from './AIProfiles'; // NOTE: AI_PERSONAS are defined in AIProfiles.ts
import { SKILL_LIBRARY, Skill, EffectType } from './SkillSystem';
import { CAMPAIGN_SKILLS } from './SkillData';

export class ProfileManager {
    private graph: KnowledgeGraph;

    constructor(graph: KnowledgeGraph) {
        this.graph = graph;
    }

    /**
     * Loads a personality (or piece archetype) into the AI brain.
     */
    public loadProfile(profileId: string) {
        const profile = PIECE_PERSONAS[profileId];
        if (!profile) {
            console.error(`Profile ${profileId} not found.`);
            return;
        }

        console.log(`🧠 AI Loading Profile: ${profile.name}`);

        // 1. Gather Skills (Assuming profiles might have associated skills in the future)
        // For now we just apply biases directly.
        
        // 2. Apply Base Biases
        this.applyBiasesAsSkills(profile.metricBiases);
    }

    private applyBiasesAsSkills(biases: TensorBias[]) {
        const biasSkill: Skill = {
            id: 'innate_personality_bias',
            name: 'Innate Bias',
            tier: 0,
            cost: 0,
            effects: [], 
            description: 'Base personality weights'
        };

        // Populate effects correctly
        biasSkill.effects = biases.map(b => ({
            targetIndices: b.indices,
            type: EffectType.IMPORTANCE,
            multiplier: b.multiplier
        }));
        
        this.graph.applySkills([biasSkill]);
    }
}