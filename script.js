/**
 * G-YNTHETIC LABS // INTERFACE CONTROLLER
 * Premium interactions & scroll-driven dynamics
 */

(function () {
    'use strict';

    // ============================================================
    // SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    // ============================================================
    // STICKY NAV — appears after scrolling past header
    // ============================================================
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
    <div class="nav-logo" style="white-space: nowrap;">G-YNTHETIC LABS</div>
    <ul class="nav-links">
      <li><a href="#vision">Foundation</a></li>
      <li><a href="#core-tech">Projects</a></li>
      <li><a href="#research">Research</a></li>
      <li><a href="#ai-problems">Problem Space</a></li>
    </ul>
  `;
    document.body.prepend(nav);

    // ============================================================
    // INTERSECTION OBSERVER — Staggered reveals
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Section glow observer
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('has-glow', entry.isIntersecting);
        });
    }, { threshold: 0.3 });

    // ============================================================
    // ANIMATED METRIC COUNTERS
    // ============================================================
    function animateCounter(el, target, duration = 1800) {
        const start = performance.now();
        const isInteger = Number.isInteger(target);

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out expo
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(eased * target);
            el.textContent = isInteger ? current.toLocaleString() : current;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.dataset.target, 10);
                if (!isNaN(target)) animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    // ============================================================
    // MOUSE-TRACKING CARD GLOW
    // ============================================================
    function initCardGlow() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--glow-x', `${x}px`);
                card.style.setProperty('--glow-y', `${y}px`);
                card.style.setProperty('--glow-opacity', '1');
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--glow-opacity', '0');
            });
        });
    }

    // Inject the glow layer CSS dynamically (keeps styles.css clean)
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
    .card {
      --glow-x: 50%;
      --glow-y: 50%;
      --glow-opacity: 0;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(
        300px circle at var(--glow-x) var(--glow-y),
        rgba(0, 228, 245, 0.06),
        transparent 70%
      );
      opacity: var(--glow-opacity);
      transition: opacity 0.4s ease;
      pointer-events: none;
      z-index: 0;
    }
    .card > * { position: relative; z-index: 1; }
  `;
    document.head.appendChild(glowStyle);

    // ============================================================
    // PROBLEM COLUMN HOVER PULSE
    // ============================================================
    function initProblemPulse() {
        const cols = document.querySelectorAll('.problem-col');
        cols.forEach(col => {
            col.addEventListener('mouseenter', () => {
                col.style.borderColor = 'var(--accent-cyan)';
                col.style.background = 'var(--accent-cyan-dim)';
            });
            col.addEventListener('mouseleave', () => {
                col.style.borderColor = '';
                col.style.background = '';
            });
        });
    }

    // ============================================================
    // SCROLL HANDLER — progress bar + sticky nav
    // ============================================================
    let ticking = false;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 500;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

                // Update progress bar width
                progressBar.style.width = progress + '%';

                // Toggle nav visibility
                nav.classList.toggle('visible', scrollY > headerHeight * 0.6);

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ============================================================
    // SMOOTH SCROLL for anchor links
    // ============================================================
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // ============================================================
    // STEALTH VISITOR COUNTER — Secret key 'GLABS'
    // ============================================================
    const COUNTER_KEY = 'gynthetic_labs_v5';
    let keyBuffer = '';

    // Hidden Hit Request
    async function trackVisit() {
        try {
            // Using a simple public counter API (CounterAPI.dev)
            await fetch(`https://api.counterapi.dev/v1/gynthetic-labs/visits/up`);
        } catch (e) {
            console.error('Telemetry offline');
        }
    }

    async function getVisitCount() {
        try {
            const res = await fetch(`https://api.counterapi.dev/v1/gynthetic-labs/visits`);
            const data = await res.json();
            return data.count || 'ERR';
        } catch (e) {
            return 'OFFLINE';
        }
    }

    function showAdminDashboard(count) {
        let dashboard = document.getElementById('admin-dash');
        if (!dashboard) {
            dashboard = document.createElement('div');
            dashboard.id = 'admin-dash';
            Object.assign(dashboard.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: '#060608',
                border: '1px solid #00e4f5',
                padding: '1.5rem',
                zIndex: '10001',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#00e4f5',
                boxShadow: '0 0 20px rgba(0, 228, 245, 0.2)',
                display: 'none'
            });
            document.body.appendChild(dashboard);
        }

        dashboard.innerHTML = `
            <div style="border-bottom: 1px solid rgba(0,228,245,0.2); margin-bottom: 1rem; padding-bottom: 0.5rem; font-weight: bold;">[ SYSTEM DIAGNOSTICS ]</div>
            <div>STATUS: <span style="color: #84cc16">OPERATIONAL</span></div>
            <div style="margin-top: 0.5rem;">TOTAL VISITORS: <span style="font-size: 1.2rem;">${count}</span></div>
            <div style="margin-top: 1rem; font-size: 0.6rem; color: #8a8a96;">ESC TO CLOSE</div>
        `;
        dashboard.style.display = 'block';
    }

    document.addEventListener('keydown', async (e) => {
        if (e.key === 'Escape') {
            const dash = document.getElementById('admin-dash');
            if (dash) dash.style.display = 'none';
        }

        keyBuffer += e.key.toUpperCase();
        if (keyBuffer.length > 5) keyBuffer = keyBuffer.slice(-5);

        if (keyBuffer === 'GLABS') {
            // Toggle Dev Mode
            const isActive = document.body.classList.toggle('dev-mode-active');
            localStorage.setItem('glabs_dev_mode', isActive ? 'active' : 'inactive');

            const count = await getVisitCount();
            showAdminDashboard(count);
            keyBuffer = '';

            console.log(`[SYS] DEV_MODE: ${isActive ? 'ENABLED' : 'DISABLED'}`);
        }
    });

    // ============================================================
    // INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        // Restore Dev Mode state
        if (localStorage.getItem('glabs_dev_mode') === 'active') {
            document.body.classList.add('dev-mode-active');
        }

        // Track unique visit
        trackVisit();

        // Reveal animations
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


        // Section glow
        document.querySelectorAll('section').forEach(el => glowObserver.observe(el));

        // Metric counters
        document.querySelectorAll('.metric[data-target]').forEach(el => metricObserver.observe(el));

        // Card glow
        initCardGlow();

        // Problem pulse
        initProblemPulse();

        // Research Overlay
        initResearchOverlay();

        // Initial scroll state
        onScroll();

        // Console branding
        console.log(
            '%c ◆ G-YNTHETIC LABS — INTERFACE ONLINE ',
            'background: #060608; color: #00e4f5; font-weight: 500; border: 1px solid rgba(0,228,245,0.3); padding: 6px 12px; font-family: monospace;'
        );
    });

    // ============================================================
    // RESEARCH OVERLAY (Sliding Glass Door)
    // ============================================================
    const researchData = {
        sae: {
            title: "Spontaneous Association Experiment",
            abstract: "The SAE explores the emergence of complex pattern recognition through the controlled injection of high-entropy noise into neural network dream states. By mimicking biological REM cycles, we hypothesize that 'synthetic dreaming' can prune redundant associations and strengthen non-obvious semantic links.",
            url: "research_sae.html"
        },
        p1: {
            title: "G-ynthetic Architecture Part 1",
            abstract: "Initial specifications for a hierarchical state propagation engine. This paper outlines the move from linear token processing to a multi-dimensional holographic memory lattice, allowing for persistent context across extended inference sessions.",
            url: "research_p1.html"
        },
        p2: {
            title: "G-ynthetic Architecture Part 2",
            abstract: "A critical analysis of the societal risks associated with distributed inference systems. Focuses on the erosion of individual accountability when decision-making is offloaded to black-box fractal recursive structures.",
            url: "research_p2.html"
        },
        gradient: {
            title: "Building a 4D Gradient",
            abstract: "Technical framework for mapping semantic relationships into temporal vector spaces. By treating 'meaning' as a dynamic gradient rather than a static point, we enable more fluid and context-aware A.I. responses.",
            url: "research_gradient.html"
        },
        atlas: {
            title: "Symbolic Grid Atlas Format",
            abstract: "A proposed interchange format for serializing and persisting 343-node holographic lattices. Atlas enables cross-platform cognitive state transfer, allowing an A.I.'s 'experience' to be portable and reproducible.",
            url: "research_atlas.html"
        },
        fracc: {
            title: "F.R.A.C.C. Cognitive Architecture",
            abstract: "Fractal Recursive Adaptive Cognitive Chains (FRACC) provide a methodology for hierarchical reasoning. By nesting logical evaluators at every level of the recursive stack, we ensure that output remains grounded in first principles.",
            url: "research_fracc.html"
        },
        oracle: {
            title: "The Oracle Mirage",
            abstract: "A philosophical manifesto warning against the 'Oracle Mirage'—the dangerous assumption that probabilistic language models possess inherent wisdom. Argues for deterministic scaffolding as an essential ethical constraint.",
            url: "research_oracle.html"
        },
        prelinguistic: {
            title: "Towards a Pre-Linguistic Inference Engine",
            abstract: "A synthesis of cross-disciplinary frameworks for sub-symbolic reasoning. Explores how A.I. can move beyond language-first processing to a structural, coordinate-based inference model.",
            url: "research_prelinguistic.html"
        },
        trililiquary: {
            title: "Introducing Trililiquary",
            abstract: "A framework for slipstream manifold architecture. This paper details the transition from discrete state changes to friction-less, continuous manifold transitions in cognitive engines.",
            url: "research_trililiquary.html"
        }
    };

    function initResearchOverlay() {
        const overlay = document.getElementById('research-overlay');
        const leftPanel = document.getElementById('overlay-left-panel');
        const abstractContainer = document.getElementById('abstract-container');
        const closeBtn = document.querySelector('.close-overlay');
        const bgBlur = document.querySelector('.overlay-bg-blur');

        if (!overlay) return;

        document.querySelectorAll('.research-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const data = researchData[id];
                if (!data) return;

                // Clone card for left panel (excluding the button)
                leftPanel.innerHTML = '';
                const clone = card.cloneNode(true);
                clone.querySelector('button')?.remove();
                clone.style.width = '100%';
                clone.style.maxWidth = '400px';
                clone.style.margin = '0';
                clone.style.cursor = 'default';
                clone.style.transform = 'none';
                leftPanel.appendChild(clone);

                // Populate right panel
                abstractContainer.innerHTML = `
                    <div class="card-tag">Research Abstract // ${id.toUpperCase()}</div>
                    <h2>${data.title}</h2>
                    <p>${data.abstract}</p>
                    <div style="margin-bottom: 2.5rem;">
                        <a href="${data.url}" class="btn-primary">View Research →</a>
                    </div>
                    <div class="meta-info">
                        Status: Peer Review Pending<br>
                        Classification: IP 0${Object.keys(researchData).indexOf(id) + 1} // Public Disclosure
                    </div>
                `;

                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                pauseMedia();
            });
        });

        const closeOverlay = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        const pauseMedia = () => {
            document.querySelectorAll('video, audio').forEach(media => media.pause());
        };

        closeBtn.addEventListener('click', closeOverlay);
        bgBlur.addEventListener('click', closeOverlay);
    }

    if (header) {
        header.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            header.style.backgroundPosition = `${x}px ${y}px`;
        });
    }

})();
