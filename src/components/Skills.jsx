import React from 'react';
import { Network, Database, Server } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Core Languages",
      icon: Network,
      color: "text-[#00F5FF]",
      border: "border-[#00F5FF]/30",
      skills: ["Python", "C/C++", "Flask", "JavaScript/React"]
    },
    {
      title: "Systems & Infrastructure",
      icon: Database,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      skills: ["Linux (Ubuntu/Kali/WSL)", "Headless Server Deployment", "Hardware Optimization", "Socket Programming (IRC)", "Nmap"]
    },
    {
      title: "Emerging Tech",
      icon: Server,
      color: "text-[#9900cf]",
      border: "border-purple-500/30",
      skills: ["Local AI/LLM Integration", "ESP32/IoT Prototype", "Data Collection & ML Preds"]
    }
  ];

  return (
    <section id="tech" className="h-full flex-shrink-0 w-screen flex items-center justify-center p-8 md:p-24 border-r border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#00F5FF]/5 via-transparent to-transparent pointer-events-none blur-[100px]"></div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono tracking-[0.3em] text-[#00F5FF] uppercase mb-4 opacity-80">
            04 — Toolkit
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Technical Capabilities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className={`card-spotlight-effect glass-card p-8 group transition-all duration-500 hover:scale-[1.02] border-t-2 ${category.border}`}
            >
              <div className="card-content-relative flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${category.color}`}>
                    <category.icon size={24} />
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight">{category.title}</h4>
                </div>

                <ul className="space-y-4 font-mono text-sm tracking-wide text-slate-400 mt-2">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3">
                      <span className={`w-[2px] h-[10px] bg-current ${category.color}`}></span>
                      <span className="group-hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
