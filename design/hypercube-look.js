// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * How the hero hypercube looks and moves: its colours, its glow, its camera and the fixed settings it runs on. The
 * renderer (js/hypercube/) reads only this file for anything a visitor sees, under the design contract (README.md).
 * There are no sliders: these preconfigured settings are the whole of its behaviour. It draws in the home page's
 * hero only.
 * @feature design-system
 */

/**
 * What the mesh is drawn on, as linear 0..1 RGB. Black, because the canvas is laid over the hero with a screen
 * blend (hero.css): black lets the page show through and the mesh's light adds on top.
 */
export const BACKGROUND = [0, 0, 0];

/**
 * The colour cycle along the mesh's depth: colour(t) = a + b * cos(2π (c t + d)), one channel per entry. It runs
 * blue through cyan, white, gold and back, and drifts slowly with time. washOut moves every colour that share of the
 * way toward its own grey (0.59: washed out by 59%, owner, 5 Oct 2026) so it sits softly on the charcoal.
 */
export const COLOUR_CYCLE = {
  a: [0.5, 0.5, 0.5],
  b: [0.5, 0.5, 0.5],
  c: [1, 1, 1],
  d: [0.263, 0.416, 0.557],
  drift: 0.1,
  washOut: 0.59,
};

/** Wires are faint so the light travelling through them reads; each mesh node is a small bright point. */
export const STROKE = { wireAlpha: 0.6, pointSize: 1 };

/**
 * The preconfigured motion. weights blends the three states (turn and breathe; shear and twist; fold); the rest are
 * the dynamics: time speed, high-frequency drift, how fast pulses travel out from the middle layer and how quickly
 * they fade, the cross-layer beat, and the overall glow gain.
 */
export const MOTION = {
  weights: [1, 0, 0],
  speed: 0.5,
  drift: 0.3,
  propagation: 1,
  falloff: 0.2,
  interference: 0.2,
  glow: 1.5,
};

/** The bloom around anything bright: what counts as bright, how strong the halo is and how far it spreads. */
export const BLOOM = { threshold: 0.2, smoothing: 0.025, intensity: 1.2, radius: 0.6, levels: 8, scale: 0.5 };

/**
 * Where it sits (owner, 8 Oct 2026): centre stage behind the whole home page, on a layer that stays put while the
 * page scrolls over it. In the hero it sits centred behind the words. Past the hero it
 * wanders on its own, gliding to a new spot every few seconds within the ranges in wander, dimmer so the words over
 * it stay easy to read. It never follows the pointer. glide is seconds per move.
 */
export const PLACEMENT = {
  wide: { x: 0, y: 0, scale: 0.95, dim: 0.9 },
  narrow: { x: 0, y: -0.05, scale: 0.5, dim: 0.8 },
  glide: 7,
  wander: {
    every: 9,
    wide: { x: [-0.45, 0.45], y: [-0.3, 0.3], scale: [0.7, 1.05], dim: 0.6 },
    narrow: { x: [-0.25, 0.25], y: [-0.45, 0.45], scale: [0.38, 0.5], dim: 0.55 },
  },
};

/**
 * Where the camera sits and its field of view. It faces the mesh side on, a little above, and sways gently left
 * and right (swayDegrees each way, one full sway every swaySeconds) so the head stays left and the tail right.
 */
export const CAMERA = {
  position: [0, 6, 16], target: [0, 0, 0], fov: 45, swayDegrees: 22, swaySeconds: 40, near: 0.1, far: 1000,
};

/**
 * The agents on the mesh and the work they pass along its wires (owner, 6 Oct 2026). The shared settings come
 * first; each team may override any of them. Colours are linear RGB; gains above 1 reach the glow. count agents sit on
 * fixed nodes (seed) inside the team's block; packets pieces of work move at once, at speed wires a second, each with
 * a trail of points spacing wires apart. An agent that receives work flashes (flashGain, fading at fade a second),
 * holds it between hold[0] and hold[1] seconds, then passes it to one of its choices nearest teammates. Sizes are in
 * CSS pixels. A block is [[i lo, hi], [j lo, hi], [k lo, hi]] in grid nodes (k runs from the head on the left to the
 * tail on the right); no two blocks may overlap, so the teams never meet (owner: "never interfering").
 */
export const AGENTS = {
  seed: 7, choices: 3, speed: 2.2, trail: 10, spacing: 0.09, hold: [0.4, 1.6], flashGain: 3, fade: 1.4,
  teams: [
    // The gold team: the main work, in the middle of the mesh.
    { name: 'gold', block: [[1, 5], [1, 5], [2, 4]], count: 14, packets: 6,
      agent: [1.4, 1.0, 0.45], agentSize: 8, work: [1, 0.86, 0.6], workGain: 4, workSize: 6 },
    // Teams seen working around them, quieter, each in its own corner of the head and tail ends.
    { name: 'teal', block: [[0, 6], [0, 2], [0, 1]], count: 5, packets: 2, speed: 1.7, trail: 8,
      agent: [0.4, 1.3, 1.5], agentSize: 7, work: [0.55, 0.95, 1], workGain: 2.6, workSize: 4.5 },
    { name: 'violet', block: [[0, 6], [4, 6], [0, 1]], count: 5, packets: 2, speed: 1.5, trail: 8,
      agent: [1.0, 0.55, 1.7], agentSize: 7, work: [0.85, 0.7, 1], workGain: 2.6, workSize: 4.5 },
    { name: 'rose', block: [[0, 6], [0, 2], [5, 6]], count: 5, packets: 2, speed: 1.9, trail: 8,
      agent: [1.7, 0.5, 0.7], agentSize: 7, work: [1, 0.65, 0.7], workGain: 2.6, workSize: 4.5 },
    { name: 'silver', block: [[0, 6], [4, 6], [5, 6]], count: 5, packets: 2, speed: 1.6, trail: 8,
      agent: [1.15, 1.2, 1.4], agentSize: 7, work: [0.9, 0.95, 1], workGain: 2.6, workSize: 4.5 },
  ],
};
