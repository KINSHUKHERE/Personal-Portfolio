import { lazy, Suspense, useEffect, useRef } from "react";

// Three.js is ~700kB of the bundle and only the hero uses it. Loading it in a
// separate chunk lets the 2D Constellation paint immediately instead of
// waiting on WebGL code the rest of the page never needs.
const FloatingOctas = lazy(() => import("./FloatingOctas"));

function Constellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let parts = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDark = document.documentElement.classList.contains("dark");
      const multiplier = isDark ? 2.0 : 1.0;
      const target = Math.min(
        isDark ? 240 : 120,
        Math.floor(((width * height) / 14000) * multiplier)
      );

      parts = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        px: 0,
        py: 0,
        r: Math.random() * 1.2 + 0.6,
      }));
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    const observer = new MutationObserver(() => {
      setup();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const LINK_DIST = 120;
    const REPEL_R = 110;
    const REPEL_STRENGTH = 0.9;

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_R * REPEL_R && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const f = (1 - d / REPEL_R) * REPEL_STRENGTH;
            p.px += (dx / d) * f;
            p.py += (dy / d) * f;
          }
        }

        p.x += p.px;
        p.y += p.py;
        p.px *= 0.92;
        p.py *= 0.92;
      }

      const isDarkTheme = document.documentElement.classList.contains("dark");
      const strokeColorPrefix = isDarkTheme ? "rgba(125, 211, 252," : "rgba(79, 70, 229,";
      const strokeMultiplier = isDarkTheme ? 1 : 2.5;

      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.18 * strokeMultiplier;
            ctx.strokeStyle = `${strokeColorPrefix} ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw links from mouse to particles (interactive spiderweb)
      if (mouse.active) {
        for (const p of parts) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST * 1.3) {
            const alpha = (1 - Math.sqrt(d2) / (LINK_DIST * 1.3)) * 0.28 * strokeMultiplier;
            ctx.strokeStyle = isDarkTheme
              ? `rgba(34, 211, 238, ${alpha})`
              : `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        ctx.fillStyle = isDarkTheme
          ? "rgba(186, 230, 253, 0.85)"
          : "rgba(13, 148, 136, 0.85)";
        ctx.beginPath();
        const r = isDarkTheme ? p.r : p.r * 1.35;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}


export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Constellation />
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <FloatingOctas />
        </Suspense>
      </div>
    </div>
  );
}
