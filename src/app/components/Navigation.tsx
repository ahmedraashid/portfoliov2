import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mx-auto px-6 py-4 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <button
          data-hover
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div className="relative w-9 h-9">
            
          </div>
          <span
            className="text-white font-semibold hidden sm:block"
            style={{ fontFamily: "Orbitron, monospace", letterSpacing: "0.1em" }}
          >
            RAASHID
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                data-hover
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 group"
                style={{ color: activeSection === link.href ? "#4f8ef7" : "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(79,142,247,0.08)" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          data-hover
          onClick={() => scrollTo("#contact")}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 0 20px rgba(79,142,247,0.3)",
          }}
        >
          Let's Connect
        </button>

        {/* Mobile hamburger */}
        <button
          data-hover
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-6 pb-6"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                data-hover
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-sm font-medium border-b"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.06)",
                  fontFamily: "Inter, sans-serif",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
