import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Octahedron } from "@react-three/drei";

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
      gl={{ antialias: true, alpha: true }}
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

export default FloatingOctas;
