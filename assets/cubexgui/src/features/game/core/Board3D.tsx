// cubex³/components/Board3D.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { GameState, Position, Axis, Piece } from '../types';
import { RenderPieceGeometry } from '../ui/PieceVisuals';
import * as THREE from 'three';

// Fix for R3F Intrinsic Elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: any; group: any; lineSegments: any; ambientLight: any; pointLight: any;
            boxGeometry: any; sphereGeometry: any; coneGeometry: any; cylinderGeometry: any;
            torusGeometry: any; capsuleGeometry: any; octahedronGeometry: any; dodecahedronGeometry: any;
            planeGeometry: any; edgesGeometry: any; ringGeometry: any; circleGeometry: any;
            meshStandardMaterial: any; meshBasicMaterial: any; lineBasicMaterial: any; shaderMaterial: any;
            gridHelper: any;
            fog: any;
        }
    }
}

interface Board3DProps {
    state: GameState;
    onSelect: (id: string) => void;
    onMove: (pos: Position) => void;
    activeAxis: Axis;
    activeLayer: number;
}

const Piece3D = ({ piece, selected, ghost, onClick }: { piece: Piece, selected: boolean, ghost?: boolean, onClick: () => void }) => {
    const groupRef = useRef<THREE.Group>(null);

    // Identify Power Dynamics for Animations
    const isRoyalOrGeneral = ['King', 'Queen', 'FractalKnight'].includes(piece.type);

    useFrame((state) => {
        if (!groupRef.current) return;

        // 1. Base Position Interpolation (Smooth Move) for ALL pieces
        const targetPos = new THREE.Vector3(piece.position.x, piece.position.y, piece.position.z);
        groupRef.current.position.lerp(targetPos, 0.1);

        // 2. Idle Animation (Power Dynamics Only)
        if (isRoyalOrGeneral) {
            const t = state.clock.elapsedTime;
            const offset = piece.id.charCodeAt(piece.id.length - 1);

            const hoverY = Math.sin(t * 2 + offset) * 0.05;
            const driftX = Math.cos(t * 0.5 + offset) * 0.02;
            const wobbleZ = Math.sin(t * 1.5 + offset) * 0.02;

            groupRef.current.position.y += hoverY;
            groupRef.current.position.x += driftX;
            groupRef.current.rotation.z = wobbleZ;
            groupRef.current.rotation.x = wobbleZ * 0.5;
        } else {
            // Ensure static pieces reset rotation/offset if they were previously animated
            groupRef.current.rotation.set(0, 0, 0);
        }
    });

    return (
        <group ref={groupRef} onClick={(e: any) => { e.stopPropagation(); onClick(); }}>
            {/* Selection Highlight (3D Ring) */}
            {selected && !ghost && (
                <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.4, 0.5, 32]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} side={THREE.DoubleSide} />
                </mesh>
            )}

            {/* The Unified Visual Body */}
            {/* Rotated 45 degrees Y to face camera nicely */}
            <group scale={ghost ? 0.9 : 1} rotation={[0, Math.PI / 4, 0]}>
                <RenderPieceGeometry
                    type={piece.type}
                    color={piece.color}
                    faction={piece.faction}
                    isSelected={selected}
                />
            </group>

            {/* Ghost Effect for movement phases */}
            {ghost && (
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.4]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
                </mesh>
            )}
        </group>
    );
};

const MoveTarget = ({ pos, onClick }: { pos: Position, onClick: () => void }) => {
    return (
        <group position={[pos.x, pos.y, pos.z]} onClick={(e: any) => { e.stopPropagation(); onClick(); }}>
            <mesh>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
            </mesh>
            <mesh scale={[1.1, 1.1, 1.1]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.6} />
            </mesh>
        </group>
    );
}

const Scene = (props: Board3DProps) => {
    // Board Center Offset (3.5, 3.5, 3.5)
    const centerOffset = -3.5;

    return (
        <>
            {/* --- LIGHTING & ENVIRONMENT --- */}
            {/* Environment Map ensures metallic black pieces have something to reflect */}
            <Environment preset="city" blur={1} />

            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.0} />
            <pointLight position={[-10, 10, -10]} intensity={0.8} color="#22d3ee" />
            <fog attach="fog" args={['#020617', 20, 90]} />

            <group position={[centerOffset, centerOffset, centerOffset]}>
                {props.state.pieces.map(p => (
                    <Piece3D
                        key={p.id}
                        piece={p}
                        selected={props.state.selectedId === p.id}
                        onClick={() => props.onSelect(p.id)}
                    />
                ))}

                {props.state.gameMode !== 'AIvAI' && props.state.validMoves.map((m, i) => (
                    <MoveTarget key={i} pos={m} onClick={() => props.onMove(m)} />
                ))}

                {/* GHOST PIECE REMOVED HERE to fix click blocking issue */}

                <gridHelper args={[8, 8, 0x334155, 0x1e293b]} position={[3.5, -0.5, 3.5]} />
                <gridHelper args={[8, 8, 0x334155, 0x1e293b]} position={[3.5, 7.5, 3.5]} />
            </group>

            <OrbitControls target={[0, 0, 0]} enablePan={false} minDistance={5} maxDistance={40} />

            {/* Toned down stars for better piece visibility */}
            <Stars radius={300} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
        </>
    );
};

export default function Board3D(props: Board3DProps) {
    return (
        // Gradient background to separate from the void
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black">
            <Canvas camera={{ position: [12, 12, 12], fov: 45 }} dpr={[1, 2]}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}