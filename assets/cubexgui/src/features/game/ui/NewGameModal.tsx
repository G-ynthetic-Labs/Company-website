import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import clsx from 'clsx';
import { GameMode, Difficulty } from '../types';

interface NewGameModalProps {
    onStart: (mode: GameMode, diff: Difficulty) => void;
    onCancel: () => void;
}

export const NewGameModal: React.FC<NewGameModalProps> = ({ onStart, onCancel }) => {
    const [mode, setMode] = useState<GameMode>('HvH');
    const [diff, setDiff] = useState<Difficulty>('Medium');

    return (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-cyber-900 border border-cyber-500 rounded-xl p-6 shadow-2xl max-w-sm w-full animate-fadeIn">
                <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Trophy size={20} /> New Game Setup
                </h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Game Mode</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => setMode('HvH')} className={clsx("py-2 text-[10px] font-bold border rounded transition-colors", mode === 'HvH' ? "bg-cyan-900/50 border-cyan-500 text-cyan-400" : "border-cyber-700 text-slate-500 hover:border-slate-500")}>
                                Human vs Human
                            </button>
                            <button onClick={() => setMode('HvAI')} className={clsx("py-2 text-[10px] font-bold border rounded transition-colors", mode === 'HvAI' ? "bg-pink-900/50 border-pink-500 text-pink-400" : "border-cyber-700 text-slate-500 hover:border-slate-500")}>
                                Human vs AI
                            </button>
                            <button onClick={() => setMode('AIvAI')} className={clsx("py-2 text-[10px] font-bold border rounded transition-colors", mode === 'AIvAI' ? "bg-purple-900/50 border-purple-500 text-purple-400" : "border-cyber-700 text-slate-500 hover:border-slate-500")}>
                                AI vs AI
                            </button>
                        </div>
                    </div>

                    {mode === 'HvAI' && (
                        <div className="animate-fadeIn">
                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">AI Difficulty</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                                    <button key={d} onClick={() => setDiff(d)} className={clsx("py-2 text-[10px] uppercase font-bold border rounded transition-colors", diff === d ? "bg-emerald-900/50 border-emerald-500 text-emerald-400" : "border-cyber-700 text-slate-500 hover:border-slate-500")}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-2 text-[10px] text-slate-400 italic">
                                {diff === 'Easy' && "Opportunist. Aggressive but flawed."}
                                {diff === 'Medium' && "Balanced. Standard tactics."}
                                {diff === 'Hard' && "Strategist. Deep positional play."}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2 bg-cyber-800 hover:bg-cyber-700 text-slate-300 rounded text-xs font-bold uppercase">Cancel</button>
                    <button onClick={() => onStart(mode, diff)} className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold uppercase shadow-lg shadow-cyan-900/50">Start Game</button>
                </div>
            </div>
        </div>
    );
};