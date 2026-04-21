import * as THREE from 'three';

/**
 * G-YNTHETIC LABS // HEADER VISUALIZER
 * Ported from Hypercube Lattice Visualizer (React/Three)
 */

const X_DIM = 7;
const Y_DIM = 7;
const Z_DIM = 7;

const xOff = (X_DIM - 1) / 2;
const yOff = (Y_DIM - 1) / 2;
const zOff = (Z_DIM - 1) / 2;

function createLatticeGeometry() {
  const points = [];
  const gridCoords = [];

  for (let z = 0; z < Z_DIM; z++) {
    for (let y = 0; y < Y_DIM; y++) {
      for (let x = 0; x < X_DIM; x++) {
        points.push(x - xOff, y - yOff, (z - zOff) * 1.5);
        gridCoords.push(x, y, z);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  geometry.setAttribute('aGrid', new THREE.Float32BufferAttribute(gridCoords, 3));
  return geometry;
}

function createCurvedLatticeLines() {
  const positions = [];
  const SUBDIVISIONS = 16;

  const addLine = (x1, y1, z1, x2, y2, z2) => {
    const p1 = new THREE.Vector3(x1 - xOff, y1 - yOff, (z1 - zOff) * 1.5);
    const p2 = new THREE.Vector3(x2 - xOff, y2 - yOff, (z2 - zOff) * 1.5);

    for (let i = 0; i < SUBDIVISIONS; i++) {
      const t1 = i / SUBDIVISIONS;
      const t2 = (i + 1) / SUBDIVISIONS;

      const v1 = new THREE.Vector3().lerpVectors(p1, p2, t1);
      const v2 = new THREE.Vector3().lerpVectors(p1, p2, t2);

      positions.push(v1.x, v1.y, v1.z);
      positions.push(v2.x, v2.y, v2.z);
    }
  };

  for (let z = 0; z < Z_DIM; z++) {
    for (let y = 0; y < Y_DIM; y++) {
      for (let x = 0; x < X_DIM; x++) {
        if (x < X_DIM - 1) addLine(x, y, z, x + 1, y, z);
        if (y < Y_DIM - 1) addLine(x, y, z, x, y + 1, z);
        if (z < Z_DIM - 1) addLine(x, y, z, x, y, z + 1);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

const vertexShader = `
uniform float uTime;
uniform vec3 uWeights;
uniform vec4 uParams;
uniform float uFalloff;

varying float vIntensity;
varying vec3 vColor;
varying float vZNorm;

#define PI 3.14159265359

vec3 state0(vec3 p, float t) {
  float c = cos(t * 0.5);
  float s = sin(t * 0.5);
  mat2 rot = mat2(c, -s, s, c);
  vec3 pos = p;
  pos.xy = rot * pos.xy;
  pos *= 1.0 + 0.1 * sin(t * 2.0);
  return pos;
}

vec3 state1(vec3 p, float t) {
  vec3 pos = p;
  pos.x += pos.y * sin(t);
  float angle = pos.z * 0.3 * sin(t * 0.5);
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  pos.xy = rot * pos.xy;
  return pos;
}

vec3 state2(vec3 p, float t) {
  vec3 pos = p;
  float len = length(pos.xy);
  float fold = sin(len * 2.0 - t);
  pos.z += fold * 0.5;
  float collapse = 1.0 - 0.4 * sin(t * 0.3);
  pos.xy *= collapse;
  return pos;
}

vec3 getPalette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec3 base = position;
  vec3 p0 = state0(base, uTime);
  vec3 p1 = state1(base, uTime);
  vec3 p2 = state2(base, uTime);

  float totalW = uWeights.x + uWeights.y + uWeights.z;
  vec3 blended = (p0 * uWeights.x + p1 * uWeights.y + p2 * uWeights.z) / max(totalW, 0.001);

  float driftPhase = uTime * 5.0 + base.x * 3.0 + base.z * 2.0;
  float driftVal = sin(driftPhase) * uParams.y * 0.15;
  blended += normalize(base + vec3(0.001)) * driftVal;

  float dist = abs(base.z); 
  float wavePhase = dist - uTime * uParams.x * 4.0;
  float wavePacket = smoothstep(0.8, 0.0, abs(mod(wavePhase, 8.0) - 4.0));
  
  float damping = exp(-dist * uFalloff);
  float waveEnergy = wavePacket * damping;
  blended.y += waveEnergy * 0.5;

  float beat = sin(base.z * 2.0 + uTime) * sin(base.z * 1.5 - uTime);
  float interference = beat * uParams.z;
  blended.x += interference * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(blended, 1.0);
  vZNorm = (base.z + 4.5) / 9.0;
  vIntensity = 0.3 + waveEnergy * 2.0 + abs(driftVal) * 5.0 + abs(interference) * 2.0;
  vec3 col = getPalette(vZNorm + uTime * 0.1);
  if (uWeights.y > uWeights.x && uWeights.y > uWeights.z) col += vec3(0.2, -0.1, 0.0);
  if (uWeights.z > uWeights.x && uWeights.z > uWeights.y) col += vec3(-0.1, 0.2, 0.1);
  vColor = col;
}
`;

const fragmentShader = `
uniform vec4 uParams;
varying float vIntensity;
varying vec3 vColor;
varying float vZNorm;

void main() {
  #ifdef USE_POINTS
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  #else
    float alpha = 0.6;
  #endif

  vec3 finalColor = vColor * vIntensity * uParams.w;
  finalColor += vec3(1.0) * smoothstep(1.5, 3.0, vIntensity);
  gl_FragColor = vec4(finalColor, alpha);
}
`;

function createLatticeInstance(canvasId) {
  const container = document.getElementById(canvasId);
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const uniforms = {
    uTime: { value: 0 },
    uWeights: { value: new THREE.Vector3(1, 0, 0) },
    uParams: { value: new THREE.Vector4(0.3, 0.1, 0.1, 1.2) }, // prop, drift, interf, glow
    uFalloff: { value: 0.2 },
  };

  const materialParams = {
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };

  const pointsMaterial = new THREE.ShaderMaterial({ ...materialParams });
  pointsMaterial.defines = { USE_POINTS: '' };

  const linesMaterial = new THREE.ShaderMaterial({ ...materialParams });

  const points = new THREE.Points(createLatticeGeometry(), pointsMaterial);
  const lines = new THREE.LineSegments(createCurvedLatticeLines(), linesMaterial);

  scene.add(points);
  scene.add(lines);

  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0 });
  observer.observe(container);

  function animate(time) {
    if (!isVisible) {
      requestAnimationFrame(animate);
      return;
    }

    requestAnimationFrame(animate);
    time *= 0.001; // Convert to seconds

    uniforms.uTime.value = time * 0.5;

    // Dynamic "Swimming" and "Twisting"
    // 1. Weight shifting (Blending between coherent, tense, and complex states)
    const w0 = 0.5 + 0.5 * Math.sin(time * 0.4);
    const w1 = 0.5 + 0.5 * Math.cos(time * 0.3);
    const w2 = 0.3 + 0.3 * Math.sin(time * 0.5 + 1.0);
    uniforms.uWeights.value.set(w0, w1, w2);

    // 2. Multi-axis Twist
    points.rotation.y = time * 0.15;
    points.rotation.x = Math.sin(time * 0.2) * 0.2;
    points.rotation.z = Math.cos(time * 0.1) * 0.1;
    lines.rotation.copy(points.rotation);

    // 3. "Swimming" (Flexing position in header space)
    const swimX = Math.sin(time * 0.5) * 1.5;
    const swimY = Math.cos(time * 0.4) * 0.8;
    points.position.set(swimX, swimY, 0);
    lines.position.set(swimX, swimY, 0);

    // 4. Parameter oscillation (Glow and interference)
    uniforms.uParams.value.w = 1.2 + 0.4 * Math.sin(time * 0.7); // Glow pulse
    uniforms.uParams.value.z = 0.1 + 0.2 * Math.cos(time * 0.3); // Interference shift

    renderer.render(scene, camera);
  }

  animate(0);

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

function initAllVisualizers() {
  createLatticeInstance('hypercube-header');
  createLatticeInstance('lattice-section');
}

document.addEventListener('DOMContentLoaded', initAllVisualizers);
