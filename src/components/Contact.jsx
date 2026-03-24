import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight } from 'lucide-react';

function MagneticButton({ children, href, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
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
          <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's Build<br />The Future.
          </h3>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16 text-slate-400 font-mono text-sm tracking-widest">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#00F5FF]" />
              <span>Vellore, Tamil Nadu, 632014</span>
            </div>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#00F5FF]" />
              <a href="tel:+919544717407" className="hover:text-white transition-colors">+91 9544717407</a>
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
            className="group flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-[#131313] hover:bg-[#00F5FF] hover:border-[#00F5FF] hover:text-black transition-colors duration-500"
          >
            <Linkedin size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
}
