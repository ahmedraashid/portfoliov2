import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  FaCode,
  FaPalette,
  FaServer,
  FaDatabase,
  FaRobot,
  FaCloud
} from "react-icons/fa";
import {
  FaPython,
  FaJava,
  FaReact,
  FaDocker,
  FaAws,
  FaNodeJs
} from "react-icons/fa";

import {
  SiTypescript,
  SiMongodb,
  SiLinux,
  SiTensorflow
} from "react-icons/si";


const skillCategories = [
  {
    name: "Programming",
    icon: FaCode,
    color: "#4f8ef7",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript"],
  },
  {
    name: "Frontend",
    icon: FaPalette,
    color: "#7c3aed",
    skills: ["React", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js"],
  },
  {
    name: "Backend",
    icon: FaServer,
    color: "#06b6d4",
    skills: ["Node.js", "Express.js", "PHP", "REST APIs", "GraphQL"],
  },
  {
    name: "Database",
    icon: FaDatabase,
    color: "#f97316",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    name: "AI & ML",
    icon: FaRobot,
    color: "#a855f7",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "OpenCV", "TensorFlow"],
  },
  {
    name: "DevOps",
    icon: FaCloud,
    color: "#10b981",
    skills: ["Docker", "Jenkins", "CI/CD", "AWS", "Linux", "Google Cloud"],
  },
];

const techLogos: Record<string, any> = {
  Python: FaPython,
  Java: FaJava,
  React: FaReact,
  TypeScript: SiTypescript,
  "Node.js": FaNodeJs,
  Docker: FaDocker,
  AWS: FaAws,
  MongoDB: SiMongodb,
  Linux: SiLinux,
  TensorFlow: SiTensorflow,
};

function SkillCard({
  category,
  index,
  inView,
}: {
  category: typeof skillCategories[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const CategoryIcon = category.icon;

  return (
    <motion.div
      className="relative p-6 rounded-2xl border overflow-hidden cursor-default"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${category.color}0d, rgba(18,18,18,0.9))`
          : "rgba(18,18,18,0.8)",
        borderColor: hovered
          ? `${category.color}44`
          : "rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? `0 0 40px ${category.color}22, 0 20px 40px rgba(0,0,0,0.4)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: category.color,
          opacity: hovered ? 0.12 : 0.04,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${category.color}1a`,
          }}
        >
          <CategoryIcon
            size={20}
            color={category.color}
          />
        </div>

        <div>
          <h3
            className="font-bold text-sm text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {category.name}
          </h3>

          <div
            className="w-8 h-0.5 mt-1 rounded"
            style={{
              background: category.color,
            }}
          />
        </div>
      </div>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => {
          const Logo = techLogos[skill];

          return (
            <motion.span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: `${category.color}12`,
                color: hovered
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.55)",
                border: `1px solid ${category.color}${hovered ? "44" : "1a"}`,
                fontFamily: "Inter, sans-serif",
                transition: "all 0.3s ease",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.1 + i * 0.05 + 0.2,
              }}
            >
              {Logo && <Logo size={14} />}
              {skill}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "#7c3aed", fontFamily: "JetBrains Mono, monospace" }}
            >
              02 / Skills
            </span>
            <div className="flex-1 h-px max-w-xs" style={{ background: "rgba(124,58,237,0.3)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-black uppercase"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              TECH ARSENAL
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
            >
              A curated toolkit built through real-world projects, internships, and relentless experimentation.
            </p>
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.name} category={cat} index={i} inView={inView} />
          ))}
        </div>

        {/* Orbit display */}
        <motion.div
          className="mt-20 relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="relative w-64 h-64">
            {/* Center */}
            <div
              className="absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center z-10"
              style={{
                background: "radial-gradient(circle, #4f8ef7, #7c3aed)",
                boxShadow: "0 0 40px rgba(79,142,247,0.5)",
              }}
            >
              <span className="text-white font-bold text-xs" style={{ fontFamily: "Orbitron, monospace" }}>CODE</span>
            </div>

            {/* Orbiting rings */}
            {[80, 110, 130].map((radius, ri) => (
              <motion.div
                key={ri}
                className="absolute inset-0 m-auto rounded-full border"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  borderColor: ["rgba(79,142,247,0.2)", "rgba(124,58,237,0.2)", "rgba(6,182,212,0.2)"][ri],
                }}
                animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 8 + ri * 4, repeat: Infinity, ease: "linear" }}
              >
                {/* Orbiting dot */}
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: ["#4f8ef7", "#7c3aed", "#06b6d4"][ri],
                    boxShadow: `0 0 8px ${["#4f8ef7", "#7c3aed", "#06b6d4"][ri]}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
