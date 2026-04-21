import * as THREE from 'three';

/**
 * G-YNTHETIC ENGINE // VORTEX VISUALIZER
 * Ported from neon-vortex TornadoCanvas (React/Three)
 * Standalone vanilla JS — no modules, no React, no post-processing
 * Uses global THREE from CDN and additive blending for glow
 */

(function () {
    'use strict';

    const canvas = document.getElementById('vortex-canvas');
    if (!canvas) return;

    // ---- CONFIG ----
    const PARTICLE_COUNT = 6000;
    const ROTATION_SPEED = 1.2;
    const TWIST = 1.0;
    const WANDER = 0.15;
    const BEND = 0.0;
    const EXPANSION = 1.0;
    const CHAOS = 0.3;
    const CLOUD_BASE_Y = 55;
    const CLOUD_CEILING_Y = 100;
    const DEBRIS_MAX_Y = 25;
    const DEBRIS_AMOUNT = 0.15;

    const PALETTE = [0x00E4F5, 0x0070FF, 0xA855F7, 0xEE82EE, 0x00FFA0, 0xFF69B4];

    // ---- SCENE ----
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0012);

    const container = canvas.parentElement;
    const width = () => container.clientWidth;
    const height = () => container.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width() / height(), 0.1, 2000);
    camera.position.set(0, -15, 40);
    camera.lookAt(0, 18, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width(), height());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ---- PARTICLES ----
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const color = new THREE.Color();
    const particleData = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;

        const cIndex = Math.floor(Math.random() * PALETTE.length);
        color.setHex(PALETTE[cIndex]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() < 0.9 ? Math.random() * 0.25 : Math.random() * 0.6 + 0.4;

        particleData.push({
            angle: Math.random() * Math.PI * 2,
            initialAngle: Math.random() * Math.PI * 2,
            speedY: 0.05 + Math.random() * 0.35,
            baseSpeedY: 0.05 + Math.random() * 0.35,
            radius: 0,
            y: Math.random() * CLOUD_BASE_Y,
            chaosOffset: new THREE.Vector3(
                (Math.random() - 0.5),
                0,
                (Math.random() - 0.5)
            ),
            colorIndex: cIndex,
            inCloud: false,
            isDebris: false
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material with spark-like particles
    const material = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
      attribute float size;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = -mvPosition.z;
        gl_PointSize = size * (350.0 / dist);
        gl_Position = projectionMatrix * mvPosition;
        // Fade particles near camera and far away
        vAlpha = smoothstep(5.0, 15.0, dist) * smoothstep(300.0, 150.0, dist);
      }
    `,
        fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        // Soft circular particle
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        float alpha = 1.0 - smoothstep(0.15, 0.5, dist);
        // Core glow
        float core = exp(-dist * 6.0) * 0.6;
        gl_FragColor = vec4(vColor * (1.0 + core), alpha * vAlpha);
        if (gl_FragColor.a < 0.02) discard;
      }
    `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ---- AUTO ROTATION ----
    let autoRotateAngle = 0;

    // ---- KINEMATIC SPINE ----
    function getSpineOffset(y, time) {
        const normY = y / CLOUD_BASE_Y;
        const lag = (1.0 - normY) * 1.2;
        const ampDamp = y > CLOUD_BASE_Y ? 0.5 : 1.0;

        const wx = Math.sin(time * 0.4 - lag) * WANDER * 20 * ampDamp;
        const wz = Math.cos(time * 0.3 - lag) * WANDER * 20 * ampDamp;

        const bendPhase = normY * Math.PI * 2;
        const bx = Math.sin(time * 1.0 - lag * 2.0 + bendPhase) * BEND * 15 * ampDamp;
        const bz = Math.cos(time * 0.8 - lag * 2.0 + bendPhase) * BEND * 10 * ampDamp;

        return { x: wx + bx, z: wz + bz };
    }

    // ---- ANIMATION ----
    const clock = new THREE.Clock();
    const tempColor = new THREE.Color();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        const posArr = particles.geometry.attributes.position.array;
        const colArr = particles.geometry.attributes.color.array;

        // Auto-rotate camera slowly
        autoRotateAngle += 0.001;
        camera.position.x = Math.sin(autoRotateAngle) * 40;
        camera.position.z = Math.cos(autoRotateAngle) * 40;
        camera.position.y = -15 + Math.sin(time * 0.15) * 3;
        camera.lookAt(0, 18, 0);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const data = particleData[i];

            // Vertical movement
            const currentSpeed = data.inCloud ? data.baseSpeedY * 0.4 : data.baseSpeedY;
            const actualSpeed = data.isDebris ? currentSpeed * 2.5 : currentSpeed;
            data.y += actualSpeed;

            // Enter cloud
            if (!data.isDebris && !data.inCloud && data.y > CLOUD_BASE_Y) {
                data.inCloud = true;
                data.radius = 15 + Math.random() * 50;
            }

            // Reset
            const resetThreshold = data.isDebris ? DEBRIS_MAX_Y : CLOUD_CEILING_Y;
            if (data.y > resetThreshold) {
                data.y = 0;
                data.inCloud = false;
                data.angle = Math.random() * Math.PI * 2;
                data.radius = 0;

                const debrisChance = DEBRIS_AMOUNT * 0.5;
                data.isDebris = Math.random() < debrisChance;

                const chaosAmp = data.isDebris ? CHAOS * 4.0 : CHAOS * 2.0;
                data.chaosOffset.set(
                    (Math.random() - 0.5) * chaosAmp,
                    (Math.random() - 0.5) * chaosAmp,
                    (Math.random() - 0.5) * chaosAmp
                );

                const cIndex = Math.floor(Math.random() * PALETTE.length);
                tempColor.setHex(PALETTE[cIndex]);
                colArr[i * 3] = tempColor.r;
                colArr[i * 3 + 1] = tempColor.g;
                colArr[i * 3 + 2] = tempColor.b;
            }

            // Physics
            const spine = getSpineOffset(data.y, time);
            let x, z;

            if (data.isDebris) {
                const debrisRadBase = 8.0 + (Math.random() * 10);
                const debrisRadExpand = (data.y / DEBRIS_MAX_Y) * 20;
                const effectiveRadius = debrisRadBase + debrisRadExpand;
                data.angle += (ROTATION_SPEED * 0.08);
                x = Math.cos(data.angle) * effectiveRadius + data.chaosOffset.x + spine.x;
                z = Math.sin(data.angle) * effectiveRadius + data.chaosOffset.z + spine.z;
            } else if (data.inCloud) {
                const cloudProgress = (data.y - CLOUD_BASE_Y) / (CLOUD_CEILING_Y - CLOUD_BASE_Y);
                const superCellRadius = 50 + (cloudProgress * 250);
                data.angle += (Math.random() - 0.5) * 0.1 * CHAOS;
                data.radius += (Math.random() - 0.2) * 2.0;
                if (data.radius > superCellRadius) data.radius = superCellRadius;
                if (data.radius < 20) data.radius = 20;
                x = Math.cos(data.angle) * data.radius + data.chaosOffset.x + spine.x;
                z = Math.sin(data.angle) * data.radius + data.chaosOffset.z + spine.z;
                if (cloudProgress < 0.1) data.radius += 1.0;
            } else {
                // Funnel
                const normY = data.y / CLOUD_BASE_Y;
                const curve = Math.pow(normY, 0.6);
                const effectiveRadius = 1.0 + (curve * 15 * EXPANSION);
                const twistFactor = Math.max(0.1, TWIST);
                data.angle += (ROTATION_SPEED * 0.05) / (0.1 + (normY / twistFactor));
                const jitterX = Math.sin(time * 5 + i) * CHAOS * normY;
                const jitterZ = Math.cos(time * 5 + i) * CHAOS * normY;
                x = Math.cos(data.angle) * effectiveRadius + jitterX + data.chaosOffset.x + spine.x;
                z = Math.sin(data.angle) * effectiveRadius + jitterZ + data.chaosOffset.z + spine.z;
            }

            posArr[i * 3] = x;
            posArr[i * 3 + 1] = data.y - 30;
            posArr[i * 3 + 2] = z;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.color.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // ---- RESIZE ----
    window.addEventListener('resize', () => {
        camera.aspect = width() / height();
        camera.updateProjectionMatrix();
        renderer.setSize(width(), height());
    });

})();
