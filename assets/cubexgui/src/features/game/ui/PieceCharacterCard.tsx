// src/features/game/ui/PieceCharacterCard.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Piece } from '../types';
import { RenderPieceGeometry } from './PieceVisuals';
import { LoreService } from '../ai/LoreService';

interface PieceCharacterCardProps {
    piece: Piece;
    onClose: () => void;
}

export const PieceCharacterCard: React.FC<PieceCharacterCardProps> = ({ piece, onClose }) => {
    const lore = LoreService.getLore(piece.type);
    const stats = piece.stats;

    return (
        <div className="piece-card-overlay">
            <div className="piece-card">
                <button className="close-btn" onClick={onClose}>\u00d7</button>

                <div className="card-header">
                    <div className="avatar-snapshot">
                        <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <RenderPieceGeometry
                                type={piece.type}
                                color={piece.color}
                                faction={piece.faction}
                                isSelected={false}
                            />
                        </Canvas>
                    </div>
                    <div className="header-text">
                        <h3>{lore.title}</h3>
                        <p className="piece-id-tag">{piece.id}</p>
                        <div className="faction-badge" data-faction={piece.faction || 'none'}>
                            {piece.faction?.toUpperCase() || 'UNAFFILIATED'}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="lore-section">
                        <h4>ONTOLOGICAL DATA</h4>
                        <p className="lore-description">{lore.description}</p>
                        <p className="lore-aethos"><strong>AETHOS:</strong> {lore.baseAethos}</p>
                    </div>

                    <div className="telemetry-grid">
                        <div className="tel-item">
                            <label>KILLS</label>
                            <span className="val">{stats?.kills || 0}</span>
                        </div>
                        <div className="tel-item">
                            <label>DISTANCE</label>
                            <span className="val">{stats?.squaresMoved || 0}u</span>
                        </div>
                        <div className="tel-item">
                            <label>MORALE</label>
                            <span className="val">{stats?.morale || 100}%</span>
                        </div>
                        <div className="tel-item">
                            <label>RANK</label>
                            <span className="val">{stats?.rank || 'INITIATE'}</span>
                        </div>
                    </div>

                    <div className="faction-lore">
                        <h4>FACTION DOCTRINE</h4>
                        <p>{piece.faction === 'gold' ? lore.factionNotes.gold : lore.factionNotes.silver}</p>
                    </div>
                </div>

                <style>{`
                    .piece-card-overlay {
                        position: fixed;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(0,0,0,0.7);
                        backdrop-filter: blur(4px);
                        z-index: 10000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .piece-card {
                        width: 450px;
                        background: #0d0d0f;
                        border: 1px solid #222;
                        border-top: 2px solid #fbbf24;
                        position: relative;
                        color: #bbb;
                        font-family: 'Inter', sans-serif;
                    }
                    .close-btn {
                        position: absolute;
                        top: 10px; right: 10px;
                        background: none; border: none;
                        color: #444; font-size: 1.5rem;
                        cursor: pointer; z-index: 10;
                    }
                    .card-header {
                        display: flex;
                        padding: 1.5rem;
                        background: linear-gradient(to bottom, #1a1a1e, #0d0d0f);
                        border-bottom: 1px solid #222;
                    }
                    .avatar-snapshot {
                        width: 120px;
                        height: 120px;
                        background: #000;
                        border: 1px solid #333;
                        margin-right: 1.5rem;
                        box-shadow: inset 0 0 15px rgba(251, 191, 36, 0.1);
                    }
                    .header-text h3 {
                        margin: 0; color: #fff;
                        letter-spacing: 1px; font-size: 1.1rem;
                    }
                    .piece-id-tag {
                        font-size: 0.65rem; color: #555;
                        font-family: monospace; margin: 4px 0;
                    }
                    .faction-badge {
                        display: inline-block;
                        font-size: 0.6rem; padding: 2px 6px;
                        border: 1px solid #333; margin-top: 8px;
                    }
                    .faction-badge[data-faction="gold"] { color: #fbbf24; border-color: #fbbf2433; }
                    .faction-badge[data-faction="silver"] { color: #94a3b8; border-color: #94a3b833; }

                    .card-body { padding: 1.5rem; }
                    
                    h4 {
                        font-size: 0.7rem; color: #444;
                        letter-spacing: 2px; margin-bottom: 0.8rem;
                        border-bottom: 1px solid #1a1a1a;
                        padding-bottom: 4px;
                    }

                    .lore-description { font-size: 0.85rem; line-height: 1.4; color: #999; }
                    .lore-aethos { font-size: 0.75rem; margin-top: 0.5rem; color: #666; }

                    .telemetry-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                        margin: 1.5rem 0;
                        padding: 1rem;
                        background: #050505;
                    }
                    .tel-item { display: flex; flex-direction: column; }
                    .tel-item label { font-size: 0.6rem; color: #555; }
                    .tel-item .val { font-family: monospace; color: #fbbf24; font-size: 0.9rem; }

                    .faction-lore p { font-size: 0.8rem; font-style: italic; color: #777; }
                `}</style>
            </div>
        </div>
    );
};
