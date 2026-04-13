import React from 'react';
import { Box, BrainCircuit, RefreshCw, Cpu, BarChart3 } from 'lucide-react';
import clsx from 'clsx';
import { GameState, Difficulty, GameMode } from '../types';

interface HeaderProps {
    state: GameState;
    onNewGame: () => void;
    onToggleDashboard: () => void;
    showDashboard: boolean;
}

export const Header: React.FC<HeaderProps> = ({ state, onNewGame, onToggleDashboard, showDashboard }) => {
    return (
        <header className="h-10 bg-cyber-800/80 backdrop-blur-md border-b border-cyber-700 flex items-center justify-between px-3 z-20 shrink-0">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-cyber-500 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    <Box className="text-cyber-900" size={14} />
                </div>
                <h1 className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">CUBEX³</h1>
                {state.gameMode === 'HvAI' && (
                    <div className="flex items-center gap-1.5 ml-2 bg-cyber-900/50 px-2 py-0.5 rounded border border-cyber-700">
                        <BrainCircuit size={10} className="text-pink-400" />
                        <span className="text-[9px] uppercase font-bold text-slate-400">{state.difficulty} Bot</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                {/* AI Status */}
                {state.isAiThinking && (
                    <div className="flex items-center gap-2 animate-pulse mr-4">
                        <Cpu size={14} className="text-pink-400" />
                        <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">AI Computing...</span>
                    </div>
                )}

                {/* Dashboard Toggle */}
                <button 
                    onClick={onToggleDashboard}
                    className={clsx("p-1.5 rounded-full transition-colors flex items-center gap-2 px-3", showDashboard ? 'bg-blue-600 text-white' : 'hover:bg-cyber-700 text-slate-400')}
                >
                    <BarChart3 size={14} />
                    <span className="text-xs font-bold hidden md:block">TELEMETRY</span>
                </button>

                {/* Turn Indicator */}
                <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyber-900 border border-cyber-700">
                    <span className="text-[10px] text-cyber-400 uppercase tracking-widest">Turn</span>
                    <div className={clsx("w-2.5 h-2.5 rounded-full shadow-lg", state.turn === 'white' ? "bg-white shadow-white/50" : "bg-black border border-cyber-500 shadow-black/50")} />
                    <span className="font-mono font-bold text-xs">{state.turn.toUpperCase()}</span>
                </div>

                {/* New Game */}
                <button onClick={onNewGame} className="p-1.5 hover:bg-cyber-700 rounded-full transition-colors">
                    <RefreshCw size={14} />
                </button>
            </div>
        </header>
    );
};