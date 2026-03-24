import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ openModal }) {
  return (
    <section id="education" className="lg:h-full flex-shrink-0 lg:w-screen w-full h-auto flex items-center justify-center p-6 md:p-24 border-b lg:border-b-0 lg:border-r border-white/5 relative">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-sm font-mono tracking-[0.3em] text-[#00F5FF] uppercase mb-4 opacity-80">
            01 — Background
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Education
          </h3>
        </div>

        <motion.div 
          onClick={() => openModal('vit')}
          whileTap={{ scale: 0.98 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }}
          className="card-spotlight-effect glass-card p-10 md:p-14 group transition-colors duration-500 hover:border-[#00F5FF]/30 cursor-pointer"
        >
          <div className="card-content-relative flex flex-col md:flex-row justify-between gap-8 border-b border-white/10 pb-10 mb-10">
            <div>
              <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">B.Tech Computer Science</h4>
              <p className="text-xl text-slate-400 font-serif italic">Vellore Institute of Technology</p>
            </div>
            <div className="flex items-start">
              <span className="px-4 py-2 bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 rounded-full text-sm font-mono tracking-wider">
                2025 - 2029
              </span>
            </div>
          </div>

          <div className="card-content-relative grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-white tracking-wide">Key Achievements</h5>
              <div className="space-y-4 group-hover:text-white transition-colors text-slate-400">
                <p className="leading-relaxed">
                  <strong className="text-[#00F5FF] font-medium mr-2">Finalist Coordinator:</strong> 
                  Code2Create 48-Hour Hackathon (ACM VIT).
                </p>
                <p className="leading-relaxed text-sm border-l border-[#00F5FF]/30 pl-4 py-1">
                  Developed a local-first AI assistant with visual context-awareness via automated screen capture.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-white tracking-wide">Relevant Coursework</h5>
              <ul className="space-y-3 text-slate-400 group-hover:text-white transition-colors font-mono text-sm leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/50 blur-[1px]"></span>
                  Intro to Python & Computation Structures
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/50 blur-[1px]"></span>
                  Discrete Math & Linear Algebra
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/50 blur-[1px]"></span>
                  OOPS & Data Structures And Algorithms
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]/50 blur-[1px]"></span>
                  Operating Systems
                </li>
                <li className="flex items-center gap-3 opacity-50 italic">
                  <span>+ View more inside card target</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
