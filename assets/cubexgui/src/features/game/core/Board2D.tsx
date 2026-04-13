// cubexgui/src/features/game/core/Board2D.tsx
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Grid } from '@react-three/drei';
import { GameState, Position, Axis, Piece } from '../types';
import { RenderPieceGeometry } from '../ui/PieceVisuals';
import * as THREE from 'three';

interface Board2DProps {
    state: GameState;
    onSelect: (id: string) => void;
    onMove: (pos: Position) => void;
    axis: Axis;
    layer: number;
}

// 2.5D Piece Wrapper
// Rotates the 3D geometry towards the camera so Sashes/Rings are visible
const Piece25D = ({ piece, selected, onClick }: { piece: Piece, selected: boolean, onClick: () => void }) => {
    return (
        <group position={[piece.position.x, piece.position.y, 0]} onClick={(e: any) => { e.stopPropagation(); onClick(); }}>
            {/* TILT: Rotate 45 deg on X/Y to show depth */}
            <group rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={0.85}>
                <RenderPieceGeometry
                    type={piece.type as any}
                    color={piece.color}
                    faction={piece.faction as any}
                    isSelected={selected}
                />
            </group>

            {/* 2D Highlight Ring (Behind piece) */}
            {selected && (
                <mesh position={[0, 0, -0.2]}>
                    <ringGeometry args={[0.35, 0.45, 32]} />
                    <meshBasicMaterial color="#22d3ee" toneMapped={false} />
                </mesh>
            )}
        </group>
    );
};

const CellHighlight = ({ x, y, color, onClick, pulse, isTarget }: any) => {
    return (
        <group position={[x, y, -0.5]} onClick={(e: any) => { e.stopPropagation(); onClick(); }}>
            {/* Fill */}
            <mesh>
                <planeGeometry args={[0.9, 0.9]} />
                <meshBasicMaterial color={color} transparent opacity={pulse ? 0.35 : 0.2} />
            </mesh>
            {/* Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(0.9, 0.9)]} />
                <lineBasicMaterial color={color} transparent opacity={0.8} linewidth={2} />
            </lineSegments>
            {/* Dot Marker */}
            {isTarget && (
                <mesh position={[0, 0, 0.1]}>
                    <circleGeometry args={[0.15, 16]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            )}
        </group>
    );
};

const Scene2D = ({ state, axis, layer, onSelect, onMove }: Board2DProps) => {
    // 1. FILTER PIECES: Keep only those on the active Slice (layer)
    const visiblePieces = useMemo(() => {
        return state.pieces.filter(p => {
            if (axis === 'Z') return p.position.z === layer;
            if (axis === 'Y') return p.position.y === layer;
            return p.position.x === layer;
        }).map(p => {
            // Remap 3D coord to 2D plane (x,y,0)
            let x = 0, y = 0;
            if (axis === 'Z') { x = p.position.x; y = p.position.y; } // Z-slice: Top Down (X-Y)
            if (axis === 'Y') { x = p.position.x; y = p.position.z; } // Y-slice: Front (X-Z)
            if (axis === 'X') { x = p.position.y; y = p.position.z; } // X-slice: Side (Y-Z)
            return { ...p, position: { x, y, z: 0 } };
        });
    }, [state.pieces, axis, layer]);

    // 2. FILTER MOVES: Keep only targets on this slice
    const visibleMoves = useMemo(() => {
        return state.validMoves.filter(m => {
            if (axis === 'Z') return m.z === layer;
            if (axis === 'Y') return m.y === layer;
            return m.x === layer;
        }).map(m => {
            let x = 0, y = 0;
            if (axis === 'Z') { x = m.x; y = m.y; }
            if (axis === 'Y') { x = m.x; y = m.z; }
            if (axis === 'X') { x = m.y; y = m.z; }
            return { original: m, x, y };
        });
    }, [state.validMoves, axis, layer]);

    const center = 3.5;

    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 10]} intensity={1.0} />

            <group position={[-center, -center, 0]}>

                {/* Pieces */}
                {visiblePieces.map(p => (
                    <Piece25D
                        key={p.id}
                        piece={p}
                        selected={state.selectedId === p.id}
                        onClick={() => onSelect(p.id)}
                    />
                ))}

                {/* Moves */}
                {state.gameMode !== 'AIvAI' && visibleMoves.map((m, i) => {
                    const isCapture = visiblePieces.some(p => p.position.x === m.x && p.position.y === m.y);
                    return (
                        <CellHighlight
                            key={`move-${i}`}
                            x={m.x}
                            y={m.y}
                            color={isCapture ? "#ef4444" : "#10b981"}
                            pulse={true}
                            isTarget={true}
                            onClick={() => onMove(m.original)}
                        />
                    );
                })}

                {/* Base Highlight for selected piece (if visible) */}
                {state.selectedId && visiblePieces.some(p => p.id === state.selectedId) && (
                    <CellHighlight
                        x={visiblePieces.find(p => p.id === state.selectedId)!.position.x}
                        y={visiblePieces.find(p => p.id === state.selectedId)!.position.y}
                        color="#22d3ee"
                        pulse={false}
                        isTarget={false}
                        onClick={() => { }}
                    />
                )}

                {/* Grid */}
                <Grid
                    position={[3.5, 3.5, -1]}
                    args={[8, 8]}
                    cellSize={1}
                    cellThickness={1}
                    cellColor="#334155"
                    sectionSize={8}
                    sectionThickness={1.5}
                    sectionColor="#475569"
                    rotation={[Math.PI / 2, 0, 0]}
                />
            </group>

            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        </>
    );
};

export default function Board2D(props: Board2DProps) {
    return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center">
            <div className="w-full max-w-[800px] aspect-square border border-cyber-700 bg-black/50 shadow-2xl relative">
                <div className="absolute top-4 left-4 text-xs font-mono text-cyan-500 z-10 bg-black/80 px-2 py-1 rounded border border-cyber-700 pointer-events-none">
                    SLICE VIEW: {props.axis} - LAYER {props.layer}
                </div>
                <Canvas>
                    <Scene2D {...props} />
                </Canvas>
            </div>
        </div>
    );
}