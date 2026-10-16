// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The hypercube mesh's shape: a 7×7×7 grid of nodes, centred on the origin, with depth stretched to 2.25 times, and
 * the wires joining each node to its neighbour along every axis. Each wire is cut into short segments so it can bend
 * when the mesh moves.
 * @feature hero-hypercube
 *
 * The long (depth) axis has two named ends, never shown: the head, layer k = 0, which sits on the left of the screen,
 * and the tail, layer k = SIZE - 1, on the right. Everything between is the body.
 */

/** Nodes per axis. */
export const SIZE = 7;
/** How much longer the depth axis is than the other two. */
export const DEPTH_STRETCH = 2.25;
/** How many straight pieces each wire is drawn in. */
export const SEGMENTS_PER_WIRE = 16;

const HALF = (SIZE - 1) / 2;

/** How far the head and the tail sit from the middle, along the long axis. */
export const HALF_LENGTH = HALF * DEPTH_STRETCH;

/** The depth layers that carry the two end labels. */
export const ENDS = { head: 0, tail: SIZE - 1 };

/** Which part of the mesh depth layer k belongs to: 'head', 'tail' or 'body'. */
export function part(k) {
  if (k === ENDS.head) return 'head';
  if (k === ENDS.tail) return 'tail';
  return 'body';
}

/** Where grid node (i, j, k) sits before any motion. */
export function nodePosition(i, j, k) {
  return [i - HALF, j - HALF, (k - HALF) * DEPTH_STRETCH];
}

/** Every node's position, flat as x, y, z triples (SIZE³ nodes). */
export function nodePositions() {
  const out = [];
  for (let k = 0; k < SIZE; k += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      for (let i = 0; i < SIZE; i += 1) out.push(...nodePosition(i, j, k));
    }
  }
  return new Float32Array(out);
}

/** The node pairs that share a wire: each node joined to its next neighbour along x, y and z. */
export function wires() {
  const out = [];
  for (let k = 0; k < SIZE; k += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      for (let i = 0; i < SIZE; i += 1) {
        if (i < SIZE - 1) out.push([[i, j, k], [i + 1, j, k]]);
        if (j < SIZE - 1) out.push([[i, j, k], [i, j + 1, k]]);
        if (k < SIZE - 1) out.push([[i, j, k], [i, j, k + 1]]);
      }
    }
  }
  return out;
}

/** Every wire as line-segment end points, flat as x, y, z triples, two per segment. */
export function wirePositions() {
  const out = [];
  for (const [from, to] of wires()) {
    const a = nodePosition(...from), b = nodePosition(...to);
    for (let s = 0; s < SEGMENTS_PER_WIRE; s += 1) {
      const t0 = s / SEGMENTS_PER_WIRE, t1 = (s + 1) / SEGMENTS_PER_WIRE;
      for (const t of [t0, t1]) out.push(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
    }
  }
  return new Float32Array(out);
}
