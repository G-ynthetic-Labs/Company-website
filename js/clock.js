// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * A quiet stand-in for the site's clock (site/js/clock.js), so the swarm and the mesh copied from the site run on
 * one loop in this standalone piece. Nothing registers with it: js/director.js drives every frame itself, in order,
 * with the same time step for the swarm, the formation and the mesh, so the formation and the mesh stay in step.
 * @feature swarm-to-mesh
 */

/** The ticker the copied modules expect. add and watch do nothing; reduced is handled by js/director.js. */
export const ticker = {
  reduced: false,
  add() { return () => {}; },
  watch() {},
};
