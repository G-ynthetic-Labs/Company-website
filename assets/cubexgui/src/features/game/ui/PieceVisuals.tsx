// cubex³/components/PieceVisuals.tsx
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PieceType, PlayerColor } from '../types';

// --- SHADERS ---

const CommanderMaterial = {
  uniforms: {
    baseColor: { value: new THREE.Color() },
    factionColor: { value: new THREE.Color() },
  },
  vertexShader: `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 baseColor;
    uniform vec3 factionColor;
    varying vec3 vPos;
    
    void main() {
      // Normalize coordinate approx (-0.5 to 0.5)
      float x = vPos.x;
      float y = vPos.y;
      
      // "Thickest from shoulder to shoulder and tapered to a point at their right foot"
      // Define a boundary that moves right as Y decreases (tapering).
      
      // Top (y=0.5): Boundary ~ -0.3 (Wide left coverage)
      // Bot (y=-0.5): Boundary ~ +0.3 (Narrow right point)
      float boundary = 0.3 - ((y + 0.5) * 0.6); 
      
      vec3 finalColor = (x > boundary) ? factionColor : baseColor;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const PawnMaterial = {
  uniforms: {
    baseColor: { value: new THREE.Color() },
    factionColor: { value: new THREE.Color() }
  },
  vertexShader: `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 baseColor;
    uniform vec3 factionColor;
    varying vec3 vPos;
    void main() {
      // Split down the middle. Faction on right.
      vec3 c = vPos.x > 0.0 ? factionColor : baseColor;
      gl_FragColor = vec4(c, 1.0);
    }
  `
};

// --- COMPONENTS ---

export const KingRing = ({ isActive }: { isActive: boolean }) => {
    const ringRef = useRef<THREE.Group>(null);
    
    useFrame((state, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.x += delta * 0.3;
            ringRef.current.rotation.y += delta * 1.5;
            ringRef.current.rotation.z += delta * 0.2;
            const t = state.clock.elapsedTime;
            ringRef.current.position.y = Math.sin(t * 2.5) * 0.03; 
        }
    });

    return (
        <group ref={ringRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.55, 0.02, 8, 32]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 1.7, 0.2, 0]}>
                <torusGeometry args={[0.52, 0.02, 8, 32]} />
                <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.6} />
            </mesh>
        </group>
    );
};

export const Sash = ({ color }: { color: string }) => {
    return (
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]} scale={[1.1, 1.3, 1.3]}>
            <torusGeometry args={[0.42, 0.06, 8, 32]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.9} />
        </mesh>
    );
};

export const CommanderMesh = ({ shape, baseColor, factionColor }: any) => {
    const shaderArgs = useMemo(() => ({
        uniforms: {
            baseColor: { value: new THREE.Color(baseColor) },
            factionColor: { value: new THREE.Color(factionColor) },
        },
        vertexShader: CommanderMaterial.vertexShader,
        fragmentShader: CommanderMaterial.fragmentShader
    }), [baseColor, factionColor]);

    return (
        <mesh>
            {shape}
            <shaderMaterial args={[shaderArgs]} />
        </mesh>
    );
};

export const PawnMesh = ({ baseColor, factionColor }: any) => {
    const shaderArgs = useMemo(() => ({
        uniforms: {
            baseColor: { value: new THREE.Color(baseColor) },
            factionColor: { value: new THREE.Color(factionColor) },
        },
        vertexShader: PawnMaterial.vertexShader,
        fragmentShader: PawnMaterial.fragmentShader
    }), [baseColor, factionColor]);

    return (
        <mesh>
            <sphereGeometry args={[0.35, 32, 32]} />
            <shaderMaterial args={[shaderArgs]} />
        </mesh>
    );
};

// --- MAIN RENDERER ---
interface RenderPieceProps {
    type: PieceType | string;
    color: PlayerColor; // Fixed: Use string union 'white' | 'black'
    faction?: 'gold' | 'silver'; // Fixed: Use string union
    isSelected: boolean;
}

export const RenderPieceGeometry = ({ type, color, faction, isSelected }: RenderPieceProps) => {
    const baseColorStr = color === 'white' ? '#f1f5f9' : '#0f172a';
    
    // SAFETY FALLBACK: If faction is undefined, use base color instead of Red error color
    const factionColorStr = faction === 'gold' ? '#fbbf24' : (faction === 'silver' ? '#94a3b8' : baseColorStr);
    
    if (type === 'King') {
        return (
            <group>
                <mesh>
                    <dodecahedronGeometry args={[0.4]} />
                    <meshStandardMaterial color={baseColorStr} roughness={0.1} metalness={0.8} />
                </mesh>
                <KingRing isActive={isSelected} />
            </group>
        );
    }

    if (type === 'Queen') {
        return (
            <group>
                <mesh>
                    <cylinderGeometry args={[0.2, 0.35, 0.9, 16]} />
                    <meshStandardMaterial color={baseColorStr} roughness={0.2} metalness={0.6} />
                </mesh>
                <Sash color="#e2e8f0" /> {/* Silver Sash */}
            </group>
        );
    }

    if (type === 'FractalKnight') {
        return (
            <group>
                <mesh>
                    <coneGeometry args={[0.3, 0.9, 4]} />
                    <meshStandardMaterial color={baseColorStr} roughness={0.1} metalness={0.9} />
                </mesh>
                <Sash color="#fbbf24" /> {/* Gold Sash */}
            </group>
        );
    }

    // FIX: Knight visualization to be a smaller cone (Fractal Knight shape) with no sash
    if (type === 'Knight') {
        return (
            <group>
                <mesh>
                    {/* Smaller Cone Geometry args={[radius, height, radialSegments]} */}
                    <coneGeometry args={[0.2, 0.7, 4]} /> 
                    <meshStandardMaterial color={baseColorStr} roughness={0.1} metalness={0.9} />
                </mesh>
            </group>
        );
    }


    if (['Rook', 'Bishop'].includes(type as string)) {
        let shape;
        if (type === 'Rook') shape = <boxGeometry args={[0.6, 0.7, 0.6]} />;
        if (type === 'Bishop') shape = <octahedronGeometry args={[0.4]} />;

        // Note: Rook/Bishop now use CommanderMaterial, keeping their existing shapes.
        return <CommanderMesh shape={shape} baseColor={baseColorStr} factionColor={factionColorStr} />;
    }

    if (type === 'Pawn') {
        return <PawnMesh baseColor={baseColorStr} factionColor={factionColorStr} />;
    }

    return (
        <mesh>
            <boxGeometry args={[0.5,0.5,0.5]}/>
            <meshBasicMaterial color="pink" wireframe/>
        </mesh>
    );
};