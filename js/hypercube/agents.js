// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * Agents at work on the hero hypercube (owner, 6 Oct 2026): a few nodes are agents, and packets of work travel
 * along the wires from one agent to another like energy. When a packet arrives, that agent lights up, holds the work
 * a moment, then hands it on to a neighbour. Every packet keeps to the wires, so the work is always on a known path.
 *
 * The agents work in teams, each in its own colour and its own block of the mesh (owner, 6 Oct 2026: more agents
 * of different colours, seen working around the gold ones but never interfering). A team's agents sit inside its
 * block and pass work only to each other, and a path between two points in a block never leaves it, so no two teams
 * ever share a node or a wire.
 * This file only decides where things are; the shaders (AGENT_VERTEX) move them with the mesh and draw them.
 * @feature hero-agents
 */
import { SIZE, nodePosition } from './geometry.js';

/** A small seeded random, so the agents sit in the same places on every visit. */
export function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

/** Every grid node, for a team with no block of its own. */
export const WHOLE = [[0, SIZE - 1], [0, SIZE - 1], [0, SIZE - 1]];

/** Picks count distinct grid nodes inside a block: [[i lo, hi], [j lo, hi], [k lo, hi]], ends included. */
export function pickAgents(count, random, block = WHOLE) {
  const out = [], seen = new Set();
  const room = block.reduce((n, [lo, hi]) => n * (hi - lo + 1), 1);
  while (out.length < Math.min(count, room)) {
    const n = block.map(([lo, hi]) => lo + Math.floor(random() * (hi - lo + 1)));
    const key = n.join();
    if (!seen.has(key)) { seen.add(key); out.push(n); }
  }
  return out;
}

/** Grid steps between two nodes. */
export const steps = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);

/** A path of grid nodes from a to b along the wires, one axis at a time in a random order. */
export function route(a, b, random) {
  const path = [[...a]], at = [...a];
  const axes = [0, 1, 2].sort(() => random() - 0.5);
  for (const axis of axes) {
    while (at[axis] !== b[axis]) { at[axis] += Math.sign(b[axis] - at[axis]); path.push([...at]); }
  }
  return path;
}

/** The resting position s wires along a path (s may be fractional). */
export function along(path, s) {
  const i = Math.max(0, Math.min(path.length - 1, Math.floor(s)));
  const j = Math.min(path.length - 1, i + 1), k = Math.min(1, Math.max(0, s - i));
  const a = nodePosition(...path[i]), b = nodePosition(...path[j]);
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

/** Whether two blocks share any grid node. */
export function overlaps(a, b) {
  return a.every(([lo, hi], axis) => lo <= b[axis][1] && b[axis][0] <= hi);
}

/**
 * Creates every team. look is AGENTS from design/hypercube-look.js: the shared motion, and teams, each with its own
 * block, colours and numbers. Throws if two blocks overlap, since the teams must never meet. Returns step(dt), which
 * moves everything on, and fill(), which writes positions and looks into two arrays it returns with a count.
 */
export function createAgents(look) {
  look.teams.forEach((a, i) => look.teams.slice(i + 1).forEach((b) => {
    if (overlaps(a.block, b.block)) throw new Error(`teams ${a.name} and ${b.name} share part of the mesh`);
  }));
  const random = seeded(look.seed);
  const teams = look.teams.map((team) => createTeam({ ...look, ...team }, random));
  const capacity = teams.reduce((n, t) => n + t.capacity, 0);
  const positions = new Float32Array(capacity * 3), looks = new Float32Array(capacity * 4);
  return {
    teams,
    step(dt) { for (const t of teams) t.step(dt); },
    fill() {
      let count = 0;
      for (const t of teams) count = t.fill(positions, looks, count);
      return { positions, looks, count };
    },
  };
}

/** One team: its agents inside its block, and the work they pass between them. */
function createTeam(look, random) {
  const agents = pickAgents(look.count, random, look.block).map((node) => ({ node, flash: 0 }));
  const packets = [];
  const capacity = agents.length + look.packets * (1 + look.trail);

  /** The agent a packet goes to next: one of the nearest few, never the sender. */
  function neighbour(from) {
    if (agents.length < 2) return from;
    const near = agents.filter((a) => a !== from).sort((a, b) => steps(from.node, a.node) - steps(from.node, b.node));
    return near[Math.floor(random() * Math.min(look.choices, near.length))];
  }

  function send(from, wait = 0) {
    const to = neighbour(from);
    packets.push({ from, to, path: route(from.node, to.node, random), s: 0, wait });
  }

  for (let i = 0; i < look.packets; i += 1) send(agents[Math.floor(random() * agents.length)], random() * look.hold[1]);

  function step(dt) {
    for (const a of agents) a.flash = Math.max(0, a.flash - dt * look.fade);
    for (let i = packets.length - 1; i >= 0; i -= 1) {
      const p = packets[i];
      if (p.wait > 0) { p.wait -= dt; continue; }
      p.s += dt * look.speed;
      if (p.s >= p.path.length - 1) {
        p.to.flash = 1;
        packets.splice(i, 1);
        send(p.to, look.hold[0] + random() * (look.hold[1] - look.hold[0]));
      }
    }
  }

  function fill(positions, looks, start) {
    let n = start;
    const put = (pos, rgb, gain, size) => {
      positions.set(pos, n * 3);
      looks.set([rgb[0] * gain, rgb[1] * gain, rgb[2] * gain, size], n * 4);
      n += 1;
    };
    for (const a of agents) put(nodePosition(...a.node), look.agent, 1 + a.flash * look.flashGain, look.agentSize + a.flash * 3);
    for (const p of packets) {
      if (p.wait > 0) continue;
      put(along(p.path, p.s), look.work, look.workGain, look.workSize);
      for (let t = 1; t <= look.trail; t += 1) {
        const back = p.s - t * look.spacing;
        if (back < 0) break;
        const k = 1 - t / (look.trail + 1);
        put(along(p.path, back), look.work, look.workGain * k * k, look.workSize * (0.4 + 0.6 * k));
      }
    }
    return n;
  }

  return { name: look.name, block: look.block, step, fill, agents, packets, capacity };
}
