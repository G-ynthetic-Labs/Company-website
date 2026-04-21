// src/features/game/ai/AethosService.ts
import { AIProfile, PIECE_PERSONAS } from './AIProfiles';
import { XPTable } from './XPTable';

export interface PersistentAI {
    profileId: string;
    level: number;
    xp: number;
    stats: {
        force: number;
        flow: number;
        form: number;
        // Combat Attributes
        bloodlust: number;
        cunning: number;
        discipline: number;
    };
    unlockedSkills: string[];
}

export class AethosService {
    private static storageKey = 'cubex3_aethos_profiles';
    private static profiles: Record<string, PersistentAI> = {};

    public static initialize() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.profiles = JSON.parse(saved);
        }

        // [ROBUSTNESS] Ensure all personas exist in profiles record
        Object.keys(PIECE_PERSONAS).forEach(id => {
            if (!this.profiles[id]) {
                this.profiles[id] = {
                    profileId: id,
                    level: 1,
                    xp: 0,
                    stats: { force: 10, flow: 10, form: 10, bloodlust: 5, cunning: 5, discipline: 5 },
                    unlockedSkills: []
                };
            }
        });

        if (!saved) this.save();
    }

    public static getProfile(id: string): PersistentAI | undefined {
        return this.profiles[id];
    }

    public static getAllProfiles(): PersistentAI[] {
        return Object.values(this.profiles);
    }

    public static addXp(id: string, amount: number) {
        const p = this.profiles[id];
        if (!p) return;

        p.xp += amount;
        let threshold = XPTable.getNextLevelThreshold(p.level);

        while (p.xp >= threshold) {
            p.level++;
            this.applyGrowth(p);
            threshold = XPTable.getNextLevelThreshold(p.level);
        }
        this.save();
    }

    private static applyGrowth(p: PersistentAI) {
        const base = PIECE_PERSONAS[p.profileId];
        if (!base) return;

        p.stats.force += Math.floor(base.statGrowth.force * 5);
        p.stats.flow += Math.floor(base.statGrowth.flow * 5);
        p.stats.form += Math.floor(base.statGrowth.form * 5);

        // Combat Attribute Growth
        p.stats.bloodlust += Math.floor(base.combatGrowth.bloodlust * 3);
        p.stats.cunning += Math.floor(base.combatGrowth.cunning * 3);
        p.stats.discipline += Math.floor(base.combatGrowth.discipline * 3);
    }

    private static save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.profiles));
    }
}
