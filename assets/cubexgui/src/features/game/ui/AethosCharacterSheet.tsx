// src/features/game/ui/AethosCharacterSheet.tsx
import React, { useState, useEffect } from 'react';
import { AethosService, PersistentAI } from '../ai/AethosService';
import { PIECE_PERSONAS } from '../ai/AIProfiles';
import { XPTable } from '../ai/XPTable';

export const AethosCharacterSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('balanced');
  const [profile, setProfile] = useState<PersistentAI | undefined>();

  useEffect(() => {
    AethosService.initialize();
    setProfile(AethosService.getProfile(selectedProfileId));
  }, [selectedProfileId]);

  const base = profile ? PIECE_PERSONAS[profile.profileId] : undefined;
  const nextXp = profile ? XPTable.getNextLevelThreshold(profile.level) : 0;
  const xpPercent = profile ? (profile.xp / nextXp) * 100 : 0;

  return (
    <>
      <style>{AETHOS_STYLES}</style>
      {!profile ? (
        <div className="aethos-sheet-overlay flex items-center justify-center">
          <div className="text-cyan-400 font-mono animate-pulse tracking-[0.2em]">SYNCHRONIZING WITH AETHOS COGNITIVE CORE...</div>
        </div>
      ) : (
        <div className="aethos-sheet-overlay">
          <div className="aethos-sheet-card">
            <header>
              <div className="profile-selector">
                {Object.keys(PIECE_PERSONAS).map(id => (
                  <button
                    key={id}
                    onClick={() => setSelectedProfileId(id)}
                    className={selectedProfileId === id ? 'active' : ''}
                  >
                    {PIECE_PERSONAS[id].name}
                  </button>
                ))}
              </div>
              <button className="close-btn" onClick={onClose}>&times;</button>
            </header>

            <main>
              <div className="identity-section">
                <div className="avatar-placeholder">{base!.name[0]}</div>
                <div className="name-box">
                  <h2>{base!.name}</h2>
                  <p className="description">{base!.description}</p>
                  <div className="level-badge">LVL {profile.level}</div>
                </div>
              </div>

              <div className="xp-bar-container">
                <div className="xp-label">EXPERIENCE: {profile.xp} / {nextXp}</div>
                <div className="xp-track">
                  <div className="xp-fill" style={{ width: `${xpPercent}%` }}></div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card force">
                  <label>FORCE</label>
                  <div className="value">{profile.stats.force}</div>
                  <p>Combat pressure and material greed.</p>
                </div>
                <div className="stat-card flow">
                  <label>FLOW</label>
                  <div className="value">{profile.stats.flow}</div>
                  <p>Positional mobility and spatial networking.</p>
                </div>
                <div className="stat-card form">
                  <label>FORM</label>
                  <div className="value">{profile.stats.form}</div>
                  <p>Structural stability and defensive cohesion.</p>
                </div>
              </div>

              <div className="biases-section">
                <h3>INNATE COGNITIVE BIASES</h3>
                <div className="bias-list">
                  {base!.metricBiases.map((b, i) => (
                    <div key={i} className="bias-item">
                      <span>METRIC {b.indices[0]}</span>
                      <span className="mult">x{b.multiplier.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

const AETHOS_STYLES = `
  .aethos-sheet-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  }
  .aethos-sheet-card {
    width: 800px;
    max-height: 90vh;
    background: #0a0a0c;
    border: 1px solid #333;
    border-top: 4px solid #00f2ff;
    color: #ccc;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 50px rgba(0,242,255,0.1);
  }
  header {
    padding: 1rem;
    border-bottom: 1px solid #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .profile-selector {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    max-width: 90%;
    padding: 2px;
  }
  .profile-selector button {
    background: #111;
    border: 1px solid #222;
    color: #666;
    padding: 4px 12px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.8rem;
    transition: all 0.2s;
  }
  .profile-selector button.active {
    color: #00f2ff;
    border-color: #00f2ff;
    background: rgba(0,242,255,0.05);
  }
  .close-btn {
    background: none;
    border: none;
    color: #555;
    font-size: 2rem;
    cursor: pointer;
  }
  main {
    padding: 2rem;
    overflow-y: auto;
  }
  .identity-section {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .avatar-placeholder {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #00f2ff22, #7000ff22);
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #00f2ff;
    text-shadow: 0 0 10px #00f2ff;
  }
  .name-box h2 {
    margin: 0;
    color: #fff;
    letter-spacing: 2px;
  }
  .level-badge {
    display: inline-block;
    background: #00f2ff;
    color: #000;
    padding: 2px 8px;
    font-weight: bold;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  .xp-bar-container {
    margin-bottom: 2rem;
  }
  .xp-label { font-size: 0.7rem; color: #555; margin-bottom: 4px; }
  .xp-track {
    height: 6px;
    background: #111;
    border: 1px solid #222;
  }
  .xp-fill {
    height: 100%;
    background: #00f2ff;
    box-shadow: 0 0 10px #00f2ff;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .stat-card {
    background: #050505;
    border: 1px solid #222;
    padding: 1rem;
    text-align: center;
  }
  .stat-card label { display: block; font-size: 0.7rem; color: #555; margin-bottom: 0.5rem; }
  .stat-card .value { font-size: 2rem; color: #fff; font-family: monospace; }
  .stat-card p { font-size: 0.7rem; color: #444; margin-top: 0.5rem; }
  .biases-section h3 { font-size: 0.9rem; color: #444; margin-bottom: 1rem; letter-spacing: 1px; }
  .bias-list { display: flex; flex-wrap: wrap; gap: 1rem; }
  .bias-item {
    background: #0c0c0e;
    border: 1px solid #1a1a1c;
    padding: 6px 12px;
    font-size: 0.75rem;
    display: flex;
    gap: 1rem;
  }
  .bias-item .mult { color: #00f2ff; }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
`;
