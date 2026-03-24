import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Download } from 'lucide-react';
import resumeImg from '../assets/resume.jpg';
import resumePdf from '../assets/resume.pdf';

const baseClasses = "relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[#00F5FF] font-bold rounded-full transition-all duration-300 shrink-0 md:w-auto z-10 cursor-pointer w-full md:w-auto overflow-hidden";

const MagneticSlideDownload = ({ href }) => {
  const ref = useRef(null);
  
  // Track continuous physical offset distances natively
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Bind rigid tracking offsets to elastic, bouncy spring physics inherently dampened per user command
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download="Syon_Vijae_Thyvalappil_Resume.pdf"
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        // Computations dampened to 0.15 (15%) for a "slight" magnetic drag effect
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * 0.15); 
        y.set((e.clientY - (top + height / 2)) * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${baseClasses} group hover:bg-[#00F5FF]/20 hover:shadow-[0_10px_30px_rgba(0,245,255,0.15)]`}
    >
      <div className="relative z-10 flex items-center gap-3 w-full h-full pointer-events-none">
        <div className="relative overflow-hidden flex items-center justify-center w-5 h-5">
          <Download size={20} className="stroke-[2.5px] absolute transition-transform duration-300 group-hover:translate-y-full opacity-100 group-hover:opacity-0" />
          <Download size={20} className="stroke-[2.5px] absolute transition-transform duration-300 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 text-white" />
        </div>
        <span className="group-hover:text-white transition-colors duration-300">Download PDF</span>
      </div>
    </motion.a>
  );
};

export default function Resume() {
  const RESUME = {
    pdf: resumePdf,
    img: resumeImg
  }

  const imgRef = useRef(null);
  
  // Isolate magnetic interactions specifically for the main Image bounds natively
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);

  // Heavier damping algorithm for large blocks to establish extremely subtle, massive inertia
  const springImgX = useSpring(imgX, { stiffness: 100, damping: 25, mass: 1 });
  const springImgY = useSpring(imgY, { stiffness: 100, damping: 25, mass: 1 });

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

          <MagneticSlideDownload href={RESUME.pdf} />
        </motion.div>

        {/* Embedded 3D perspective to enable cinematic flip-up animations instead of dull linear rising */}
        <div style={{ perspective: 1000 }}>
          {/* Outer component governs absolute 3D rendering bounds dynamically bypassing inner-layer interactions natively */}
          <motion.div
            initial={{ opacity: 0, rotateX: 25, y: 150, scale: 0.95 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full"
          >
            {/* Inner responsive tracker bounds intercepting extremely subtle 2% magnetic elasticity locally */}
            <motion.div
              ref={imgRef}
              style={{ x: springImgX, y: springImgY }}
              onMouseMove={(e) => {
                const { left, top, width, height } = imgRef.current.getBoundingClientRect();
                imgX.set((e.clientX - (left + width / 2)) * 0.02); // 2% micro-shift
                imgY.set((e.clientY - (top + height / 2)) * 0.02);
              }}
              onMouseLeave={() => {
                imgX.set(0);
                imgY.set(0);
              }}
              whileHover={{ boxShadow: "0 30px 60px rgba(0, 245, 255, 0.1)" }}
              className="w-full glass-card overflow-hidden relative border border-white/10 flex justify-center bg-slate-900/50 cursor-pointer rounded-[2rem]"
            >
              <img
                src={RESUME.img}
                alt="Resume"
                className="w-full h-auto object-contain max-h-[80vh] md:max-h-[1000px] shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
