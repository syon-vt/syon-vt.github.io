import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Languages",
    items: ["Python", "C", "C++", "Flask"]
  },
  {
    category: "Technical Interests",
    items: ["Local AI/LLM Integration", "Socket Programming (IRC)", "Nmap", "ESP32/IoT"]
  },
  {
    category: "Systems",
    items: ["Linux Administration (Ubuntu/Kali/WSL)", "Headless Server Deployment", "Hardware Optimization"]
  }
];

export default function Skills() {
  return (
    <section id="tech" className="max-w-6xl mx-auto px-4 py-24 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Continuously expanding my toolset to build robust, scalable, and beautiful applications.
          </p>
        </motion.div>

        <div className="space-y-8">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-cyan-500/50"></span>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2 pl-11">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-slate-900 border border-white/5 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
