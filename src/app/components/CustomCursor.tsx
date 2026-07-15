import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const posRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);
  const particleCountRef = useRef(0);
  const lastParticleTime = useRef(0);

  const colors = ["#4f8ef7", "#7c3aed", "#f97316", "#06b6d4", "#a855f7"];

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      posRef.current = { x, y };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }

      const now = Date.now();
      if (now - lastParticleTime.current > 40) {
        lastParticleTime.current = now;
        const id = particleCountRef.current++;
        const particle: Particle = {
          id,
          x,
          y,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          life: 1,
        };
        setParticles(prev => [...prev.slice(-15), particle]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("button, a, [data-hover], input, textarea")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const rippleId = Date.now();
      setRipples(prev => [...prev, { id: rippleId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rippleId)), 800);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const decay = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, life: p.life - 0.07, x: p.x + p.vx, y: p.y + p.vy }))
          .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(decay);
  }, []);

  const cursorContent = (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none transition-none"
        style={{ willChange: "transform", zIndex: 2147483647 }}
      >
        <div
          className="w-full h-full rounded-full border transition-all duration-200"
          style={{
            borderColor: isHovering ? "#f97316" : "#4f8ef7",
            borderWidth: isHovering ? "2px" : "1px",
            boxShadow: isHovering
              ? "0 0 20px rgba(249,115,22,0.6), 0 0 40px rgba(249,115,22,0.2)"
              : "0 0 12px rgba(79,142,247,0.5)",
            transform: isHovering ? "scale(1.5)" : isClicking ? "scale(0.8)" : "scale(1)",
            background: isHovering ? "rgba(249,115,22,0.05)" : "transparent",
          }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none transition-none"
        style={{
          willChange: "transform",
          zIndex: 2147483647,
          background: isHovering ? "#f97316" : "#4f8ef7",
          boxShadow: isHovering
            ? "0 0 8px rgba(249,115,22,0.9)"
            : "0 0 6px rgba(79,142,247,0.9)",
        }}
      />

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            transform: `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px)`,
            background: p.color,
            opacity: p.life * 0.8,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            zIndex: 2147483646,
          }}
        />
      ))}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="fixed top-0 left-0 rounded-full pointer-events-none border"
            style={{
              borderColor: "#4f8ef7",
              zIndex: 2147483645,
              transform: `translate(${r.x - 1}px, ${r.y - 1}px)`,
            }}
            initial={{ width: 2, height: 2, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0, x: -39, y: -39 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  // Portal straight to <body> so no animated/transformed ancestor
  // (e.g. your slide-down project details) can ever clip or reposition it.
  return typeof document !== "undefined"
    ? createPortal(cursorContent, document.body)
    : null;
}