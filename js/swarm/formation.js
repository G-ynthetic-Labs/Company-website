// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The harnessed swarm (owner, 6 Oct 2026): when the agent with a job description runs, the whole loose swarm comes
 * together, over a couple of seconds and in a way a person can follow, into a copy of the hero mesh. It is the same
 * grid (hypercube/geometry.js), the same camera and turn (design/hypercube-look.js) and the same team blocks, so each
 * team keeps to its own corner and never meets another. Most agents take a node and hold it; the rest carry work along
 * the wires between their teammates, and the teammate that receives it flashes. Nothing reacts to the pointer.
 * @feature swarm
 */
import { SIZE, HALF_LENGTH, nodePosition, wires } from '../hypercube/geometry.js';
import { AGENTS, CAMERA, MOTION } from '../../design/hypercube-look.js';
import { SWARM, FORMATION } from '../../design/palette.js';

/** How the swarm comes together: each agent waits up to delay seconds, then glides in over seconds on a slight arc. */
export const TWEEN = { delay: 0.6, seconds: 2, arc: 0.18 };
/** The share of agents that carry work rather than hold a node, and the most that ever do. */
export const WORK = { share: 0.3, most: 60 };

const HALF = (SIZE - 1) / 2;
const WIRES = wires();
const STEPS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];

/** A linear colour from the hero (gains above 1 reach its glow) as an [r, g, b] a 2D canvas can draw. */
export function screenColour(rgb) {
  const top = Math.max(1, ...rgb);
  return rgb.map((c) => Math.round(255 * Math.pow(Math.max(0, c / top), 1 / 2.2)));
}

/** Smooth start and stop, 0..1 to 0..1. */
export function ease(k) {
  const x = Math.min(1, Math.max(0, k));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Whether grid node n lies inside block. */
export function inBlock(n, block) {
  return n.every((v, a) => v >= block[a][0] && v <= block[a][1]);
}

/** Every grid node inside a team's block. */
export function blockNodes(block) {
  const out = [];
  for (let k = block[2][0]; k <= block[2][1]; k += 1) {
    for (let j = block[1][0]; j <= block[1][1]; j += 1) {
      for (let i = block[0][0]; i <= block[0][1]; i += 1) out.push([i, j, k]);
    }
  }
  return out;
}

const index = (n) => n[0] + n[1] * SIZE + n[2] * SIZE * SIZE;

/** How large the mesh is drawn on a w × h canvas, so it fits with room to spare. */
function focalFor(w, h, far) {
  return far * Math.min((0.34 * w) / (HALF_LENGTH + 0.6), (0.36 * h) / (HALF + 1.2));
}

/**
 * Projects every grid node at mesh time t onto a w × h canvas, as the hero does: turn and breathe, lay the long
 * axis side to side, then view from the swaying camera. Writes x, y and a depth scale per node into out.
 */
export function projectAll(t, w, h, out) {
  const turn = t * MOTION.speed * 0.5, breathe = 1 + 0.1 * Math.sin(t * MOTION.speed * 2);
  const sway = Math.sin((t / CAMERA.swaySeconds) * Math.PI * 2) * (CAMERA.swayDegrees * Math.PI) / 180;
  const [px, py, pz] = CAMERA.position, far = Math.hypot(px, py, pz);
  const f = [-px / far, -py / far, -pz / far];
  const rl = Math.hypot(f[2], f[0]), r = [-f[2] / rl, 0, f[0] / rl];
  const u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
  const focal = focalFor(w, h, far), c = Math.cos(turn), s = Math.sin(turn), cy = Math.cos(-sway), sy = Math.sin(-sway);
  for (let k = 0; k < SIZE; k += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      for (let i = 0; i < SIZE; i += 1) {
        const [x0, y0, z0] = nodePosition(i, j, k);
        const x1 = (c * x0 - s * y0) * breathe, y1 = (s * x0 + c * y0) * breathe, z1 = z0 * breathe;
        const wx = z1, wy = y1, wz = -x1;
        const qx = cy * wx + sy * wz - px, qy = wy - py, qz = -sy * wx + cy * wz - pz;
        const depth = qx * f[0] + qy * f[1] + qz * f[2];
        const o = index([i, j, k]) * 3;
        out[o] = w / 2 + ((qx * r[0] + qz * r[2]) / depth) * focal;
        out[o + 1] = h / 2 - ((qx * u[0] + qy * u[1] + qz * u[2]) / depth) * focal;
        out[o + 2] = (far / depth) * Math.min(1.4, focal / 320);
      }
    }
  }
  return out;
}

function shuffle(list, random) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/** Brings agents (the loose swarm's own objects, moved in place) into the mesh. */
export function createFormation(agents, random = Math.random) {
  const teams = AGENTS.teams.map((team) => ({
    ...AGENTS, ...team, rgb: screenColour(team.agent), glow: screenColour(team.work), nodes: blockNodes(team.block),
  }));
  const spots = shuffle(teams.flatMap((team) => team.nodes.map((n) => ({ team, n }))), random);
  const order = shuffle([...agents], random);
  const carriers = Math.min(WORK.most, Math.floor(order.length * WORK.share));
  const holders = Math.min(spots.length, order.length - carriers);
  const held = new Map();
  const wait = (team) => (team.hold[0] + random() * (team.hold[1] - team.hold[0])) * 0.6;
  const members = order.map((p, n) => {
    const spot = n < holders ? spots[n] : spots[Math.floor(random() * spots.length)];
    const m = { p, team: spot.team, at: spot.n, next: null, along: 0, wait: wait(spot.team), holder: n < holders,
      from: [p.x, p.y], tint: SWARM[p.kind], delay: random() * TWEEN.delay, side: random() < 0.5 ? -1 : 1, flash: 0 };
    if (m.holder) held.set(index(spot.n), m);
    return m;
  });
  const nodes = new Float64Array(SIZE * SIZE * SIZE * 3);
  let t = 0, progress = 0;

  /** Where m sits on its node or wire this frame, and the point a little behind it (its trail). */
  function onMesh(m, back = 0) {
    const a = index(m.at) * 3;
    if (!m.next) return [nodes[a], nodes[a + 1], nodes[a + 2]];
    const b = index(m.next) * 3, k = Math.max(0, m.along - back);
    return [0, 1, 2].map((d) => nodes[a + d] + (nodes[b + d] - nodes[a + d]) * k);
  }

  /** Carries work on: wait at a node, then move to a neighbour in the same block; the teammate there flashes. */
  function carry(m, dt) {
    if (!m.next) {
      if ((m.wait -= dt) > 0) return;
      const choices = STEPS.map((d) => m.at.map((v, a) => v + d[a])).filter((n) => inBlock(n, m.team.block));
      m.next = choices[Math.floor(random() * choices.length)]; m.along = 0;
      return;
    }
    m.along += dt * m.team.speed * 0.6;
    if (m.along < 1) return;
    m.at = m.next; m.next = null; m.wait = wait(m.team);
    const there = held.get(index(m.at));
    if (there) there.flash = 1;
  }

  function step(dt, w, h) {
    t += dt;
    projectAll(t, w, h, nodes);
    let sum = 0;
    for (const m of members) {
      const k = Math.min(1, Math.max(0, (t - m.delay) / TWEEN.seconds)), e = ease(k);
      m.e = e; sum += e;
      if (k >= 1 && !m.holder) carry(m, dt);
      m.flash = Math.max(0, m.flash - dt * m.team.fade);
      const [tx, ty, ts] = onMesh(m), [fx, fy] = m.from, bend = Math.sin(Math.PI * e) * TWEEN.arc * m.side;
      const x = fx + (tx - fx) * e - (ty - fy) * bend, y = fy + (ty - fy) * e + (tx - fx) * bend;
      m.p.vx = (x - m.p.x) / Math.max(dt, 1e-3); m.p.vy = (y - m.p.y) / Math.max(dt, 1e-3);
      m.p.x = x; m.p.y = y; m.scale = 1 + (ts - 1) * e;
    }
    progress = members.length ? sum / members.length : 1;
  }

  function draw(ctx) {
    const mix = (a, b, e) => a.map((v, i) => Math.round(v + (b[i] - v) * e));
    const fill = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
    ctx.strokeStyle = fill(FORMATION.wire, 0.1 * progress);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [a, b] of WIRES) {
      const i = index(a) * 3, j = index(b) * 3;
      ctx.moveTo(nodes[i], nodes[i + 1]); ctx.lineTo(nodes[j], nodes[j + 1]);
    }
    ctx.stroke();
    for (const m of members) {
      const rgb = mix(m.tint, m.holder ? m.team.rgb : m.team.glow, m.e), { x, y } = m.p;
      const r = (1.8 + (m.holder ? 0.9 : 0.4) * m.e) * m.scale * (1 + m.flash * 0.6);
      if (m.e >= 1 && m.next) {
        const [bx, by] = onMesh(m, 0.35);
        ctx.strokeStyle = fill(rgb, 0.45); ctx.lineWidth = r;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(x, y); ctx.stroke();
      }
      if (m.holder || m.flash) {
        ctx.fillStyle = fill(rgb, (0.14 + 0.3 * m.flash) * m.e);
        ctx.beginPath(); ctx.arc(x, y, r + 3 + 5 * m.flash, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = fill(rgb, 0.7 + 0.3 * m.e);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  return {
    step, draw,
    /** How far the swarm has come together, 0 to 1. */
    get progress() { return progress; },
  };
}
