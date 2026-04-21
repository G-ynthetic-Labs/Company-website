// src/App.tsx
import React, { useState } from 'react';
import { Box, BrainCircuit, PenTool, LayoutGrid, ArrowLeft, Terminal } from 'lucide-react';

// --- Module Imports ---
// Importing the features from your modular structure
import GameModule from './features/game/App';
import EditorApp from './features/editor/App';


type ModuleView = 'HOME' | 'GAME' | 'EDITOR';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleView>('HOME');

  // --- Render Active Module ---
  if (activeModule === 'GAME') {
    return (
      <div className="h-screen w-screen flex flex-col">
        <BackButton onClick={() => setActiveModule('HOME')} label="EXIT SIMULATION" />
        <div className="flex-1 overflow-hidden">
          <GameModule />
        </div>
      </div>
    );
  }

  if (activeModule === 'EDITOR') {
    return (
      <div className="h-screen w-screen flex flex-col">
        <BackButton onClick={() => setActiveModule('HOME')} label="RETURN TO NEXUS" />
        <div className="flex-1 overflow-hidden">
          <EditorApp />
        </div>
      </div>
    );
  }



  // --- Main Menu (Nexus) ---
  return (
    <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black flex items-center justify-center">

      <div className="max-w-4xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Title Block */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-900 bg-cyan-950/30 text-cyan-400 text-xs font-mono tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-400 to-slate-800 tracking-tighter">
            CUBEX³
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />

          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Advanced tactical tensor simulation. Engage in hyper-dimensional combat, engineer sentient assets, or converse with the machine spirit.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-4">
            <div className="flex items-center gap-2">
              <Terminal size={14} /> v1.0.4-beta
            </div>
            <div>//</div>
            <div>REACT 19</div>
            <div>//</div>
            <div>THREE.JS</div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 gap-4">
          <MenuCard
            title="TACTICAL SIMULATION"
            desc="Enter the 8x8x8 Tensor Field. HvH or HvAI combat modes."
            icon={Box}
            color="group-hover:text-cyan-400"
            border="group-hover:border-cyan-500/50"
            bg="group-hover:bg-cyan-950/20"
            onClick={() => setActiveModule('GAME')}
          />

          <MenuCard
            title="CHRONOS ARCHITECT"
            desc="Asset Editor. Design pieces, logic, and lore."
            icon={PenTool}
            color="group-hover:text-pink-400"
            border="group-hover:border-pink-500/50"
            bg="group-hover:bg-pink-950/20"
            onClick={() => setActiveModule('EDITOR')}
          />

        </div>

      </div>
    </div>
  );
}

// --- Sub-components ---

const MenuCard = ({ title, desc, icon: Icon, onClick, color, border, bg }: any) => (
  <button
    onClick={onClick}
    className={`group relative text-left p-5 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${border} ${bg}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className={`text-lg font-bold text-slate-200 transition-colors ${color} mb-1 flex items-center gap-2`}>
          {title}
        </h3>
        <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
          {desc}
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-slate-800 group-hover:bg-black transition-colors ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </button>
);

const BackButton = ({ onClick, label }: { onClick: () => void, label: string }) => (
  <div className="absolute top-0 left-0 w-full h-12 z-50 pointer-events-none">
    {/* Only clickable area is the button itself, let events pass through elsewhere */}
    <div className="container mx-auto px-4 h-full flex items-center">
      <button
        onClick={onClick}
        className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-900 transition-all text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
      >
        <ArrowLeft size={12} />
        {label}
      </button>
    </div>
  </div>
);