import React from 'react';
import { Skull } from 'lucide-react';
import clsx from 'clsx';
import { GameState, Piece, PlayerColor } from '../types';

export const Graveyard = ({ pieces, color }: { pieces: Piece[], color: PlayerColor }) => (
    <div className={clsx("p-2 rounded-lg bg-black/40 border border-cyber-700/50 backdrop-blur-sm shadow-xl min-w-[140px]", color === 'white' ? "border-l-2 border-l-white" : "border-r-2 border-r-slate-600 text-right")}>
        <div className={clsx("flex items-center gap-2 mb-2", color === 'black' && "flex-row-reverse")}>
            <Skull size={12} className={color === 'white' ? "text-slate-200" : "text-slate-500"} />
            <span className="text-[10px] uppercase font-bold text-slate-400">{color} Casualties</span>
        </div>
        <div className={clsx("flex flex-wrap gap-1 w-full", color === 'black' && "justify-end")}>
            {pieces.length === 0 && <span className="text-[9px] text-slate-600 italic">None</span>}
            {pieces.map(p => (
                <div key={p.id} className={clsx("w-3 h-3 rounded-full border shadow-sm", p.color === 'white' ? "bg-slate-200 border-slate-400" : "bg-slate-800 border-slate-600", p.faction === 'gold' && "ring-1 ring-amber-500", p.faction === 'silver' && "ring-1 ring-slate-400")} title={p.type} />
            ))}
        </div>
    </div>
);

export const PhaseIndicator = ({ phase }: { phase: any }) => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-cyber-900/90 backdrop-blur border border-amber-500 px-6 py-3 rounded-lg shadow-2xl shadow-amber-900/20 animate-pulse">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-widest text-center">
                {phase.knightState ? `Phase ${4 - phase.knightState.legsRemaining.length}/3 Active` : "Phase 2 Active"}
            </div>
            <div className="text-[10px] text-slate-300 text-center mt-1">
                {phase.knightState ? `Select next leg (${phase.knightState.legsRemaining.join(', ')})` : "Select final destination or click start piece to cancel"}
            </div>
        </div>
    </div>
);

export const ControlsHelp = () => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-30">
        <div className="bg-cyber-900/80 backdrop-blur border border-cyber-700 px-3 py-2 rounded-lg shadow-lg">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1 text-center">Controls</div>
            <div className="flex gap-4 text-[10px] text-cyan-400">
                <div><span className="font-bold text-white">Click</span> : Move / Phase</div>
                <div><span className="font-bold text-white">Dbl-Click</span> : End Turn</div>
            </div>
        </div>
    </div>
);