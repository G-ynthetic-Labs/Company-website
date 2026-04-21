// game/ui/PromotionModal.tsx
import React from 'react';
import { ArrowUpCircle } from 'lucide-react';
import clsx from 'clsx';
import { GameState, PieceType } from '../types';
import { Action } from '../state/gameReducer';

interface PromotionModalProps {
    state: GameState;
    dispatch: React.Dispatch<Action>;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ state, dispatch }) => {
    const promotableRescues = state.capturedPieces.filter(p => p.color === state.turn);

    return (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-cyber-900 border border-cyber-500 rounded-xl p-6 shadow-2xl max-w-lg w-full animate-fadeIn">
                <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <ArrowUpCircle size={24} /> Field Promotion
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Standard Commission</h3>
                        <div className="space-y-2">
                            {['Queen', 'Rook', 'FractalKnight', 'Bishop', 'Knight'].map(t => (
                                <button key={t} onClick={() => dispatch({type: 'PROMOTE_PIECE', newType: t as PieceType})}
                                    className="w-full text-left px-3 py-2 bg-cyber-800 border border-cyber-700 hover:border-cyan-500 rounded text-sm hover:text-cyan-400 transition-colors">
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-amber-400 uppercase mb-3">Rescue Operation</h3>
                        {promotableRescues.length === 0 ? (
                            <div className="text-xs text-slate-600 italic p-4 text-center border border-cyber-800 border-dashed rounded">
                                No friendly units available for rescue.
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                {promotableRescues.map(p => (
                                    <button key={p.id} onClick={() => dispatch({type: 'PROMOTE_PIECE', restoreId: p.id})}
                                        className="w-full flex items-center gap-2 px-3 py-2 bg-cyber-800/50 border border-cyber-700 hover:border-amber-500 rounded text-sm hover:text-amber-400 transition-colors">
                                        <div className={clsx("w-2 h-2 rounded-full", p.faction === 'gold' ? "bg-amber-500" : "bg-slate-400")}/>
                                        <span>{p.type} <span className="text-[9px] opacity-50 ml-1">{p.faction || 'Std'}</span></span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};