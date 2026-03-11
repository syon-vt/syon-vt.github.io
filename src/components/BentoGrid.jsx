import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Bot, Server, Terminal, Monitor, Code2, Users, Calendar, icons } from 'lucide-react';
import gdgIcon from '../assets/gdg.png';
import vinIcon from '../assets/vin.png';
import ieeeIcon from '../assets/ieee.jpeg';

export default function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const CLUB_ICONS = {
    gdg: gdgIcon,
    vin: vinIcon,
    ieee: ieeeIcon
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
          Club Involvement
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Club Card 1 - GDG */}
        <motion.div variants={item} className="glass-card p-6 md:p-8 flex flex-col justify-between group h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-green-500/10"></div>
          <div className="relative z-10 flex flex-col h-full">
            <img src={CLUB_ICONS.gdg} alt="gdg" className="w-15 h-15 rounded-2xl bg-slate-800/80 border border-white/5 shadow-inner flex items-center justify-center mb-6" />
            <h3 className="text-xl font-bold text-white mb-1">Google Developer Groups (GDG)</h3>
            <p className="text-green-400 font-medium text-sm mb-4">Inner Junior Core - Tech (Python)</p>
            <p className="text-slate-300/80 text-sm mt-auto leading-relaxed">
              Incoming Junior Core member for the Python technical domain.
            </p>
          </div>
        </motion.div>

        {/* Club Card 2 - VinnovateIT */}
        <motion.div variants={item} className="glass-card p-6 md:p-8 flex flex-col justify-between group h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10"></div>
          <div className="relative z-10 flex flex-col h-full">

            <img src={CLUB_ICONS.vin} alt="VinnovateIT" className="w-15 h-15 rounded-2xl bg-slate-800/80 border border-white/5 shadow-inner flex items-center justify-center mb-6" />

            <h3 className="text-xl font-bold text-white mb-1">VinnovateIT</h3>
            <p className="text-blue-400 font-medium text-sm mb-4">Junior Core - Tech (AI/ML)</p>
            <p className="text-slate-300/80 text-sm mt-auto leading-relaxed">
              Contributing to the transition of the campus mess management app messIT into a web-based platform.
            </p>
          </div>
        </motion.div>

        {/* Club Card 3 - IEEE CS */}
        <motion.div variants={item} className="glass-card p-6 md:p-8 flex flex-col justify-between group h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/10"></div>
          <div className="relative z-10 flex flex-col h-full">
            <img src={CLUB_ICONS.ieee} alt="" className="w-15 h-15 rounded-2xl bg-slate-800/80 border border-white/5 shadow-inner flex items-center justify-center mb-6" />
            <h3 className="text-xl font-bold text-white mb-1">IEEE Computer Society</h3>
            <p className="text-purple-400 font-medium text-sm mb-4">Junior Core - Management (Events)</p>
            <p className="text-slate-300/80 text-sm mt-auto leading-relaxed">
              Assisted in the preparation and execution of chapter events during the Riviera cultural festival.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
