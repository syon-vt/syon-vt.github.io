import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, MonitorSmartphone, Wifi, CreditCard } from 'lucide-react';

const projects = [
  {
    title: "Automated UPI Payment Tracker",
    description: "Built an automation tool that parses UPI transaction notifications via the Pipedream API to sync financial data to a custom dashboard.",
    icon: CreditCard,
    tags: ["Python", "Flask", "Pipedream API"],
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },
  {
    title: "IoT Smart Agriculture System",
    description: "Designing an environmental monitoring prototype using an ESP32 and sensors, integrated with a Python server for data collection and prediction using ML models.",
    icon: Wifi,
    tags: ["ESP32", "Python", "ML"],
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
          Selected Projects
        </h2>
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card group overflow-hidden"
          >
            <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-inner hidden md:block">
                <project.icon size={32} className={project.iconColor} />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="#" className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href="#" className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800/80 border border-white/5 text-slate-300 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
