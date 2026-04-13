import React, { useState } from 'react';
import { LayerData, CellData } from '../types';
import { Info, Shield, Skull, Target } from 'lucide-react';

interface Props {
  layers: LayerData[];
}

type MapMode = 'control' | 'threat' | 'coverage';

const LayerMap: React.FC<Props> = ({ layers }) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(3); // Start in middle (Z=3)
  const [mapMode, setMapMode] = useState<MapMode>('control');

  const activeLayer = layers.find(l => l.z === activeLayerIndex);

  const getCellColor = (cell: CellData) => {
    if (mapMode === 'control') {
      switch (cell.controlOwner) {
        case 'white': return 'bg-slate-100/20 border-slate-100/40';
        case 'black': return 'bg-red-900/40 border-red-500/40';
        case 'contested': return 'bg-purple-600/30 border-purple-500/40';
        default: return 'bg-slate-900/50 border-slate-800';
      }
    } else if (mapMode === 'threat') {
        // Heatmap for threat density
        const totalThreat = cell.threatCount.white + cell.threatCount.black;
        if (totalThreat === 0) return 'bg-slate-900/50 border-slate-800';
        if (totalThreat < 2) return 'bg-orange-900/30 border-orange-800';
        if (totalThreat < 4) return 'bg-orange-700/40 border-orange-600';
        return 'bg-orange-500/50 border-orange-400';
    } else {
        // Coverage
        const totalCover = cell.coverageCount.white + cell.coverageCount.black;
        if (totalCover === 0) return 'bg-slate-900/50 border-slate-800';
        if (totalCover < 2) return 'bg-blue-900/30 border-blue-800';
        if (totalCover < 4) return 'bg-blue-700/40 border-blue-600';
        return 'bg-blue-500/50 border-blue-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-200">Axial Zone Map</h3>
          <p className="text-xs text-slate-400">Slice View: Z-Axis Layer {activeLayerIndex}</p>
        </div>
        
        <div className="flex space-x-2 bg-slate-900 p-1 rounded-md">
           <button 
             onClick={() => setMapMode('control')}
             className={`px-3 py-1 text-xs rounded transition-colors ${mapMode === 'control' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Control
           </button>
           <button 
             onClick={() => setMapMode('threat')}
             className={`px-3 py-1 text-xs rounded transition-colors ${mapMode === 'threat' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Threat
           </button>
           <button 
             onClick={() => setMapMode('coverage')}
             className={`px-3 py-1 text-xs rounded transition-colors ${mapMode === 'coverage' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Coverage
           </button>
        </div>
      </div>

      {/* Layer Slider */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-xs font-mono text-slate-400">Z-LEVEL</span>
        <input 
          type="range" 
          min="0" 
          max="7" 
          step="1" 
          value={activeLayerIndex}
          onChange={(e) => setActiveLayerIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-lg font-mono font-bold text-blue-400 w-8 text-center">{activeLayerIndex}</span>
      </div>

      {/* Grid */}
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-8 gap-1 p-2 bg-slate-950 rounded border border-slate-700 aspect-square h-full max-h-[500px]">
          {activeLayer?.cells.map((row, y) => (
             row.map((cell, x) => (
               <div 
                 key={`${x}-${y}`} 
                 className={`relative border rounded-sm transition-all duration-300 ${getCellColor(cell)} group`}
               >
                 {/* Piece Indicator */}
                 {cell.pieceId && (
                   <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" />
                 )}
                 
                 {/* Tooltip on Hover */}
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-32 bg-black border border-slate-600 p-2 rounded text-[10px] text-slate-200 pointer-events-none shadow-xl">
                   <div className="font-bold border-b border-slate-700 mb-1">POS: {x}, {y}, {activeLayerIndex}</div>
                   <div>Threats: W{cell.threatCount.white} / B{cell.threatCount.black}</div>
                   <div>Cover: W{cell.coverageCount.white} / B{cell.coverageCount.black}</div>
                   <div>Owner: {cell.controlOwner}</div>
                   {cell.pieceId && <div className="text-yellow-400 mt-1">Piece Present</div>}
                 </div>
               </div>
             ))
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-6 text-xs text-slate-400">
         {mapMode === 'control' && (
           <>
            <div className="flex items-center"><span className="w-3 h-3 bg-slate-200 mr-2 rounded-sm opacity-20 border border-slate-100"></span> White Ctrl</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-900 mr-2 rounded-sm opacity-60 border border-red-500"></span> Black Ctrl</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-purple-900 mr-2 rounded-sm opacity-50 border border-purple-500"></span> Contested</div>
           </>
         )}
         {mapMode !== 'control' && <div className="italic">Brighter colors indicate higher intensity.</div>}
      </div>
    </div>
  );
};

export default LayerMap;