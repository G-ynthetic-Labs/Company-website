
import React from 'react';
import { EditorViewport } from './components/EditorViewport';
import { OutlinerPanel, InspectorPanel, LorePanel, TensorInspectorPanel, CompositionPanel } from './components/Panels';
import { useStore } from './store';
import { EditorMode } from './types';
import { Box, Play, LayoutGrid, BrainCircuit, Save, Activity } from 'lucide-react';

const ModeButton: React.FC<{ mode: EditorMode; icon: React.ReactNode; current: EditorMode; set: (m: EditorMode) => void }> = ({ mode, icon, current, set }) => (
    <button 
        onClick={() => set(mode)}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase transition-colors border-b-2 ${
            current === mode 
            ? 'border-editor-accent text-white bg-white/5' 
            : 'border-transparent text-editor-muted hover:text-white hover:bg-white/5'
        }`}
    >
        {icon}
        {mode}
    </button>
);

const App: React.FC = () => {
  const { editorMode, setEditorMode, savePieceToLibrary } = useStore();

  return (
    <div className="flex flex-col w-screen h-screen bg-editor-bg text-editor-text overflow-hidden select-none">
      {/* Top Bar */}
      <div className="h-12 flex items-center justify-between px-4 bg-editor-panel border-b border-editor-border shrink-0">
        <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold font-mono tracking-tighter text-white">
                CHRONOS <span className="text-editor-accent">ARCHITECT</span>
            </h1>
            <div className="h-6 w-px bg-editor-border" />
            <div className="flex">
                <ModeButton mode={EditorMode.MODELING} icon={<Box size={14} />} current={editorMode} set={setEditorMode} />
                <ModeButton mode={EditorMode.ANIMATION} icon={<Play size={14} />} current={editorMode} set={setEditorMode} />
                <ModeButton mode={EditorMode.LORE} icon={<BrainCircuit size={14} />} current={editorMode} set={setEditorMode} />
                <ModeButton mode={EditorMode.GAMESTATE} icon={<Activity size={14} />} current={editorMode} set={setEditorMode} />
                <ModeButton mode={EditorMode.COMPOSITION} icon={<LayoutGrid size={14} />} current={editorMode} set={setEditorMode} />
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={savePieceToLibrary}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-bold transition-colors"
            >
                <Save size={14} />
                SAVE ASSET
            </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Outliner) */}
        <div className="w-64 shrink-0 flex flex-col">
            <OutlinerPanel />
        </div>

        {/* Center Viewport */}
        <div className="flex-1 relative z-0">
            <EditorViewport />
            
            {/* Animation Timeline (Mock) */}
            {editorMode === EditorMode.ANIMATION && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-editor-panel border-t border-editor-border p-2">
                     <div className="flex justify-between items-center mb-2 px-2">
                         <span className="text-xs font-bold text-editor-muted">TIMELINE</span>
                         <div className="flex gap-2">
                             <button className="p-1 hover:bg-white/10 rounded"><Play size={14} /></button>
                         </div>
                     </div>
                     <div className="w-full h-32 bg-black/20 rounded border border-white/5 relative overflow-hidden">
                         <div className="absolute top-0 bottom-0 left-0 w-px bg-red-500 z-10" style={{ left: '20%' }} />
                         {[0,1,2,3].map(i => (
                             <div key={i} className="h-6 mb-1 bg-white/5 flex items-center px-2">
                                 <div className="w-2 h-2 rounded-full bg-editor-accent mx-10" />
                                 <div className="w-2 h-2 rounded-full bg-editor-accent mx-32" />
                             </div>
                         ))}
                     </div>
                </div>
            )}
        </div>

        {/* Right Sidebar (Inspector/Lore/Tensor/Composition) */}
        <div className="shrink-0 flex flex-col z-10 shadow-xl">
            {editorMode === EditorMode.LORE && <LorePanel />}
            {editorMode === EditorMode.GAMESTATE && <TensorInspectorPanel />}
            {editorMode === EditorMode.COMPOSITION && <CompositionPanel />}
            {(editorMode === EditorMode.MODELING || editorMode === EditorMode.ANIMATION) && <InspectorPanel />}
        </div>
      </div>
      
      {/* Footer Status Bar */}
      <div className="h-6 bg-editor-bg border-t border-editor-border flex items-center justify-between px-3 text-[10px] text-editor-muted font-mono">
          <div>READY</div>
          <div>v0.9.3 BETA // MEM: 240MB</div>
      </div>
    </div>
  );
};

export default App;
