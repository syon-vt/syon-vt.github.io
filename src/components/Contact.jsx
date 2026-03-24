import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight } from 'lucide-react';

function MagneticButton({ children, href, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.45, y: middleY * 0.45 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="min-h-[90vh] w-full flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-[#9900cf]/5 via-transparent to-transparent pointer-events-none blur-[120px]"></div>

      <div className="max-w-4xl w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-sm font-mono tracking-[0.3em] text-[#00F5FF] uppercase mb-8 opacity-80">
            05 — Reached The End
          </h2>
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's<br />Connect
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-20 mt-16 text-slate-400 font-mono text-sm tracking-widest">
            {/* Address Block */}
            <div className="flex flex-col gap-3 min-w-[240px]">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#00F5FF] shrink-0" />
                <span className="text-white/90">Vellore, Tamil Nadu, 632014</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 opacity-70">
                <div className="w-4 shrink-0" /> {/* Icon spacer */}
                <span className="text-[10px] md:text-xs">Thrissur, Kerala, 680712</span>
              </div>
            </div>

            {/* Separator - Hidden on mobile */}
            <span className="hidden md:inline-block w-px h-12 bg-white/10 self-center"></span>

            {/* Phone Block */}
            <div className="flex items-center gap-3 min-w-[240px] h-fit">
              <Phone size={16} className="text-[#00F5FF] shrink-0" />
              <a href="tel:+919544717407" className="hover:text-[#00F5FF] transition-colors text-white/90">+91 9544717407</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 flex flex-wrap justify-center gap-6"
        >
          <MagneticButton
            href="mailto:17407syon@gmail.com"
            className="group flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-[#131313] hover:bg-white hover:text-black transition-colors duration-500"
          >
            <Mail size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Email</span>
          </MagneticButton>

          <MagneticButton
            href="https://github.com/syon-vt"
            className="group flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-[#131313] hover:bg-white hover:text-black transition-colors duration-500"
          >
            <Github size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Github</span>
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/syon-vijae-thyvalappil-b551b73a7/"
            className="group flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-[#131313] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-black transition-colors duration-500"
          >
            <Linkedin size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
}
