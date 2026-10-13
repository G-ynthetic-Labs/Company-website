// Copyright (c) 2026 G-ynthetic Labs LLC. All rights reserved.
// Proprietary and confidential. Licensed, not sold: use only under a written license from G-ynthetic Labs LLC. See LICENSE.
/**
 * The glow. Picks out what is brighter than a threshold, blurs it down a chain of ever smaller images and back up
 * again (each step up blending with the step below by the spread), then lays it over the mesh and writes the
 * result to the screen in display colour. Written for this site; no outside library.
 * @feature hero-hypercube
 */
import { SCREEN_VERTEX } from './shaders.js';
import { dropTarget, program, sampler, target, uniforms } from './gl-kit.js';

const HEAD = '#version 300 es\nprecision highp float;\nin vec2 vUv;\nout vec4 outColor;\nuniform sampler2D uInput;\n';

const BRIGHT = `${HEAD}uniform float uThreshold, uSmoothing;
void main() {
  vec3 c = texture(uInput, vUv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  outColor = vec4(c * smoothstep(uThreshold, uThreshold + uSmoothing, l), 1.0);
}`;

// Thirteen taps in a weighted cross-and-box pattern: a smooth half-size step without shimmer.
const DOWN = `${HEAD}uniform vec2 uTexel;
vec3 at(vec2 o) { return texture(uInput, vUv + o * uTexel).rgb; }
void main() {
  vec3 c = at(vec2(0)) * 0.125;
  c += (at(vec2(-1, -1)) + at(vec2(1, -1)) + at(vec2(-1, 1)) + at(vec2(1, 1))) * 0.125;
  c += (at(vec2(-2, -2)) + at(vec2(2, -2)) + at(vec2(-2, 2)) + at(vec2(2, 2))) * 0.03125;
  c += (at(vec2(0, -2)) + at(vec2(-2, 0)) + at(vec2(2, 0)) + at(vec2(0, 2))) * 0.0625;
  outColor = vec4(c, 1.0);
}`;

// A tent filter up one level, blended with the matching level on the way down by the spread.
const UP = `${HEAD}uniform sampler2D uBelow;
uniform vec2 uTexel;
uniform float uRadius;
vec3 at(vec2 o) { return texture(uInput, vUv + o * uTexel).rgb; }
void main() {
  vec3 c = at(vec2(0)) * 4.0;
  c += (at(vec2(-1, 0)) + at(vec2(1, 0)) + at(vec2(0, -1)) + at(vec2(0, 1))) * 2.0;
  c += at(vec2(-1, -1)) + at(vec2(1, -1)) + at(vec2(-1, 1)) + at(vec2(1, 1));
  outColor = vec4(mix(texture(uBelow, vUv).rgb, c / 16.0, uRadius), 1.0);
}`;

const FINAL = `${HEAD}uniform sampler2D uGlow;
uniform float uIntensity, uDim;
uniform vec3 uBackground;
vec3 display(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
void main() {
  vec3 c = uBackground + texture(uInput, vUv).rgb + texture(uGlow, vUv).rgb * uIntensity;
  outColor = vec4(display(c * uDim), 1.0);
}`;

/** Creates the glow passes for a WebGL2 context. look is BLOOM from design/hypercube-look.js. */
export function createBloom(gl, look, float) {
  const p = {
    bright: program(gl, SCREEN_VERTEX, BRIGHT),
    down: program(gl, SCREEN_VERTEX, DOWN),
    up: program(gl, SCREEN_VERTEX, UP),
    final: program(gl, SCREEN_VERTEX, FINAL),
  };
  let downs = [], ups = [];

  const pass = (prog, into, values, inputs) => {
    gl.useProgram(prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, into ? into.framebuffer : null);
    gl.viewport(0, 0, into ? into.w : gl.drawingBufferWidth, into ? into.h : gl.drawingBufferHeight);
    uniforms(gl, prog, values);
    inputs.forEach(([name, tex], i) => sampler(gl, prog, name, tex, i));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  return {
    /** Remakes the blur chain for a drawing buffer of w × h. */
    resize(w, h) {
      [...downs, ...ups].forEach((t) => dropTarget(gl, t));
      downs = []; ups = [];
      let lw = Math.max(1, Math.round(w * look.scale)), lh = Math.max(1, Math.round(h * look.scale));
      for (let i = 0; i < look.levels && (i === 0 || (lw >= 2 && lh >= 2)); i += 1) {
        downs.push(target(gl, lw, lh, float));
        if (i > 0) ups.push(target(gl, downs[i - 1].w, downs[i - 1].h, float));
        lw = Math.max(1, lw >> 1); lh = Math.max(1, lh >> 1);
      }
    },

    /** Glows the scene held in sceneTexture and writes the finished frame to the screen. */
    render(sceneTexture, background, dim = 1) {
      gl.disable(gl.BLEND);
      pass(p.bright, downs[0], { uThreshold: look.threshold, uSmoothing: look.smoothing }, [['uInput', sceneTexture]]);
      for (let i = 1; i < downs.length; i += 1) {
        pass(p.down, downs[i], { uTexel: [1 / downs[i - 1].w, 1 / downs[i - 1].h] }, [['uInput', downs[i - 1].texture]]);
      }
      let from = downs[downs.length - 1];
      for (let i = downs.length - 2; i >= 0; i -= 1) {
        const into = ups[i];
        pass(p.up, into, { uTexel: [1 / from.w, 1 / from.h], uRadius: look.radius },
          [['uInput', from.texture], ['uBelow', downs[i].texture]]);
        from = into;
      }
      pass(p.final, null, { uIntensity: look.intensity, uBackground: background, uDim: dim },
        [['uInput', sceneTexture], ['uGlow', from.texture]]);
    },
  };
}
