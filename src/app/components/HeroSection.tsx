import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";

const roles = [
  "Full Stack Developer",
  "AI Engineer",
  "DevOps Enthusiast",
  "Problem Solver",
];

/* ── 3D Scene objects ── */
function NeuralParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorPalette = [
    new THREE.Color("#4f8ef7"),
    new THREE.Color("#7c3aed"),
    new THREE.Color("#f97316"),
    new THREE.Color("#06b6d4"),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function FloatingOrb({ position, color, size = 1, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4;
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.z += 0.003 * speed;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function RotatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
    </mesh>
  );
}

function CursorReactive() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function TorusRing({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.2, 0.06, 16, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function Scene3D() {
  return (
    <>
      <CursorReactive />
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4f8ef7" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#f97316" />

      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
      <NeuralParticles />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingOrb position={[3, 1, -2]} color="#4f8ef7" size={0.7} speed={0.8} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <FloatingOrb position={[-3.5, -1, -3]} color="#7c3aed" size={0.9} speed={1.2} />
      </Float>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <FloatingOrb position={[2, -2, -1]} color="#f97316" size={0.4} speed={1.5} />
      </Float>

      <RotatingCube position={[-2, 2, -4]} color="#4f8ef7" />
      <RotatingCube position={[4, -2, -5]} color="#7c3aed" />
      <RotatingCube position={[-4, 0, -3]} color="#06b6d4" />

      <TorusRing position={[0, 0, -6]} color="#4f8ef7" />
      <TorusRing position={[3, 2, -8]} color="#7c3aed" />
    </>
  );
}

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(isDeleting ? current.slice(0, displayText.length - 1) : current.slice(0, displayText.length + 1));
        },
        isDeleting ? 50 : 90
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, #050505 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, #050505, transparent)" }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none z-[1]"
        style={{ background: "rgba(79,142,247,0.12)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-[100px] pointer-events-none z-[1]"
        style={{ background: "rgba(124,58,237,0.15)" }}
      />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              borderColor: "rgba(79,142,247,0.3)",
              background: "rgba(79,142,247,0.06)",
              fontFamily: "JetBrains Mono, monospace",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            
          </motion.div>

          {/* Main heading */}
          <div className="mb-6">
            <motion.h1
              className="font-black uppercase leading-none tracking-tight"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              
            </motion.h1>
            <motion.h1
              className="font-black uppercase leading-none tracking-tight"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                background: "linear-gradient(90deg, #4f8ef7, #7c3aed, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              RAASHID
            </motion.h1>
            <motion.h1
              className="font-black uppercase leading-none tracking-tight"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "rgba(255,255,255,0.9)",
              }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              AHMED
            </motion.h1>
            <motion.h1
              className="font-black uppercase leading-none tracking-tight"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              
            </motion.h1>
          </div>

          {/* Animated role */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-gray-500 text-xl" style={{ fontFamily: "Inter, sans-serif" }}>I am a</span>
            <span
              className="text-xl font-semibold"
              style={{
                fontFamily: "Orbitron, monospace",
                background: "linear-gradient(90deg, #4f8ef7, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                minWidth: "280px",
              }}
            >
              {displayText}
              <span className="animate-pulse" style={{ WebkitTextFillColor: "#4f8ef7" }}>|</span>
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="max-w-xl text-base leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            I build intelligent digital experiences that combine software engineering,
            artificial intelligence, and scalable cloud infrastructure.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <button
              data-hover
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-8 py-4 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 0 30px rgba(79,142,247,0.4), 0 0 60px rgba(124,58,237,0.2)",
              }}
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }} />
            </button>
            <button
              data-hover
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Inter, sans-serif",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.borderColor = "rgba(79,142,247,0.5)";
                (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(79,142,247,0.2)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.target as HTMLElement).style.boxShadow = "none";
              }}
            >
              Let's Build Together
            </button>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="absolute bottom-12 left-6 right-6 flex gap-8 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          {[
            { num: "15+", label: "Projects Built" },
            { num: "3", label: "Internships" },
            { num: "5+", label: "Leadership Roles" },
            { num: "25+", label: "Technologies" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Orbitron, monospace",
                  background: "linear-gradient(90deg, #4f8ef7, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.num}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-gray-600 uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace", writingMode: "vertical-lr" }}>
          scroll
        </span>
        <motion.div
          className="w-px h-16 origin-top"
          style={{ background: "linear-gradient(to bottom, transparent, #4f8ef7)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
