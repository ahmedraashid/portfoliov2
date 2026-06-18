import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const services = [
  {
    title: "Full Stack Development",
    desc: "End-to-end web applications from pixel-perfect frontends to scalable backends. React, Node.js, TypeScript — built for performance.",
    icon: "⚡",
    accent: "#4f8ef7",
    features: ["React / Next.js", "Node.js APIs", "Database Design", "Performance Optimization"],
  },
  {
    title: "AI Solutions",
    desc: "Custom ML models, NLP pipelines, and computer vision systems that solve real problems — not just proof-of-concepts.",
    icon: "🤖",
    accent: "#7c3aed",
    features: ["ML Model Training", "NLP Systems", "Computer Vision", "AI Integration"],
  },
  {
    title: "DevOps & Cloud",
    desc: "CI/CD pipelines, Docker containers, cloud deployments on AWS & GCP. Infrastructure that scales with your ambitions.",
    icon: "☁️",
    accent: "#06b6d4",
    features: ["Docker / Kubernetes", "AWS / GCP", "CI/CD Pipelines", "Monitoring"],
  },
  {
    title: "Database Management",
    desc: "Optimized database architecture for both relational and NoSQL systems. Designed for speed, scale, and reliability.",
    icon: "🗄️",
    accent: "#f97316",
    features: ["MongoDB / MySQL", "Query Optimization", "Data Modeling", "Migrations"],
  },
  {
    title: "Automation Systems",
    desc: "Workflow automation, IoT integrations, and smart systems that save time and reduce human error at scale.",
    icon: "🔄",
    accent: "#10b981",
    features: ["Process Automation", "IoT Integration", "Scripting", "Testing Automation"],
  },
  
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(168,85,247,0.04) 0%, transparent 60%)",
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
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "#a855f7", fontFamily: "JetBrains Mono, monospace" }}>
              06 / Services
            </span>
            <div className="flex-1 h-px max-w-xs" style={{ background: "rgba(168,85,247,0.3)" }} />
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
              WHAT I OFFER
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
            >
              From idea to deployment — I bring full-spectrum engineering capability to every project.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="relative p-6 rounded-2xl border overflow-hidden cursor-default"
              style={{
                background: activeService === i ? `linear-gradient(135deg, ${service.accent}0d, rgba(18,18,18,0.95))` : "rgba(18,18,18,0.8)",
                borderColor: activeService === i ? `${service.accent}44` : "rgba(255,255,255,0.06)",
                boxShadow: activeService === i ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${service.accent}1a` : "none",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: activeService === i ? "translateY(-8px)" : "none",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Animated border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${service.accent}, transparent)`,
                  opacity: activeService === i ? 1 : 0.3,
                }}
              />

              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                style={{ background: service.accent, opacity: activeService === i ? 0.1 : 0.03 }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ background: `${service.accent}15` }}
                animate={{ rotate: activeService === i ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 0.4 }}
              >
                {service.icon}
              </motion.div>

              <h3
                className="font-bold text-white text-base mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {service.title}
              </h3>
              <p
                className="text-xs leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}
              >
                {service.desc}
              </p>

              <ul className="space-y-2">
                {service.features.map(f => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
                  >
                    <div className="w-1 h-1 rounded-full" style={{ background: service.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
