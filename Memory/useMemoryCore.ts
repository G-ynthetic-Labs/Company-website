// G_synthetic/hooks/useMemoryCore.ts
import React, { useState, useEffect, useRef } from 'react';
import { 
    MemoryNode, ContentRegistry, LogItem, FaceType, 
    LLMConfig, RoleplayConfig, MnemosyneAnalysis
} from '../types';
import { generateHash, getNextCoordinate, cosineSimilarity } from '../services/mnemosyneUtils';
import { runLLMGenerationAndAnalysis } from '../services/runLlmService';

// Fallback vector if API fails (768 dims zeroed - standard for Gemini/Ollama)
const EMPTY_VECTOR_768 = new Array(768).fill(0);

export interface MemoryAPI {
    // Memory Data
    lattices: MemoryNode[][];
    setLattices: React.Dispatch<React.SetStateAction<MemoryNode[][]>>;
    registry: ContentRegistry;
    setRegistry: React.Dispatch<React.SetStateAction<ContentRegistry>>;
    linearLog: LogItem[];
    setLinearLog: React.Dispatch<React.SetStateAction<LogItem[]>>;
    
    // UI/Input State
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    bottomRef: React.RefObject<HTMLDivElement>;
    
    // Visualization State
    isQuantumMode: boolean;
    setIsQuantumMode: React.Dispatch<React.SetStateAction<boolean>>;
    quantumSlice: MemoryNode[];
    viewLatticeIndex: number;
    setViewLatticeIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedNode: MemoryNode | null;
    setSelectedNode: React.Dispatch<React.SetStateAction<MemoryNode | null>>;

    // Core Logic Functions (The API)
    handleSendMessage: (rpConfig: RoleplayConfig, llmConfig: LLMConfig) => Promise<void>;
    toggleQuantumMode: () => Promise<void>;
}

export const useMemoryCore = (): MemoryAPI => {
    // --- Core Memory State ---
    const [lattices, setLattices] = useState<MemoryNode[][]>([[]]); 
    const [registry, setRegistry] = useState<ContentRegistry>({});
    const [linearLog, setLinearLog] = useState<LogItem[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // --- View State ---
    const [isQuantumMode, setIsQuantumMode] = useState(false);
    const [quantumSlice, setQuantumSlice] = useState<MemoryNode[]>([]);
    const [viewLatticeIndex, setViewLatticeIndex] = useState(0);
    const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null);
    
    const bottomRef = useRef<HTMLDivElement>(null);

    // --- Effects ---
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [linearLog, isLoading]);

    useEffect(() => {
        // Update View Index if we create a new lattice and we are watching the tail
        if (lattices.length - 1 > viewLatticeIndex) {
            if (lattices[viewLatticeIndex].length === 343) {
                 setViewLatticeIndex(lattices.length - 1);
            }
        }
    }, [lattices.length, viewLatticeIndex]);

    // --- Core Logic: Write to G-ynthetic ---
    const handleSendMessage = async (rpConfig: RoleplayConfig, llmConfig: LLMConfig) => {
        if (!input.trim() || isLoading) return;

        const currentUserInput = input;
        setInput('');
        setIsLoading(true);
        
        // FIX: Use userName for user log, not characterName (which is AI now)
        const userLogItem: LogItem = { 
            role: 'user', 
            text: currentUserInput,
            name: rpConfig.userName, 
            avatar: rpConfig.userAvatar
        };

        const newLog = [...linearLog, userLogItem];
        setLinearLog(newLog);

        try {
            // 1. Prepare System Instruction (Updated for separated identities)
            const systemInstruction = `
                ${rpConfig.persona}
                [SYSTEM CONTEXT]
                Current World: ${rpConfig.worldName}
                User: ${rpConfig.userName}
                Your Character Name: ${rpConfig.aiName}
                [INSTRUCTION]
                Engage in the roleplay. Adhere strictly to the persona described.
            `;
            
            // Set the dynamic system instruction on the LLM Config
            const dispatchedConfig = { ...llmConfig, systemInstruction };

            // 2. DISPATCH to Universal LLM Service
            const { aiResponseText, analysis } = await runLLMGenerationAndAnalysis(
                newLog,
                currentUserInput,
                dispatchedConfig
            );

            // 3. Process Analysis and Hash Components
            const inputHash = generateHash(currentUserInput);
            const outputHash = generateHash(aiResponseText);
            const sceneHash = generateHash(analysis.scene);
            const embeddingHash = generateHash(analysis.embedding);
            
            // Normalize Tags/Semantics to a storable content string
            const tagsContent = Array.isArray(analysis.tags) 
                              ? analysis.tags.join(", ") // Simple string for cloud array
                              : JSON.stringify(analysis.tags); // JSON string for Ollama object

            const tagsHash = generateHash(tagsContent);
            const namesHash = generateHash(analysis.names);

            // 4. Update Registry (Content Layer - Global)
            setRegistry(prev => ({
                ...prev,
                [inputHash]: currentUserInput,
                [outputHash]: aiResponseText,
                [sceneHash]: analysis.scene,
                [embeddingHash]: analysis.embedding, 
                [tagsHash]: tagsContent, 
                [namesHash]: analysis.names
            }));

            // 5. Mint Index Node (Lattice Layer)
            setLattices(prev => {
                const activeIndex = prev.length - 1;
                const activeLattice = prev[activeIndex];

                const newNodeFaces = {
                    [FaceType.FRONT]: inputHash,
                    [FaceType.BACK]: outputHash,
                    [FaceType.TOP]: sceneHash,
                    [FaceType.BOTTOM]: embeddingHash,
                    [FaceType.LEFT]: tagsHash,
                    [FaceType.RIGHT]: namesHash
                };

                if (activeLattice.length >= 343) {
                    const nextCoord = { x: 0, y: 0, z: 0 };
                    const newIndex = activeIndex + 1;
                    const newNode: MemoryNode = { x: nextCoord.x, y: nextCoord.y, z: nextCoord.z, latticeIndex: activeIndex, timestamp: Date.now(), faces: newNodeFaces };
                    return [...prev, [newNode]];
                } else {
                    const nextCoord = getNextCoordinate(activeLattice.length);
                    const newNode: MemoryNode = { x: nextCoord.x, y: nextCoord.y, z: nextCoord.z, latticeIndex: activeIndex, timestamp: Date.now(), faces: newNodeFaces };
                    const newLattices = [...prev];
                    newLattices[activeIndex] = [...activeLattice, newNode];
                    return newLattices;
                }
            });

            // FIX: Add AI Name to the model response log
            setLinearLog(prev => [...prev, { role: 'model', text: aiResponseText, name: rpConfig.aiName, avatar: rpConfig.avatar }]);

        } catch (error) {
            console.error("G-ynthetic Memory Write Error:", error);
            setLinearLog(prev => [...prev, { role: 'system', text: "Error: Memory Write Failed. " + (error as any).message }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Quantum Retrieval Logic (Global) ---
    const toggleQuantumMode = async () => {
        if (!isQuantumMode) {
            const allNodes = lattices.flat();
            if (allNodes.length === 0) {
                setQuantumSlice([]);
                setIsQuantumMode(true);
                return;
            }

            setIsLoading(true);
            const lastNode = allNodes[allNodes.length - 1];
            const lastVectorHash = lastNode.faces[FaceType.BOTTOM];
            const queryVector = registry[lastVectorHash] as number[] || EMPTY_VECTOR_768;

            const scoredNodes = allNodes.map(node => {
                const nodeVectorHash = node.faces[FaceType.BOTTOM];
                const nodeVector = registry[nodeVectorHash] as number[] || EMPTY_VECTOR_768;
                const score = cosineSimilarity(queryVector, nodeVector);
                return { node, score };
            });

            scoredNodes.sort((a, b) => b.score - a.score);
            const top49 = scoredNodes.slice(0, 49).map(sn => sn.node);
            
            setQuantumSlice(top49);
            setIsQuantumMode(true);
            setIsLoading(false);
        } else {
            setIsQuantumMode(false);
        }
    };

    // --- Public API Return ---
    return {
        lattices, setLattices, registry, setRegistry, linearLog, setLinearLog, input, setInput, isLoading, setIsLoading, bottomRef,
        isQuantumMode, setIsQuantumMode, quantumSlice, viewLatticeIndex, setViewLatticeIndex, selectedNode, setSelectedNode,
        handleSendMessage, toggleQuantumMode
    };
};