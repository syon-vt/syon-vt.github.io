import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Bot, CalendarDays } from 'lucide-react';
import gdgIcon from '../assets/gdg.png';
import vinIcon from '../assets/vin.png';
import ieeeIcon from '../assets/ieee.jpeg';

export default function BentoGrid({ openModal }) {
  const experiences = [
    {
      id: "gdg",
      title: "Google Developer Groups",
      role: "Inner Junior Core - Tech (Python)",
      desc: "Incoming Junior Core member for the Python technical domain.",
      color: "from-emerald-400/20 to-green-500/5",
      iconColor: "text-emerald-400",
      icon: Terminal,
      img: gdgIcon
    },
    {
      id: "vinnovateit",
      title: "VinnovateIT",
      role: "Junior Core - Tech (AI/ML)",
      desc: "Contributing to the transition of the campus mess management app messIT into a web-based platform.",
      color: "from-[#bf9bf2]/20 to-[#bf9bf2]/5",
      iconColor: "text-[#bf9bf2]",
      icon: Bot,
      img: vinIcon
    },
    {
      id: "ieee",
      title: "IEEE Computer Society",
      role: "Junior Core - Management (Events)",
      desc: "Assisted in the preparation and execution of chapter events during the Riviera cultural festival.",
      color: "from-[#f9a31a]/20 to-[#f9a31a]/5",
      iconColor: "text-[#f9a31a]",
      icon: CalendarDays,
      img: ieeeIcon
    }
  ];

  return (
    <section id="experience" className="lg:h-full flex-shrink-0 lg:w-screen w-full flex items-center justify-center p-6 md:p-24 md:py-12 border-b lg:border-b-0 lg:border-r border-white/5 relative">
      <div className="max-w-6xl w-full py-12 lg:py-0">
        <div className="mb-8">
          <h2 className="text-sm font-mono tracking-[0.3em] text-[#00F5FF] uppercase mb-4 opacity-80">
            02 — Experience
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Club Involvement
          </h3>
        </div>

        {/* Removed fixed h-[500px] and used dynamic grid mapping for responsive heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(exp.id)} 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="card-spotlight-effect glass-card group relative overflow-hidden flex flex-col justify-start gap-8 min-h-[400px] p-8 transition-all hover:-translate-y-2 hover:border-white/20 cursor-pointer"
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-radial ${exp.color} blur-[60px] opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none`}></div>
              
              <div className="card-content-relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#131313] border border-white/10 shadow-inner flex items-center justify-center overflow-hidden">
                    {exp.img ? (
                      <img src={exp.img} alt={exp.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <exp.icon size={24} className={exp.iconColor} />
                    )}
                  </div>
                  <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    0{idx + 1}
                  </span>
                </div>
                
                <h4 className="text-2xl font-bold text-white tracking-tight mb-2">
                  {exp.title}
                </h4>
                <p className={`font-mono text-sm tracking-wide mb-6 ${exp.iconColor}`}>
                  {exp.role}
                </p>
              </div>

              <div className="card-content-relative border-t border-white/5 pt-6 mt-6 shrink-0">
                <p className="text-slate-400 leading-relaxed font-light">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
