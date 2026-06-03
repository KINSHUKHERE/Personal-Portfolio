import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Octahedron } from "@react-three/drei";

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

      const target = Math.min(120, Math.floor((width * height) / 14000));
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

      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        ctx.fillStyle = "rgba(186, 230, 253, 0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

function FloatingOctas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Float speed={0.6} rotationIntensity={0.5} floatIntensity={0.7}>
          <Octahedron args={[1.0, 0]} position={[-2.6, 1.1, 0]}>
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.22} />
          </Octahedron>
        </Float>
        <Float speed={0.4} rotationIntensity={0.35} floatIntensity={0.55}>
          <Octahedron args={[0.7, 0]} position={[2.6, -0.4, 0]}>
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.18} />
          </Octahedron>
        </Float>
        <Float speed={0.8} rotationIntensity={0.6} floatIntensity={0.8}>
          <Octahedron args={[0.5, 0]} position={[0.4, 2.1, 0]}>
            <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.16} />
          </Octahedron>
        </Float>
      </Suspense>
    </Canvas>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Constellation />
      <div className="absolute inset-0">
        <FloatingOctas />
      </div>
    </div>
  );
}
