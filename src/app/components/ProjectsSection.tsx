import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ProjectModal from "./ProjectModal";
import {
  FaTrain,
  FaShieldAlt,
  FaBrain,
  FaHandPaper,
  FaComments,
  FaParking,
  FaDumbbell,
  FaHospital,
} from "react-icons/fa";

const projects = [
  {
    title: "Railway Reservation System",

    desc: "Full-stack web application for booking and managing train tickets with real-time seat availability, user authentication, booking management, and admin dashboard.",

    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
    ],

    accent: "#4f8ef7",

    icon: FaTrain,

    tag: "Full Stack",

    featured: true,

    cover: "/projects/railway/cover.png",

    screenshots: [
      "/projects/railway/1.png",
      "/projects/railway/2.png",
      "/projects/railway/3.png",
    ],

    features: [
      "User Authentication",
      "Train Search",
      "Seat Booking",
      "Payment Integration",
      "Admin Dashboard",
      "Booking History",
    ],

    github: "",

    demo: "",

    pdf: "/projects/railway/documentation.pdf",
  },

  {
    title: "Credit Card Fraud Detection",

    desc: "Machine learning model achieving high fraud detection accuracy using ensemble methods and anomaly detection techniques for financial transaction monitoring.",

    stack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Flask",
    ],

    accent: "#7c3aed",

    icon: FaShieldAlt,

    tag: "Machine Learning",

    featured: true,

    cover: "/projects/fraud/cover.png",

    screenshots: [
      "/projects/fraud/1.png",
      "/projects/fraud/2.png",
      "/projects/fraud/3.png",
    ],

    features: [
      "Fraud Detection Model",
      "Transaction Analysis",
      "Real-time Prediction",
      "Performance Dashboard",
      "Data Visualization",
      "Model Evaluation",
    ],

    github: "",

    demo: "",

    pdf: "/projects/fraud/documentation.pdf",
  },

  {
    title: "Human Burnout Detection",

    desc: "AI-powered prediction platform leveraging NLP and behavioral analysis to identify burnout risk levels and recommend preventive interventions.",

    stack: [
      "Python",
      "TensorFlow",
      "NLP",
      "React",
    ],

    accent: "#f97316",

    icon: FaBrain,

    tag: "AI Platform",

    featured: true,

    cover: "/projects/burnout/cover.png",

    screenshots: [
      "/projects/burnout/1.png",
      "/projects/burnout/2.png",
      "/projects/burnout/3.png",
    ],

    features: [
      "Burnout Prediction",
      "Employee Analytics",
      "NLP Processing",
      "Risk Assessment",
      "Interactive Dashboard",
      "Recommendation Engine",
    ],

    github: "",

    demo: "",

    pdf: "/projects/burnout/documentation.pdf",
  },

  {
    title: "Facial & Hand Gesture Recognition",

    desc: "Real-time computer vision system enabling touchless interaction through facial tracking and gesture recognition using advanced image processing.",

    stack: [
      "OpenCV",
      "MediaPipe",
      "Python",
      "TensorFlow",
    ],

    accent: "#06b6d4",

    icon: FaHandPaper,

    tag: "Computer Vision",

    featured: false,

    cover: "/projects/gesture/cover.png",

    screenshots: [
      "/projects/gesture/1.png",
      "/projects/gesture/2.png",
      "/projects/gesture/3.png",
    ],

    features: [
      "Real-time Gesture Recognition",
      "Face Detection",
      "MediaPipe Integration",
      "OpenCV Processing",
      "Touchless Interaction",
      "Accessibility Support",
    ],

    github: "",

    demo: "",

    pdf: "/projects/gesture/documentation.pdf",
  },
  {
  title: "Gamified CTF Challenge Platform",

  desc: "A cloud-native cybersecurity learning platform that delivers interactive Capture The Flag (CTF) challenges through gamified quizzes, leaderboards, and real-time scoring. Deployed on AWS with a scalable full-stack architecture featuring secure authentication, automated CI/CD pipelines, HTTPS encryption, and cloud-native infrastructure.",

  stack: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "AWS EC2",
    "AWS Amplify",
    "Nginx",
    "PM2",
    "JWT",
  ],

  accent: "#22c55e",

  icon: FaShieldAlt,

  tag: "Cloud Computing",

  featured: true,

  cover: "/projects/ctf/cover.png",

  screenshots: [
    "/projects/ctf/1.png",
    "/projects/ctf/2.png",
    "/projects/ctf/3.png",
    "/projects/ctf/4.png",
    "/projects/ctf/5.png",
  ],

  features: [
    "Gamified Capture The Flag Challenges",
    "Secure JWT Authentication",
    "Real-time Leaderboards & Scoring",
    "Hint-Based Challenge System",
    "Challenge Difficulty Filtering",
    "AWS EC2 Backend Deployment",
    "AWS Amplify Frontend Hosting",
    "Nginx Reverse Proxy with SSL",
    "CI/CD Pipeline Integration",
    "Responsive Dashboard & Analytics",
  ],

  github: "",

  demo: "",

  pdf: "/projects/ctf/documentation.pdf",
},

  {
    title: "Mental Health Counselling System",

    desc: "An NLP-powered conversational assistant that provides mental health support, mood tracking, and connects users with professional counselling resources.",

    stack: [
      "React",
      "Node.js",
      "Python",
      "NLP",
    ],

    accent: "#a855f7",

    icon: FaComments,

    tag: "NLP · Healthcare",

    featured: false,

    cover: "/projects/counselling/cover.png",

    screenshots: [
      "/projects/counselling/1.png",
      "/projects/counselling/2.png",
      "/projects/counselling/3.png",
    ],

    features: [
      "AI-powered conversational chatbot",
      "Mood tracking dashboard",
      "Personalized mental wellness recommendations",
      "Secure authentication",
      "Appointment booking support",
      "Responsive UI",
    ],

    github: "",

    demo: "",

    pdf: "/projects/counselling/documentation.pdf",
  },

  {
    title: "IoT Smart Parking System",

    desc: "RFID and sensor-based automated parking management platform with real-time slot monitoring, cloud synchronization, and mobile notifications.",

    stack: [
      "Arduino",
      "NodeMCU",
      "RFID",
      "IoT",
    ],

    accent: "#10b981",

    icon: FaParking,

    tag: "IoT · Embedded",

    featured: false,

    cover: "/projects/parking/cover.png",

    screenshots: [
      "/projects/parking/1.png",
      "/projects/parking/2.png",
      "/projects/parking/3.png",
    ],

    features: [
      "RFID Authentication",
      "Smart Parking Slots",
      "Real-time Monitoring",
      "Cloud Synchronization",
      "Automatic Gate Control",
      "IoT Dashboard",
    ],

    github: "",

    demo: "",

    pdf: "/projects/parking/documentation.pdf",
  },

  {
    title: "AI Fitness & Diet Recommendation System",

    desc: "Machine learning-powered platform that analyzes health metrics, activity levels, and fitness goals to generate personalized workout and nutrition plans.",

    stack: [
      "Python",
      "Machine Learning",
      "Scikit-learn",
      "Flask",
    ],

    accent: "#8b5cf6",

    icon: FaDumbbell,

    tag: "AI · Healthcare",

    featured: true,

    cover: "/projects/fitness/cover.png",

    screenshots: [
      "/projects/fitness/1.png",
      "/projects/fitness/2.png",
      "/projects/fitness/3.png",
    ],

    features: [
      "Workout Recommendation",
      "Diet Planning",
      "BMI Analysis",
      "Fitness Prediction",
      "Progress Tracking",
      "Health Dashboard",
    ],

    github: "",

    demo: "",

    pdf: "/projects/fitness/documentation.pdf",
  },

  {
    title: "Smart Hospital Management System",

    desc: "Enterprise-grade healthcare automation platform featuring patient registration, appointment scheduling, EHR management, billing, pharmacy inventory, laboratory reports, notifications, and administrative dashboards.",

    stack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
    ],

    accent: "#06b6d4",

    icon: FaHospital,

    tag: "Healthcare · Digital Transformation",

    featured: true,

    cover: "/projects/hospital/cover.png",

    screenshots: [
      "/projects/hospital/1.png",
      "/projects/hospital/2.png",
      "/projects/hospital/3.png",
    ],

    features: [
      "Patient Management",
      "Appointment Scheduling",
      "Electronic Health Records",
      "Billing System",
      "Pharmacy Management",
      "Admin Dashboard",
    ],

    github: "",

    demo: "",

    pdf: "/projects/hospital/documentation.pdf",
  },
];

function ProjectCard({
  project,
  index,
  inView,
  onOpen,
}: {
  project: typeof projects[0];
  index: number;
  inView: boolean;
  onOpen: (project: typeof projects[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const ProjectIcon = project.icon;

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
        borderColor: hovered
          ? `${project.accent}44`
          : "rgba(255,255,255,0.06)",
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
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: project.accent,
          opacity: hovered ? 0.1 : 0.03,
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `${project.accent}1a`,
            }}
          >
            <ProjectIcon
              size={24}
              color={project.accent}
            />
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
          style={{
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {project.desc}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
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

        {/* Hover Reveal */}
        <motion.div
          className="mt-4 pt-4 border-t flex items-center justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
  onClick={() => onOpen(project)}
  className="text-xs hover:underline transition-all"
  style={{
    color: project.accent,
    fontFamily: "JetBrains Mono, monospace",
  }}
>
  View Details →
</button>

          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: project.accent,
                  opacity: 0.4 + i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
 const [selectedProject, setSelectedProject] =
  useState<typeof projects[number] | null>(null);
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
    <ProjectCard
      key={project.title}
      project={project}
      index={i}
      inView={inView}
      onOpen={setSelectedProject}
    />
  ))}
</div>
</div>

<ProjectModal
  project={selectedProject}
  onClose={() => setSelectedProject(null)}
/>

</section>
  );
}
