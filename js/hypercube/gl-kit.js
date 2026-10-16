// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * Small WebGL2 helpers the hypercube shares: compile a program, make a render target that can hold light brighter
 * than white (half-float where the device allows it), and set uniforms by name.
 * @feature hero-hypercube
 */

/** Compiles and links a program; throws with the driver's log if either shader fails. */
export function program(gl, vertexSource, fragmentSource) {
  const compile = (type, source) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader failed');
    return s;
  };
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link failed');
  return p;
}

/** Whether render targets can be half-float, so glow above white survives until the final pass. */
export function canFloat(gl) {
  return Boolean(gl.getExtension('EXT_color_buffer_float'));
}

/** A colour render target of w × h, linear-filtered and clamped at the edges. */
export function target(gl, w, h, float) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, float ? gl.RGBA16F : gl.RGBA8, w, h, 0, gl.RGBA,
    float ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
  for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
    [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { texture, framebuffer, w, h };
}

/** Frees a render target. */
export function dropTarget(gl, t) {
  if (!t) return;
  gl.deleteTexture(t.texture);
  gl.deleteFramebuffer(t.framebuffer);
}

/** Sets uniforms on the bound program from a { name: value } map; arrays pick the vector size, numbers are floats. */
export function uniforms(gl, p, values) {
  for (const [name, v] of Object.entries(values)) {
    const at = gl.getUniformLocation(p, name);
    if (at === null) continue;
    if (typeof v === 'number') gl.uniform1f(at, v);
    else if (v.length === 16) gl.uniformMatrix4fv(at, false, v);
    else if (v.length === 4) gl.uniform4fv(at, v);
    else if (v.length === 3) gl.uniform3fv(at, v);
    else if (v.length === 2) gl.uniform2fv(at, v);
  }
}

/** Binds a texture to a unit and points a sampler uniform at it. */
export function sampler(gl, p, name, texture, unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(gl.getUniformLocation(p, name), unit);
}
