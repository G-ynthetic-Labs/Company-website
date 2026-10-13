// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The standalone swarm-to-mesh piece (owner, 12 Oct 2026: the rogue swarm, the change into the hero mesh and
 * the mesh itself, with no words). It plays on a loop: the unchecked swarm mills about (js/swarm/stage.js), comes
 * together into a copy of the mesh (js/swarm/formation.js), the hero mesh itself fades in exactly over that copy
 * (js/hypercube/hypercube.js), holds, fades back to the copy, and the copy breaks apart into a stirred-up swarm again.
 * Both drawings share one time step, so the copy and the mesh turn, breathe and sway together. Nothing reacts to
 * the pointer. With reduced motion it shows the mesh still; without WebGL2 the formed copy stands in for it.
 * @feature swarm-to-mesh
 */
import { CAMERA } from '../design/hypercube-look.js';
import { HALF_LENGTH, SIZE } from './hypercube/geometry.js';
import { createHypercube } from './hypercube/hypercube.js';
import { createStage } from './swarm/stage.js';
import { ease } from './swarm/formation.js';
import { ticker } from './clock.js';

/** Seconds in each part of the loop. forming covers the formation's own glide (TWEEN: up to 0.6 s wait, then 2 s). */
export const SEQUENCE = { swarm: 11, forming: 3.4, reveal: 1.8, mesh: 12, dissolve: 1.4 };

/** The longest step taken in one frame, as the swarm stage takes; keeps both drawings on the same clock. */
const STEP = 0.05;

/** The order the parts run in. */
const NEXT = { swarm: 'forming', forming: 'reveal', reveal: 'mesh', mesh: 'dissolve', dissolve: 'swarm' };

/**
 * The size, for the hero's projection, at which it draws exactly as large as the formation draws its copy on a
 * w × h canvas. The formation fits its copy with focalFor (formation.js); the hero projects with a field of view.
 */
export function matchScale(w, h) {
  const half = (SIZE - 1) / 2, far = Math.hypot(...CAMERA.position);
  const focal = far * Math.min((0.34 * w) / (HALF_LENGTH + 0.6), (0.36 * h) / (half + 1.2));
  return focal / ((h / 2) / Math.tan((CAMERA.fov * Math.PI) / 360));
}

/** How much of the hero mesh shows (0 to 1) at seconds into a part of the loop. */
export function heroShare(phase, seconds) {
  if (phase === 'reveal') return ease(seconds / SEQUENCE.reveal);
  if (phase === 'mesh') return 1;
  if (phase === 'dissolve') return 1 - ease(seconds / SEQUENCE.dissolve);
  return 0;
}

/** Starts the loop with the swarm on swarmCanvas (2D) and the hero mesh on heroCanvas (WebGL2). */
export function createDirector(swarmCanvas, heroCanvas, { reduced = false } = {}) {
  const placement = {
    now: () => ({ x: 0, y: 0, scale: matchScale(heroCanvas.clientWidth || 1, heroCanvas.clientHeight || 1), dim: 1 }),
    advance() {},
  };
  const cube = createHypercube(heroCanvas, ticker, { placement, maxDpr: 1.5, time: reduced ? 24 : 0 });
  if (!cube) heroCanvas.hidden = true;

  if (reduced) {
    if (cube) { swarmCanvas.hidden = true; heroCanvas.style.opacity = '1'; return { phase: 'still' }; }
    const stage = createStage(swarmCanvas);
    stage?.harnessed();
    for (let s = 0; s < 6; s += STEP) stage?.system.draw(0, STEP);
    return { phase: 'still' };
  }

  const stage = createStage(swarmCanvas);
  if (!stage) return null;
  let phase = 'swarm', at = 0, formed = 0, last = 0;

  /** Moves the loop on to the next part, doing what that change asks of the swarm and the mesh. */
  function advance() {
    const next = NEXT[phase];
    // Without the hero, the formed copy simply holds for the reveal, mesh and dissolve parts.
    if (next === 'forming') { stage.harnessed(); formed = 0; }
    if (next === 'reveal' && cube) cube.seek(formed);
    if (next === 'swarm') stage.unchecked();
    phase = next; at = 0;
  }

  function frame(dt) {
    at += dt;
    stage.system.draw(0, dt);
    if (stage.formed) formed += dt;
    const share = cube ? heroShare(phase, at) : 0;
    if (share > 0) cube.system.draw(0, dt);
    heroCanvas.style.opacity = share.toFixed(3);
    swarmCanvas.style.opacity = (1 - share).toFixed(3);
    if (at >= SEQUENCE[phase]) advance();
  }

  function loop(now) {
    const dt = last ? Math.min(STEP, (now - last) / 1000) : 0;
    last = now;
    if (dt > 0) frame(dt);
    requestAnimationFrame(loop);
  }

  heroCanvas.style.opacity = '0';
  requestAnimationFrame(loop);
  return { get phase() { return phase; }, frame };
}

if (typeof document !== 'undefined') {
  const swarm = document.querySelector('[data-swarm-canvas]');
  const hero = document.querySelector('[data-hero-canvas]');
  const reduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  if (swarm && hero) globalThis.__director = createDirector(swarm, hero, { reduced });
}
