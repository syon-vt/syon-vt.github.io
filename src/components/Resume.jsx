import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-white/5">
      <div className="flex flex-col gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Resume
            </h2>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Syon_Vijae_Thyvalappil_Resume.pdf"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] shrink-0 w-full md:w-auto"
          >
            <Download size={20} className="stroke-[2.5px]" />
            Download PDF
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full glass-card overflow-hidden relative border border-white/10 flex justify-center bg-slate-900/50"
        >
          <img
            src="/resume.jpg"
            alt="Resume"
            className="w-full h-auto object-contain max-h-[80vh] md:max-h-[1000px] rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
