"use client";

import React, { useEffect, useRef } from "react";
import type * as THREE from "three";

export function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isMounted = true;
    let animationFrameId: number;
    let renderer: any = null;

    import("three").then((THREE) => {
      if (!isMounted || !container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 85;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch (e) {
        console.warn("WebGL not supported, falling back.");
        return;
      }

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Node Count and Connections
      const nodeCount = 55;
      const positions = new Float32Array(nodeCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
        velocities.push({
          x: (Math.random() - 0.5) * 0.08,
          y: (Math.random() - 0.5) * 0.08,
          z: (Math.random() - 0.5) * 0.05,
        });
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Particle dots: subtle navy and soft orange
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x1A2535,
        size: 3.2,
        transparent: true,
        opacity: 0.28,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Dynamic Connecting Lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xE04E08,
        transparent: true,
        opacity: 0.14,
      });

      const maxLines = nodeCount * 5;
      const linePositions = new Float32Array(maxLines * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      // Signature Brand Geometric Motifs: 2 Orange & Peach Torus Rings
      const ringGeo1 = new THREE.TorusGeometry(18, 0.45, 16, 64);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0xE04E08,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const torusRing1 = new THREE.Mesh(ringGeo1, ringMat1);
      torusRing1.position.set(28, -6, -10);
      torusRing1.rotation.x = Math.PI / 4;
      scene.add(torusRing1);

      const ringGeo2 = new THREE.TorusGeometry(10, 0.35, 12, 48);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xF2D5C4,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const torusRing2 = new THREE.Mesh(ringGeo2, ringMat2);
      torusRing2.position.set(28, -6, -8);
      torusRing2.rotation.y = Math.PI / 3;
      scene.add(torusRing2);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // Window Resize
      const onResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // Animation Loop
      const animate = () => {
        if (!isMounted) return;
        animationFrameId = requestAnimationFrame(animate);

        const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
        const currentPos = posAttr.array as Float32Array;

        for (let i = 0; i < nodeCount; i++) {
          currentPos[i * 3] += velocities[i].x;
          currentPos[i * 3 + 1] += velocities[i].y;
          currentPos[i * 3 + 2] += velocities[i].z;

          if (Math.abs(currentPos[i * 3]) > 65) velocities[i].x *= -1;
          if (Math.abs(currentPos[i * 3 + 1]) > 40) velocities[i].y *= -1;
          if (Math.abs(currentPos[i * 3 + 2]) > 25) velocities[i].z *= -1;
        }

        let lineIndex = 0;
        const linePos = lineSegments.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = currentPos[i * 3] - currentPos[j * 3];
            const dy = currentPos[i * 3 + 1] - currentPos[j * 3 + 1];
            const dz = currentPos[i * 3 + 2] - currentPos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 26 && lineIndex < maxLines) {
              linePos[lineIndex * 6] = currentPos[i * 3];
              linePos[lineIndex * 6 + 1] = currentPos[i * 3 + 1];
              linePos[lineIndex * 6 + 2] = currentPos[i * 3 + 2];
              linePos[lineIndex * 6 + 3] = currentPos[j * 3];
              linePos[lineIndex * 6 + 4] = currentPos[j * 3 + 1];
              linePos[lineIndex * 6 + 5] = currentPos[j * 3 + 2];
              lineIndex++;
            }
          }
        }

        // Clear remaining lines
        for (let k = lineIndex * 6; k < maxLines * 6; k++) {
          linePos[k] = 0;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        lineSegments.geometry.attributes.position.needsUpdate = true;

        torusRing1.rotation.x += 0.003;
        torusRing1.rotation.y += 0.002;
        torusRing2.rotation.y -= 0.0025;

        // Smooth camera drift toward mouse
        camera.position.x += (mouseX * 12 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 8 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    });

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
