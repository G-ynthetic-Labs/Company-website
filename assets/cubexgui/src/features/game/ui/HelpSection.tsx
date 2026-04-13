

import React from 'react';
import { Crown, Diamond, Sword, Square, Triangle, Shield, Circle, Box, Globe, Move3d, Layers, Eye, PenTool, Cpu, FileBox, Palette } from 'lucide-react';

const PieceCard = ({ title, icon: Icon, children }: any) => (
  <div className="bg-cyber-800/50 border border-cyber-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-cyber-900 rounded-lg border border-cyber-600">
        <Icon className="text-cyan-400" size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-200">{title}</h3>
    </div>
    <div className="text-sm text-slate-400 leading-relaxed pl-1">
      {children}
    </div>
  </div>
);

const StrategyCard = ({ title, icon: Icon, children }: any) => (
  <div className="bg-cyber-900/80 border-l-4 border-emerald-500 rounded-r-lg p-4 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="text-emerald-400" size={18} />
      <h3 className="font-bold text-emerald-100">{title}</h3>
    </div>
    <p className="text-sm text-slate-400">{children}</p>
  </div>
);

const EditorCard = ({ title, icon: Icon, colorClass, children }: any) => (
  <div className="bg-black/40 border border-cyber-700/50 rounded-lg p-4">
     <div className="flex items-center gap-2 mb-2">
      <Icon className={colorClass} size={16} />
      <h3 className={`font-bold uppercase text-xs tracking-wider ${colorClass}`}>{title}</h3>
    </div>
    <div className="text-xs text-slate-400 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

export default function HelpSection() {
    return (
        <div className="w-full h-full bg-black/90 p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 border-b border-cyber-700 pb-6">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
                        TACTICAL DATABASE
                    </h1>
                    <p className="text-slate-400 text-lg">Field Manual for 3D Cubic Combat & Engineering</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Col: Movement Rules */}
                    <div className="xl:col-span-2 space-y-8">
                        
                        {/* EDITOR SECTION */}
                        <div className="bg-cyber-900/30 rounded-xl border border-pink-500/20 p-6">
                            <h2 className="text-xl font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                                <PenTool size={20} /> Engineering Deck (Piece Editor)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <EditorCard title="Visual Design" icon={Palette} colorClass="text-pink-400">
                                    <p>Construct pieces using geometric <strong>Primitives</strong>. Combine Boxes, Spheres, and Crystals to create unique forms.</p>
                                    <p>Use the <strong>Insignia</strong> category to add Crowns, Rings, Sashes, or Shields. These are vital for rank designation.</p>
                                    <p><em>Tip: Hold Ctrl/Cmd to select multiple primitives for Grouping.</em></p>
                                </EditorCard>

                                <EditorCard title="Logic Engine" icon={Cpu} colorClass="text-cyan-400">
                                    <p>The system analyzes your visual design to assign game attributes automatically:</p>
                                    <ul className="list-disc list-inside pl-1 text-[10px] text-slate-500">
                                        <li><strong>King:</strong> Must have Crown or Ring insignia.</li>
                                        <li><strong>General:</strong> Royal/Fractal unit + Insignia.</li>
                                        <li><strong>Commander:</strong> Officer unit + Insignia + Custom Faction Color.</li>
                                        <li><strong>Faction:</strong> Determined by custom primitive colors (Gold/Silver).</li>
                                    </ul>
                                </EditorCard>

                                <EditorCard title="Set Assembly" icon={FileBox} colorClass="text-emerald-400">
                                    <p>Once you design individual pieces, switch to the <strong>ASSEMBLE</strong> tab.</p>
                                    <p>Map your saved designs to specific board slots (e.g., King, Gold Rook, Silver Pawn).</p>
                                    <p>A full set requires <strong>15 unique mappings</strong>. Once complete, click "Apply to Board" to play with your custom army.</p>
                                </EditorCard>

                                <EditorCard title="Animations" icon={Move3d} colorClass="text-amber-400">
                                    <p>Bring pieces to life with procedural animations:</p>
                                    <p><strong>Hover/Float:</strong> Good for flying units.<br/><strong>Spin/Pulse:</strong> Good for energy cores.<br/><strong>Wobble:</strong> Good for organic structures.</p>
                                </EditorCard>
                            </div>
                        </div>

                        {/* MOVEMENT SECTION */}
                         <div>
                            <h2 className="text-xl font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                                <Box size={20} /> Unit Mobility Specs
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PieceCard title="Fractal Knight" icon={Sword}>
                                    <p className="mb-2"><strong className="text-cyan-300">Phase Maneuver:</strong> Moves in an "L" shape (2,1) along any axes.</p>
                                    <p className="text-xs bg-cyber-900/50 p-2 rounded border border-cyber-700/50">
                                        <span className="text-emerald-400 font-bold">ABILITY:</span> After the first move, can execute a second "L" move. 
                                        <br/><br/>
                                        <span className="text-slate-300">Controls:</span> 
                                        <br/>• Single Click destination: Prepare Phase 2.
                                        <br/>• Double Click destination: End turn immediately.
                                    </p>
                                </PieceCard>

                                <PieceCard title="Rook (Heavy)" icon={Square}>
                                    <p className="mb-2">Moves unlimited distance orthogonally (straight lines).</p>
                                    <p className="text-xs bg-cyber-900/50 p-2 rounded border border-cyber-700/50">
                                        <span className="text-emerald-400 font-bold">PHASE SHIFT:</span> If the first move is &lt; 4 squares, may trigger Phase 2 to change direction (Orthogonal only). 
                                        <br/>Total movement cap: 8 squares.
                                    </p>
                                </PieceCard>

                                <PieceCard title="Bishop (Sniper)" icon={Triangle}>
                                    <p className="mb-2">Moves unlimited distance diagonally (2-axis planes).</p>
                                    <p className="text-xs bg-cyber-900/50 p-2 rounded border border-cyber-700/50">
                                        <span className="text-emerald-400 font-bold">PHASE SHIFT:</span> If the first move is &lt; 4 squares, may trigger Phase 2 to change diagonal slope.
                                        <br/>Total movement cap: 8 squares.
                                    </p>
                                </PieceCard>

                                <PieceCard title="Knight (Leaper)" icon={Shield}>
                                    <p>Moves in a fixed <strong>2-3-3</strong> pattern along X, Y, Z axes.</p>
                                    <p className="mt-2 text-xs text-slate-500">Must move exactly 2 squares on one axis, 3 on another, and 3 on the third. Jumps over obstacles.</p>
                                </PieceCard>

                                <PieceCard title="Queen (Omni)" icon={Diamond}>
                                    <p>Unlimited movement in any single direction:</p>
                                    <ul className="list-disc list-inside mt-1 text-xs text-slate-400">
                                        <li>Orthogonal (Straight)</li>
                                        <li>Diagonal (2-Axis)</li>
                                        <li>Triagonal (3D Corner-to-Corner)</li>
                                    </ul>
                                </PieceCard>

                                <PieceCard title="King (Command)" icon={Crown}>
                                    <p>Moves exactly 1 square in any direction (26 possible neighbors).</p>
                                </PieceCard>

                                <PieceCard title="Pawn (Infantry)" icon={Circle}>
                                    <p className="mb-2">Moves Forward or Sideways 1 square. No backward steps.</p>
                                    <p className="text-xs text-red-400 border-l-2 border-red-500 pl-2">
                                        <strong>Capture:</strong> Attacks diagonally on shared orthogonal planes (e.g. Forward-Left, Forward-Up).
                                    </p>
                                </PieceCard>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: 3D Strategy */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={20} /> Hyper-Volume Strategy
                        </h2>
                        
                        <StrategyCard title="Vertical Envelopment" icon={Layers}>
                            In 3D, walls are not enough. Attacks can come from the "Ceiling" (Top Down) or "Floor" (Bottom Up). Always check your King's Z-axis exposure.
                        </StrategyCard>

                        <StrategyCard title="The Core Control" icon={Move3d}>
                            The mathematical center of the cube (Layers 3 & 4) offers maximum mobility but maximum exposure. Occupying the core allows rapid deployment to any face of the cube.
                        </StrategyCard>

                        <StrategyCard title="Occlusion Tactics" icon={Eye}>
                            Pieces can hide behind others in 3D space. Use your pawns to create "shadows" where your valuable pieces cannot be targeted by enemy Rooks or Bishops.
                        </StrategyCard>

                        <StrategyCard title="The Triagonal Sniper" icon={Triangle}>
                            The Queen and King are the only units that can traverse "Triagonals" (Corner to Corner). These lines are often overlooked. A Queen on a triagonal can pin a piece from across the entire cube volume.
                        </StrategyCard>

                        <div className="bg-gradient-to-br from-cyber-900 to-black p-6 rounded-lg border border-pink-500/30 mt-8">
                            <h3 className="text-pink-400 font-bold mb-2 uppercase text-sm">Interaction Protocol</h3>
                            <div className="space-y-3 text-xs text-slate-400">
                                <div className="flex gap-2">
                                    <span className="text-white font-bold bg-cyber-700 px-1 rounded">CLICK</span>
                                    <span>Select Piece / Execute Phase 1 Move (starts timer)</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-white font-bold bg-pink-600 px-1 rounded">DBL-CLICK</span>
                                    <span>Execute Move & End Turn Immediately</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-white font-bold bg-cyan-600 px-1 rounded">R-CLICK</span>
                                    <span>Rotate Camera (3D View)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}