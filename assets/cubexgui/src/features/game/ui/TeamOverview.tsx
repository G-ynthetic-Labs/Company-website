import React from 'react';
import { TeamStats } from '../types';
import { Users, Crosshair, ShieldAlert, Crown } from 'lucide-react';

interface Props {
  white: TeamStats;
  black: TeamStats;
}

const TeamOverview: React.FC<Props> = ({ white, black }) => {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* White Team */}
      <div className="bg-slate-800/80 border border-slate-600 rounded-lg p-4 flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Crown size={100} />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{white.name}</h3>
        <p className="text-sm text-slate-400 mb-6">Alliance Command</p>
        
        <div className="space-y-4 font-mono">
            <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><Users size={14}/> MORALE</span>
                <span className={`font-bold ${white.morale > 50 ? 'text-green-400' : 'text-yellow-400'}`}>{white.morale}%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><Crosshair size={14}/> KILLS</span>
                <span className="font-bold text-white">{white.totalKills}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><ShieldAlert size={14}/> IN CHECK</span>
                <span className="font-bold text-white">{white.timesInCheck}</span>
            </div>
             <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2">CONTROL SCORE</span>
                <span className="font-bold text-blue-400">{white.boardControlScore}</span>
            </div>
        </div>
      </div>

      {/* Black Team */}
      <div className="bg-slate-900/90 border border-red-900/30 rounded-lg p-4 flex flex-col relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-red-600">
            <Crown size={100} />
        </div>
        <h3 className="text-xl font-bold text-red-500 mb-1">{black.name}</h3>
        <p className="text-sm text-slate-400 mb-6">Syndicate HQ</p>
        
        <div className="space-y-4 font-mono">
            <div className="flex justify-between items-center p-2 bg-black/40 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><Users size={14}/> MORALE</span>
                <span className={`font-bold ${black.morale > 50 ? 'text-red-300' : 'text-red-600'}`}>{black.morale}%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-black/40 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><Crosshair size={14}/> KILLS</span>
                <span className="font-bold text-white">{black.totalKills}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-black/40 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2"><ShieldAlert size={14}/> IN CHECK</span>
                <span className="font-bold text-white">{black.timesInCheck}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-black/40 rounded">
                <span className="text-xs text-slate-400 flex items-center gap-2">CONTROL SCORE</span>
                <span className="font-bold text-red-400">{black.boardControlScore}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;