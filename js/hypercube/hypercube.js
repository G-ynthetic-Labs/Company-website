// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The hero hypercube: a glowing 7×7×7 mesh that turns, breathes and carries pulses of light out from its middle
 * layer, with agents on its nodes passing work to each other along the wires (agents.js), lying side to side (head left, tail right) before a camera that sways gently. It runs on the page's one clock (js/clock.js) on preconfigured settings
 * (design/hypercube-look.js); there are no controls. Returns null where WebGL2 is not available, so the page shows
 * its plain background instead.
 * @feature hero-hypercube
 */
import { AGENTS, BACKGROUND, BLOOM, CAMERA, COLOUR_CYCLE, MOTION, STROKE } from '../../design/hypercube-look.js';
import { createAgents } from './agents.js';
import { createBloom } from './bloom.js';
import { HALF_LENGTH, nodePositions, wirePositions } from './geometry.js';
import { canFloat, dropTarget, program, target, uniforms } from './gl-kit.js';
import { lookAt, orbit, perspective } from './mat4.js';
import { AGENT_FRAGMENT, AGENT_VERTEX, MESH_VERTEX, meshFragment } from './shaders.js';

/** The most device pixels drawn per CSS pixel by default; more costs power for no visible gain. */
const MAX_DPR = 2;

/** Where the mesh sits when no placement is given: centred, full size, full brightness. */
const CENTRED = { x: 0, y: 0, scale: 1, dim: 1 };

/** Uploads positions into a vertex array bound to aPosition. */
function mesh(gl, prog, positions) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  const at = gl.getAttribLocation(prog, 'aPosition');
  gl.enableVertexAttribArray(at);
  gl.vertexAttribPointer(at, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return { vao, count: positions.length / 3 };
}

/** Two buffers the agents rewrite each frame: resting positions (aPosition) and looks (aLook). */
function agentMesh(gl, prog) {
  const vao = gl.createVertexArray(), buffers = [];
  gl.bindVertexArray(vao);
  for (const [name, size] of [['aPosition', 3], ['aLook', 4]]) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const at = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(at);
    gl.vertexAttribPointer(at, size, gl.FLOAT, false, 0, 0);
    buffers.push(buffer);
  }
  gl.bindVertexArray(null);
  return { vao, buffers };
}

/**
 * Starts the hypercube on canvas, driven by ticker. options: time, the starting moment in seconds; maxDpr, the most
 * device pixels per CSS pixel; placement, an object from placement.js that says where the mesh sits each frame.
 */
export function createHypercube(canvas, ticker, options = {}) {
  const gl = canvas.getContext('webgl2', { antialias: true, alpha: false, premultipliedAlpha: false });
  if (!gl) return null;

  const float = canFloat(gl);
  const wiresProgram = program(gl, MESH_VERTEX, meshFragment(false));
  const nodesProgram = program(gl, MESH_VERTEX, meshFragment(true));
  const wires = mesh(gl, wiresProgram, wirePositions());
  const nodes = mesh(gl, nodesProgram, nodePositions());
  const agentsProgram = program(gl, AGENT_VERTEX, AGENT_FRAGMENT);
  const agentsMesh = agentMesh(gl, agentsProgram);
  const agents = createAgents(AGENTS);
  const bloom = createBloom(gl, BLOOM, float);
  let scene = null, dpr = 1, time = options.time ?? 0;

  const shared = {
    uWeights: MOTION.weights,
    uParams: [MOTION.propagation, MOTION.drift, MOTION.interference, MOTION.glow],
    uFalloff: MOTION.falloff,
    uCycleA: COLOUR_CYCLE.a, uCycleB: COLOUR_CYCLE.b, uCycleC: COLOUR_CYCLE.c, uCycleD: COLOUR_CYCLE.d,
    uCycleDrift: COLOUR_CYCLE.drift,
    uWashOut: COLOUR_CYCLE.washOut,
    uHalfLength: HALF_LENGTH,
    uWireAlpha: STROKE.wireAlpha,
  };

  function resize() {
    dpr = Math.min(options.maxDpr ?? MAX_DPR, globalThis.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width === w && canvas.height === h && scene) return;
    canvas.width = w; canvas.height = h;
    dropTarget(gl, scene);
    scene = target(gl, w, h, float);
    bloom.resize(w, h);
  }

  function draw() {
    if (!scene) resize();
    const w = canvas.width, h = canvas.height;
    const angle = Math.sin((time / CAMERA.swaySeconds) * Math.PI * 2) * (CAMERA.swayDegrees * Math.PI) / 180;
    const t = time * MOTION.speed;
    const spot = options.placement ? options.placement.now() : CENTRED;
    const frame = {
      ...shared,
      uTime: t,
      uProjection: perspective(CAMERA.fov, w / h, CAMERA.near, CAMERA.far),
      uView: lookAt(orbit(CAMERA.position, CAMERA.target, angle), CAMERA.target),
      uPointSize: STROKE.pointSize * dpr,
      uPlace: [spot.x, spot.y, spot.scale],
    };

    gl.bindFramebuffer(gl.FRAMEBUFFER, scene.framebuffer);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    for (const [prog, m, mode] of [[nodesProgram, nodes, gl.POINTS], [wiresProgram, wires, gl.LINES]]) {
      gl.useProgram(prog);
      uniforms(gl, prog, frame);
      gl.bindVertexArray(m.vao);
      gl.drawArrays(mode, 0, m.count);
    }
    const work = agents.fill();
    gl.useProgram(agentsProgram);
    uniforms(gl, agentsProgram, frame);
    gl.bindVertexArray(agentsMesh.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, agentsMesh.buffers[0]);
    gl.bufferData(gl.ARRAY_BUFFER, work.positions, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, agentsMesh.buffers[1]);
    gl.bufferData(gl.ARRAY_BUFFER, work.looks, gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, work.count);
    gl.bindVertexArray(null);
    bloom.render(scene.texture, BACKGROUND, spot.dim);
  }

  const system = {
    active: true,
    draw(_alpha, dt) { time += dt; agents.step(dt); options.placement?.advance(dt); draw(); },
  };

  if (typeof ResizeObserver === 'function') new ResizeObserver(() => { resize(); draw(); }).observe(canvas);
  resize();
  draw();
  ticker.add(system);
  ticker.watch(canvas, system);

  return {
    system,
    /** Seconds of mesh time so far. */
    get time() { return time; },
    /** Jumps to a moment, for still renders and tests. */
    seek(seconds) { time = seconds; draw(); },
  };
}
