import React from 'react';
import { Box, LayoutGrid, PenTool, BookOpen, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

export type ViewMode = '3D' | '2D' | 'EDITOR' | 'HELP' | 'SKILLS' | 'AETHOS' | 'LOG';

interface SidebarProps {
    currentMode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentMode, onChange }) => {
    const NavButton = ({ mode, icon: Icon, label, colorClass }: { mode: ViewMode, icon: any, label: string, colorClass: string }) => (
        <button onClick={() => onChange(mode)} className={clsx("flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 border border-transparent hover:scale-105 active:scale-95 shadow-lg", currentMode === mode ? `bg-gradient-to-b from-cyber-500/20 to-cyber-900 border-cyber-500 ${colorClass} shadow-cyber-500/20` : "bg-cyber-900/50 hover:bg-cyber-800 text-slate-400")}>
            <Icon size={22} className={clsx(currentMode === mode && colorClass)} />
            <span className="text-[9px] mt-1.5 font-bold tracking-wider">{label}</span>
        </button>
    );

    return (
        <aside className="w-16 bg-cyber-800/50 border-l border-cyber-700 flex flex-col items-center py-4 gap-4 z-10 backdrop-blur-sm shrink-0">
            <div className="flex flex-col gap-2 w-full px-2">
                <NavButton mode="3D" icon={Box} label="3D" colorClass="text-cyan-400" />
                <NavButton mode="2D" icon={LayoutGrid} label="SLICE" colorClass="text-cyan-400" />
                <div className="h-[1px] w-8 bg-cyber-700 mx-auto my-1 opacity-50" />
                <NavButton mode="SKILLS" icon={BrainCircuit} label="SKILLS" colorClass="text-purple-400" />
                <NavButton mode="AETHOS" icon={BrainCircuit} label="AETHOS" colorClass="text-cyan-400" />
                <NavButton mode="EDITOR" icon={PenTool} label="EDIT" colorClass="text-pink-400" />
                <NavButton mode="LOG" icon={LayoutGrid} label="LOG" colorClass="text-yellow-400" />
                <NavButton mode="HELP" icon={BookOpen} label="HELP" colorClass="text-emerald-400" />
            </div>
        </aside>
    );
};