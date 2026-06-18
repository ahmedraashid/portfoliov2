import { useEffect } from "react";
import Lenis from "lenis";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { LeadershipSection } from "./components/LeadershipSection";
import { ServicesSection } from "./components/ServicesSection";
import { ContactSection } from "./components/ContactSection";

/* MARKER-MAKE-KIT-INVOKED */

export default function App() {
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: "#050505",
        fontFamily: "Inter, sans-serif",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { cursor: none !important; }
        ::selection { background: rgba(79,142,247,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <LeadershipSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </div>
  );
}
