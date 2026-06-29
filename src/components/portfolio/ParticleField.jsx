import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

function DoubleOctahedron({
  args,
  outerColor,
  innerColor,
  outerOpacity,
  innerOpacity,
  position,
  speed,
  rotationIntensity,
  floatIntensity,
}) {
  const innerRef = useRef();
  const outerRef = useRef();
  const groupRef = useRef();

  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0, y: 0 });
  const rotationOffset = useRef({ 
    x: Math.random() * Math.PI * 2, 
    y: Math.random() * Math.PI * 2 
  });

  useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = "grab";
      }
    };
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = "default";
    };
  }, []);

  useFrame((state) => {
    // Inner solid core spins slowly inside
    if (innerRef.current) {
      innerRef.current.rotation.x += 0.008;
      innerRef.current.rotation.y += 0.012;
    }

    if (isDragging.current) {
      // Calculate delta of cursor movements in normalized screenspace
      const deltaX = state.pointer.x - pointerStart.current.x;
      const deltaY = state.pointer.y - pointerStart.current.y;
      
      // Update 3D rotation values dynamically based on drag coordinates offset
      rotationOffset.current.x = baseRotation.current.x - deltaY * 4.5;
      rotationOffset.current.y = baseRotation.current.y + deltaX * 4.5;
    } else {
      // Normal slow automatic rotation when not dragging
      rotationOffset.current.x += 0.0015;
      rotationOffset.current.y += 0.0025;
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = rotationOffset.current.x;
      groupRef.current.rotation.y = rotationOffset.current.y;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <group ref={groupRef} position={position}>
        {/* Outer wireframe */}
        <Octahedron
          args={args}
          ref={outerRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            if (!isDragging.current) {
              document.body.style.cursor = "grab";
            }
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            if (!isDragging.current) {
              document.body.style.cursor = "default";
            }
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            isDragging.current = true;
            pointerStart.current = { x: e.pointer.x, y: e.pointer.y };
            baseRotation.current = { x: rotationOffset.current.x, y: rotationOffset.current.y };
            document.body.style.cursor = "grabbing";
          }}
        >
          <meshBasicMaterial color={outerColor} wireframe transparent opacity={outerOpacity} />
        </Octahedron>
        {/* Inner solid core */}
        <Octahedron args={[args[0] * 0.42, args[1]]} ref={innerRef}>
          <meshBasicMaterial color={innerColor} transparent opacity={innerOpacity} />
        </Octahedron>
      </group>
    </Float>
  );
}

function ParallaxGroup({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.35;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

function FloatingOctas() {
  const [isDark, setIsDark] = useState(true);
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Detect crawler/bot to bypass heavy WebGL rendering
    const bot = typeof navigator !== "undefined" && /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    setIsBot(bot);

    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (isBot) {
    return null; // Skip rendering WebGL canvas for search crawlers/bots
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ pointerEvents: "auto" }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <ParallaxGroup>
          <DoubleOctahedron
            args={[1.0, 0]}
            position={[-2.6, 1.1, 0]}
            outerColor={isDark ? "#22d3ee" : "#0d9488"}
            innerColor={isDark ? "#0891b2" : "#22d3ee"}
            outerOpacity={isDark ? 0.25 : 0.5}
            innerOpacity={isDark ? 0.15 : 0.3}
            speed={0.6}
            rotationIntensity={0.5}
            floatIntensity={0.7}
          />
          <DoubleOctahedron
            args={[0.7, 0]}
            position={[2.6, -0.4, 0]}
            outerColor={isDark ? "#a78bfa" : "#4f46e5"}
            innerColor={isDark ? "#7c3aed" : "#a78bfa"}
            outerOpacity={isDark ? 0.2 : 0.45}
            innerOpacity={isDark ? 0.12 : 0.28}
            speed={0.4}
            rotationIntensity={0.35}
            floatIntensity={0.55}
          />
          <DoubleOctahedron
            args={[0.5, 0]}
            position={[0.4, 2.1, 0]}
            outerColor={isDark ? "#7dd3fc" : "#6366f1"}
            innerColor={isDark ? "#0284c7" : "#818cf8"}
            outerOpacity={isDark ? 0.18 : 0.4}
            innerOpacity={isDark ? 0.1 : 0.25}
            speed={0.8}
            rotationIntensity={0.6}
            floatIntensity={0.8}
          />
        </ParallaxGroup>
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
