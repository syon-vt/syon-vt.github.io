import React from 'react';
import { Target, Cpu, Activity, CreditCard } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Automated UPI Payment Tracker",
      description: "Built an automation tool that parses UPI transaction notifications via the Pipedream API to sync financial data to a custom dashboard.",
      icon: CreditCard,
      tags: ["Python", "Flask", "Pipedream API"],
      color: "text-[#00F5FF]",
      border: "border-[#00F5FF]/40",
      visual: "from-[#00F5FF]/10"
    },
    {
      title: "IoT Smart Agriculture System",
      description: "Designing an environmental monitoring prototype using an ESP32 and sensors, integrated with a Python server for data collection and prediction using ML models.",
      icon: Cpu,
      tags: ["ESP32", "Python", "ML"],
      color: "text-[#9900cf]",
      border: "border-[#9900cf]/40",
      visual: "from-[#9900cf]/10"
    }
  ];

  return (
    <section id="projects" className="lg:h-full flex-shrink-0 lg:w-screen w-full h-auto flex items-center justify-center p-6 md:p-24 border-b lg:border-b-0 lg:border-r border-white/5 relative">
      <div className="max-w-6xl w-full py-12 lg:py-0">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-sm font-mono tracking-[0.3em] text-[#00F5FF] uppercase mb-4 opacity-80">
              03 — Output
            </h2>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Selected Works
            </h3>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="card-spotlight-effect glass-card group relative w-full lg:w-1/2 min-h-[400px] flex flex-col overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Removed structural fake image layer. Added sleek gradient border top instead. */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.visual} to-transparent`}></div>
              
              <div className="card-content-relative p-10 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-[#131313] border border-white/10 flex items-center justify-center shrink-0`}>
                      <project.icon size={26} className={project.color} />
                    </div>
                    <h4 className="text-3xl font-bold text-white tracking-tight leading-tight pr-4">
                      {project.title}
                    </h4>
                  </div>
                  
                  <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 pt-4">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1.5 bg-[#131313] border border-white/10 ${project.color} text-xs font-mono tracking-wider rounded-md bg-opacity-30`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
