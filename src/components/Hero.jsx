import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="about" className="min-h-[100svh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-16 md:py-32">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
          Syon Vijae Thyvalappil
        </h1>

        <h2 className="text-xl md:text-3xl font-medium text-cyan-500 mb-8 font-sans tracking-wide">
          Computer Science Student
        </h2>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Computer Science student at VIT Vellore and Code2Create Finalist. Junior Core member at VinnovateIT, currently contributing to the web migration of campus applications. Focused on Python automation, local AI implementation, and systems optimization.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 flex gap-4 justify-center"
        >
          <a href="#projects" className="px-6 py-3 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-200 transition-colors">
            View Work
          </a>
          <a href="#contact" className="px-6 py-3 glass-card text-white hover:bg-white/10 transition-colors">
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
