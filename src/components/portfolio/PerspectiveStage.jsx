import { useRef } from "react";

export function PerspectiveStage({ children, max = 4, className = "" }) {
  const innerRef = useRef(null);
  const rafRef = useRef(null);

  const onMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(
        2,
      )}deg)`;
    });
  };

  const onLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`perspective-stage ${className}`}
      style={{ perspective: "1600px", perspectiveOrigin: "50% 30%" }}
    >
      <div
        ref={innerRef}
        className="perspective-stage__inner"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
