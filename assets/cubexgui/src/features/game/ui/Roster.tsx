// game/ui/Roster.tsx
import React from 'react';
import { PieceStats } from '../types';
import { Shield, Sword, AlertTriangle, TrendingUp, Skull } from 'lucide-react';

interface Props {
  pieces: PieceStats[];
  onSelectPiece?: (id: string) => void;
}

const Roster: React.FC<Props> = ({ pieces, onSelectPiece }) => {
  const sortedPieces = [...pieces].sort((a, b) => b.morale - a.morale);

  const getRoleBadge = (role: PieceStats['roleTag']) => {
    switch (role) {
      case 'offensive': return <span className="px-2 py-0.5 rounded text-[10px] bg-red-900/50 text-red-200 border border-red-800 uppercase tracking-wider">Offense</span>;
      case 'defensive': return <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900/50 text-blue-200 border border-blue-800 uppercase tracking-wider">Defense</span>;
      case 'strategic': return <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/50 text-purple-200 border border-purple-800 uppercase tracking-wider">Strategy</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-400 uppercase tracking-wider">Idle</span>;
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-900/50">
        <h3 className="text-lg font-bold text-slate-200">Active Roster & Telemetry</h3>
      </div>

      <div className="flex-grow overflow-y-auto p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 sticky top-0 z-10 text-xs text-slate-400 font-mono uppercase">
            <tr>
              <th className="p-3 border-b border-slate-700">Unit</th>
              <th className="p-3 border-b border-slate-700 text-center">Morale</th>
              <th className="p-3 border-b border-slate-700 text-center">Stats</th>
              <th className="p-3 border-b border-slate-700">Status</th>
              <th className="p-3 border-b border-slate-700 text-right">Coord</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedPieces.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelectPiece?.(p.id)}
                className={`hover:bg-slate-700/50 cursor-pointer transition-colors ${p.captured ? 'opacity-40 grayscale' : ''}`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-8 rounded-full ${p.color === 'white' ? 'bg-slate-200' : 'bg-red-600'}`}></div>
                    <div>
                      <div className="text-sm font-bold text-slate-200">{p.pieceType}</div>
                      <div className="text-xs text-slate-500 font-mono">{p.id}</div>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${p.morale < 40 ? 'bg-red-500' : p.morale < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${p.morale}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono">{p.morale}%</span>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex justify-center space-x-3 text-slate-400">
                    <div className="flex items-center space-x-1" title="Kills">
                      <Sword size={12} /> <span className="text-xs">{p.kills}</span>
                    </div>
                    <div className="flex items-center space-x-1" title="Threatened By">
                      <AlertTriangle size={12} className={p.isExposed ? 'text-red-400' : ''} />
                      {/* FIX: Render the size of the Set, not the Set object itself */}
                      <span className="text-xs">{p.threatenedBy.size}</span>
                    </div>
                    <div className="flex items-center space-x-1" title="Moves">
                      <TrendingUp size={12} /> <span className="text-xs">{p.squaresMoved}</span>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex flex-col space-y-1">
                    <div>{getRoleBadge(p.roleTag)}</div>
                    {p.isExposed && !p.captured && (
                      <div className="flex items-center text-[10px] text-red-400">
                        <AlertTriangle size={10} className="mr-1" /> EXPOSED
                      </div>
                    )}
                    {p.captured && (
                      <div className="flex items-center text-[10px] text-slate-500">
                        <Skull size={10} className="mr-1" /> K.I.A.
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-3 text-right">
                  <code className="text-xs bg-slate-900 px-2 py-1 rounded text-blue-400">
                    {p.position.join(' ')}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roster;