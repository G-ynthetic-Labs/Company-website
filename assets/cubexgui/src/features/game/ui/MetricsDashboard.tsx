import React, { useState } from 'react';
import { DetailedMetrics } from '../types';
import { Shield, Sword, Users, Scale, AlertTriangle, Activity, BarChart3 } from 'lucide-react';

interface Props {
  metrics: DetailedMetrics;
}

const MetricsDashboard: React.FC<Props> = ({ metrics }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'risk' | 'reward' | 'relation'>('summary');

  const getStanceLabel = (val: number, type: 'risk' | 'reward' | 'relation') => {
    // Risk = Off, Reward = Def, Relation = Str
    if (val === 1) return { text: "OPPONENT ADVANTAGE", color: "text-red-500" };
    if (val === -1) return { text: "PLAYER DOMINANT", color: "text-blue-500" };
    return { text: "NEUTRAL / CONTESTED", color: "text-slate-400" };
  };

  const getAxisLabel = (type: 'risk' | 'reward' | 'relation') => {
      switch(type) {
          case 'risk': return "OFFENSIVE (Risk)";
          case 'reward': return "DEFENSIVE (Reward)";
          case 'relation': return "STRATEGIC (Relation)";
      }
  }

  const renderSummaryCard = (title: string, value: number, max: number, status: number, type: 'risk' | 'reward' | 'relation') => {
     const percent = Math.min(100, Math.max(0, 50 + (value / max) * 50)); // Normalize delta to percentage
     const stance = getStanceLabel(status, type);
     
     return (
        <div className="bg-slate-900/50 p-4 rounded border border-slate-700 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">{getAxisLabel(type)}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border ${value > 0 ? 'text-red-400 border-red-900' : value < 0 ? 'text-blue-400 border-blue-900' : 'text-slate-400 border-slate-700'}`}>
                    Δ {value > 0 ? '+' : ''}{value}
                </span>
            </div>
            
            <div className="mb-2">
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-blue-600 h-full" style={{ width: '50%' }}></div>
                    <div className="bg-red-600 h-full" style={{ width: '50%' }}></div>
                 </div>
                 {/* Indicator */}
                 <div className="relative w-full h-2 -mt-2">
                    <div className="absolute top-0 w-1 h-4 bg-white shadow-[0_0_10px_white]" style={{ left: `${percent}%`, transform: 'translateY(-2px)' }}></div>
                 </div>
            </div>

            <div className={`text-xs font-bold ${stance.color} text-center mt-2 border-t border-slate-800 pt-2`}>
                {stance.text}
            </div>
        </div>
     );
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-700">
        <button 
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors ${activeTab === 'summary' ? 'bg-slate-700 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
        >
            Master View
        </button>
        <button 
            onClick={() => setActiveTab('risk')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors ${activeTab === 'risk' ? 'bg-slate-700 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
        >
            Risk (Mat)
        </button>
        <button 
            onClick={() => setActiveTab('reward')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors ${activeTab === 'reward' ? 'bg-slate-700 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
        >
            Reward (Ctrl)
        </button>
        <button 
            onClick={() => setActiveTab('relation')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-colors ${activeTab === 'relation' ? 'bg-slate-700 text-white border-b-2 border-blue-500' : 'text-slate-400'}`}
        >
            Relation (Mor)
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-grow">
        
        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderSummaryCard("Risk", metrics.risk.delta, 20, metrics.risk.status, 'risk')}
                    {renderSummaryCard("Reward", metrics.reward.delta, 20, metrics.reward.status, 'reward')}
                    {renderSummaryCard("Relation", metrics.relation.delta, 20, metrics.relation.status, 'relation')}
                </div>

                <div className="bg-slate-900/40 p-4 rounded border border-slate-700">
                    <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
                        <Activity size={16} className="text-blue-400"/>
                        Master Piecewise Evaluation
                    </h4>
                    <div className="text-sm text-slate-400 space-y-2">
                        <p>The system evaluates the game state tensor field (Tf) across three axes. Current vector summation suggests:</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-black/30 p-3 rounded">
                                <div className="text-xs text-slate-500 uppercase">Opponent Stance</div>
                                <div className="text-lg font-mono text-white">
                                    {metrics.risk.status + metrics.reward.status + metrics.relation.status > 0 ? 'AGGRESSIVE' : 
                                     metrics.risk.status + metrics.reward.status + metrics.relation.status < 0 ? 'DEFENSIVE' : 'BALANCED'}
                                </div>
                            </div>
                            <div className="bg-black/30 p-3 rounded">
                                <div className="text-xs text-slate-500 uppercase">Projected Intensity</div>
                                <div className="text-lg font-mono text-white">LEVEL {Math.abs(metrics.risk.delta) + Math.abs(metrics.relation.delta)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* RISK TAB */}
        {activeTab === 'risk' && (
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-900 p-4 rounded border border-slate-700">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">{metrics.risk.whiteMaterial}</div>
                        <div className="text-xs text-slate-400 uppercase">White Material</div>
                    </div>
                    <div className="text-xl font-bold text-slate-500">VS</div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{metrics.risk.blackMaterial}</div>
                        <div className="text-xs text-slate-400 uppercase">Black Material</div>
                    </div>
                </div>

                <div className="overflow-hidden rounded border border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-xs text-slate-400 uppercase">
                            <tr>
                                <th className="p-3">Unit Type</th>
                                <th className="p-3 text-center">Value</th>
                                <th className="p-3 text-center">White</th>
                                <th className="p-3 text-center">Black</th>
                                <th className="p-3 text-right">Net</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 bg-slate-800/50">
                            {metrics.risk.breakdown.map((item) => (
                                <tr key={item.type} className="hover:bg-slate-700/30">
                                    <td className="p-3 font-medium text-slate-200">{item.type}</td>
                                    <td className="p-3 text-center text-slate-500 font-mono">{item.value}</td>
                                    <td className="p-3 text-center text-white">{item.whiteCount}</td>
                                    <td className="p-3 text-center text-red-400">{item.blackCount}</td>
                                    <td className={`p-3 text-right font-mono ${item.blackCount * item.value - item.whiteCount * item.value > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                                        {item.blackCount * item.value - item.whiteCount * item.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* REWARD TAB */}
        {activeTab === 'reward' && (
            <div className="space-y-4">
                 <div className="flex justify-between items-center bg-slate-900 p-4 rounded border border-slate-700">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{metrics.reward.whiteControl}</div>
                        <div className="text-xs text-slate-400 uppercase">White Control</div>
                    </div>
                    <div className="text-xl font-bold text-slate-500">VS</div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{metrics.reward.blackControl}</div>
                        <div className="text-xs text-slate-400 uppercase">Black Control</div>
                    </div>
                </div>

                <div className="grid gap-3">
                    {metrics.reward.components.map((comp, idx) => (
                        <div key={idx} className="bg-slate-900/30 p-3 rounded border border-slate-700 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">{comp.label}</span>
                            <div className="flex items-center space-x-4 text-sm font-mono">
                                <span className="text-blue-300">{comp.whiteValue}</span>
                                <span className="text-slate-600">|</span>
                                <span className="text-red-300">{comp.blackValue}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-900/50 text-xs text-blue-200">
                    <Shield size={14} className="inline mr-2"/>
                    Control score aggregates valid moves, check penalties (-40), and shielding bonuses.
                </div>
            </div>
        )}

        {/* RELATION TAB */}
        {activeTab === 'relation' && (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded border border-slate-700">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Users size={16}/> White Alliance</h4>
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-yellow-500">Gold Faction</span>
                                <span className="font-mono text-white">{metrics.relation.subteams.white.gold}</span>
                             </div>
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full" style={{ width: `${(metrics.relation.subteams.white.gold / metrics.relation.whiteMorale) * 100}%` }}></div>
                             </div>

                             <div className="flex justify-between text-sm pt-2">
                                <span className="text-slate-300">Silver Faction</span>
                                <span className="font-mono text-white">{metrics.relation.subteams.white.silver}</span>
                             </div>
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-slate-300 h-full" style={{ width: `${(metrics.relation.subteams.white.silver / metrics.relation.whiteMorale) * 100}%` }}></div>
                             </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                            <div className="text-2xl font-bold text-white">{metrics.relation.whiteMorale}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Total Morale</div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded border border-red-900/30">
                        <h4 className="text-red-500 font-bold mb-4 flex items-center gap-2"><Users size={16}/> Black Syndicate</h4>
                         <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-yellow-600">Gold Faction</span>
                                <span className="font-mono text-white">{metrics.relation.subteams.black.gold}</span>
                             </div>
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-yellow-600 h-full" style={{ width: `${(metrics.relation.subteams.black.gold / metrics.relation.blackMorale) * 100}%` }}></div>
                             </div>

                             <div className="flex justify-between text-sm pt-2">
                                <span className="text-slate-400">Silver Faction</span>
                                <span className="font-mono text-white">{metrics.relation.subteams.black.silver}</span>
                             </div>
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-slate-500 h-full" style={{ width: `${(metrics.relation.subteams.black.silver / metrics.relation.blackMorale) * 100}%` }}></div>
                             </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                            <div className="text-2xl font-bold text-red-500">{metrics.relation.blackMorale}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Total Morale</div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded border border-slate-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-xs text-slate-400 uppercase">
                            <tr>
                                <th className="p-2">Unit</th>
                                <th className="p-2 text-center">MP Value</th>
                                <th className="p-2 text-center">W. Count</th>
                                <th className="p-2 text-center">B. Count</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 bg-slate-800/50">
                             {metrics.relation.breakdown.map((item) => (
                                <tr key={item.type} className="hover:bg-slate-700/30">
                                    <td className="p-2 font-medium text-slate-200">{item.type}</td>
                                    <td className="p-2 text-center text-slate-500 font-mono">{item.value}</td>
                                    <td className="p-2 text-center text-white">{item.whiteCount}</td>
                                    <td className="p-2 text-center text-red-400">{item.blackCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default MetricsDashboard;