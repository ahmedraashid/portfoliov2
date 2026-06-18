import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { FormEvent } from "react";

const socials = [
  { label: "GitHub", icon: "⌨️", href: "https://github.com/raashidahmed", accent: "#4f8ef7" },
  { label: "LinkedIn", icon: "💼", href: "https://linkedin.com/in/raashidahmed", accent: "#7c3aed" },
  { label: "Twitter", icon: "🐦", href: "https://twitter.com/raashidahmed", accent: "#06b6d4" },
  { label: "Email", icon: "✉️", href: "mailto:ahmedraashid21@gmail.com", accent: "#f97316" },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (data.success) {
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } else {
      alert("Failed to send message");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Big glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 80%, rgba(79,142,247,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(124,58,237,0.1)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 h-px max-w-xs ml-auto" style={{ background: "rgba(79,142,247,0.3)" }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "#4f8ef7", fontFamily: "JetBrains Mono, monospace" }}>
              07 / Contact
            </span>
            <div className="flex-1 h-px max-w-xs mr-auto" style={{ background: "rgba(79,142,247,0.3)" }} />
          </div>
          <h2
            className="font-black uppercase mb-4"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>LET'S BUILD SOMETHING</span>
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #4f8ef7, #7c3aed, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EXTRAORDINARY
            </span>
          </h2>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
          >
            Open to full-time roles, internships, freelance projects, and ambitious collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div
              className="p-8 rounded-2xl border"
              style={{
                background: "rgba(18,18,18,0.8)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 gap-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="text-5xl">🚀</div>
                  <p className="text-white font-semibold text-lg" style={{ fontFamily: "Inter, sans-serif" }}>Message Sent!</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      className="block text-xs font-medium mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300"
                      placeholder="Your name"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${focusedField === "name" ? "rgba(79,142,247,0.5)" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: focusedField === "name" ? "0 0 20px rgba(79,142,247,0.1)" : "none",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-xs font-medium mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300"
                      placeholder="your@email.com"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${focusedField === "email" ? "rgba(79,142,247,0.5)" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: focusedField === "email" ? "0 0 20px rgba(79,142,247,0.1)" : "none",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-medium mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none transition-all duration-300"
                      placeholder="Tell me about your project..."
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${focusedField === "message" ? "rgba(79,142,247,0.5)" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: focusedField === "message" ? "0 0 20px rgba(79,142,247,0.1)" : "none",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>

                  <button
  type="submit"
  disabled={loading}
  data-hover
  className="w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
  style={{
    background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
    boxShadow: "0 0 30px rgba(79,142,247,0.4)",
    fontFamily: "Inter, sans-serif",
  }}
>
  {loading ? "Sending..." : "Send Message →"}
</button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right — links & info */}
          <motion.div
            className="flex flex-col justify-between gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Info cards */}
            <div className="space-y-4">
              {[
                { label: "Location", value: "Vellore, Tamil Nadu, India", icon: "📍", accent: "#4f8ef7" },
                { label: "Education", value: "VIT Vellore — M.Tech Software Engineering", icon: "🎓", accent: "#7c3aed" },
                { label: "Status", value: "Open to opportunities", icon: "✅", accent: "#10b981" },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{
                    background: "rgba(18,18,18,0.6)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ background: `${item.accent}15` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{item.label}</p>
                    <p className="text-white text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                Find me on
              </p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    style={{
                      background: `${s.accent}0d`,
                      borderColor: `${s.accent}22`,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${s.accent}55`;
                      el.style.boxShadow = `0 0 20px ${s.accent}22`;
                      el.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${s.accent}22`;
                      el.style.boxShadow = "none";
                      el.style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Download resume */}
            <a
              href="#"
              data-hover
              className="flex items-center justify-center gap-3 py-4 rounded-xl border text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(79,142,247,0.4)";
                el.style.boxShadow = "0 0 30px rgba(79,142,247,0.15)";
                el.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
                el.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <span>📄</span>
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pt-8 pb-4">
          <p className="text-xs text-gray-700" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            © 2025 Raashid Ahmed · Built with ⚡ React + Three.js + GSAP
          </p>
        </div>
      </div>
    </section>
  );
}
