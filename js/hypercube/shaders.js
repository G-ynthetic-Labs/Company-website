// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The hypercube's shaders (WebGL2, GLSL ES 3.00): the mesh, and the agents that work along it. The vertex shader moves every node and wire point: three
 * blended states (turn and breathe; shear and twist; fold), then a fine drift, pulses travelling out from the middle
 * layer, and a beat between layers, then lays the long axis side to side (head left, tail right). It also works out each point's colour and how brightly it burns. The fragment
 * shader draws soft round nodes and faint wires, adding light so crossings glow.
 * @feature hero-hypercube
 */

/**
 * What every point on the mesh shares, wire, node or agent: the uniforms, the three states and place(), which
 * moves a resting point exactly as the mesh moves it, so anything riding a wire stays on that wire.
 */
const DEFORM = `#version 300 es
uniform mat4 uProjection;
uniform mat4 uView;
uniform float uTime;
uniform vec3 uWeights;
uniform vec4 uParams;   // x propagation, y drift, z interference, w glow
uniform float uFalloff;
uniform float uPointSize;
uniform vec3 uPlace;     // x, y screen offset; z size
uniform vec3 uCycleA, uCycleB, uCycleC, uCycleD;
uniform float uCycleDrift;
uniform float uWashOut;   // 0 full colour, 1 grey
uniform float uHalfLength; // how far the head and tail sit from the middle

vec3 turnAndBreathe(vec3 p, float t) {
  float c = cos(t * 0.5), s = sin(t * 0.5);
  p.xy = mat2(c, -s, s, c) * p.xy;
  return p * (1.0 + 0.1 * sin(t * 2.0));
}

vec3 shearAndTwist(vec3 p, float t) {
  p.x += p.y * sin(t);
  float a = p.z * 0.3 * sin(t * 0.5);
  float c = cos(a), s = sin(a);
  p.xy = mat2(c, -s, s, c) * p.xy;
  return p;
}

vec3 fold(vec3 p, float t) {
  p.z += sin(length(p.xy) * 2.0 - t) * 0.5;
  p.xy *= 1.0 - 0.4 * sin(t * 0.3);
  return p;
}

vec3 cycle(float t) {
  return uCycleA + uCycleB * cos(6.28318 * (uCycleC * t + uCycleD));
}

// Moves a resting point; energy, drift and beat are how much each motion moved it, for brightness.
vec3 place(vec3 base, out float energy, out float drift, out float beat) {
  float total = max(uWeights.x + uWeights.y + uWeights.z, 0.001);
  vec3 p = (turnAndBreathe(base, uTime) * uWeights.x + shearAndTwist(base, uTime) * uWeights.y
          + fold(base, uTime) * uWeights.z) / total;
  drift = sin(uTime * 5.0 + base.x * 3.0 + base.z * 2.0) * uParams.y * 0.15;
  p += normalize(base + vec3(0.001)) * drift;
  float dist = abs(base.z);
  float phase = dist - uTime * uParams.x * 4.0;
  float packet = smoothstep(0.8, 0.0, abs(mod(phase, 8.0) - 4.0));
  energy = packet * exp(-dist * uFalloff);
  p.y += energy * 0.5;
  beat = sin(base.z * 2.0 + uTime) * sin(base.z * 1.5 - uTime) * uParams.z;
  p.x += beat * 0.5;
  // Lay the long axis side to side: the head layer (k = 0) to the left, the tail layer (k = 6) to the right.
  return vec3(p.z, p.y, -p.x);
}

void project(vec3 p) {
  gl_Position = uProjection * uView * vec4(p, 1.0);
  gl_Position.xy = gl_Position.xy * uPlace.z + uPlace.xy * gl_Position.w;
}
`;

export const MESH_VERTEX = `${DEFORM}
in vec3 aPosition;
out float vIntensity;
out vec3 vColor;

void main() {
  vec3 base = aPosition;
  float energy, drift, beat;
  project(place(base, energy, drift, beat));
  gl_PointSize = uPointSize;

  vIntensity = 0.3 + energy * 2.0 + abs(drift) * 5.0 + abs(beat) * 2.0;
  vec3 col = cycle((base.z + uHalfLength) / (2.0 * uHalfLength) + uTime * uCycleDrift);
  if (uWeights.y > uWeights.x && uWeights.y > uWeights.z) col += vec3(0.2, -0.1, 0.0);
  if (uWeights.z > uWeights.x && uWeights.z > uWeights.y) col += vec3(-0.1, 0.2, 0.1);
  vColor = mix(col, vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), uWashOut);
}`;

/**
 * The agents and the work they pass along the wires (agents.js). Each point rests somewhere on the mesh, moves
 * with it, and carries its own size and colour: a steady agent, or a packet of work and its fading trail.
 */
export const AGENT_VERTEX = `${DEFORM}
in vec3 aPosition;
in vec4 aLook;   // rgb colour times brightness, a size in CSS pixels
out vec3 vLook;

void main() {
  float energy, drift, beat;
  project(place(aPosition, energy, drift, beat));
  gl_PointSize = aLook.a * uPointSize;
  vLook = aLook.rgb;
}`;

/** Agents and packets: soft round points that add their light, so a packet glows as it reaches an agent. */
export const AGENT_FRAGMENT = `#version 300 es
precision highp float;
in vec3 vLook;
out vec4 outColor;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.1, 0.5, d);
  outColor = vec4(vLook * alpha, alpha);
}`;


/** The mesh fragment shader; points get a soft round edge, wires a fixed faint alpha. */
export function meshFragment(points) {
  return `#version 300 es
precision highp float;
${points ? '#define POINTS' : ''}
uniform vec4 uParams;
uniform float uWireAlpha;
in float vIntensity;
in vec3 vColor;
out vec4 outColor;

void main() {
#ifdef POINTS
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.3, 0.5, d);
#else
  float alpha = uWireAlpha;
#endif
  vec3 c = vColor * vIntensity * uParams.w;
  c += vec3(1.0) * smoothstep(1.5, 3.0, vIntensity);
  outColor = vec4(c * alpha, alpha);
}`;
}

/** One triangle that covers the screen, for the glow passes. */
export const SCREEN_VERTEX = `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;
