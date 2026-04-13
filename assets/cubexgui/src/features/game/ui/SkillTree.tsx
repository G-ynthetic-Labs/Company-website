// src/features/game/ui/SkillTree.tsx
import React, { useState } from 'react';
import { CAMPAIGN_SKILLS, CampaignSkill } from '../ai/SkillData';

interface SkillTreeProps {
    currentLevel: number;
    availableSP: number;
    unlockedSkills: string[]; // IDs of unlocked skills
    onUnlock: (skillId: string, cost: number) => void;
}

const SkillNode: React.FC<{ 
    skill: CampaignSkill; 
    isUnlocked: boolean; 
    canUnlock: boolean;
    onUnlock: () => void; 
}> = ({ skill, isUnlocked, canUnlock, onUnlock }) => {
    
    // Dynamic Styles based on state
    const baseStyle = "relative flex flex-col items-center p-4 border-2 rounded-lg w-64 transition-all duration-300";
    const statusStyle = isUnlocked 
        ? "border-green-500 bg-green-900/20 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
        : canUnlock 
            ? "border-blue-400 bg-blue-900/20 text-blue-100 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]" 
            : "border-gray-700 bg-gray-900/50 text-gray-500 opacity-70 cursor-not-allowed";

    return (
        <div className={`${baseStyle} ${statusStyle}`} onClick={canUnlock ? onUnlock : undefined}>
            {/* Level Badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-xs font-bold text-white">
                {skill.unlockLevel}
            </div>
            
            <div className="text-sm font-bold uppercase tracking-wider mb-1">{skill.name}</div>
            <div className="text-xs text-center italic mb-2 opacity-80">{skill.type} • {skill.cost} SP</div>
            <div className="text-xs text-center leading-tight">{skill.description}</div>
            
            {/* Tier Indicator */}
            <div className="mt-2 flex gap-1">
                {Array.from({length: skill.tier}).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-green-400' : 'bg-gray-600'}`} />
                ))}
            </div>
        </div>
    );
};

export const SkillTree: React.FC<SkillTreeProps> = ({ currentLevel, availableSP, unlockedSkills, onUnlock }) => {
    const [selectedArc, setSelectedArc] = useState<string>('Foundations');
    
    // Group skills by Arc
    const arcs = Array.from(new Set(CAMPAIGN_SKILLS.map(s => s.arc)));
    const activeSkills = CAMPAIGN_SKILLS.filter(s => s.arc === selectedArc).sort((a,b) => a.unlockLevel - b.unlockLevel);

    return (
        <div className="flex flex-col h-full bg-gray-950 text-white p-6 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        AI Neural Evolution
                    </h2>
                    <p className="text-sm text-gray-400">Level {currentLevel} • Available SP: <span className="text-yellow-400 font-bold">{availableSP}</span></p>
                </div>
                
                {/* Arc Selector Tabs */}
                <div className="flex gap-2">
                    {arcs.map(arc => (
                        <button 
                            key={arc}
                            onClick={() => setSelectedArc(arc)}
                            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${
                                selectedArc === arc 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {arc}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Skill Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                    {activeSkills.map(skill => {
                        const isUnlocked = unlockedSkills.includes(skill.id);
                        const canUnlock = !isUnlocked && currentLevel >= skill.unlockLevel && availableSP >= skill.cost;
                        
                        return (
                            <SkillNode 
                                key={skill.id} 
                                skill={skill} 
                                isUnlocked={isUnlocked}
                                canUnlock={canUnlock}
                                onUnlock={() => onUnlock(skill.id, skill.cost)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};