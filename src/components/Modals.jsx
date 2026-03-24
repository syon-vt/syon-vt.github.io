import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, Users, Github } from 'lucide-react';

// Reusable micro-magnetic wrapper for small elements like icons and tags
function MagneticElement({ children, distance = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * distance);
    y.set((clientY - (top + height / 2)) * distance);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const modalData = {
  vinnovateit: {
    title: "VinnovateIT",
    role: "Junior Core - Tech (AI/ML)",
    color: "from-[#bf9bf2]/20 to-transparent",
    primaryColor: "text-[#bf9bf2]",
    dotColor: "bg-[#bf9bf2]",
    details: [
      { label: "Phase 1: Technical Quiz", desc: "Demonstrated fundamental knowledge in ML models and problem-solving." },
      { label: "Phase 2: Technical Task", desc: "Developed an AI integration task using ollama and Flask.", link: "https://github.com/syon-vt/VinnovateIT-AIML-Hub", linkText: "View GitHub Repo" },
      { label: "Phase 3: Technical Interview", desc: "Cleared a technical interview regarding the task along with a live demonstration and Q&A with the current Technical Head of the club." }
    ]
  },
  gdg: {
    title: "Google Developer Groups",
    role: "Inner Junior Core - Tech (Python)",
    color: "from-emerald-400/20 to-transparent",
    primaryColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    details: [
      { label: "Phase 1: Technical Quiz", desc: "Python algorithmic screening and API development concepts." },
      { label: "Phase 2: Technical Task", desc: "Built a custom IRC chat client using Python and the open libera chat network.", link: "https://github.com/syon-vt/GDG-Rec", linkText: "View GitHub Repo" },
      { label: "Phase 3: Technical Interview", desc: "Cleared a technical interview regarding the task along with a live demonstration and Q&A." },
      { label: "Phase 4: Board Interview", desc: "Cleared the interview with all Board members present." }
    ]
  },
  ieee: {
    title: "IEEE Computer Society",
    role: "Junior Core - Management (Events)",
    color: "from-[#f9a31a]/20 to-transparent",
    primaryColor: "text-[#f9a31a]",
    dotColor: "bg-[#f9a31a]",
    details: [
      { label: "Phase 1: Questionnaire", desc: "Event conceptualization and logistical planning scenarios." },
      { label: "Phase 2: Group Discussion", desc: "Demonstrated leadership and problem solving skills for a test scenario." },
      { label: "Phase 3: Interview", desc: "Cleared the interview with Senior Core members present." }
    ]
  },
  vit: {
    title: "Vellore Institute of Technology",
    role: "B.Tech Computer Science (2025 - 2029)",
    color: "from-white/20 to-transparent",
    primaryColor: "text-white",
    dotColor: "bg-white",
    details: [
      { label: "Code2Create 48-Hour Hackathon", desc: "Developed a local-first AI assistant functioning seamlessly offline. Orchestrated system architecture capturing screen context via local OCR processing." },
      { label: "Semester 1 Coursework", desc: "Introduction to Python, Computation Structures, Applied Chemistry, Integral Calculus and Differential Equations, Basic Engineering (Electrical & Mechanical)." },
      { label: "Semester 2 Coursework", desc: "Object Oriented & Structured Programming, Operating Systems, Data Structures And Algorithms, Discrete Mathematics and Linear Algebra, Engineering Physics (Quantum Mechanics), Technical English Communication." }
    ]
  }
};

export default function Modals({ activeModal, onClose }) {
  const data = activeModal ? modalData[activeModal] : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  return (
    <AnimatePresence>
      {activeModal && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex justify-center items-start overflow-y-auto pt-10 pb-20 px-4 md:pt-12 md:pb-12"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={onClose}></div>

          {/* Content Modal */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`relative w-full max-w-4xl bg-[#111] border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden glass-card my-auto md:my-0 min-h-screen md:min-h-0`}
          >
            {/* Top Abstract Glow */}
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${data.color} opacity-40 pointer-events-none`}></div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 group"
            >
              <MagneticElement distance={0.5} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <X size={20} className="text-white" />
                </motion.div>
              </MagneticElement>
            </button>

            <div className="p-8 md:p-16 relative z-10 text-left">
              <div className="max-w-[calc(100%-3rem)] md:max-w-none">
                <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter pr-4 md:pr-0" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{data.title}</h2>
                <p className={`font-mono tracking-wide mb-12 ${data.primaryColor} pr-4 md:pr-0`}>{data.role}</p>
              </div>

              <div className="mt-12 ml-1 border-l border-white/10">
                {data.details.map((item, idx) => (
                  <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                    <div className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full ${data.dotColor}`}></div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-slate-400 font-light leading-relaxed mb-3">{item.desc}</p>

                    {item.link && (
                      <MagneticElement distance={0.2} className="inline-block mt-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:bg-white hover:text-black transition-colors"
                        >
                          <Github size={14} />
                          {item.linkText}
                          <ExternalLink size={12} className="ml-1 opacity-50" />
                        </a>
                      </MagneticElement>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
