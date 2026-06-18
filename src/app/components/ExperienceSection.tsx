import { useRef } from "react";
import { motion, useInView } from "motion/react";

const experiences = [
  {
    role: "Front-End Developer Intern",
    company: "TimeSlotter",
    period: "2024",
    duration: "3 months",
    desc: "Developed production-ready React components, implemented state management with Redux, and optimized UI performance. Collaborated in an Agile team environment delivering weekly sprints.",
    skills: ["React", "Redux", "TypeScript", "Tailwind CSS", "Figma"],
    accent: "#4f8ef7",
    icon: "💻",
  },
  {
    role: "Social Media Manager",
    company: "KalkiNI",
    period: "2024",
    duration: "6 months",
    desc: "Managed digital presence, created data-driven content strategies, and grew social following by 40%. Leveraged analytics to optimize engagement and conversion rates.",
    skills: ["Strategy", "Analytics", "Content", "Growth", "Brand"],
    accent: "#7c3aed",
    icon: "📱",
  },
  {
    role: "Business Analyst Intern",
    company: "InsideFPV",
    period: "2024",
    duration: "2 months",
    desc: "Conducted market research, analyzed business processes, and delivered data-backed recommendations that improved operational efficiency by 25%.",
    skills: ["Data Analysis", "Excel", "PowerBI", "Research", "Strategy"],
    accent: "#f97316",
    icon: "📊",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute right-0 top-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)", transform: "translateY(-50%)" }}
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
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "#06b6d4", fontFamily: "JetBrains Mono, monospace" }}>
              04 / Experience
            </span>
            <div className="flex-1 h-px max-w-xs" style={{ background: "rgba(6,182,212,0.3)" }} />
          </div>
          <h2
            className="font-black uppercase"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            WHERE I'VE WORKED
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #4f8ef7, #7c3aed, #f97316, transparent)" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="relative pl-20"
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl"
                  style={{
                    background: "#0d0d0d",
                    borderColor: exp.accent,
                    boxShadow: `0 0 20px ${exp.accent}44`,
                  }}
                >
                  {exp.icon}
                </div>

                <div
                  className="p-6 rounded-2xl border relative overflow-hidden group"
                  style={{
                    background: "rgba(18,18,18,0.8)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${exp.accent}33`;
                    el.style.boxShadow = `0 0 40px ${exp.accent}15, 0 20px 40px rgba(0,0,0,0.4)`;
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${exp.accent}, transparent)` }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="font-bold text-white text-lg"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="font-semibold text-sm mt-0.5"
                        style={{ color: exp.accent, fontFamily: "Inter, sans-serif" }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: `${exp.accent}15`,
                          color: exp.accent,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {exp.period}
                      </span>
                      <span className="text-xs text-gray-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
                  >
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{
                          background: `${exp.accent}10`,
                          color: "rgba(255,255,255,0.5)",
                          border: `1px solid ${exp.accent}22`,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
