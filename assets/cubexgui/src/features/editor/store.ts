
import { create } from 'zustand';
import { ChessPiece, EditorMode, PiecePart, PrimitiveType, Faction, PieceType } from './types';
import { DEFAULT_PIECE, MOCK_ID, DEFAULT_MATERIAL, PRIMITIVE_DEFAULTS, DEFAULT_SILLY_TAVERN_CARD } from './constants';
import { calculatePieceStats } from './services/rulesEngine';

interface AppState {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;

  library: ChessPiece[];
  selectedPiece: ChessPiece;
  selectedPartId: string | null;

  // Actions
  selectPiece: (id: string) => void;
  updatePiece: (updates: Partial<ChessPiece>) => void;
  addPart: (type: PrimitiveType) => void;
  updatePart: (id: string, updates: Partial<PiecePart>) => void;
  removePart: (id: string) => void;
  selectPart: (id: string | null) => void;
  
  createNewPiece: () => void;
  savePieceToLibrary: () => void;
  
  // Chat
  addChatMessage: (text: string, role: 'user' | 'model') => void;
}

export const useStore = create<AppState>((set, get) => ({
  editorMode: EditorMode.MODELING,
  setEditorMode: (mode) => set({ editorMode: mode }),

  library: [DEFAULT_PIECE],
  selectedPiece: JSON.parse(JSON.stringify(DEFAULT_PIECE)), // Deep copy init
  selectedPartId: null,

  selectPiece: (id) => {
    const piece = get().library.find((p) => p.id === id);
    if (piece) {
      set({ selectedPiece: JSON.parse(JSON.stringify(piece)), selectedPartId: null });
    }
  },

  updatePiece: (updates) => {
    set((state) => {
        const newPiece = { ...state.selectedPiece, ...updates };
        
        // Recalculate stats if type/faction changes
        if (updates.type || updates.faction) {
            newPiece.gameStats = calculatePieceStats(newPiece.type, newPiece.faction);
        }

        return { selectedPiece: newPiece };
    });
  },

  addPart: (type) => {
    const defaultParams = PRIMITIVE_DEFAULTS[type] || {};
    const newPart: PiecePart = {
      id: MOCK_ID(),
      type,
      name: `${type} ${Math.floor(Math.random() * 100)}`,
      transform: { position: [0, 1, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      material: { ...DEFAULT_MATERIAL },
      geometryParams: { ...defaultParams }
    };
    set((state) => ({
      selectedPiece: {
        ...state.selectedPiece,
        parts: [...state.selectedPiece.parts, newPart]
      },
      selectedPartId: newPart.id
    }));
  },

  updatePart: (id, updates) => {
    set((state) => ({
      selectedPiece: {
        ...state.selectedPiece,
        parts: state.selectedPiece.parts.map((p) => p.id === id ? { ...p, ...updates } : p)
      }
    }));
  },

  removePart: (id) => {
    set((state) => ({
      selectedPiece: {
        ...state.selectedPiece,
        parts: state.selectedPiece.parts.filter((p) => p.id !== id)
      },
      selectedPartId: state.selectedPartId === id ? null : state.selectedPartId
    }));
  },

  selectPart: (id) => set({ selectedPartId: id }),

  createNewPiece: () => {
    const newPiece: ChessPiece = {
      ...DEFAULT_PIECE,
      id: MOCK_ID(),
      parts: [],
      lore: { card: { ...DEFAULT_SILLY_TAVERN_CARD }, chatHistory: [] },
      gameStats: calculatePieceStats(PieceType.KING, Faction.GOLD)
    };
    set({ selectedPiece: newPiece, selectedPartId: null });
  },

  savePieceToLibrary: () => {
    const { selectedPiece, library } = get();
    const exists = library.find(p => p.id === selectedPiece.id);
    if (exists) {
        set({ library: library.map(p => p.id === selectedPiece.id ? selectedPiece : p) });
    } else {
        set({ library: [...library, selectedPiece] });
    }
  },

  addChatMessage: (text, role) => {
    set((state) => ({
      selectedPiece: {
        ...state.selectedPiece,
        lore: {
          ...state.selectedPiece.lore,
          chatHistory: [...state.selectedPiece.lore.chatHistory, { role, text }]
        }
      }
    }));
  }
}));
