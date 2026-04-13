// src/features/game/ai/XPTable.ts

/**
 * Logarithmic XP Scaling for the CubeX\u00b3 AI.
 * Implements a "Logarithmic Taper" where levels become progressively harder
 * to gain as the unit approaches the Grandmaster threshold.
 */
export class XPTable {
    private static readonly BASE_XP = 100;
    private static readonly MAX_LEVEL = 100;
    private static readonly GROWTH_COEFF = 450;

    /**
     * Calculates the XP required to reach the NEXT level from the current level.
     * Formula: floor(Base + Coeff * L * log2(L + 1))
     * This ensures a convex curve where Level 1-10 are fast, 
     * but Level 80-100 require massive strategic consistency.
     */
    public static getNextLevelThreshold(currentLevel: number): number {
        if (currentLevel < 1) return this.BASE_XP;

        // Logarithmic Taper applied to Linear Growth
        // results in a "Harder as you go" curve (Convex).
        const logFactor = Math.log2(currentLevel + 1);
        const requirement = this.BASE_XP + (this.GROWTH_COEFF * currentLevel * logFactor);

        return Math.floor(requirement);
    }

    /**
     * Checks if a unit with current XP and level should level up.
     */
    public static canLevelUp(currentLevel: number, totalXp: number): boolean {
        const threshold = this.getNextLevelThreshold(currentLevel);
        return totalXp >= threshold;
    }

    /**
     * Utility to generate a preview table for balancing discussions.
     */
    public static getPreviewTable(levels: number[] = [1, 2, 5, 10, 20, 50, 80, 100]): Record<number, number> {
        const table: Record<number, number> = {};
        levels.forEach(l => {
            table[l] = this.getNextLevelThreshold(l);
        });
        return table;
    }
}
