// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The two camera matrices the hypercube needs, column-major as WebGL expects: a perspective projection and a look-at view,
 * plus the turn of the camera around the vertical axis that makes its gentle sway.
 * @feature hero-hypercube
 */

/** A perspective projection. fov is the vertical field of view in degrees. */
export function perspective(fov, aspect, near, far) {
  const f = 1 / Math.tan((fov * Math.PI) / 360), nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

/** A view matrix for a camera at eye looking at target, with y up. */
export function lookAt(eye, target, up = [0, 1, 0]) {
  const z = unit(sub(eye, target)), x = unit(cross(up, z)), y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ]);
}

/** The camera position after turning angle radians around the vertical axis through target. */
export function orbit(position, target, angle) {
  const dx = position[0] - target[0], dz = position[2] - target[2];
  const c = Math.cos(angle), s = Math.sin(angle);
  return [target[0] + dx * c + dz * s, position[1], target[2] - dx * s + dz * c];
}
