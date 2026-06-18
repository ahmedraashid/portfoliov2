import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const projects = [
  {
    title: "Railway Reservation System",
    desc: "Full-stack web application for booking and managing train tickets with real-time seat availability, user auth, and admin dashboard.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#4f8ef7",
    emoji: "🚂",
    tag: "Full Stack",
    featured: true,
  },
  {
    title: "Credit Card Fraud Detection",
    desc: "ML model achieving 99.2% accuracy using ensemble methods and anomaly detection to identify fraudulent transactions in real-time.",
    stack: ["Python", "Scikit-learn", "Pandas", "Flask"],
    accent: "#7c3aed",
    emoji: "🔐",
    tag: "Machine Learning",
    featured: true,
  },
  {
    title: "Human Burnout Detection",
    desc: "AI prediction platform using NLP and behavioral pattern analysis to detect employee burnout risk levels and recommend interventions.",
    stack: ["Python", "TensorFlow", "NLP", "React"],
    accent: "#f97316",
    emoji: "🧠",
    tag: "AI Platform",
    featured: true,
  },
  {
    title: "Facial & Hand Gesture Recognition",
    desc: "Real-time gesture-controlled interface using computer vision — enables touchless UI navigation for accessibility applications.",
    stack: ["OpenCV", "MediaPipe", "Python", "TensorFlow"],
    accent: "#06b6d4",
    emoji: "🖐️",
    tag: "Computer Vision",
    featured: false,
  },
  {
    title: "Mental Health Counselling System",
    desc: "NLP-powered conversational assistant that provides mental health support, mood tracking, and connects users with professional resources.",
    stack: ["NLP", "Python", "React", "Node.js"],
    accent: "#a855f7",
    emoji: "💬",
    tag: "NLP · Healthcare",
    featured: false,
  },
  {
    title: "IoT Smart Parking System",
    desc: "RFID and sensor-based automated parking management with real-time slot monitoring, mobile alerts, and cloud data sync.",
    stack: ["Arduino", "NodeMCU", "RFID", "IoT"],
    accent: "#10b981",
    emoji: "🅿️",
    tag: "IoT · Embedded",
    featured: false,
  },
  {
  title: "AI Fitness & Diet Recommendation System",
  desc: "Machine learning-powered fitness prediction platform that analyzes user health metrics, activity levels, and goals to generate personalized workout plans, calorie targets, and diet recommendations for improved health outcomes.",
  stack: ["Python", "Machine Learning", "Scikit-learn", "Flask"],
  accent: "#8b5cf6",
  emoji: "💪",
  tag: "AI · Healthcare",
  featured: true,
},
{
  title: "Smart Hospital Management System",
  desc: "Enterprise-grade healthcare automation solution designed to digitize and optimize hospital operations. Features include patient registration, online appointment scheduling, automated email and SMS notifications, doctor and staff management, electronic health records (EHR), billing, pharmacy inventory, laboratory reports, follow-up reminders, and real-time administrative dashboards. The platform creates a seamless healthcare ecosystem by automating communication, reducing manual effort, and enhancing patient engagement throughout the treatment lifecycle.",
  stack: ["React.js", "Node.js", "MongoDB", "Express.js"],
  accent: "#06b6d4",
  emoji: "⚕️",
  tag: "Healthcare · Digital Transformation",
  featured: true,
},
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl border overflow-hidden cursor-default"
      style={{
        background: "rgba(18,18,18,0.9)",
        borderColor: hovered ? `${project.accent}44` : "rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? `0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${project.accent}1a`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered
          ? `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-12px) scale(1.02)`
          : "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{ background: project.accent, opacity: hovered ? 0.1 : 0.03 }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${project.accent}1a` }}
          >
            {project.emoji}
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: `${project.accent}15`,
              color: project.accent,
              fontFamily: "JetBrains Mono, monospace",
              border: `1px solid ${project.accent}22`,
            }}
          >
            {project.tag}
          </span>
        </div>

        <h3
          className="font-bold text-base text-white mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {project.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}
        >
          {project.desc}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Hover reveal */}
        <motion.div
          className="mt-4 pt-4 border-t flex items-center justify-between"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs" style={{ color: project.accent, fontFamily: "JetBrains Mono, monospace" }}>
            View Project →
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full" style={{ background: project.accent, opacity: 0.4 + i * 0.2 }} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Full Stack", "Machine Learning", "AI Platform", "Computer Vision", "IoT"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.tag.includes(filter));

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,142,247,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "#f97316", fontFamily: "JetBrains Mono, monospace" }}>
              03 / Projects
            </span>
            <div className="flex-1 h-px max-w-xs" style={{ background: "rgba(249,115,22,0.3)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-black uppercase"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              WHAT I'VE BUILT
            </h2>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map(f => (
            <button
              key={f}
              data-hover
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: filter === f ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                color: filter === f ? "#f97316" : "rgba(255,255,255,0.5)",
                border: `1px solid ${filter === f ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
