import * as THREE from 'three';

/**
 * G-YNTHETIC LABS // NEON VORTEX HEADER
 * Ported from neon-vortex/components/TornadoCanvas.tsx
 * Kinematic spine tornado — 4000 particles, cyber palette, left side of header.
 */

(function () {

    const PALETTES = {
        cyber: [0x00FFFF, 0x007BFF, 0xFF00FF, 0xEE82EE, 0xB0BF1A, 0xFF69B4]
    };

    const CLOUD_BASE_Y = 55;
    const CLOUD_CEILING_Y = 100;
    const DEBRIS_MAX_Y = 25;

    // Config — matches App.tsx defaults, tuned for header background
    const CFG = {
        particleCount: 10000,
        rotationSpeed: 0.3675,
        twist: 1.0,
        wander: 0.35,   // slightly more wander so it travels visibly
        bend: 0.4,    // add bend so it's bendy as requested
        debrisAmount: 0.15,
        expansionRate: 1.2,
        chaosFactor: 0.5,
        trailPersistence: 0.92,
        bloomStrength: 2.0,
        colorTheme: 'cyber'
    };

    function initVortex() {
        const canvas = document.getElementById('neon-vortex');
        if (!canvas) return;

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance'
        });

        function resize() {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            renderer.setSize(w, h, false);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }

        // ── Scene & Camera ────────────────────────────────────────────────────
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
        // Wide FOV, centered, so the tornado is visible anywhere in the left half
        camera.position.set(0, -10, 55);
        camera.lookAt(0, 10, 0);

        renderer.setClearColor(0x000000, 0); // transparent bg
        renderer.autoClear = false;           // we manage clearing manually — prevents blink
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        resize();
        window.addEventListener('resize', resize);

        // ── Particles ─────────────────────────────────────────────────────────
        const N = CFG.particleCount;
        const positions = new Float32Array(N * 3);
        const colors = new Float32Array(N * 3);
        const sizes = new Float32Array(N);
        const particleData = [];

        const palette = PALETTES[CFG.colorTheme];
        const tmpColor = new THREE.Color();

        for (let i = 0; i < N; i++) {
            positions[i * 3] = 0; positions[i * 3 + 1] = 0; positions[i * 3 + 2] = 0;

            const cIdx = Math.floor(Math.random() * palette.length);
            tmpColor.setHex(palette[cIdx]);
            colors[i * 3] = tmpColor.r;
            colors[i * 3 + 1] = tmpColor.g;
            colors[i * 3 + 2] = tmpColor.b;

            sizes[i] = Math.random() < 0.9
                ? Math.random() * 0.15
                : Math.random() * 0.4 + 0.25;

            particleData.push({
                angle: Math.random() * Math.PI * 2,
                initialAngle: Math.random() * Math.PI * 2,
                speedY: 0.05 + Math.random() * 0.4,
                baseSpeedY: 0.05 + Math.random() * 0.4,
                radius: 0,
                y: Math.random() * CLOUD_BASE_Y,
                chaosOffset: new THREE.Vector3(
                    (Math.random() - 0.5),
                    0,
                    (Math.random() - 0.5)
                ),
                colorIndex: cIdx,
                inCloud: false,
                isDebris: false
            });
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Soft circular sprite via fragment shader (no external texture needed)
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uPower: { value: 1.0 }  // 0=dead, 1=full brightness
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (400.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float uPower;
                varying vec3 vColor;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float d = length(uv);
                    if (d > 0.5) discard;
                    float alpha = (1.0 - smoothstep(0.2, 0.5, d)) * uPower;
                    gl_FragColor = vec4(vColor * 1.8 * uPower, alpha);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // ── Afterimage simulation via render target ping-pong ─────────────────
        // We'll do a simple approach: render to a target, then blend with previous frame
        // using a full-screen quad. This gives the trail/persistence effect.
        const rtA = new THREE.WebGLRenderTarget(
            canvas.offsetWidth, canvas.offsetHeight,
            { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }
        );
        const rtB = new THREE.WebGLRenderTarget(
            canvas.offsetWidth, canvas.offsetHeight,
            { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }
        );

        const trailScene = new THREE.Scene();
        const trailCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const trailMaterial = new THREE.ShaderMaterial({
            uniforms: {
                tCurrent: { value: null },
                tPrevious: { value: null },
                damp: { value: CFG.trailPersistence }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
            `,
            fragmentShader: `
                uniform sampler2D tCurrent;
                uniform sampler2D tPrevious;
                uniform float damp;
                varying vec2 vUv;
                void main() {
                    vec4 curr = texture2D(tCurrent, vUv);
                    vec4 prev = texture2D(tPrevious, vUv) * damp;
                    gl_FragColor = max(curr, prev);
                }
            `,
            depthTest: false,
            transparent: true
        });

        const trailQuad = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            trailMaterial
        );
        trailScene.add(trailQuad);

        let pingPong = false; // which RT is "previous"

        // ── Clock ─────────────────────────────────────────────────────────────
        const clock = new THREE.Clock();

        const WANDER_BOUNDS = { xMin: -5, xMax: 5, zMin: -8, zMax: 8 };
        const wander = {
            x: 0, z: 0,
            targetX: 0, targetZ: 0,
            timer: 0,
            interval: 3.0
        };
        // trackingPos lags behind wander for a "chase" feel
        const track = { x: 0, y: 10, z: 0 };
        const VIEW_OFFSET = 55; // Constrain stem to right 1/3 on full-width canvas

        function pickNewWanderTarget() {
            wander.targetX = WANDER_BOUNDS.xMin + Math.random() * (WANDER_BOUNDS.xMax - WANDER_BOUNDS.xMin);
            wander.targetZ = WANDER_BOUNDS.zMin + Math.random() * (WANDER_BOUNDS.zMax - WANDER_BOUNDS.zMin);
            wander.interval = 1.0 + Math.random() * 3.0; // Faster repositioning
            wander.timer = 0;
        }
        pickNewWanderTarget();

        // ── Camera orbit ─────────────────────────────────────────────────────
        // Camera slowly drifts to random spherical positions around the tornado.
        // theta = azimuth (all 360°), phi = elevation (top/sides/bottom).
        const CAM_RADIUS = 110;
        const cam = {
            theta: 0,
            phi: Math.PI * 0.45, // Start near horizon
            targetTheta: 0,
            targetPhi: Math.PI * 0.45,
            timer: 0,
            interval: 10.0
        };

        function pickNewCamTarget() {
            // Constrain azimuth to front view (-45 to +45 deg) for framing consistency
            cam.targetTheta = (Math.random() - 0.5) * Math.PI * 0.5;
            // Stay near the horizon (PI/2), within 30 degrees above/below
            cam.targetPhi = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.35;
            cam.interval = 8.0 + Math.random() * 7.0;
            cam.timer = 0;
        }
        pickNewCamTarget();

        // ── Dynamic zoom ──────────────────────────────────────────────────────
        // Camera radius oscillates between close and far on a slow random cycle.
        const zoom = {
            radius: 12,       // Extreme zoom-in: structure is obscured
            targetRadius: 12,
            timer: 0,
            interval: 12.0
        };
        function pickNewZoom() {
            zoom.targetRadius = 8 + Math.random() * 142; // 8 (macro) to 150 (distant)
            zoom.interval = 8.0 + Math.random() * 10.0;
            zoom.timer = 0;
        }
        pickNewZoom();

        // ── Speed modulator ───────────────────────────────────────────────────
        // Randomly speeds up and slows down the funnel rotation and particle rise.
        const speedMod = {
            value: 1.0,
            target: 1.0,
            timer: 0,
            interval: 7.0
        };
        function pickNewSpeed() {
            speedMod.target = 0.2 + Math.random() * 3.0; // 0.2x crawl to 3x burst
            speedMod.interval = 4.0 + Math.random() * 8.0;
            speedMod.timer = 0;
        }
        pickNewSpeed();

        // ── Power state machine ──────────────────────────────────────────────────
        // Like an intermittent signal to a lightbulb — but themed as a degraded
        // cognitive data stream. States cycle: surge → stable → brownout → dead
        const pwr = {
            level: 1.0,   // 0–1, drives brightness + speed + tracers
            damp: 0.0,   // trail persistence (0=no trails, 0.97=long trails)
            state: 'stable',
            timer: 0,
            interval: 4.0 + Math.random() * 4.0
        };

        const PWR_STATES = ['surge', 'stable', 'brownout', 'dead'];
        // Weighted: stable and surge are prioritized
        const PWR_WEIGHTS = [0.25, 0.45, 0.20, 0.10];

        function pickNextPowerState() {
            let r = Math.random(), acc = 0;
            for (let i = 0; i < PWR_STATES.length; i++) {
                acc += PWR_WEIGHTS[i];
                if (r < acc) { pwr.state = PWR_STATES[i]; break; }
            }
            // Duration varies by state
            const durations = { surge: [1, 4], stable: [5, 12], brownout: [4, 8], dead: [0.5, 2.0] };
            const [mn, mx] = durations[pwr.state];
            pwr.interval = mn + Math.random() * (mx - mn);
            pwr.timer = 0;
        }


        function advancePower(dt) {
            pwr.timer += dt;
            if (pwr.timer >= pwr.interval) pickNextPowerState();

            if (pwr.state === 'surge') {
                // Bright, fast, long trails
                pwr.level += (1.4 - pwr.level) * 0.06;  // overshoot to 1.4 for bloom
                pwr.damp += (0.97 - pwr.damp) * 0.05;
            } else if (pwr.state === 'stable') {
                pwr.level += (1.0 - pwr.level) * 0.04;
                pwr.damp += (0.88 - pwr.damp) * 0.03;
            } else if (pwr.state === 'brownout') {
                // Slow dim, speed drops, trails fade
                pwr.level += (0.35 - pwr.level) * 0.025;
                pwr.damp += (0.0 - pwr.damp) * 0.04;
            } else if (pwr.state === 'dead') {
                // Signal lost — everything cuts to black
                pwr.level += (0.0 - pwr.level) * 0.08;
                pwr.damp += (0.0 - pwr.damp) * 0.08;
            }

            // Clamp
            pwr.level = Math.max(0, Math.min(2.0, pwr.level));
            pwr.damp = Math.max(0, Math.min(0.97, pwr.damp));

            // Drive uniforms
            material.uniforms.uPower.value = pwr.level;
            trailMaterial.uniforms.damp.value = pwr.damp;
        }

        // ── Kinematic spine ────────────────────────────────────────────────────
        // Global position comes from the random wander anchor.
        // The bend/twist still applies as a local deformation on top.
        function getSpineOffset(y, time) {
            const normY = y / CLOUD_BASE_Y;
            const lag = (1.0 - normY) * 1.2;
            const ampDamp = y > CLOUD_BASE_Y ? 0.5 : 1.0;

            // Bend: local S-curve deformation (no global wander here)
            const bendPhase = normY * Math.PI * 2;
            const bx = Math.sin(time * 1.0 - lag * 2.0 + bendPhase) * CFG.bend * 15 * ampDamp;
            const bz = Math.cos(time * 0.8 - lag * 2.0 + bendPhase) * CFG.bend * 10 * ampDamp;

            // Global position = wander anchor + lag-delayed copy (whip effect)
            const laggedX = wander.x + Math.sin(time * 0.3 - lag) * 2.0 * ampDamp;
            const laggedZ = wander.z + Math.cos(time * 0.25 - lag) * 1.5 * ampDamp;

            return { x: laggedX + bx, z: laggedZ + bz };
        }

        // ── Animation loop ────────────────────────────────────────────────────
        let isVisible = true;
        const observer = new IntersectionObserver(entries => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const time = clock.getElapsedTime();
            const dt = clock.getDelta ? 0.016 : 0.016; // ~60fps delta
            const pos = geometry.attributes.position.array;
            const col = geometry.attributes.color.array;

            // ── Advance random wander ─────────────────────────────────────────
            wander.timer += 0.016;
            if (wander.timer >= wander.interval) pickNewWanderTarget();
            // Faster, more aggressive wander
            const wanderSpeed = 0.02;
            wander.x += (wander.targetX - wander.x) * wanderSpeed;
            wander.z += (wander.targetZ - wander.z) * wanderSpeed;

            // Tracking lag: lookTarget follows wander with delay
            track.x += (wander.x - track.x) * 0.05;
            track.z += (wander.z - track.z) * 0.05;

            // ── Advance camera orbit ─────────────────────────────────────────
            cam.timer += 0.016;
            if (cam.timer >= cam.interval) pickNewCamTarget();
            cam.theta += (cam.targetTheta - cam.theta) * 0.003;
            cam.phi += (cam.targetPhi - cam.phi) * 0.003;

            // ── Advance zoom ─────────────────────────────────────────────────
            zoom.timer += 0.016;
            if (zoom.timer >= zoom.interval) pickNewZoom();
            zoom.radius += (zoom.targetRadius - zoom.radius) * 0.005;

            // ── Advance speed mod ────────────────────────────────────────────
            speedMod.timer += 0.016;
            if (speedMod.timer >= speedMod.interval) pickNewSpeed();
            speedMod.value += (speedMod.target - speedMod.value) * 0.01;

            // ── Advance power stream ─────────────────────────────────────────
            advancePower(0.016);

            // ── Handheld Shake ────────────────────────────────────────────────
            const shakeLevel = pwr.state === 'surge' ? 0.3 : 0.08;
            const shakeX = (Math.random() - 0.5) * shakeLevel;
            const shakeY = (Math.random() - 0.5) * shakeLevel;
            const shakeZ = (Math.random() - 0.5) * shakeLevel;

            // Convert spherical to cartesian
            const wobbleTheta = Math.sin(time * 0.4) * 0.15;
            const wobblePhi = Math.cos(time * 0.35) * 0.1;
            const effTheta = cam.theta + wobbleTheta;
            const effPhi = cam.phi + wobblePhi;

            const desiredCamX = wander.x + zoom.radius * Math.sin(effPhi) * Math.sin(effTheta) - VIEW_OFFSET;
            const desiredCamY = 10 + zoom.radius * Math.cos(effPhi);
            const desiredCamZ = wander.z + zoom.radius * Math.sin(effPhi) * Math.cos(effTheta);

            // Camera also has smoothing (lags behind wander position)
            camera.position.x += (desiredCamX - camera.position.x) * 0.04;
            camera.position.y += (desiredCamY - camera.position.y) * 0.04;
            camera.position.z += (desiredCamZ - camera.position.z) * 0.04;

            // Final jitter
            camera.position.x += shakeX;
            camera.position.y += shakeY;
            camera.position.z += shakeZ;

            const lookTarget = new THREE.Vector3(
                track.x - VIEW_OFFSET + shakeX * 0.5,
                10 + shakeY * 0.5,
                track.z + shakeZ * 0.5
            );
            camera.lookAt(lookTarget);

            const audioExpansion = CFG.expansionRate * Math.sqrt(pwr.level);
            const audioRotation = CFG.rotationSpeed * speedMod.value * pwr.level;
            const audioChaos = CFG.chaosFactor * pwr.level;

            for (let i = 0; i < N; i++) {
                const data = particleData[i];

                // Vertical movement — scaled by speedMod
                const currentSpeed = data.inCloud ? data.baseSpeedY * 0.4 : data.baseSpeedY;
                const actualSpeed = data.isDebris ? currentSpeed * 2.5 : currentSpeed;

                // Density Boost: Slow down in top 10% to "pile up" particles (150% more density)
                const normY_speed = data.y / (data.isDebris ? DEBRIS_MAX_Y : CLOUD_BASE_Y);
                const densityMultiplier = normY_speed > 0.9 ? 0.4 : 1.0;

                data.y += actualSpeed * speedMod.value * densityMultiplier;

                // No cloud hemisphere — reset at CLOUD_BASE_Y
                const resetThreshold = data.isDebris ? DEBRIS_MAX_Y : CLOUD_BASE_Y;
                if (data.y > resetThreshold) {
                    data.y = 0;
                    data.inCloud = false;
                    data.angle = Math.random() * Math.PI * 2;
                    data.radius = 0;

                    const debrisChance = CFG.debrisAmount * 0.5;
                    data.isDebris = Math.random() < debrisChance;

                    const chaosAmp = data.isDebris ? audioChaos * 4.0 : audioChaos * 2.0;
                    data.chaosOffset.set(
                        (Math.random() - 0.5) * chaosAmp,
                        (Math.random() - 0.5) * chaosAmp,
                        (Math.random() - 0.5) * chaosAmp
                    );

                    const cIdx = Math.floor(Math.random() * palette.length);
                    tmpColor.setHex(palette[cIdx]);
                    col[i * 3] = tmpColor.r;
                    col[i * 3 + 1] = tmpColor.g;
                    col[i * 3 + 2] = tmpColor.b;
                    data.colorIndex = cIdx;
                }

                // Physics
                const spine = getSpineOffset(data.y, time);
                let x, z;

                if (data.isDebris) {
                    const debrisRadBase = 8.0 + Math.random() * 10;
                    const debrisRadExpand = (data.y / DEBRIS_MAX_Y) * 20;
                    const effectiveRadius = debrisRadBase + debrisRadExpand;
                    data.angle += audioRotation * 0.08;
                    x = Math.cos(data.angle) * effectiveRadius + data.chaosOffset.x + spine.x;
                    z = Math.sin(data.angle) * effectiveRadius + data.chaosOffset.z + spine.z;

                } else if (data.inCloud) {
                    const cloudProgress = (data.y - CLOUD_BASE_Y) / (CLOUD_CEILING_Y - CLOUD_BASE_Y);
                    const superCellRadius = 17 + cloudProgress * 100;
                    data.angle += (Math.random() - 0.5) * 0.1 * audioChaos;
                    data.radius += (Math.random() - 0.2) * 2.0;
                    if (data.radius > superCellRadius) data.radius = superCellRadius;
                    if (data.radius < 20) data.radius = 20;
                    x = Math.cos(data.angle) * data.radius + data.chaosOffset.x + spine.x;
                    z = Math.sin(data.angle) * data.radius + data.chaosOffset.z + spine.z;
                    if (cloudProgress < 0.1) data.radius += 1.0;

                } else {
                    const normY = data.y / CLOUD_BASE_Y;
                    const curve = Math.pow(normY, 0.6);
                    // Widen top 10% by 400% (4x total width at the very top)
                    const topWiden = 1.0 + Math.max(0, (normY - 0.9) * 10.0) * 3.0;

                    // Pull top 10% left to span the screen (Asymmetric Plume)
                    let plumeShiftX = 0;
                    if (normY > 0.9) {
                        const p = (normY - 0.9) * 10;
                        plumeShiftX = p * -120; // Sweeping left across the text area
                    }

                    const effectiveRadius = (1.0 + curve * 7.5 * audioExpansion) * topWiden;
                    const twistFactor = Math.max(0.1, CFG.twist);
                    data.angle += (audioRotation * 0.05) / (0.1 + normY / twistFactor);
                    const jitterX = Math.sin(time * 5 + i) * audioChaos * normY;
                    const jitterZ = Math.cos(time * 5 + i) * audioChaos * normY;
                    x = Math.cos(data.angle) * effectiveRadius + jitterX + data.chaosOffset.x + spine.x + plumeShiftX;
                    z = Math.sin(data.angle) * effectiveRadius + jitterZ + data.chaosOffset.z + spine.z;
                }

                pos[i * 3] = x;
                pos[i * 3 + 1] = data.y - 30;
                pos[i * 3 + 2] = z;
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true;

            // ── Render ───────────────────────────────────────────────────────────
            // Clear screen once per frame — no alternating clear pattern = no blink
            renderer.setRenderTarget(null);
            renderer.clear();

            if (pwr.damp < 0.01) {
                // No tracers — render directly to screen
                renderer.render(scene, camera);
            } else {
                // Ping-pong afterimage blend
                const current = pingPong ? rtA : rtB;
                const previous = pingPong ? rtB : rtA;

                renderer.setRenderTarget(current);
                renderer.clear();
                renderer.render(scene, camera);

                trailMaterial.uniforms.tCurrent.value = current.texture;
                trailMaterial.uniforms.tPrevious.value = previous.texture;
                renderer.setRenderTarget(null);
                renderer.render(trailScene, trailCamera);

                pingPong = !pingPong;
            }
        }

        animate();

        // Handle RT resize
        window.addEventListener('resize', () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            rtA.setSize(w, h);
            rtB.setSize(w, h);
        });
    }

    document.addEventListener('DOMContentLoaded', initVortex);

})();
