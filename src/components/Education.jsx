import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Education
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-6 md:p-12 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <GraduationCap size={160} />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">B.Tech Computer Science Engineering</h3>
              <p className="text-xl text-slate-300 font-medium">Vellore Institute of Technology</p>
            </div>
            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg shrink-0 font-medium">
              2025 - 2029 (Ongoing)
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="text-cyan-400 shrink-0" size={24} />
                <h4 className="text-lg font-semibold text-white">Key Achievements</h4>
              </div>
              <div className="pl-9 space-y-3">
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white font-medium">Finalist Coordinator:</strong> Code2Create 48-Hour Hackathon (ACM VIT).
                </p>
                <p className="text-slate-400 text-sm">
                  Developed a local-first AI assistant with visual context-awareness via automated screen capture.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="text-cyan-400 shrink-0" size={24} />
                <h4 className="text-lg font-semibold text-white">Relevant Coursework</h4>
              </div>
              <ul className="pl-9 space-y-2 text-slate-300 list-disc list-outside">
                <li>Object-Oriented Programming (C++)</li>
                <li>Python Development</li>
                <li>Digital Logic & Design</li>
                <li>Computer Hardware</li>
                <li>Discrete Mathematics</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
