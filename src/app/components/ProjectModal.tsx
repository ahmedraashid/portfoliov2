import { useState, useMemo } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaDownload,
  FaCheck,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  accent: string;
  tag: string;
  cover: string;
  screenshots: string[];
  pdf: string;
  github?: string;
  demo?: string;
  features: string[];
};


interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
  const lenis = (window as any).lenis;

  if (lenis) {
    lenis.stop();
  }

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalOverflow;

    if (lenis) {
      lenis.start();
    }
  };
}, []);

  // combine cover + screenshots into one gallery, de-duplicated, so the
  // carousel cycles through every image that exists for the project
  const gallery = useMemo(() => {
    if (!project) return [];
    const all = [project.cover, ...(project.screenshots || [])].filter(Boolean);
    return Array.from(new Set(all));
  }, [project]);

  if (!project) return null;

  const goPrev = () =>
    setHeroIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setHeroIndex((i) => (i + 1) % gallery.length);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-y-auto p-4 md:p-8"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,0,0,.4), rgba(0,0,0,.88) 60%)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}
onTouchMove={(e) => e.stopPropagation()}
      >
        <motion.div
  onClick={(e) => e.stopPropagation()}
  className="
relative
w-full
max-w-[1200px]
mx-auto
my-10
rounded-[28px]
border
overflow-hidden
"
          style={{
            background: "linear-gradient(180deg, #101012 0%, #0a0a0b 100%)",
            borderColor: "rgba(255,255,255,.08)",
            boxShadow: `0 50px 140px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04), 0 0 160px ${project.accent}22`,
          }}
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ambient glow orb */}
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle, ${project.accent}30, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            data-hover
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 hover:rotate-90"
            style={{
              background: "rgba(0,0,0,.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,.14)",
            }}
          >
            <FaTimes size={16} />
          </button>

          {/* Hero carousel — pure image, nothing overlaid on top of it */}
          <div className="relative w-full h-[320px] md:h-[460px] lg:h-[560px] overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={gallery[heroIndex]}
                src={gallery[heroIndex]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* thin bottom fade only, purely for a soft seam into the content below */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent, #0a0a0b)",
              }}
            />

            {/* carousel arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  data-hover
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{
                    background: "rgba(0,0,0,.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,.14)",
                  }}
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={goNext}
                  data-hover
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{
                    background: "rgba(0,0,0,.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,.14)",
                  }}
                >
                  <FaChevronRight size={14} />
                </button>

                {/* dot indicators */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIndex(i)}
                      data-hover
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === heroIndex ? 22 : 6,
                        background:
                          i === heroIndex
                            ? project.accent
                            : "rgba(255,255,255,.5)",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title block — flows normally below the image, never overlaps it */}
          <div className="relative z-10 px-6 md:px-10 lg:px-12 pt-8 md:pt-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-4"
              style={{
                background: `${project.accent}1f`,
                color: project.accent,
                border: `1px solid ${project.accent}40`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: project.accent }}
              />
              {project.tag}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-6">
              {project.title}
            </h1>

            <p className="text-white/55 text-[15px] md:text-base leading-8 max-w-[750px] mb-10">
              {project.desc}
            </p>
          </div>

          <div className="relative z-10 px-6 md:px-10 lg:px-12 pb-6 md:pb-10 lg:pb-12">

            {/* Tech stack */}
            <SectionLabel accent={project.accent}>Tech Stack</SectionLabel>
            <div className="flex flex-wrap gap-2.5 mb-11">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-white/75 border transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,.035)",
                    borderColor: "rgba(255,255,255,.08)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Features */}
            <SectionLabel accent={project.accent}>Features</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-3 mb-11">
              {project.features.map((f) => (
                <div
                  key={f}
                  className="group flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(255,255,255,.07)",
                    background: "rgba(255,255,255,.02)",
                  }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-shadow duration-200"
                    style={{
                      background: `${project.accent}18`,
                      boxShadow: `0 0 0 1px ${project.accent}35`,
                    }}
                  >
                    <FaCheck size={10} style={{ color: project.accent }} />
                  </div>
                  <span className="text-white/80 text-[14.5px]">{f}</span>
                </div>
              ))}
            </div>

            {/* Screenshots grid (click any to lightbox; hover jumps hero) */}
            {gallery.length > 0 && (
              <>
                <SectionLabel accent={project.accent}>Screenshots</SectionLabel>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {gallery.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setLightbox(img)}
                      onMouseEnter={() => setHeroIndex(i)}
                      data-hover
                      className="group relative rounded-2xl overflow-hidden border aspect-[4/3]"
                      style={{
                        borderColor:
                          i === heroIndex
                            ? `${project.accent}80`
                            : "rgba(255,255,255,.08)",
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <FaExpand
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
                          size={18}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-2 pt-8 border-t border-white/[0.06]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="px-6 py-3.5 rounded-xl border flex items-center gap-2.5 text-white/85 hover:text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(255,255,255,.1)",
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  <FaGithub size={15} />
                  GitHub
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="px-6 py-3.5 rounded-xl border flex items-center gap-2.5 text-white/85 hover:text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(255,255,255,.1)",
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  <FaExternalLinkAlt size={13} />
                  Live Demo
                </a>
              )}

              <a
                href={project.pdf}
                download
                data-hover
                className="px-6 py-3.5 rounded-xl flex items-center gap-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                  boxShadow: `0 8px 30px ${project.accent}40`,
                }}
              >
                <FaDownload size={13} />
                Download Documentation
              </a>
            </div>
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.img
                src={lightbox}
                alt=""
                className="max-w-full max-h-full rounded-2xl border border-white/10 shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
              <button
                onClick={() => setLightbox(null)}
                data-hover
                className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 border border-white/15 transition"
              >
                <FaTimes size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 8px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.12);
          border-radius: 999px;
        }
      `}</style>
    </AnimatePresence>
  );
}

function SectionLabel({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="w-6 h-[2px] rounded-full"
        style={{ background: accent }}
      />
      <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45">
        {children}
      </h2>
    </div>
  );
}