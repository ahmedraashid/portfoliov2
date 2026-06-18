import { useRef } from "react";
import { motion, useInView } from "motion/react";

const achievements = [
  {
    title: "Riviera 2026",
    role: "Publicity & Marketing Manager",
    org: "VIT Vellore's Annual Cultural Fest",
    desc: "Led a team of 20+ to execute a multi-channel marketing campaign for one of India's largest college fests. Reached 100K+ audience across platforms.",
    accent: "#4f8ef7",
    icon: "🎭",
    stats: [{ label: "Team Size", value: "20+" }, { label: "Reach", value: "50K+" }],
  },
  {
    title: "Gravitas",
    role: "Publicity & Marketing Team",
    org: "VIT's Annual Tech Symposium",
    desc: "Designed and executed digital campaigns for VIT's flagship technical event. Managed branding, social media, and event promotions.",
    accent: "#7c3aed",
    icon: "⚙️",
    stats: [{ label: "Event Size", value: "30K+" }, { label: "Campaigns", value: "12+" }],
  },
  {
    title: "E-Cell VIT",
    role: "Operations Senior Core",
    org: "Entrepreneurship Cell",
    desc: "Organized startup pitching events, entrepreneurship workshops, and networking sessions connecting students with VCs and founders.",
    accent: "#f97316",
    icon: "🚀",
    stats: [{ label: "Events", value: "8+" }, { label: "Members", value: "50+" }],
  },
  {
    title: "VITMUN",
    role: "Delegate",
    org: "Model United Nations",
    desc: "Represented nations in diplomatic simulations, developed strong skills in research, negotiation, public speaking, and policy writing.",
    accent: "#10b981",
    icon: "🌍",
    stats: [{ label: "Sessions", value: "4" }, { label: "Committees", value: "3" }],
  },
];

export function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="leadership" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute left-0 top-1/3 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(249,115,22,0.05)" }}
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
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "#f97316", fontFamily: "JetBrains Mono, monospace" }}>
              05 / Leadership
            </span>
            <div className="flex-1 h-px max-w-xs" style={{ background: "rgba(249,115,22,0.3)" }} />
          </div>
          <h2
            className="font-black uppercase"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            BEYOND THE CODE
          </h2>
          <p
            className="mt-4 max-w-lg text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
          >
            Leadership is not just a role — it's a mindset. Here's where I lead, organize, and inspire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative p-6 rounded-2xl border overflow-hidden group cursor-default"
              style={{
                background: "rgba(18,18,18,0.8)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{
                borderColor: `${item.accent}33`,
                y: -6,
                boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 40px ${item.accent}15`,
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                style={{ background: item.accent, opacity: 0.06 }}
              />

              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${item.accent}1a` }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: `${item.accent}15`,
                    color: item.accent,
                    border: `1px solid ${item.accent}22`,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {item.role.split(" ")[0]}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-xs mb-1" style={{ color: item.accent, fontFamily: "Inter, sans-serif" }}>
                {item.role}
              </p>
              <p className="text-xs mb-3 text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.org}
              </p>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
                {item.desc}
              </p>

              {/* Stats */}
              <div className="flex gap-6 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {item.stats.map(stat => (
                  <div key={stat.label}>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "Orbitron, monospace",
                        color: item.accent,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
