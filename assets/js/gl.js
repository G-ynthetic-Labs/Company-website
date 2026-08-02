/* ==========================================================================
   G-ynthetic Labs — GL
   A dependency-free WebGL2 point/line renderer. One program pair, many scenes.
   Every scene is generated from the real structural constants of the systems
   it depicts (7^3 = 343, 3x3x7 = 63, 7 arcs) rather than decorative noise.

   Usage:  <div class="stage framed" data-gl="lattice"></div>
           GL.boot();
   ========================================================================== */

(function (global) {
  'use strict';

  /* ----------------------------------------------------------------- math */

  const M4 = {
    ident() { return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]); },
    perspective(fovy, aspect, near, far) {
      const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
      ]);
    },
    lookAt(eye, center, up) {
      let z0 = eye[0]-center[0], z1 = eye[1]-center[1], z2 = eye[2]-center[2];
      let len = Math.hypot(z0, z1, z2) || 1;
      z0 /= len; z1 /= len; z2 /= len;
      let x0 = up[1]*z2 - up[2]*z1, x1 = up[2]*z0 - up[0]*z2, x2 = up[0]*z1 - up[1]*z0;
      len = Math.hypot(x0, x1, x2) || 1;
      x0 /= len; x1 /= len; x2 /= len;
      const y0 = z1*x2 - z2*x1, y1 = z2*x0 - z0*x2, y2 = z0*x1 - z1*x0;
      return new Float32Array([
        x0, y0, z0, 0,
        x1, y1, z1, 0,
        x2, y2, z2, 0,
        -(x0*eye[0] + x1*eye[1] + x2*eye[2]),
        -(y0*eye[0] + y1*eye[1] + y2*eye[2]),
        -(z0*eye[0] + z1*eye[1] + z2*eye[2]), 1
      ]);
    },
    mul(a, b) {
      const o = new Float32Array(16);
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
          o[c*4+r] = a[r]*b[c*4] + a[4+r]*b[c*4+1] + a[8+r]*b[c*4+2] + a[12+r]*b[c*4+3];
        }
      }
      return o;
    }
  };

  /* seeded RNG — scenes must look identical on every load */
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >> 17;
      s ^= s << 5;  s >>>= 0;
      return s / 4294967296;
    };
  }

  const PALETTE = {
    cyan:   [0.298, 0.941, 0.878],
    violet: [0.486, 0.424, 1.000],
    amber:  [1.000, 0.706, 0.341],
    red:    [1.000, 0.373, 0.427],
    green:  [0.365, 0.863, 0.604],
    pale:   [0.678, 0.769, 0.902]
  };
  const mix = (a, b, t) => [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];

  /* --------------------------------------------------------------- shaders */

  const VERT = `#version 300 es
  precision highp float;

  in vec3 aPos;
  in vec3 aCol;
  in vec4 aSeed;   // x: size  y: phase  z: param  w: param2
  in vec4 aAux;    // scene-specific (axis / origin / group)

  uniform mat4 uProj, uView;
  uniform float uTime, uDpr, uScale;
  uniform int uMode;
  uniform vec2 uPointer;

  out vec3 vCol;
  out float vGlow;

  vec3 rodrigues(vec3 v, vec3 k, float a) {
    float c = cos(a), s = sin(a);
    return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
  }

  void main() {
    vec3 p = aPos;
    float glow = 1.0;
    float t = uTime;

    if (uMode == 0) {
      // LATTICE — 7^3 cell field. A scan plane sweeps the cube on the
      // diagonal; cells brighten as the scan addresses them.
      float d = dot(normalize(vec3(1.0, 0.65, 0.85)), p);
      float scan = sin(t * 0.55 - d * 1.15);
      glow = 0.45 + 0.55 * smoothstep(0.72, 1.0, scan);
      p += normalize(p + 0.001) * sin(t * 0.7 + aSeed.y) * 0.035;
      // aSeed.w > 0.5 marks the portal voxel — it never dims
      if (aSeed.w > 0.5) glow = 1.15 + 0.5 * sin(t * 2.2);
    }
    else if (uMode == 1) {
      // FRACC — recursion tree. Depth-staggered pulse travels outward.
      float depth = aSeed.z;
      float wave = sin(t * 1.1 - depth * 1.6);
      glow = 0.4 + 0.6 * smoothstep(0.55, 1.0, wave);
      p += vec3(sin(t*0.5 + aSeed.y), cos(t*0.43 + aSeed.y), sin(t*0.37 + aSeed.y)) * 0.018 * depth;
    }
    else if (uMode == 2) {
      // ARC BASIS — 7 axes. Sample cloud counter-rotates around the basis.
      if (aSeed.z > 0.5) {
        p = rodrigues(p, normalize(vec3(0.18, 1.0, 0.1)), t * 0.12);
      }
      glow = 0.5 + 0.5 * sin(t * 1.4 + aSeed.y);
    }
    else if (uMode == 3) {
      // ORBIT — each particle rotates about its own ring normal.
      p = rodrigues(p, normalize(aAux.xyz), t * aSeed.z);
      glow = 0.45 + 0.55 * sin(t * 1.6 + aSeed.y);
    }
    else if (uMode == 4) {
      // DOCTRINE — 3x3x7. Layers respire independently; commander nodes lock.
      float layer = aAux.x;
      p.y += sin(t * 0.6 + layer * 0.55) * 0.055;
      glow = 0.4 + 0.6 * smoothstep(0.4, 1.0, sin(t * 0.8 - layer * 0.62));
      if (aSeed.w > 0.5) glow = 1.2;
    }
    else if (uMode == 5) {
      // FIELD — propagation. aSeed.z holds geodesic distance from source.
      float front = fract(t * 0.16) * 9.0;
      float dd = abs(aSeed.z - front);
      glow = 0.22 + 0.95 * exp(-dd * dd * 1.4);
      p.y += sin(t * 0.9 + aSeed.y) * 0.012;
    }
    else {
      // DRIFT — ambient substrate.
      p += vec3(sin(t*0.21 + aSeed.y) , cos(t*0.17 + aSeed.y*1.7), sin(t*0.13 + aSeed.y*0.6)) * 0.12;
      glow = 0.3 + 0.5 * (0.5 + 0.5 * sin(t * 0.6 + aSeed.y));
    }

    // pointer parallax — the object leans toward the cursor
    p.x += uPointer.x * 0.16;
    p.y += uPointer.y * 0.16;

    vec4 mv = uView * vec4(p * uScale, 1.0);
    gl_Position = uProj * mv;
    gl_PointSize = aSeed.x * uDpr * (24.0 / max(0.35, -mv.z)) * (0.7 + 0.55 * glow);

    vCol = aCol;
    vGlow = glow;
  }`;

  const FRAG = `#version 300 es
  precision highp float;
  in vec3 vCol;
  in float vGlow;
  out vec4 outColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.02, r);
    float halo = smoothstep(0.5, 0.16, r);
    float a = clamp(core + halo * 0.45, 0.0, 1.0);
    vec3 rgb = vCol * (0.55 + vGlow * 1.25);
    // premultiplied additive: colour carries the energy, alpha carries coverage
    outColor = vec4(rgb * a, a * 0.9);
  }`;

  const LVERT = `#version 300 es
  precision highp float;
  in vec3 aPos;
  in vec4 aCol;      // rgb + base alpha
  in float aSeed;
  uniform mat4 uProj, uView;
  uniform float uTime, uScale;
  uniform vec2 uPointer;
  out vec4 vCol;
  void main() {
    vec3 p = aPos;
    p.x += uPointer.x * 0.16;
    p.y += uPointer.y * 0.16;
    float pulse = 0.55 + 0.75 * (0.5 + 0.5 * sin(uTime * 1.25 - aSeed * 2.4));
    vCol = vec4(aCol.rgb * 1.15, aCol.a * pulse * 2.1);
    gl_Position = uProj * uView * vec4(p * uScale, 1.0);
  }`;

  const LFRAG = `#version 300 es
  precision highp float;
  in vec4 vCol;
  out vec4 outColor;
  void main() { outColor = vec4(vCol.rgb * vCol.a, vCol.a); }`;

  /* ---------------------------------------------------------------- scenes */

  /* A scene returns:
     pts   [{p:[x,y,z], c:[r,g,b], size, phase, param, flag, aux:[x,y,z,w]}]
     lines [{a:[..], b:[..], c:[r,g,b], alpha, seed}]
     plus camera hints: dist, scale, autorot                                 */

  const SCENES = {

    /* 7x7x7 = 343 addressable cells. Portal voxel at (6,6,6). */
    lattice(opt) {
      const N = 7, r = rng(20260630);
      const pts = [], lines = [];
      const half = (N - 1) / 2;
      const cells = [];
      for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
        const p = [x - half, y - half, z - half];
        const d = Math.hypot(p[0], p[1], p[2]) / (half * Math.sqrt(3));
        const occupied = r() < 0.73;                    // ~250/343 occupied
        const portal = (x === 6 && y === 6 && z === 6);
        let c = mix(PALETTE.violet, PALETTE.cyan, 1 - d);
        if (portal) c = PALETTE.amber;
        else if (!occupied) c = mix(PALETTE.pale, PALETTE.violet, 0.5);
        pts.push({
          p, c,
          size: portal ? 9 : (occupied ? 3.6 : 1.7),
          phase: r() * 6.28,
          param: d,
          flag: portal ? 1 : 0
        });
        if (occupied) cells.push(p);
      }
      // Hebbian edges — associative links, not lattice adjacency.
      for (let i = 0; i < 190; i++) {
        const a = cells[(r() * cells.length) | 0];
        const b = cells[(r() * cells.length) | 0];
        if (!a || !b || a === b) continue;
        const w = 0.1 + r() * 0.3;
        lines.push({ a, b, c: r() < 0.28 ? PALETTE.cyan : PALETTE.violet, alpha: w, seed: r() * 6 });
      }
      // cube wireframe
      const e = half + 0.55;
      const corners = [[-e,-e,-e],[e,-e,-e],[e,e,-e],[-e,e,-e],[-e,-e,e],[e,-e,e],[e,e,e],[-e,e,e]];
      [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
        .forEach(([i, j]) => lines.push({ a: corners[i], b: corners[j], c: PALETTE.pale, alpha: 0.13, seed: 0 }));
      return { pts, lines, mode: 0, dist: 12.2, scale: 1.0 };
    },

    /* F.R.A.C.C. — 3 axes, 3 branches, 7 tactics = 63 terminals. */
    fracc() {
      const r = rng(63063);
      const pts = [], lines = [];
      const root = [0, 3.2, 0];
      pts.push({ p: root, c: PALETTE.amber, size: 9, phase: 0, param: 0, flag: 1 });

      for (let a = 0; a < 3; a++) {
        const th = (a / 3) * Math.PI * 2;
        const l1 = [Math.cos(th) * 2.0, 1.5, Math.sin(th) * 2.0];
        pts.push({ p: l1, c: PALETTE.cyan, size: 6.5, phase: r() * 6.28, param: 1, flag: 0 });
        lines.push({ a: root, b: l1, c: PALETTE.amber, alpha: 0.42, seed: 0.6 });

        for (let b = 0; b < 3; b++) {
          const th2 = th + (b - 1) * 0.62;
          const l2 = [Math.cos(th2) * 3.5, -0.35, Math.sin(th2) * 3.5];
          pts.push({ p: l2, c: PALETTE.violet, size: 5, phase: r() * 6.28, param: 2, flag: 0 });
          lines.push({ a: l1, b: l2, c: PALETTE.cyan, alpha: 0.3, seed: 1.2 });

          for (let t = 0; t < 7; t++) {           // 3 x 3 x 7 = 63
            const th3 = th2 + (t - 3) * 0.135;
            const rad = 4.9 + (t % 2) * 0.42;
            const l3 = [Math.cos(th3) * rad, -2.3 - (t % 3) * 0.24, Math.sin(th3) * rad];
            pts.push({ p: l3, c: mix(PALETTE.violet, PALETTE.cyan, t / 6), size: 3.1, phase: r() * 6.28, param: 3, flag: 0 });
            lines.push({ a: l2, b: l3, c: PALETTE.violet, alpha: 0.2, seed: 1.9 });
          }
        }
      }
      return { pts, lines, mode: 1, dist: 12.8, scale: 1.05 };
    },

    /* Arc basis — 7 axes + the cosine web that tests independence. */
    arcs() {
      const r = rng(7777);
      const pts = [], lines = [];
      const N = 7, tips = [];
      for (let i = 0; i < N; i++) {                    // fibonacci sphere
        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const th = i * 2.39996;
        const v = [Math.cos(th) * rad * 4.2, y * 4.2, Math.sin(th) * rad * 4.2];
        tips.push(v);
        const c = mix(PALETTE.cyan, PALETTE.violet, i / (N - 1));
        pts.push({ p: v, c, size: 8.5, phase: i * 0.9, param: 0, flag: 1 });
        lines.push({ a: [0,0,0], b: v, c, alpha: 0.5, seed: i * 0.5 });
        // shaft samples
        for (let s = 1; s < 9; s++) {
          const t = s / 9;
          pts.push({ p: [v[0]*t, v[1]*t, v[2]*t], c, size: 1.9, phase: r()*6.28, param: 0, flag: 0 });
        }
      }
      // off-diagonal cosine chords: entangled pairs read hot
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const cs = Math.abs(tips[i][0]*tips[j][0] + tips[i][1]*tips[j][1] + tips[i][2]*tips[j][2]) / (4.2*4.2);
        if (cs < 0.08) continue;
        lines.push({ a: tips[i], b: tips[j], c: cs > 0.5 ? PALETTE.red : PALETTE.amber, alpha: 0.1 + cs * 0.3, seed: (i+j) * 0.4 });
      }
      // projected input cloud
      for (let i = 0; i < 420; i++) {
        const u = r() * 6.2832, v = Math.acos(2 * r() - 1), rad = 2.1 + r() * 2.6;
        pts.push({
          p: [Math.sin(v)*Math.cos(u)*rad, Math.cos(v)*rad, Math.sin(v)*Math.sin(u)*rad],
          c: PALETTE.pale, size: 1.5, phase: r() * 6.28, param: 1, flag: 0
        });
      }
      pts.push({ p: [0,0,0], c: PALETTE.amber, size: 10, phase: 0, param: 0, flag: 1 });
      return { pts, lines, mode: 2, dist: 12.0, scale: 1.05 };
    },

    /* OrbitGen — nested generated shells of simulation metadata. */
    orbit() {
      const r = rng(41337);
      const pts = [], lines = [];
      const rings = 7;
      for (let k = 0; k < rings; k++) {
        const rad = 1.5 + k * 0.62;
        const inc = (k / rings) * Math.PI * 0.85 + 0.15;
        const axis = [Math.sin(inc) * Math.cos(k * 1.1), Math.cos(inc), Math.sin(inc) * Math.sin(k * 1.1)];
        const n = 90 + k * 26;
        const c = mix(PALETTE.cyan, PALETTE.violet, k / (rings - 1));
        // basis for the ring plane, perpendicular to axis
        let ref = Math.abs(axis[1]) > 0.9 ? [1,0,0] : [0,1,0];
        const e1 = norm(cross(ref, axis)), e2 = norm(cross(axis, e1));
        for (let i = 0; i < n; i++) {
          const a = (i / n) * 6.2832 + r() * 0.05;
          const jit = 1 + (r() - 0.5) * 0.09;
          const p = [
            (e1[0]*Math.cos(a) + e2[0]*Math.sin(a)) * rad * jit,
            (e1[1]*Math.cos(a) + e2[1]*Math.sin(a)) * rad * jit,
            (e1[2]*Math.cos(a) + e2[2]*Math.sin(a)) * rad * jit
          ];
          pts.push({
            p, c, size: r() < 0.06 ? 5 : 2.2, phase: r() * 6.28,
            param: 0.06 + (rings - k) * 0.028, flag: 0,
            aux: [axis[0], axis[1], axis[2], 0]
          });
        }
      }
      pts.push({ p: [0,0,0], c: PALETTE.amber, size: 13, phase: 0, param: 0, flag: 1, aux: [0,1,0,0] });
      return { pts, lines, mode: 3, dist: 11.5, scale: 1.15 };
    },

    /* Cubex3 — 3x3x7 doctrine prism: 7 tactic layers, 3x3 risk/reward/relation. */
    doctrine() {
      const r = rng(3037);
      const pts = [], lines = [];
      const grid = [];
      for (let l = 0; l < 7; l++) {
        const y = (l - 3) * 0.92;
        const layer = [];
        for (let x = 0; x < 3; x++) {
          const row = [];
          for (let z = 0; z < 3; z++) {
            const p = [(x - 1) * 1.65, y, (z - 1) * 1.65];
            const commander = (x === 1 && z === 1) || (l === 0 && x === 0) || (l === 6 && z === 2);
            const c = commander ? PALETTE.amber : mix(PALETTE.violet, PALETTE.cyan, l / 6);
            pts.push({
              p, c, size: commander ? 8 : 4.4, phase: r() * 6.28, param: l, flag: commander ? 1 : 0,
              aux: [l, x, z, 0]
            });
            row.push(p);
            grid.push(p);
            layer.push(p);
          }
        }
        // in-layer mesh
        for (let i = 0; i < layer.length; i++) for (let j = i + 1; j < layer.length; j++) {
          const d = dist(layer[i], layer[j]);
          if (d < 1.8) lines.push({ a: layer[i], b: layer[j], c: PALETTE.cyan, alpha: 0.13, seed: l * 0.5 });
        }
      }
      // vertical command channels
      for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) {
        for (let l = 0; l < 6; l++) {
          const a = [(x-1)*1.65, (l-3)*0.92, (z-1)*1.65];
          const b = [(x-1)*1.65, (l-2)*0.92, (z-1)*1.65];
          lines.push({ a, b, c: PALETTE.violet, alpha: 0.16, seed: l * 0.4 + x });
        }
      }
      // arbitration links between the three commanders
      lines.push({ a: [0,-2.76,0], b: [-1.65,-2.76,1.65], c: PALETTE.amber, alpha: 0.4, seed: 2 });
      return { pts, lines, mode: 4, dist: 11.8, scale: 1.35 };
    },

    /* SeCUReD — urban grid with a propagating deployment front. */
    city() {
      const r = rng(51151);
      const pts = [], lines = [];
      const N = 15, src = [3, 3];
      for (let x = 0; x < N; x++) for (let z = 0; z < N; z++) {
        if (r() < 0.16) continue;                          // parks / voids
        const h = 0.3 + Math.pow(r(), 2.1) * 3.4;
        const gx = (x - N/2) * 0.62, gz = (z - N/2) * 0.62;
        const d = Math.hypot(x - src[0], z - src[1]) * 0.62;
        const steps = Math.max(2, Math.round(h / 0.26));
        for (let s = 0; s <= steps; s++) {
          const yy = -1.6 + (s / steps) * h;
          const t = s / steps;
          pts.push({
            p: [gx, yy, gz],
            c: mix(PALETTE.violet, PALETTE.cyan, t),
            size: s === steps ? 3.4 : 1.9,
            phase: r() * 6.28,
            param: d, flag: 0
          });
        }
        if (r() < 0.1) {
          pts.push({ p: [gx, -1.6 + h + 0.35, gz], c: PALETTE.amber, size: 5.5, phase: r()*6.28, param: d, flag: 1 });
        }
      }
      // street grid
      for (let i = 0; i <= N; i++) {
        const g = (i - N/2) * 0.62;
        const e = (N/2) * 0.62;
        lines.push({ a: [g, -1.62, -e], b: [g, -1.62, e], c: PALETTE.pale, alpha: 0.1, seed: i * 0.3 });
        lines.push({ a: [-e, -1.62, g], b: [e, -1.62, g], c: PALETTE.pale, alpha: 0.1, seed: i * 0.3 });
      }
      return { pts, lines, mode: 5, dist: 11.5, scale: 1.25 };
    },

    /* The address space itself: recursion INWARD. Each level is a full lattice
       nested inside a single cell of its parent — bounded in extent, unbounded
       in depth. Nothing branches outward; everything descends. */
    recursive() {
      const r = rng(11235);
      const pts = [], lines = [];
      const LEVELS = 5;

      // each level: a shrinking cube, offset toward the descent corner
      let origin = [0, 0, 0];
      let extent = 4.6;

      for (let L = 0; L < LEVELS; L++) {
        const N = 3;                       // 3 cells per axis at every scale
        const step = (extent * 2) / (N - 1);
        const c = mix(PALETTE.cyan, PALETTE.violet, L / (LEVELS - 1));
        const nodes = [];

        for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
          const p = [
            origin[0] - extent + x * step,
            origin[1] - extent + y * step,
            origin[2] - extent + z * step
          ];
          // the descent cell — the one that contains the next whole level
          const portal = (x === 2 && y === 2 && z === 2);
          nodes.push(p);
          pts.push({
            p,
            c: portal ? PALETTE.amber : c,
            size: portal ? 7.5 - L * 0.6 : Math.max(1.4, 4.6 - L * 0.7),
            phase: r() * 6.28,
            param: L,                       // depth drives the descent pulse
            flag: portal ? 1 : 0
          });
        }

        // cube frame for this level
        const e = extent + step * 0.14;
        const cs = [
          [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
          [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1]
        ].map(v => [origin[0]+v[0]*e, origin[1]+v[1]*e, origin[2]+v[2]*e]);
        [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
          .forEach(([i,j]) => lines.push({
            a: cs[i], b: cs[j],
            c: L === 0 ? PALETTE.pale : c,
            alpha: 0.34 - L * 0.045,
            seed: L * 0.8
          }));

        // sparse in-level associations
        for (let i = 0; i < 14; i++) {
          const a = nodes[(r() * nodes.length) | 0];
          const b = nodes[(r() * nodes.length) | 0];
          if (a !== b) lines.push({ a, b, c, alpha: 0.14, seed: r() * 5 });
        }

        // descend: the next level lives inside the portal cell
        const portalPos = [origin[0] + extent, origin[1] + extent, origin[2] + extent];
        if (L < LEVELS - 1) {
          lines.push({ a: origin, b: portalPos, c: PALETTE.amber, alpha: 0.3, seed: L });
          origin = portalPos;
          extent = extent * 0.34;
        }
      }
      // The descent walks toward one corner, so recentre and normalise the whole
      // object to the frame rather than letting depth push it off-screen.
      const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
      const grow = p => {
        for (let i = 0; i < 3; i++) {
          if (p[i] < lo[i]) lo[i] = p[i];
          if (p[i] > hi[i]) hi[i] = p[i];
        }
      };
      pts.forEach(pt => grow(pt.p));
      lines.forEach(L => { grow(L.a); grow(L.b); });   // frame corners count too
      const mid = [0, 1, 2].map(i => (lo[i] + hi[i]) / 2);
      const span = Math.max(hi[0]-lo[0], hi[1]-lo[1], hi[2]-lo[2]) || 1;
      const k = 7.4 / span;
      // Lines reuse point arrays by reference, so transform each array exactly once.
      const seen = new Set();
      const fix = p => {
        if (seen.has(p)) return;
        seen.add(p);
        for (let i = 0; i < 3; i++) p[i] = (p[i] - mid[i]) * k;
      };
      pts.forEach(pt => fix(pt.p));
      lines.forEach(L => { fix(L.a); fix(L.b); });

      return { pts, lines, mode: 1, dist: 17.5, scale: 1.0 };
    },

    /* A hash-chained ledger running forward through time, with one record
       drifting to a different-but-stable value. The pulse is verification
       sweeping the chain; the red branch is what it catches. */
    chain() {
      const r = rng(426426);
      const pts = [], lines = [];
      const N = 34, SPAN = 11.5;
      const nodes = [];

      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const x = (t - 0.5) * SPAN;
        const y = Math.sin(t * 5.2) * 0.55;
        const z = Math.cos(t * 3.1) * 0.7;
        const c = mix(PALETTE.cyan, PALETTE.violet, t);
        nodes.push([x, y, z]);

        // each record is a small cluster — a block of bytes, not a dot
        const bits = 7;
        for (let b = 0; b < bits; b++) {
          const a = (b / bits) * 6.2832;
          pts.push({
            p: [x + Math.cos(a) * 0.19, y + Math.sin(a) * 0.19, z + (r() - 0.5) * 0.16],
            c, size: 2.1, phase: r() * 6.28, param: i * 0.26, flag: 0
          });
        }
        pts.push({ p: [x, y, z], c, size: 4.6, phase: r() * 6.28, param: i * 0.26, flag: 0 });
        if (i > 0) lines.push({ a: nodes[i - 1], b: nodes[i], c, alpha: 0.4, seed: i * 0.3 });
      }

      // the divergence: a second, perfectly stable branch at the drift point
      const D = 23;
      let prev = nodes[D];
      for (let k = 1; k <= 8; k++) {
        const base = nodes[Math.min(N - 1, D + k)];
        const p = [base[0], base[1] - 1.15 - k * 0.075, base[2] + 0.55];
        pts.push({ p, c: PALETTE.red, size: 4.2, phase: r() * 6.28, param: (D + k) * 0.26, flag: 0 });
        for (let b = 0; b < 5; b++) {
          const a = (b / 5) * 6.2832;
          pts.push({
            p: [p[0] + Math.cos(a) * 0.16, p[1] + Math.sin(a) * 0.16, p[2] + (r() - 0.5) * 0.14],
            c: PALETTE.red, size: 1.7, phase: r() * 6.28, param: (D + k) * 0.26, flag: 0
          });
        }
        lines.push({ a: prev, b: p, c: PALETTE.red, alpha: 0.42, seed: k * 0.4 });
        prev = p;
      }
      // the sign-off anchor
      pts.push({ p: nodes[4], c: PALETTE.amber, size: 11, phase: 0, param: 4 * 0.26, flag: 0 });
      pts.push({ p: nodes[D], c: PALETTE.amber, size: 8, phase: 0, param: D * 0.26, flag: 0 });

      return { pts, lines, mode: 5, dist: 15.5, scale: 1.0 };
    },

    /* Ambient substrate for page headers. */
    field() {
      const r = rng(9091);
      const pts = [], lines = [];
      const nodes = [];
      for (let i = 0; i < 300; i++) {
        const p = [(r()-0.5)*17, (r()-0.5)*9, (r()-0.5)*11];
        nodes.push(p);
        pts.push({
          p, c: r() < 0.14 ? PALETTE.cyan : mix(PALETTE.violet, PALETTE.pale, r()),
          size: 1 + r() * 2.6, phase: r() * 6.28, param: 0, flag: 0
        });
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (dist(nodes[i], nodes[j]) < 1.75 && r() < 0.5) {
            lines.push({ a: nodes[i], b: nodes[j], c: PALETTE.violet, alpha: 0.12, seed: r() * 5 });
          }
        }
      }
      return { pts, lines, mode: 6, dist: 13.5, scale: 1.0 };
    }
  };

  function cross(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
  function norm(a) { const l = Math.hypot(a[0],a[1],a[2]) || 1; return [a[0]/l, a[1]/l, a[2]/l]; }
  function dist(a, b) { return Math.hypot(a[0]-b[0], a[1]-b[1], a[2]-b[2]); }

  /* -------------------------------------------------------------- renderer */

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[GL] shader:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  function program(gl, vs, fs) {
    const v = compile(gl, gl.VERTEX_SHADER, vs), f = compile(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram();
    gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn('[GL] link:', gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  }

  function Instance(host, name, opts) {
    const scene = (SCENES[name] || SCENES.field)(opts);
    const canvas = document.createElement('canvas');
    host.appendChild(canvas);

    const gl = canvas.getContext('webgl2', {
      antialias: true, alpha: true, premultipliedAlpha: true,
      powerPreference: 'high-performance', depth: false
    });
    if (!gl) return fallback2D(host, canvas, scene);

    const pProg = program(gl, VERT, FRAG);
    const lProg = program(gl, LVERT, LFRAG);
    if (!pProg || !lProg) return fallback2D(host, canvas, scene);

    /* --- point buffers --- */
    const n = scene.pts.length;
    const aPos = new Float32Array(n * 3), aCol = new Float32Array(n * 3);
    const aSeed = new Float32Array(n * 4), aAux = new Float32Array(n * 4);
    scene.pts.forEach((pt, i) => {
      aPos.set(pt.p, i * 3);
      aCol.set(pt.c, i * 3);
      aSeed.set([pt.size, pt.phase, pt.param || 0, pt.flag || 0], i * 4);
      aAux.set(pt.aux || [0, 1, 0, 0], i * 4);
    });

    const pVao = gl.createVertexArray();
    gl.bindVertexArray(pVao);
    bind(gl, pProg, 'aPos', aPos, 3);
    bind(gl, pProg, 'aCol', aCol, 3);
    bind(gl, pProg, 'aSeed', aSeed, 4);
    bind(gl, pProg, 'aAux', aAux, 4);

    /* --- line buffers --- */
    const ln = scene.lines.length;
    const lPos = new Float32Array(ln * 6), lCol = new Float32Array(ln * 8), lSeed = new Float32Array(ln * 2);
    scene.lines.forEach((L, i) => {
      lPos.set(L.a, i * 6); lPos.set(L.b, i * 6 + 3);
      lCol.set([L.c[0], L.c[1], L.c[2], L.alpha], i * 8);
      lCol.set([L.c[0], L.c[1], L.c[2], L.alpha], i * 8 + 4);
      lSeed[i * 2] = L.seed; lSeed[i * 2 + 1] = L.seed;
    });
    const lVao = gl.createVertexArray();
    gl.bindVertexArray(lVao);
    bind(gl, lProg, 'aPos', lPos, 3);
    bind(gl, lProg, 'aCol', lCol, 4);
    bind(gl, lProg, 'aSeed', lSeed, 1);
    gl.bindVertexArray(null);

    const U = (p, names) => {
      const o = {};
      names.forEach(nm => o[nm] = gl.getUniformLocation(p, nm));
      return o;
    };
    const pu = U(pProg, ['uProj','uView','uTime','uDpr','uScale','uMode','uPointer']);
    const lu = U(lProg, ['uProj','uView','uTime','uScale','uPointer']);

    /* --- camera / interaction --- */
    const cam = {
      yaw: opts.yaw != null ? opts.yaw : 0.6,
      pitch: opts.pitch != null ? opts.pitch : 0.34,
      dist: opts.dist || scene.dist,
      tYaw: 0, tPitch: 0, drag: false, lx: 0, ly: 0
    };
    cam.tYaw = cam.yaw; cam.tPitch = cam.pitch;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const spin = opts.spin != null ? opts.spin : 0.055;

    host.style.cursor = 'grab';
    host.addEventListener('pointerdown', e => {
      cam.drag = true; cam.lx = e.clientX; cam.ly = e.clientY;
      host.style.cursor = 'grabbing';
      host.setPointerCapture(e.pointerId);
    });
    host.addEventListener('pointerup', e => {
      cam.drag = false; host.style.cursor = 'grab';
      try { host.releasePointerCapture(e.pointerId); } catch (_) {}
    });
    host.addEventListener('pointermove', e => {
      const b = host.getBoundingClientRect();
      pointer.tx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      pointer.ty = -((e.clientY - b.top) / b.height - 0.5) * 2;
      if (!cam.drag) return;
      cam.tYaw += (e.clientX - cam.lx) * 0.006;
      cam.tPitch = Math.max(-1.35, Math.min(1.35, cam.tPitch + (e.clientY - cam.ly) * 0.005));
      cam.lx = e.clientX; cam.ly = e.clientY;
    });
    host.addEventListener('pointerleave', () => { pointer.tx = 0; pointer.ty = 0; });

    /* --- sizing --- */
    let W = 0, H = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const b = host.getBoundingClientRect();
      W = Math.max(1, Math.round(b.width * dpr));
      H = Math.max(1, Math.round(b.height * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W; canvas.height = H;
      }
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize', resize);

    /* --- loop --- */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true, raf = 0, t0 = performance.now(), time = 0;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => {
        visible = es[0].isIntersecting;
        if (visible && !raf && !reduced) { t0 = performance.now(); loop(); }
      }, { rootMargin: '120px' }).observe(host);
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    // source is premultiplied; add colour energy, accumulate coverage in alpha
    gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    function frame() {
      gl.viewport(0, 0, W, H);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (!cam.drag) cam.tYaw += spin * 0.016;
      cam.yaw += (cam.tYaw - cam.yaw) * 0.09;
      cam.pitch += (cam.tPitch - cam.pitch) * 0.09;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const eye = [
        Math.sin(cam.yaw) * Math.cos(cam.pitch) * cam.dist,
        Math.sin(cam.pitch) * cam.dist,
        Math.cos(cam.yaw) * Math.cos(cam.pitch) * cam.dist
      ];
      const proj = M4.perspective(0.72, W / H, 0.1, 120);
      const view = M4.lookAt(eye, [0, 0, 0], [0, 1, 0]);

      if (ln) {
        gl.useProgram(lProg);
        gl.uniformMatrix4fv(lu.uProj, false, proj);
        gl.uniformMatrix4fv(lu.uView, false, view);
        gl.uniform1f(lu.uTime, time);
        gl.uniform1f(lu.uScale, scene.scale);
        gl.uniform2f(lu.uPointer, pointer.x, pointer.y);
        gl.bindVertexArray(lVao);
        gl.drawArrays(gl.LINES, 0, ln * 2);
      }

      gl.useProgram(pProg);
      gl.uniformMatrix4fv(pu.uProj, false, proj);
      gl.uniformMatrix4fv(pu.uView, false, view);
      gl.uniform1f(pu.uTime, time);
      gl.uniform1f(pu.uDpr, dpr);
      gl.uniform1f(pu.uScale, scene.scale);
      gl.uniform1i(pu.uMode, scene.mode);
      gl.uniform2f(pu.uPointer, pointer.x, pointer.y);
      gl.bindVertexArray(pVao);
      gl.drawArrays(gl.POINTS, 0, n);
      gl.bindVertexArray(null);
    }

    function loop() {
      if (!visible) { raf = 0; return; }
      const now = performance.now();
      time += Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      frame();
      raf = requestAnimationFrame(loop);
    }

    if (reduced) { time = 4.2; frame(); }
    else loop();

    host.classList.add('gl-live');
    return { scene, canvas };
  }

  function bind(gl, prog, name, data, size) {
    const loc = gl.getAttribLocation(prog, name);
    if (loc < 0) return;
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  /* ------------------------------------------------- 2D fallback (no WebGL2) */

  function fallback2D(host, canvas, scene) {
    const ctx = canvas.getContext('2d');
    if (!ctx) { host.classList.add('gl-off'); return null; }
    let W = 0, H = 0, dpr = 1, yaw = 0.6;
    const pitch = 0.34;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const b = host.getBoundingClientRect();
      W = Math.max(1, b.width); H = Math.max(1, b.height);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function project(p) {
      const s = scene.scale;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x = p[0]*s*cy - p[2]*s*sy;
      const z = p[0]*s*sy + p[2]*s*cy;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const y = p[1]*s*cp - z*sp;
      const zz = p[1]*s*sp + z*cp + scene.dist;
      const f = (Math.min(W, H) * 0.9) / Math.max(0.4, zz);
      return [W/2 + x*f, H/2 - y*f, zz];
    }
    function paint() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      scene.lines.forEach(L => {
        const a = project(L.a), b = project(L.b);
        ctx.strokeStyle = `rgba(${L.c.map(v => (v*255)|0).join(',')},${L.alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      });
      scene.pts.forEach(pt => {
        const p = project(pt.p);
        const r = Math.max(0.5, pt.size * (9 / p[2]));
        ctx.fillStyle = `rgba(${pt.c.map(v => (v*255)|0).join(',')},0.75)`;
        ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.2832); ctx.fill();
      });
    }
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function loop() {
      paint();
      if (still) return;
      yaw += 0.0016;
      requestAnimationFrame(loop);
    })();
    host.classList.add('gl-2d');
    return { fallback: true };
  }

  /* -------------------------------------------------------------- bootstrap */

  const GL = {
    scenes: SCENES,
    boot(root) {
      (root || document).querySelectorAll('[data-gl]').forEach(host => {
        if (host.dataset.glBooted) return;
        host.dataset.glBooted = '1';
        const opts = {};
        ['dist', 'spin', 'yaw', 'pitch'].forEach(k => {
          if (host.dataset[k] != null) opts[k] = parseFloat(host.dataset[k]);
        });
        try { Instance(host, host.dataset.gl, opts); }
        catch (err) { console.warn('[GL] scene failed:', host.dataset.gl, err); }
      });
    }
  };

  global.GL = GL;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GL.boot());
  } else {
    GL.boot();
  }

})(window);
