// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The loose swarm: agents released with no checks (owner, 6 Oct 2026). They stream out from one point and mill
 * about; a few are rogues (red, angry, pulsing, darting off on their own) and a few have stalled (purple, slow,
 * sinking, their light low). heat (0 to 1) is how stirred up the swarm is after an unchecked agent runs: everyone
 * moves faster and more wildly, and some loose agents turn rogue for a while. Pure functions; stage.js runs them.
 * @feature swarm
 */

/** How the swarm behaves. Speeds are CSS pixels a second; shares are of all agents released. */
export const BEHAVIOUR = {
  perArea: 1 / 4200, least: 140, max: 320, releasePerSecond: 40, life: [14, 26],
  share: { rogue: 0.06, stalled: 0.1 },
  speed: { loose: 64, rogue: 120, stalled: 9 },
  sight: 42, apart: 14,
  // When stirred up: the share of loose agents that turn rogue, and for how many seconds.
  turn: 0.3, turnFor: [5, 9],
};

/** Which kind a new agent is, from one random draw. */
export function kindFor(r, share = BEHAVIOUR.share) {
  if (r < share.rogue) return 'rogue';
  if (r < share.rogue + share.stalled) return 'stalled';
  return 'loose';
}

/** A new agent at the release point, heading up and out into the open. */
export function release(at, random = Math.random) {
  const kind = kindFor(random());
  const a = -Math.PI / 2 + (random() - 0.4) * 1.8, v = BEHAVIOUR.speed[kind] * (0.6 + random() * 0.6);
  const [lo, hi] = BEHAVIOUR.life;
  return { kind, x: at.x, y: at.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, age: 0, life: lo + random() * (hi - lo),
    phase: random() * Math.PI * 2 };
}

/** Stirs the swarm: some loose agents turn rogue for a while, and everyone gets a shove. */
export function stir(agents, random = Math.random) {
  const [lo, hi] = BEHAVIOUR.turnFor;
  for (const p of agents) {
    if (p.kind === 'loose' && random() < BEHAVIOUR.turn) { p.kind = 'rogue'; p.calm = lo + random() * (hi - lo); }
    const a = random() * Math.PI * 2, kick = 80 + random() * 120;
    p.vx += Math.cos(a) * kick; p.vy += Math.sin(a) * kick;
  }
}

/** Moves one agent on by dt seconds among its neighbours, inside a w × h field whose open side starts at left. */
export function steer(p, all, dt, w, h, left = 0, heat = 0, random = Math.random) {
  const b = BEHAVIOUR, cruise = b.speed[p.kind] * (1 + heat);
  let ax = 0, ay = 0, cx = 0, cy = 0, vx = 0, vy = 0, n = 0;
  for (const q of all) {
    if (q === p) continue;
    const dx = q.x - p.x, dy = q.y - p.y, d2 = dx * dx + dy * dy;
    if (d2 > b.sight * b.sight) continue;
    n += 1; cx += dx; cy += dy; vx += q.vx; vy += q.vy;
    if (d2 < b.apart * b.apart && d2 > 0) { ax -= dx / d2 * 900; ay -= dy / d2 * 900; }
  }
  if (p.kind === 'loose' && n) { ax += cx / n * 0.5 + (vx / n - p.vx) * 0.4; ay += cy / n * 0.5 + (vy / n - p.vy) * 0.4; }
  if (p.kind === 'rogue') { ax += (random() - 0.5) * 900; ay += (random() - 0.5) * 900; }
  if (p.kind === 'stalled') { ay += 6; ax -= p.vx * 0.8; }
  const noise = 60 * (1 + 3 * heat);
  ax += (random() - 0.5) * noise; ay += (random() - 0.5) * noise;
  // Rogues ignore the edge of the words; everyone else keeps to the open side.
  const edge = 40, wall = p.kind === 'rogue' ? edge : left + edge;
  if (p.x < wall) ax += (wall - p.x) * 3;
  if (p.x > w - edge) ax -= (p.x - (w - edge)) * 3;
  if (p.y < edge) ay += (edge - p.y) * 3;
  if (p.y > h - edge) ay -= (p.y - (h - edge)) * 3;
  p.vx += ax * dt; p.vy += ay * dt;
  const s = Math.hypot(p.vx, p.vy), top = cruise * 1.6;
  if (s > top) { p.vx *= top / s; p.vy *= top / s; }
  p.x += p.vx * dt; p.y += p.vy * dt; p.age += dt;
  if (p.calm !== undefined && (p.calm -= dt) <= 0) { p.kind = 'loose'; delete p.calm; }
}

/** How one agent looks at time t: its radius and alpha, by kind and age (fading in, and out at the end of its life). */
export function looks(p, t) {
  const fade = Math.min(1, p.age / 0.8, Math.max(0, (p.life - p.age) / 2));
  if (p.kind === 'rogue') return { r: 2.6 + 1.6 * Math.abs(Math.sin(t * 7 + p.phase)), a: fade, glow: 4 };
  if (p.kind === 'stalled') return { r: 2.4, a: fade * (0.35 + 0.2 * Math.sin(t * 0.8 + p.phase)), glow: 2 };
  return { r: 1.8, a: fade * 0.7, glow: 0 };
}
