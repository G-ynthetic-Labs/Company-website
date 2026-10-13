// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The swarm beside the problem, the rules and the two runs on the home page (owner, 6 Oct 2026). It starts as agents
 * released with no checks (flock.js). When the unchecked agent runs (the 'swarm:unchecked' event), the swarm is
 * stirred up: it scatters, more agents spill out, some turn rogue for a while, and a red wash rises and fades. When
 * the agent with a job description runs ('swarm:harnessed'), the whole swarm comes together into a copy of the hero
 * mesh (formation.js). The canvas sits in whichever stage slot is most in view: a sticky column on wide screens,
 * places between the words on a phone. Nothing reacts to the pointer; with reduced motion it draws still moments.
 * @feature swarm
 */
import { ticker } from '../clock.js';
import { SWARM } from '../../design/palette.js';
import { BEHAVIOUR, release, stir, steer, looks } from './flock.js';
import { createFormation } from './formation.js';

/** How a stirred-up swarm settles: heat falls by decay a second; burst more agents spill out when it is stirred. */
export const HEAT = { decay: 0.2, burst: 30, wash: 0.16 };

/** Starts the stage on canvas. Returns null where there is no 2D canvas. */
export function createStage(canvas, random = Math.random) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  let w = 0, h = 0, t = 0, owed = 0, heat = 0, agents = [], formation = null;
  const fill = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
  const at = () => ({ x: w * 0.5, y: h * 0.92 });
  const room = () => Math.max(BEHAVIOUR.least, Math.min(BEHAVIOUR.max, Math.round(w * h * BEHAVIOUR.perArea)));

  function resize() {
    const dpr = Math.min(1.5, globalThis.devicePixelRatio || 1);
    const nw = canvas.clientWidth, nh = canvas.clientHeight;
    if (!nw || !nh) return;
    const first = !w;
    // Keep the swarm where it was, relative to the canvas, when the canvas changes size or moves to another slot.
    if (w && h) for (const p of agents) { p.x *= nw / w; p.y *= nh / h; }
    w = nw; h = nh;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // The first time it has a size, let the swarm stream out for a while so the visitor never sees it empty.
    if (first && !agents.length) settle(10);
  }

  function step(dt) {
    t += dt;
    heat = Math.max(0, heat - dt * HEAT.decay);
    if (!w || !h) return;
    if (formation) { formation.step(dt, w, h); return; }
    owed += dt * BEHAVIOUR.releasePerSecond;
    while (owed >= 1 && agents.length < room()) { agents.push(release(at(), random)); owed -= 1; }
    owed = Math.min(owed, 1);
    for (const p of agents) steer(p, agents, dt, w, h, 0, heat, random);
    agents = agents.filter((p) => p.age < p.life);
  }

  function wash() {
    if (heat <= 0) return;
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.7);
    g.addColorStop(0, fill(SWARM.rogue, 0));
    g.addColorStop(1, fill(SWARM.rogue, HEAT.wash * heat));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    wash();
    if (formation) { formation.draw(ctx); return; }
    for (const p of agents) {
      const l = looks(p, t), rgb = SWARM[p.kind];
      if (l.glow) {
        ctx.fillStyle = fill(rgb, l.a * 0.18);
        ctx.beginPath(); ctx.arc(p.x, p.y, l.r + l.glow, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = fill(rgb, l.a);
      ctx.beginPath(); ctx.arc(p.x, p.y, l.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  /** Runs time on by seconds in small steps; for the opening and for still moments under reduced motion. */
  function settle(seconds) {
    for (let s = 0; s < seconds; s += 1 / 30) step(1 / 30);
    draw();
  }

  /** The unchecked agent ran: break any formation, spill more agents out and stir everyone up. */
  function unchecked() {
    if (formation) {
      formation = null;
      const [lo, hi] = BEHAVIOUR.life;
      for (const p of agents) { p.kind = 'loose'; p.age = 1; p.life = 1 + lo + random() * (hi - lo); }
    }
    for (let i = 0; i < HEAT.burst; i += 1) agents.push(release(at(), random));
    stir(agents, random);
    heat = 1;
    if (ticker.reduced) settle(1.5);
  }

  /** The agent with a job description ran: the whole swarm comes together into the mesh. */
  function harnessed() {
    if (formation) return;
    while (agents.length < BEHAVIOUR.least) {
      const p = release({ x: random() * w, y: random() * h }, random);
      p.age = 1; agents.push(p);
    }
    formation = createFormation(agents, random);
    heat = 0;
    if (ticker.reduced) settle(4);
  }

  resize();
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => { resize(); draw(); }).observe(canvas);
  const system = { active: true, draw(_alpha, dt) { step(Math.min(dt, 0.05)); draw(); } };
  if (!ticker.reduced) { ticker.add(system); ticker.watch(canvas, system); }
  return {
    system, unchecked, harnessed,
    get agents() { return agents; },
    get formed() { return formation !== null; },
  };
}

/**
 * Keeps canvas in whichever of slots is shown and most in view. On wide screens only the sticky column is shown, so
 * the canvas stays there; on a phone it moves to the place nearest what the visitor is reading.
 */
export function followSlots(canvas, slots) {
  if (typeof IntersectionObserver !== 'function' || !slots.length) return;
  const seen = new Map();
  const shown = (el) => el.getClientRects().length > 0;
  const choose = () => {
    let best = null, most = -1;
    for (const el of slots) {
      const share = shown(el) ? seen.get(el) ?? 0 : -1;
      if (share > most) { most = share; best = el; }
    }
    if (best && shown(best) && canvas.parentElement !== best) best.append(canvas);
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) seen.set(e.target, e.intersectionRatio);
    choose();
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  for (const el of slots) io.observe(el);
  globalThis.addEventListener?.('resize', choose);
}

if (typeof document !== 'undefined') {
  const canvas = document.querySelector('[data-swarm]');
  const stage = canvas ? createStage(canvas) : null;
  if (canvas && !stage) canvas.hidden = true;
  if (stage) {
    document.addEventListener('swarm:unchecked', () => stage.unchecked());
    document.addEventListener('swarm:harnessed', () => stage.harnessed());
    followSlots(canvas, [...document.querySelectorAll('[data-stage-slot]')]);
  }
}
