/**
 * DODAIL SOLUTIONS PVT LTD — MASTER MOTION & INTERACTION ENGINE (motion.js)
 * Inspired by 21st.dev, Aceternity UI, Magic UI, and Awwwards Agency Winners
 * Seamless Elementor Novamira deployment.
 * Dependencies: GSAP 3, ScrollTrigger, Lenis, Three.js
 */

(function () {
  "use strict";

  // Mark HTML as JS-ready for graceful CSS fallbacks
  document.documentElement.classList.add("js-ready");

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  /* ===========================================================================
     1. PRELOADER (Max 1.2s, Session-Aware)
     =========================================================================== */
  function initPreloader() {
    const preloader = document.querySelector(".dd-preloader");
    if (!preloader) return;

    let hasVisited = false;
    try {
      hasVisited = sessionStorage.getItem("dd_visited") === "true";
    } catch (e) {
      hasVisited = false;
    }

    if (hasVisited || isReducedMotion) {
      preloader.classList.add("is-done");
      initReveals();
      return;
    }

    const ringFill = preloader.querySelector(".dd-preloader-circle-fill");
    if (ringFill) ringFill.style.strokeDashoffset = "0";

    setTimeout(() => {
      preloader.classList.add("is-done");
      try {
        sessionStorage.setItem("dd_visited", "true");
      } catch (e) {}
      initReveals();
    }, 1100);
  }

  /* ===========================================================================
     2. LENIS SMOOTH SCROLL & SCROLLPROGRESS
     =========================================================================== */
  let lenisInstance = null;
  function initSmoothScroll() {
    if (isReducedMotion || typeof Lenis === "undefined") return;

    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== "undefined") {
      lenisInstance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ===========================================================================
     3. TOP PROGRESS BAR & SMART HIDING HEADER
     =========================================================================== */
  function initHeaderAndProgress() {
    const header = document.querySelector(".dd-header");
    const progressBar = document.querySelector(".dd-progress-bar");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update top progress bar
      if (progressBar && totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        progressBar.style.width = progress + "%";
      }

      // Smart header show/hide
      if (!header) return;
      if (currentScroll > 140 && currentScroll > lastScroll && !header.classList.contains("is-hidden")) {
        header.classList.add("is-hidden");
      } else if (currentScroll < lastScroll && header.classList.contains("is-hidden")) {
        header.classList.remove("is-hidden");
      }
      lastScroll = Math.max(0, currentScroll);
    }, { passive: true });

    // Mobile Hamburger Drawer
    const toggle = document.querySelector(".dd-menu-toggle");
    const drawer = document.querySelector(".dd-mobile-drawer");
    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        const isOpen = drawer.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      drawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => drawer.classList.remove("is-open"));
      });
    }

    // Back to top ring button
    const backToTop = document.querySelector(".dd-back-to-top");
    if (backToTop) {
      backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        if (lenisInstance) lenisInstance.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ===========================================================================
     4. LIVING CUSTOM CURSOR (Dot, Ring, View, Play)
     =========================================================================== */
  function initCustomCursor() {
    if (isTouchDevice || isReducedMotion) return;

    let cursor = document.querySelector(".dd-cursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "dd-cursor";
      document.body.appendChild(cursor);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderCursor() {
      // Smooth lerp
      posX += (mouseX - posX) * 0.22;
      posY += (mouseY - posY) * 0.22;
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Contextual Hover States
    document.querySelectorAll("a, button, .dd-btn-pill, .dd-faq-trigger, input, select, .dd-pipeline-node, .dd-acronym-row").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });

    document.querySelectorAll('[data-cursor="view"], .dd-case-card').forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.textContent = "View";
        cursor.classList.add("is-view");
      });
      el.addEventListener("mouseleave", () => {
        cursor.textContent = "";
        cursor.classList.remove("is-view");
      });
    });

    document.querySelectorAll('[data-cursor="play"], .dd-testimonial-video').forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.textContent = "Play";
        cursor.classList.add("is-play");
      });
      el.addEventListener("mouseleave", () => {
        cursor.textContent = "";
        cursor.classList.remove("is-play");
      });
    });
  }

  /* ===========================================================================
     5. 21st.dev / ACETERNITY SPOTLIGHT MOUSE TRACKER
     =========================================================================== */
  function initSpotlightTracker() {
    if (isTouchDevice) return;

    const cards = document.querySelectorAll(".dd-spotlight-card, .dd-metric-card, .dd-why-item");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* ===========================================================================
     6. THREE.JS GENERATIVE NETWORK & KINETIC RING CANVAS
     (Enterprise Technology Architecture with Dynamic Line Interconnects)
     =========================================================================== */
  function initThreeCanvas() {
    if (isReducedMotion || typeof THREE === "undefined") return;

    const canvas = document.getElementById("dd-three-canvas");
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Group with subtle organic connection lines
    const nodeCount = 85;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    const orangeColor = new THREE.Color("#E8541A");
    const navyColor = new THREE.Color("#1A2535");

    const geometry = new THREE.BufferGeometry();
    const colors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 38;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 38;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.008,
      });

      const isOrange = Math.random() > 0.65;
      const c = isOrange ? orangeColor : navyColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Connections Line Segment
    const maxLineConnections = 70;
    const linePositions = new Float32Array(maxLineConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xE8541A,
      transparent: true,
      opacity: 0.12,
      blending: THREE.NormalBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Dual Wireframe Torus Rings (Dodail Signature Motif)
    const ringGeo = new THREE.TorusGeometry(3.5, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xE8541A, transparent: true, opacity: 0.22 });
    const torusRing1 = new THREE.Mesh(ringGeo, ringMat);
    torusRing1.position.set(9, -2, -4);
    scene.add(torusRing1);

    const torusRing2 = new THREE.Mesh(ringGeo, ringMat);
    torusRing2.scale.set(0.65, 0.65, 0.65);
    torusRing2.position.set(-11, 6, -6);
    scene.add(torusRing2);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let isTabHidden = false;
    document.addEventListener("visibilitychange", () => {
      isTabHidden = document.hidden;
    });

    function animate() {
      requestAnimationFrame(animate);
      if (isTabHidden) return;

      const pos = particles.geometry.attributes.position.array;
      let lineIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        pos[i * 3] += nodeVelocities[i].x;
        pos[i * 3 + 1] += nodeVelocities[i].y;
        pos[i * 3 + 2] += nodeVelocities[i].z;

        // Boundary bounce
        if (Math.abs(pos[i * 3]) > 20) nodeVelocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 20) nodeVelocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 7) nodeVelocities[i].z *= -1;

        // Proximity line connections
        if (lineIndex < maxLineConnections) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 4.5 && lineIndex < maxLineConnections) {
              linePositions[lineIndex * 6] = pos[i * 3];
              linePositions[lineIndex * 6 + 1] = pos[i * 3 + 1];
              linePositions[lineIndex * 6 + 2] = pos[i * 3 + 2];
              linePositions[lineIndex * 6 + 3] = pos[j * 3];
              linePositions[lineIndex * 6 + 4] = pos[j * 3 + 1];
              linePositions[lineIndex * 6 + 5] = pos[j * 3 + 2];
              lineIndex++;
            }
          }
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      lineSegments.geometry.attributes.position.needsUpdate = true;

      torusRing1.rotation.x += 0.003;
      torusRing1.rotation.y += 0.002;
      torusRing2.rotation.y -= 0.0025;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.025;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===========================================================================
     7. TEXT REVEALS & GSAP SCROLLTRIGGERS
     =========================================================================== */
  function initReveals() {
    if (typeof gsap === "undefined") return;

    gsap.utils.toArray(".dd-fade-up").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      });
    });

    gsap.utils.toArray(".dd-dot-pop").forEach((dot) => {
      gsap.to(dot, {
        scale: 1,
        duration: 0.45,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: dot,
          start: "top 88%",
          once: true,
        },
      });
    });

    // Spring Counters
    gsap.utils.toArray(".dd-counter").forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      const prefix = counter.getAttribute("data-prefix") || "";
      const suffix = counter.getAttribute("data-suffix") || "";
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              const formatted = target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1);
              counter.textContent = `${prefix}${formatted}${suffix}`;
            },
          });
        },
      });
    });

    // Manifesto Word Color Scrub
    const manifestoContainer = document.querySelector(".dd-manifesto-text");
    if (manifestoContainer) {
      const words = manifestoContainer.querySelectorAll(".dd-word");
      words.forEach((word) => {
        ScrollTrigger.create({
          trigger: word,
          start: "top 78%",
          onEnter: () => word.classList.add("is-revealed"),
          onLeaveBack: () => word.classList.remove("is-revealed"),
        });
      });
    }

    // Process Timeline Line Fill & Traveling Dot
    const timeline = document.querySelector(".dd-process-timeline");
    const progressLine = document.querySelector(".dd-process-line-progress");
    const dotTraveler = document.querySelector(".dd-process-dot-traveler");

    if (timeline && progressLine && dotTraveler) {
      ScrollTrigger.create({
        trigger: timeline,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress * 100;
          progressLine.style.height = p + "%";
          dotTraveler.style.top = p + "%";
        },
      });
    }

    // Growth Chart SVG Drawing
    const chartPath = document.querySelector(".dd-chart-path");
    if (chartPath) {
      const pathLength = chartPath.getTotalLength();
      chartPath.style.strokeDasharray = pathLength;
      chartPath.style.strokeDashoffset = pathLength;

      ScrollTrigger.create({
        trigger: chartPath,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(chartPath, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
          });
        },
      });
    }
  }

  /* ===========================================================================
     8. INTERACTIVE ROI GROWTH CALCULATOR (21st.dev Component Pattern)
     =========================================================================== */
  function initRoiCalculator() {
    const leadsSlider = document.getElementById("dd-calc-leads");
    const dealSlider = document.getElementById("dd-calc-deal");
    const leadsVal = document.getElementById("dd-calc-leads-val");
    const dealVal = document.getElementById("dd-calc-deal-val");

    const outPipeline = document.getElementById("dd-calc-out-pipeline");
    const outHours = document.getElementById("dd-calc-out-hours");
    const outSavings = document.getElementById("dd-calc-out-savings");

    if (!leadsSlider || !dealSlider || !outPipeline) return;

    function recalculate() {
      const leads = parseInt(leadsSlider.value, 10);
      const deal = parseInt(dealSlider.value, 10);

      if (leadsVal) leadsVal.textContent = `${leads} / mo`;
      if (dealVal) dealVal.textContent = `₹ ${deal.toLocaleString("en-IN")}`;

      // Dodail benchmark: +218% compound lead lift, 18 hrs/wk saved in manual ops, 67.5% CPA drop
      const additionalLeads = Math.round(leads * 2.18);
      const projectedPipeline = additionalLeads * deal * 0.15; // 15% close rate
      const formattedPipeline = projectedPipeline > 10000000 
        ? `₹ ${(projectedPipeline / 10000000).toFixed(2)} Cr`
        : `₹ ${(projectedPipeline / 100000).toFixed(1)} Lakh`;

      const weeklyHoursSaved = Math.round(Math.min(42, Math.max(12, leads * 0.22)));
      const annualCostSaved = Math.round(leads * 12 * 850); // blended CPA saving per lead
      const formattedSavings = `₹ ${(annualCostSaved / 100000).toFixed(1)}L`;

      outPipeline.textContent = formattedPipeline;
      outHours.textContent = `${weeklyHoursSaved}h / wk`;
      outSavings.textContent = formattedSavings;
    }

    leadsSlider.addEventListener("input", recalculate);
    dealSlider.addEventListener("input", recalculate);
    recalculate();
  }

  /* ===========================================================================
     9. ENTERPRISE ARCHITECTURE TERMINAL CODE TABS
     (Infosys / Microsoft Institutional Credibility)
     =========================================================================== */
  function initTerminalTabs() {
    const tabs = document.querySelectorAll(".dd-terminal-tab");
    const codeContainer = document.getElementById("dd-terminal-code");
    if (!tabs.length || !codeContainer) return;

    const codeSnippets = {
      nextjs: `<span class="dd-code-comment">// 1. Next.js 16 Edge Route &amp; Autonomous Server Component</span>
<span class="dd-code-keyword">import</span> { <span class="dd-code-fn">draftMode</span> } <span class="dd-code-keyword">from</span> <span class="dd-code-str">"next/headers"</span>;
<span class="dd-code-keyword">import</span> { <span class="dd-code-var">sanitizeInput</span>, <span class="dd-code-var">verifySessionToken</span> } <span class="dd-code-keyword">from</span> <span class="dd-code-str">"@/lib/auth"</span>;

<span class="dd-code-keyword">export async function</span> <span class="dd-code-fn">generateMetadata</span>({ params }) {
  <span class="dd-code-keyword">const</span> data = <span class="dd-code-keyword">await</span> <span class="dd-code-fn">getContent</span>(<span class="dd-code-str">"enterprise/core"</span>);
  <span class="dd-code-keyword">return</span> { title: data.seo.title, robots: { index: <span class="dd-code-keyword">true</span>, follow: <span class="dd-code-keyword">true</span> } };
}

<span class="dd-code-keyword">export default async function</span> <span class="dd-code-fn">EnterprisePipeline</span>() {
  <span class="dd-code-comment">// Sub-second LCP: statically generated at edge with incremental revalidation</span>
  <span class="dd-code-keyword">return</span> &lt;<span class="dd-code-fn">LiveAttributionEngine</span> latencyMs={<span class="dd-code-str">"0.6ms"</span>} uptime={<span class="dd-code-str">"99.99%"</span>} /&gt;;
}`,

      ai: `<span class="dd-code-comment">// 2. Dodail AI Agent Lead Qualification Engine &amp; Guardrails</span>
<span class="dd-code-keyword">import</span> { <span class="dd-code-var">GoogleGenAI</span> } <span class="dd-code-keyword">from</span> <span class="dd-code-str">"@google/genai"</span>;
<span class="dd-code-keyword">import</span> { <span class="dd-code-fn">sanitizePrompt</span>, <span class="dd-code-fn">auditToolWhitelist</span> } <span class="dd-code-keyword">from</span> <span class="dd-code-str">"@/lib/guardrails"</span>;

<span class="dd-code-keyword">export const</span> <span class="dd-code-var">qualificationAgent</span> = {
  model: <span class="dd-code-str">"gemini-2.5-flash-pro"</span>,
  temperature: <span class="dd-code-str">0.1</span>, <span class="dd-code-comment">// zero hallucination mode</span>
  tools: [<span class="dd-code-str">"check_calendar_availability"</span>, <span class="dd-code-str">"qualify_budget_threshold"</span>, <span class="dd-code-str">"trigger_crm_sync"</span>],
  onVerifiedLead: <span class="dd-code-keyword">async</span> (lead) =&gt; {
    <span class="dd-code-keyword">await</span> <span class="dd-code-fn">dispatchHandoffToSlack</span>(lead, { priority: <span class="dd-code-str">"immediate_p1"</span> });
  }
};`,

      security: `<span class="dd-code-comment">// 3. Institutional Security &amp; Data Governance Framework</span>
<span class="dd-code-keyword">export const</span> <span class="dd-code-var">securityPolicies</span> = {
  dataRetention: <span class="dd-code-str">"Zero-Storage for client proprietary models"</span>,
  encryption: <span class="dd-code-str">"AES-256 in-transit &amp; at-rest via AWS KMS / Google Cloud"</span>,
  compliance: [<span class="dd-code-str">"DPDP (India)"</span>, <span class="dd-code-str">"GDPR (Europe)"</span>, <span class="dd-code-str">"SOC-2 Type II Compliant Architecture"</span>],
  ssrfProtection: <span class="dd-code-str">"Strict loopback and metadata endpoint filtering active"</span>,
  auditLogging: <span class="dd-code-str">"Immutable append-only revision snapshots per CMS edit"</span>
};`
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        const key = tab.getAttribute("data-tab");
        if (codeSnippets[key]) {
          codeContainer.innerHTML = codeSnippets[key];
        }
      });
    });
  }

  /* ===========================================================================
     10. HERO PIPELINE INTERACTIVE SWITCHER
     =========================================================================== */
  function initHeroPipelineSwitcher() {
    const nodes = document.querySelectorAll(".dd-pipeline-node");
    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        nodes.forEach((n) => n.classList.remove("is-active"));
        node.classList.add("is-active");
      });
    });
  }

  /* ===========================================================================
     11. SERVICES CURSOR PREVIEW FOLLOWER
     =========================================================================== */
  function initServicePreviews() {
    if (isTouchDevice) return;

    const preview = document.querySelector(".dd-service-preview");
    const previewImg = preview ? preview.querySelector("img") : null;
    const items = document.querySelectorAll(".dd-service-item");

    if (!preview || !previewImg || !items.length) return;

    let posX = 0, posY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX + 32;
      targetY = e.clientY - 20;
    }, { passive: true });

    function follow() {
      posX += (targetX - posX) * 0.18;
      posY += (targetY - posY) * 0.18;
      preview.style.left = posX + "px";
      preview.style.top = posY + "px";
      requestAnimationFrame(follow);
    }
    follow();

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const imgSrc = item.getAttribute("data-preview");
        if (imgSrc) {
          previewImg.src = imgSrc;
          preview.classList.add("is-active");
        }
      });
      item.addEventListener("mouseleave", () => {
        preview.classList.remove("is-active");
      });
    });
  }

  /* ===========================================================================
     12. FAQ ACCORDION (Smooth Animated Height & ARIA)
     =========================================================================== */
  function initFaqAccordion() {
    const items = document.querySelectorAll(".dd-faq-item");
    items.forEach((item) => {
      const trigger = item.querySelector(".dd-faq-trigger");
      const content = item.querySelector(".dd-faq-content");
      if (!trigger || !content) return;

      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("is-active");
        items.forEach((other) => {
          other.classList.remove("is-active");
          const otherContent = other.querySelector(".dd-faq-content");
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add("is-active");
          content.style.maxHeight = content.scrollHeight + 32 + "px";
        }
      });
    });
  }

  /* ===========================================================================
     13. MAGNETIC BUTTONS (Desktop Only)
     =========================================================================== */
  function initMagneticButtons() {
    if (isTouchDevice || isReducedMotion) return;

    document.querySelectorAll(".dd-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  /* ===========================================================================
     14. DODAIL ACRONYM ACCORDION / EXPANDER
     =========================================================================== */
  function initAcronymExpand() {
    const rows = document.querySelectorAll(".dd-acronym-row");
    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        rows.forEach((r) => r.style.opacity = "0.5");
        row.style.opacity = "1";
      });
      row.addEventListener("mouseleave", () => {
        rows.forEach((r) => r.style.opacity = "1");
      });
    });
  }

  /* ===========================================================================
     INITIALIZATION & ELEMENTOR HOOKS
     =========================================================================== */
  function initAll() {
    initPreloader();
    initSmoothScroll();
    initHeaderAndProgress();
    initCustomCursor();
    initSpotlightTracker();
    initThreeCanvas();
    initRoiCalculator();
    initTerminalTabs();
    initHeroPipelineSwitcher();
    initServicePreviews();
    initFaqAccordion();
    initMagneticButtons();
    initAcronymExpand();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // Elementor Frontend Re-initialization Hook for Novamira Agent preview
  window.addEventListener("elementor/frontend/init", () => {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction("frontend/element_ready/global", () => {
        initReveals();
        initSpotlightTracker();
        initRoiCalculator();
        initTerminalTabs();
        initFaqAccordion();
      });
    }
  });

})();
