import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, PivotControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';
import { PrimitiveType, PiecePart } from '../types';

// Register Three.js elements with R3F
extend(THREE as any);

// Ensure TypeScript recognizes the R3F elements in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      torusGeometry: any;
      planeGeometry: any;
      capsuleGeometry: any;
      icosahedronGeometry: any;
      dodecahedronGeometry: any;
      ringGeometry: any;
      [elemName: string]: any;
    }
  }
}

const PartMesh: React.FC<{ part: PiecePart; isSelected: boolean; onSelect: () => void }> = ({ part, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { position, rotation, scale } = part.transform;
  const { color, metalness, roughness, emissive, emissiveIntensity, wireframe } = part.material;
  const p = part.geometryParams || {};

  const Geometry = () => {
    switch (part.type) {
      case PrimitiveType.CUBE:
        return <boxGeometry args={[p.width, p.height, p.depth, p.widthSegments, p.heightSegments, p.depthSegments]} />;
      case PrimitiveType.SPHERE:
        return <sphereGeometry args={[p.radius, p.widthSegments, p.heightSegments]} />;
      case PrimitiveType.CYLINDER:
        return <cylinderGeometry args={[p.radiusTop, p.radiusBottom, p.height, p.radialSegments, p.heightSegments]} />;
      case PrimitiveType.CONE:
        return <coneGeometry args={[p.radius, p.height, p.radialSegments, p.heightSegments]} />;
      case PrimitiveType.TORUS:
        return <torusGeometry args={[p.radius, p.tube, p.radialSegments, p.tubularSegments]} />;
      case PrimitiveType.PLANE:
        return <planeGeometry args={[p.width, p.height, p.widthSegments, p.heightSegments]} />;
      case PrimitiveType.CAPSULE:
        return <capsuleGeometry args={[p.radius, p.length, p.capSegments, p.radialSegments]} />;
      case PrimitiveType.ICOSAHEDRON:
        return <icosahedronGeometry args={[p.radius, p.detail]} />;
      case PrimitiveType.DODECAHEDRON:
        return <dodecahedronGeometry args={[p.radius, p.detail]} />;
      case PrimitiveType.RING:
        return <ringGeometry args={[p.innerRadius, p.outerRadius, p.thetaSegments, p.phiSegments]} />;
      default:
        return <boxGeometry />;
    }
  };

  return (
    <group position={position} rotation={rotation} scale={scale} onClick={(e: any) => { e.stopPropagation(); onSelect(); }}>
      <mesh ref={meshRef}>
        <Geometry />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          wireframe={wireframe}
        />
      </mesh>
      {isSelected && (
        <mesh>
          <Geometry />
          <meshBasicMaterial color="#3b82f6" wireframe />
        </mesh>
      )}
    </group>
  );
};

const AnimationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedPiece } = useStore();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = selectedPiece.animation.speed || 1;

    if (selectedPiece.animation.idle === 'hover') {
      groupRef.current.position.y = Math.sin(t * speed) * 0.2;
    } else if (selectedPiece.animation.idle === 'spin') {
      groupRef.current.rotation.y = t * speed;
    } else if (selectedPiece.animation.idle === 'wobble') {
      groupRef.current.rotation.z = Math.sin(t * speed * 2) * 0.1;
    } else if (selectedPiece.animation.idle === 'pulse') {
      const s = 1 + Math.sin(t * speed * 3) * 0.05;
      groupRef.current.scale.set(s, s, s);
    } else {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;
      groupRef.current.scale.set(1, 1, 1);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const SceneContent = () => {
  const { selectedPiece, selectedPartId, selectPart, updatePart, editorMode } = useStore();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Environment preset="city" />
      <Grid infiniteGrid sectionColor="#3f3f46" cellColor="#27272a" fadeDistance={30} />

      {editorMode === 'COMPOSITION' ? (
        <group position={[0, -0.5, 0]}>
          {/* Tactical Board Visualization */}
          {Array.from({ length: 8 }).map((_, x) =>
            Array.from({ length: 8 }).map((_, z) => (
              <mesh key={`${x}-${z}`} position={[x - 3.5, 0, z - 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.9, 0.9]} />
                <meshStandardMaterial
                  color={(x + z) % 2 === 0 ? "#18181b" : "#27272a"}
                  emissive={(x + z) % 2 === 0 ? "#000000" : "#1a1a1a"}
                />
                <lineSegments>
                  <edgesGeometry args={[new THREE.PlaneGeometry(0.9, 0.9)]} />
                  <lineBasicMaterial color="#333" />
                </lineSegments>
              </mesh>
            ))
          )}
          {/* Highlight valid deployment zones (Rows 0-1 for Gold, 6-7 for Silver) */}
          <mesh position={[0, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 2]} />
            <meshBasicMaterial color="#FFD700" opacity={0.1} transparent />
          </mesh>
          <mesh position={[0, 0.01, -3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 2]} />
            <meshBasicMaterial color="#C0C0C0" opacity={0.1} transparent />
          </mesh>
        </group>
      ) : (
        <AnimationWrapper>
          {selectedPiece.parts.map((part) => (
            <group key={part.id}>
              {selectedPartId === part.id && editorMode === 'MODELING' ? (
                <PivotControls
                  anchor={[0, 0, 0]}
                  depthTest={false}
                  lineWidth={2}
                  scale={1.5}
                  onDrag={(l, dl, w, dw) => {
                    // Transform logic handled by component visuals, 
                    // store sync would go here
                  }}
                >
                  <PartMesh part={part} isSelected={true} onSelect={() => selectPart(part.id)} />
                </PivotControls>
              ) : (
                <PartMesh part={part} isSelected={selectedPartId === part.id} onSelect={() => selectPart(part.id)} />
              )}
            </group>
          ))}
        </AnimationWrapper>
      )}

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
      </GizmoHelper>
    </>
  );
};

export const EditorViewport: React.FC = () => {
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas shadows camera={{ position: [4, 4, 6], fov: 50 }}>
        <SceneContent />
        <OrbitControls makeDefault />
      </Canvas>
      <div className="absolute top-4 left-4 text-xs text-white/50 pointer-events-none select-none font-mono">
        VIEWPORT // ORBIT: LMB | PAN: RMB | ZOOM: SCROLL
      </div>
    </div>
  );
};