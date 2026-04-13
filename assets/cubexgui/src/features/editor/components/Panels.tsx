import React, { useState } from 'react';
import { useStore } from '../store';
import { PieceType, Faction, PrimitiveType, EditorMode, Transform } from '../types';
import { 
    Box, Database, MessagesSquare, Play, RefreshCw, Trash2, Users, Wand2, Settings2, 
    Hexagon, Activity, Radar, BrainCircuit, FileJson, Circle, Triangle, Square, 
    CircleDot, RectangleHorizontal, Save, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { chatWithPiece, generateLore } from '../services/geminiService';
import { PIECE_LIMITS } from '../constants';

// --- Shared UI Components ---
const PanelHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center gap-2 p-3 bg-editor-panel border-b border-editor-border text-xs font-bold uppercase tracking-wider text-editor-muted select-none">
    {icon && <span className="text-editor-accent">{icon}</span>}
    {title}
  </div>
);

const InputRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1 mb-3">
    <label className="text-[10px] uppercase text-editor-muted font-semibold">{label}</label>
    {children}
  </div>
);

// --- Shape Icons ---
const ShapeIcon: React.FC<{ type: PrimitiveType }> = ({ type }) => {
   switch (type) {
       case PrimitiveType.CUBE: return <Box size={14} />;
       case PrimitiveType.SPHERE: return <Circle size={14} />;
       case PrimitiveType.CYLINDER: return <Database size={14} />; // Closest to cylinder
       case PrimitiveType.CONE: return <Triangle size={14} />;
       case PrimitiveType.TORUS: return <CircleDot size={14} />;
       case PrimitiveType.PLANE: return <Square size={14} />;
       case PrimitiveType.CAPSULE: return <RectangleHorizontal size={14} className="rounded-full" />;
       case PrimitiveType.ICOSAHEDRON: return <Hexagon size={14} />;
       case PrimitiveType.DODECAHEDRON: return <Hexagon size={14} />;
       case PrimitiveType.RING: return <CircleDot size={14} />;
       default: return <Box size={14} />;
   }
};

// --- Composition Panel (Deck Builder) ---
export const CompositionPanel: React.FC = () => {
    const { library, selectedPiece } = useStore();
    const [faction, setFaction] = useState<Faction>(Faction.GOLD);
    
    // Mock state for the composition slots. In a real app, this would be in the store.
    // For now, we simulate the "assigned" pieces.
    const [slots, setSlots] = useState<Record<string, string[]>>({
        [PieceType.KING]: [],
        [PieceType.QUEEN]: [],
        [PieceType.FRACTAL_KNIGHT]: [],
        [PieceType.BISHOP]: [],
        [PieceType.KNIGHT]: [],
        [PieceType.ROOK]: [],
        [PieceType.PAWN]: [],
    });

    const assignCurrentToSlot = (type: PieceType) => {
        const currentCount = slots[type].length;
        const limit = PIECE_LIMITS[type];
        
        if (currentCount >= limit) return; // Slot full
        if (selectedPiece.type !== type) return; // Wrong type
        
        setSlots(prev => ({
            ...prev,
            [type]: [...prev[type], selectedPiece.lore.card.name || "Unnamed Piece"]
        }));
    };

    const clearSlot = (type: PieceType, index: number) => {
        setSlots(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const isSetComplete = Object.values(PieceType).every(type => slots[type].length === PIECE_LIMITS[type]);

    return (
        <div className="flex flex-col h-full bg-editor-bg border-l border-editor-border w-96">
            <PanelHeader title="Set Compiler" icon={<Users size={14} />} />
            
            <div className="p-4 border-b border-editor-border">
                <div className="flex gap-2 mb-4">
                     {[Faction.GOLD, Faction.SILVER].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFaction(f)}
                            className={`flex-1 py-2 text-xs font-bold uppercase rounded border ${
                                faction === f 
                                ? f === Faction.GOLD ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-slate-500/20 border-slate-400 text-slate-300'
                                : 'border-editor-border text-editor-muted hover:bg-white/5'
                            }`}
                        >
                            {f} Faction
                        </button>
                    ))}
                </div>
                
                <div className={`p-3 rounded border flex items-center gap-3 ${isSetComplete ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                    {isSetComplete ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                    <div>
                        <div className="text-xs font-bold">{isSetComplete ? "SET VALID" : "SET INCOMPLETE"}</div>
                        <div className="text-[10px] opacity-70">{isSetComplete ? "Ready for compilation." : "Fill all required slots."}</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.values(PieceType).map((type) => {
                    const limit = PIECE_LIMITS[type];
                    const current = slots[type];
                    const isFull = current.length >= limit;

                    return (
                        <div key={type} className="bg-editor-panel rounded border border-editor-border overflow-hidden">
                            <div className="flex items-center justify-between p-2 bg-black/20 border-b border-editor-border">
                                <span className="text-xs font-bold text-white uppercase">{type}</span>
                                <span className={`text-[10px] font-mono ${isFull ? 'text-green-500' : 'text-editor-muted'}`}>
                                    {current.length} / {limit}
                                </span>
                            </div>
                            <div className="p-2 space-y-1">
                                {Array.from({ length: limit }).map((_, i) => {
                                    const assignedName = current[i];
                                    return (
                                        <div key={i} className="flex items-center justify-between h-8 bg-black/40 rounded px-2 border border-white/5">
                                            {assignedName ? (
                                                <>
                                                    <span className="text-xs text-white truncate">{assignedName}</span>
                                                    <button onClick={() => clearSlot(type, i)} className="text-editor-muted hover:text-red-400">
                                                        <Trash2 size={10} />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-between w-full">
                                                    <span className="text-[10px] text-editor-muted italic">Empty Slot</span>
                                                    <button 
                                                        onClick={() => assignCurrentToSlot(type)}
                                                        disabled={selectedPiece.type !== type}
                                                        className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold transition-colors ${
                                                            selectedPiece.type === type 
                                                            ? 'bg-editor-accent text-white hover:bg-blue-600' 
                                                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-editor-border bg-editor-panel">
                <button 
                    disabled={!isSetComplete}
                    className={`w-full py-3 rounded text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${
                        isSetComplete 
                        ? 'bg-green-600 hover:bg-green-500 text-white' 
                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                    }`}
                >
                    <Save size={16} />
                    Compile {faction} Set
                </button>
            </div>
        </div>
    );
};

// --- Tensor Inspector ---
export const TensorInspectorPanel: React.FC = () => {
    const { selectedPiece } = useStore();
    const { risk, reward, relation, rrrState } = selectedPiece.gameStats;

    return (
        <div className="flex flex-col h-full bg-editor-bg border-l border-editor-border w-96">
            <PanelHeader title="Game State Tensor Field" icon={<Activity size={14} />} />
            
            <div className="p-4 overflow-y-auto space-y-6">
                
                {/* RRR Master Evaluation */}
                <div className="bg-editor-panel p-3 rounded border border-editor-border">
                    <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                        <Radar size={12} className="text-purple-400" /> MASTER PIECEWISE EVALUATION
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-black/30 p-2 rounded">
                            <div className="text-[10px] text-red-400 font-bold">RISK (MAT)</div>
                            <div className="text-lg font-mono text-white">{risk}</div>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                            <div className="text-[10px] text-blue-400 font-bold">REWARD (BC)</div>
                            <div className="text-lg font-mono text-white">{reward}</div>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                            <div className="text-[10px] text-green-400 font-bold">RELATION (MP)</div>
                            <div className="text-lg font-mono text-white">{relation}</div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                         <div className="flex justify-between items-center text-xs mb-1">
                             <span className="text-editor-muted">OFFENSE (Off)</span>
                             <span className={`font-mono font-bold ${rrrState.offense > 0 ? 'text-green-500' : rrrState.offense < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                 {rrrState.offense > 0 ? '+1' : rrrState.offense < 0 ? '-1' : '0'}
                             </span>
                         </div>
                         <div className="flex justify-between items-center text-xs mb-1">
                             <span className="text-editor-muted">DEFENSE (Def)</span>
                             <span className={`font-mono font-bold ${rrrState.defense > 0 ? 'text-green-500' : rrrState.defense < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                 {rrrState.defense > 0 ? '+1' : rrrState.defense < 0 ? '-1' : '0'}
                             </span>
                         </div>
                         <div className="flex justify-between items-center text-xs">
                             <span className="text-editor-muted">STRATEGY (Str)</span>
                             <span className={`font-mono font-bold ${rrrState.strategy > 0 ? 'text-green-500' : rrrState.strategy < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                 {rrrState.strategy > 0 ? '+1' : rrrState.strategy < 0 ? '-1' : '0'}
                             </span>
                         </div>
                    </div>
                </div>

                {/* Tensor Cube Viz (Abstract) */}
                <div>
                     <h3 className="text-xs font-bold text-editor-muted mb-2">TENSOR FIELD [512]</h3>
                     <div className="grid grid-cols-8 gap-px bg-editor-border border border-editor-border">
                         {Array.from({ length: 64 }).map((_, i) => (
                             <div 
                                key={i} 
                                className={`aspect-square ${Math.random() > 0.9 ? 'bg-editor-accent/50' : 'bg-editor-panel'} hover:bg-white/20 transition-colors`}
                                title={`Cube ${i}: Base[v], T1, T2, T3`}
                             />
                         ))}
                     </div>
                     <div className="text-[10px] text-editor-muted mt-1 text-right">Slice 1/8 shown</div>
                </div>

                 {/* Feature Layers */}
                 <div className="space-y-2">
                     <div className="text-xs font-bold text-editor-muted">FEATURE EXTRACTION LAYERS</div>
                     {['Base [v1, v2, v3, v4]', 'Tier 1 [Motion Vectors]', 'Tier 2 [Threat Map]', 'Tier 3 [Strategy Graph]'].map((layer, i) => (
                         <div key={i} className="flex items-center justify-between bg-editor-panel px-3 py-2 rounded border border-white/5">
                             <span className="text-xs font-mono text-gray-300">{layer}</span>
                             <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-gray-600'}`} />
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

// --- Outliner ---
export const OutlinerPanel: React.FC = () => {
  const { selectedPiece, selectedPartId, selectPart, addPart, removePart } = useStore();

  return (
    <div className="flex flex-col h-full bg-editor-bg border-r border-editor-border">
      <PanelHeader title="Hierarchy" icon={<Database size={14} />} />
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-xs font-mono mb-2 px-2 py-1 bg-white/5 rounded text-yellow-500 flex justify-between">
           <span>{selectedPiece.faction}</span>
           <span>{selectedPiece.type}</span>
        </div>
        {selectedPiece.parts.map((part) => (
          <div 
            key={part.id}
            onClick={() => selectPart(part.id)}
            className={`flex items-center justify-between p-2 mb-1 rounded cursor-pointer text-xs font-mono transition-colors group ${
              selectedPartId === part.id ? 'bg-editor-accent text-white' : 'hover:bg-editor-panel text-editor-text'
            }`}
          >
            <div className="flex items-center gap-2">
                <div className="opacity-50"><ShapeIcon type={part.type} /></div>
                <span>{part.name}</span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); removePart(part.id); }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400"
            >
                <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="p-2 border-t border-editor-border">
        <div className="text-[10px] text-editor-muted font-bold uppercase mb-2">Add Primitive</div>
        <div className="grid grid-cols-5 gap-1">
            {Object.values(PrimitiveType).map((type) => (
                <button 
                    key={type} 
                    onClick={() => addPart(type)}
                    title={`Add ${type}`}
                    className="flex items-center justify-center p-2 bg-editor-panel hover:bg-white/10 rounded text-editor-muted hover:text-white transition-all hover:scale-105"
                >
                    <ShapeIcon type={type} />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- Inspector ---
export const InspectorPanel: React.FC = () => {
  const { selectedPiece, updatePiece, selectedPartId, updatePart } = useStore();
  const selectedPart = selectedPiece.parts.find(p => p.id === selectedPartId);

  if (!selectedPart && !selectedPartId) {
      return (
        <div className="flex flex-col h-full bg-editor-bg border-l border-editor-border w-80">
            <PanelHeader title="Piece Inspector" icon={<Users size={14} />} />
            <div className="p-4 overflow-y-auto">
                <InputRow label="Name">
                    <input 
                        className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-sm focus:border-editor-accent outline-none text-white"
                        value={selectedPiece.lore.card.name}
                        onChange={(e) => updatePiece({ lore: { ...selectedPiece.lore, card: { ...selectedPiece.lore.card, name: e.target.value } }})}
                    />
                </InputRow>
                <InputRow label="Type">
                    <select 
                        className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-sm outline-none text-white"
                        value={selectedPiece.type}
                        onChange={(e) => updatePiece({ type: e.target.value as PieceType })}
                    >
                        {Object.values(PieceType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </InputRow>
                <InputRow label="Faction">
                    <div className="flex gap-2">
                        {[Faction.GOLD, Faction.SILVER].map(f => (
                            <button 
                                key={f}
                                onClick={() => updatePiece({ faction: f })}
                                className={`flex-1 py-1 text-xs font-bold rounded border ${
                                    selectedPiece.faction === f 
                                    ? f === Faction.GOLD ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-slate-300 text-slate-300 bg-slate-500/10'
                                    : 'border-editor-border text-editor-muted'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </InputRow>
            </div>
        </div>
      );
  }

  if (!selectedPart) return <div className="w-80 bg-editor-bg border-l border-editor-border" />;

  const updateTransform = (axis: number, val: number, field: 'position' | 'rotation' | 'scale') => {
      const newArr = [...selectedPart.transform[field]] as [number, number, number];
      newArr[axis] = val;
      updatePart(selectedPart.id, { transform: { ...selectedPart.transform, [field]: newArr } });
  };
  
  const updateMaterial = (key: string, val: any) => {
    updatePart(selectedPart.id, { material: { ...selectedPart.material, [key]: val } });
  };

  const updateGeometry = (key: string, val: number) => {
    updatePart(selectedPart.id, { geometryParams: { ...selectedPart.geometryParams, [key]: val } });
  };


  return (
    <div className="flex flex-col h-full bg-editor-bg border-l border-editor-border w-80">
      <PanelHeader title="Primitive Inspector" icon={<Settings2 size={14} />} />
      <div className="p-4 overflow-y-auto">
        <div className="mb-4">
            <label className="text-xs text-editor-muted font-mono block mb-1">NAME</label>
            <input 
                className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-sm font-mono text-white"
                value={selectedPart.name}
                onChange={(e) => updatePart(selectedPart.id, { name: e.target.value })}
            />
        </div>

        {/* Transform Controls */}
        {(['position', 'rotation', 'scale'] as const).map((field) => (
            <div key={field} className="mb-4">
                <label className="text-[10px] uppercase text-editor-muted font-bold mb-1 block">{field}</label>
                <div className="grid grid-cols-3 gap-1">
                    {['X', 'Y', 'Z'].map((axis, i) => {
                        const val = selectedPart.transform[field][i];
                        return (
                          <div key={axis} className="relative">
                              <span className="absolute left-2 top-1.5 text-[10px] text-editor-muted pointer-events-none">{axis}</span>
                              <input 
                                  type="number" 
                                  step={0.1}
                                  className="w-full bg-editor-panel rounded pl-5 pr-1 py-1 text-xs font-mono text-right focus:bg-white/10 outline-none border border-transparent focus:border-editor-accent text-white"
                                  value={val}
                                  onChange={(e) => updateTransform(i, parseFloat(e.target.value), field)}
                              />
                          </div>
                        );
                    })}
                </div>
            </div>
        ))}
         <div className="h-px bg-editor-border my-4" />

        {/* Dynamic Geometry Parameters */}
        <PanelHeader title="Shape Geometry" icon={<ShapeIcon type={selectedPart.type} />} />
        <div className="mt-2 space-y-3">
             {Object.entries(selectedPart.geometryParams || {}).map(([key, val]) => (
                 <InputRow key={key} label={key.replace(/([A-Z])/g, ' $1').trim()}>
                     <div className="flex gap-2 items-center">
                        <input 
                            type="range" 
                            min={key.includes('Segment') ? 1 : 0.1} 
                            max={key.includes('Segment') ? 64 : 10} 
                            step={key.includes('Segment') ? 1 : 0.1}
                            className="flex-1"
                            value={val}
                            onChange={(e) => updateGeometry(key, parseFloat(e.target.value))}
                        />
                        <input 
                            type="number" 
                            className="w-12 bg-editor-panel rounded p-1 text-xs text-right border border-editor-border text-white"
                            value={val}
                            onChange={(e) => updateGeometry(key, parseFloat(e.target.value))}
                        />
                     </div>
                 </InputRow>
             ))}
        </div>

        <div className="h-px bg-editor-border my-4" />
        
        <PanelHeader title="Material" />
        <div className="mt-2 space-y-3">
            <InputRow label="Color">
                <input type="color" className="w-full h-8 cursor-pointer rounded bg-transparent" 
                    value={selectedPart.material.color}
                    onChange={(e) => updateMaterial('color', e.target.value)}
                />
            </InputRow>
            <InputRow label="Wireframe">
                 <button 
                    onClick={() => updateMaterial('wireframe', !selectedPart.material.wireframe)}
                    className={`w-full py-1 text-xs border rounded ${selectedPart.material.wireframe ? 'bg-editor-accent border-editor-accent text-white' : 'border-editor-border text-editor-muted'}`}
                 >
                    Toggle Wireframe
                 </button>
            </InputRow>
             <InputRow label="Emissive">
                <input type="color" className="w-full h-8 cursor-pointer rounded bg-transparent" 
                    value={selectedPart.material.emissive}
                    onChange={(e) => updateMaterial('emissive', e.target.value)}
                />
            </InputRow>
        </div>

      </div>
    </div>
  );
};

// --- Lore & Chat Panel ---
export const LorePanel: React.FC = () => {
    const { selectedPiece, updatePiece, addChatMessage } = useStore();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [tab, setTab] = useState<'card' | 'chat'>('card');

    const handleGenerateLore = async () => {
        setLoading(true);
        const card = await generateLore(selectedPiece);
        if (card) {
            updatePiece({ lore: { ...selectedPiece.lore, card } });
        }
        setLoading(false);
    };

    const handleSendChat = async () => {
        if (!input.trim()) return;
        addChatMessage(input, 'user');
        setInput('');
        setLoading(true);
        const response = await chatWithPiece(selectedPiece, input);
        addChatMessage(response, 'model');
        setLoading(false);
    };

    const card = selectedPiece.lore.card;

    return (
        <div className="flex flex-col h-full bg-editor-bg border-l border-editor-border w-96">
            <PanelHeader title="Consciousness Matrix" icon={<Wand2 size={14} />} />
            
            {/* Tabs */}
            <div className="flex border-b border-editor-border">
                <button 
                    onClick={() => setTab('card')} 
                    className={`flex-1 py-2 text-xs font-bold uppercase ${tab === 'card' ? 'text-editor-accent border-b-2 border-editor-accent' : 'text-editor-muted'}`}
                >
                    Character Card
                </button>
                <button 
                    onClick={() => setTab('chat')} 
                    className={`flex-1 py-2 text-xs font-bold uppercase ${tab === 'chat' ? 'text-editor-accent border-b-2 border-editor-accent' : 'text-editor-muted'}`}
                >
                    Chat Link
                </button>
            </div>

            {tab === 'card' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-between items-center">
                         <h3 className="text-sm font-bold text-yellow-500 font-mono">SILLY TAVERN FORMAT</h3>
                         <button onClick={handleGenerateLore} disabled={loading} className="text-xs flex items-center gap-1 text-editor-accent hover:text-white">
                             <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Generate
                         </button>
                    </div>

                    <InputRow label="Name">
                        <input className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-sm text-white" 
                            value={card.name} onChange={(e) => updatePiece({lore: {...selectedPiece.lore, card: {...card, name: e.target.value}}})} />
                    </InputRow>

                    <InputRow label="Description">
                        <textarea className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-xs text-white h-24" 
                            value={card.description} onChange={(e) => updatePiece({lore: {...selectedPiece.lore, card: {...card, description: e.target.value}}})} />
                    </InputRow>

                    <InputRow label="Personality">
                        <textarea className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-xs text-white h-24" 
                            value={card.personality} onChange={(e) => updatePiece({lore: {...selectedPiece.lore, card: {...card, personality: e.target.value}}})} />
                    </InputRow>

                    <InputRow label="First Message">
                        <textarea className="w-full bg-editor-panel border border-editor-border rounded px-2 py-1 text-xs text-white h-16" 
                            value={card.first_mes} onChange={(e) => updatePiece({lore: {...selectedPiece.lore, card: {...card, first_mes: e.target.value}}})} />
                    </InputRow>

                    <div className="p-2 bg-black/30 rounded border border-white/5">
                        <div className="text-[10px] font-mono text-gray-500 mb-1">SYSTEM PROMPT PREVIEW</div>
                        <div className="text-[10px] text-gray-400 line-clamp-4">{card.system_prompt || "No prompt generated yet."}</div>
                    </div>
                </div>
            )}

            {tab === 'chat' && (
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {selectedPiece.lore.chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-2 rounded text-xs ${
                                    msg.role === 'user' ? 'bg-editor-accent text-white' : 'bg-white/10 text-gray-200'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-editor-border bg-editor-panel">
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 bg-black/50 border border-editor-border rounded px-2 py-1 text-sm outline-none focus:border-editor-accent text-white"
                                placeholder={`Message ${card.name}...`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                            />
                            <button onClick={handleSendChat} className="p-1.5 bg-editor-accent rounded hover:bg-blue-600 text-white">
                                <MessagesSquare size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};