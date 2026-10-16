// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The colours the canvas visuals draw with. Canvas cannot read CSS classes, so its colours live here, beside
 * tokens.css, under the design contract: nothing outside site/design/ names a colour (README.md).
 * @feature design-system
 *
 * The mesh gradient runs from deep reds through luxe gold and silver to deep blues and purples.
 */

/** The mesh gradient, as [position 0..1, [r, g, b]] stops. */
export const PALETTE = [
  [0, [92, 10, 26]], [0.2, [176, 38, 58]], [0.4, [217, 178, 90]], [0.52, [230, 232, 236]],
  [0.66, [58, 95, 207]], [0.82, [30, 47, 122]], [1, [91, 42, 134]],
];

/** The colour at tone t (0 to 1) on the mesh gradient, as an rgba() string. */
export function colourAt(t, alpha = 1) {
  const x = Math.min(1, Math.max(0, t));
  let i = 0;
  while (i < PALETTE.length - 2 && x > PALETTE[i + 1][0]) i += 1;
  const [t0, c0] = PALETTE[i], [t1, c1] = PALETTE[i + 1], k = (x - t0) / (t1 - t0);
  return `rgba(${c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(',')},${alpha})`;
}

/** Fixed colours for the portal lock's ring, rails and glow. */
export const LOCK = {
  ring: 'rgba(201,204,210,.45)',
  rail: 'rgba(201,204,210,.35)',
  gold: 'rgba(240,207,120,.95)',
  glow: (a) => `rgba(255,243,196,${a})`,
  glowEdge: 'rgba(240,207,120,0)',
};

/**
 * The swarm at the foot of the home page (owner, 6 Oct 2026): unchecked agents released with nothing around them.
 * loose is the swarm itself, rogue the angry red agents that step out of line, stalled the sad purple agents that
 * fail to finish their tasks. Each is [r, g, b]; the swarm sets the alpha as it draws.
 */
export const SWARM = {
  loose: [150, 156, 168],
  rogue: [217, 119, 74],
  stalled: [146, 112, 196],
};

/**
 * The swarm once it is harnessed (owner, 6 Oct 2026): it forms into a copy of the hero mesh, and each agent takes
 * its team's colour from design/hypercube-look.js. wire is the faint mesh it forms along; [r, g, b] as above.
 */
export const FORMATION = {
  wire: [196, 202, 214],
};
