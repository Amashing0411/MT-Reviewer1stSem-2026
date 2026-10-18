import React, { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";

export function InteractiveBackground() {
  const canvasRef = useRef(null);
  const { theme } = useUser();
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // Track mouse coordinates for interactive parallax and connection lines
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Constellation / Circuit Nodes
    let nodes = [];
    const count = Math.min(width < 768 ? 32 : 55, Math.floor((width * height) / 22000));

    function initNodes() {
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1,
          depth: Math.random() * 0.5 + 0.5,
          pulse: Math.random() * Math.PI,
        });
      }
    }

    initNodes();

    let lastTime = 0;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);
      if (currentTime - lastTime < 24) return; // Cap at ~40fps for high efficiency
      lastTime = currentTime;

      const isDark = theme === "dark" || document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseDistThreshold = mouseRef.current.radius;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.025;

        // Wrap around boundaries
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        // Parallax offset relative to mouse
        let displayX = node.x;
        let displayY = node.y;
        if (mouseX > 0 && mouseY > 0) {
          const dx = (mouseX - width / 2) * 0.02 * node.depth;
          const dy = (mouseY - height / 2) * 0.02 * node.depth;
          displayX -= dx;
          displayY -= dy;
        }

        // Mouse attraction/repulsion interaction
        const distToMouse = Math.hypot(displayX - mouseX, displayY - mouseY);
        if (distToMouse < mouseDistThreshold) {
          const angle = Math.atan2(displayY - mouseY, displayX - mouseX);
          const force = (1 - distToMouse / mouseDistThreshold) * 1.2;
          displayX += Math.cos(angle) * force * 5;
          displayY += Math.sin(angle) * force * 5;

          // Connect interactive circuit trace to cursor
          ctx.beginPath();
          ctx.moveTo(displayX, displayY);
          ctx.lineTo(mouseX, mouseY);
          const alpha = (1 - distToMouse / mouseDistThreshold) * (isDark ? 0.35 : 0.2);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Node Core
        const nodeOpacity = (Math.sin(node.pulse) * 0.25 + 0.75) * (isDark ? 0.85 : 0.5);
        ctx.beginPath();
        ctx.arc(displayX, displayY, node.radius * (isDark ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(96, 165, 250, ${nodeOpacity})`
          : `rgba(148, 163, 184, ${nodeOpacity})`;
        ctx.fill();

        // Connect neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          let otherX = other.x;
          let otherY = other.y;
          if (mouseX > 0 && mouseY > 0) {
            otherX -= (mouseX - width / 2) * 0.02 * other.depth;
            otherY -= (mouseY - height / 2) * 0.02 * other.depth;
          }

          const dist = Math.hypot(displayX - otherX, displayY - otherY);
          const maxDist = width < 768 ? 95 : 125;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.16 : 0.08);
            ctx.beginPath();
            ctx.moveTo(displayX, displayY);
            ctx.lineTo(otherX, otherY);
            ctx.strokeStyle = isDark
              ? `rgba(147, 197, 253, ${lineAlpha})`
              : `rgba(100, 116, 139, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Cursor Ambient Energy Halo
      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        const haloGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        haloGradient.addColorStop(
          0,
          isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(37, 99, 235, 0.04)"
        );
        haloGradient.addColorStop(1, "transparent");
        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}
