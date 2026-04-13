import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { MatchStats } from '../types';

interface Props {
  matchStats: MatchStats;
}

const StrategicRadar: React.FC<Props> = ({ matchStats }) => {
  // Mapping deltas to a standard 0-8 scale for visualization
  // Delta range is -4 (Black Adv) to +4 (White Adv)
  // We want to split this into two polygons for the Radar chart to compare "Performance"
  
  // Let's model it as: Center (0) is neutral. 
  // However, Radar charts are better with absolute magnitudes. 
  // Let's transform:
  // Axis 1: Material (Risk)
  // Axis 2: Control (Reward)
  // Axis 3: Morale (Relation)
  
  const processDelta = (delta: number) => {
    // Input -4 to 4. 
    // Return { white: 4 + delta, black: 4 - delta }
    // if delta is +4 (White dominator), White=8, Black=0
    // if delta is -4 (Black dominator), White=0, Black=8
    // if delta is 0, White=4, Black=4
    return {
      white: Math.max(0, 4 + delta),
      black: Math.max(0, 4 - delta)
    };
  };

  const risk = processDelta(matchStats.riskDelta);
  const reward = processDelta(matchStats.rewardDelta);
  const relation = processDelta(matchStats.relationDelta);

  const data = [
    { subject: 'Material (Risk)', A: risk.white, B: risk.black, fullMark: 8 },
    { subject: 'Control (Reward)', A: reward.white, B: reward.black, fullMark: 8 },
    { subject: 'Morale (Relation)', A: relation.white, B: relation.black, fullMark: 8 },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-200 mb-2">Strategic Tensor Field</h3>
      <p className="text-xs text-slate-400 mb-4">Comparison of structural advantages along the three strategic axes.</p>
      
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 8]} tick={false} axisLine={false} />
            
            <Radar
              name="White Alliance"
              dataKey="A"
              stroke="#f8fafc"
              strokeWidth={3}
              fill="#f8fafc"
              fillOpacity={0.3}
            />
            <Radar
              name="Black Syndicate"
              dataKey="B"
              stroke="#ef4444"
              strokeWidth={3}
              fill="#ef4444"
              fillOpacity={0.3}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#e2e8f0' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="p-2 bg-slate-900 rounded border border-slate-700">
           <div className="text-xs text-slate-400">Risk Delta</div>
           <div className={`text-xl font-mono font-bold ${matchStats.riskDelta > 0 ? 'text-white' : matchStats.riskDelta < 0 ? 'text-red-500' : 'text-slate-500'}`}>
             {matchStats.riskDelta > 0 ? '+' : ''}{matchStats.riskDelta}
           </div>
        </div>
        <div className="p-2 bg-slate-900 rounded border border-slate-700">
           <div className="text-xs text-slate-400">Reward Delta</div>
           <div className={`text-xl font-mono font-bold ${matchStats.rewardDelta > 0 ? 'text-white' : matchStats.rewardDelta < 0 ? 'text-red-500' : 'text-slate-500'}`}>
             {matchStats.rewardDelta > 0 ? '+' : ''}{matchStats.rewardDelta}
           </div>
        </div>
        <div className="p-2 bg-slate-900 rounded border border-slate-700">
           <div className="text-xs text-slate-400">Relation Delta</div>
           <div className={`text-xl font-mono font-bold ${matchStats.relationDelta > 0 ? 'text-white' : matchStats.relationDelta < 0 ? 'text-red-500' : 'text-slate-500'}`}>
             {matchStats.relationDelta > 0 ? '+' : ''}{matchStats.relationDelta}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicRadar;