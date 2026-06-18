import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 15, suffix: "+", label: "Projects Built", icon: "⚡" },
  { value: 3, suffix: "", label: "Internships", icon: "🚀" },
  { value: 5, suffix: "+", label: "Leadership Roles", icon: "👑" },
  { value: 25, suffix: "+", label: "Technologies", icon: "🛠" },
];

const timelineItems = [
  { year: "2023", title: "Joined VIT Vellore", desc: "Started Integrated M.Tech in Software Engineering", accent: "#4f8ef7" },
  { year: "2024", title: "First Internship", desc: "Front-End Developer at TimeSlotter — built production React features", accent: "#7c3aed" },
  { year: "2024", title: "AI Research Begins", desc: "Built ML models for fraud detection and burnout prediction", accent: "#06b6d4" },
  { year: "2025", title: "Leadership & Events", desc: "Riviera 2026 Publicity Manager, E-Cell Operations Lead", accent: "#f97316" },
  { year: "2028", title: "M.Tech Graduation", desc: "Integrated Software Engineering degree — building what's next", accent: "#a855f7" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(79,142,247,0.05)", transform: "translateY(-50%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "#4f8ef7", fontFamily: "JetBrains Mono, monospace" }}
            >
              01 / About
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(79,142,247,0.3)" }} />
          </div>
          <h2
            className="font-black uppercase"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            THE STORY SO FAR
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border mb-8"
              style={{
                background: "rgba(79,142,247,0.06)",
                borderColor: "rgba(79,142,247,0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(79,142,247,0.15)" }}
              >
                🎓
              </div>
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  VIT Vellore
                </p>
                <p className="text-xs" style={{ color: "#4f8ef7", fontFamily: "JetBrains Mono, monospace" }}>
                  Integrated M.Tech · Software Engineering · 2023–2028
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                "I'm Raashid Ahmed — a Software Engineering student at VIT Vellore with a deep obsession for building things that matter. From full-stack web apps to machine learning pipelines to cloud-native DevOps systems, I live at the intersection of code and innovation.",
                "My philosophy is simple: technology should solve real problems elegantly. Whether it's an AI system that detects burnout before it happens, or a smart parking system powered by IoT — I build with purpose.",
                "Beyond coding, I lead teams, manage large-scale college events, and mentor peers. I believe great engineers aren't just technical — they're leaders who understand people.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-2xl border relative overflow-hidden group"
                  style={{
                    background: "rgba(18,18,18,0.8)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ borderColor: "rgba(79,142,247,0.3)", y: -4 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      fontFamily: "Orbitron, monospace",
                      background: "linear-gradient(90deg, #4f8ef7, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    {stat.label}
                  </p>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at center, rgba(79,142,247,0.06) 0%, transparent 70%)" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-8" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Journey
            </p>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #4f8ef7, #7c3aed, transparent)" }}
              />

              <div className="space-y-8">
                {timelineItems.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-[17px] top-2 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: item.accent, background: "#050505" }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                    </div>

                    <div
                      className="p-4 rounded-xl border transition-all duration-300 group hover:border-opacity-50 cursor-default"
                      style={{
                        background: "rgba(18,18,18,0.6)",
                        borderColor: "rgba(255,255,255,0.06)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = item.accent + "44";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${item.accent}22`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{
                            background: item.accent + "22",
                            color: item.accent,
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {item.year}
                        </span>
                        <span className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
