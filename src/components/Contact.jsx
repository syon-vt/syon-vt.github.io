import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';


export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Get In Touch
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Always open for potential oppurtunities and collaborations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 md:p-8 flex flex-col justify-center space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Phone className="text-cyan-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Phone</p>
              <a href="tel:+919544717407" className="text-white text-lg hover:text-cyan-400 transition-colors">
                +91 9544717407
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Mail className="text-cyan-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Email</p>
              <a href="mailto:17407syon@gmail.com" className="text-white text-lg hover:text-cyan-400 transition-colors">
                17407syon@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 md:p-8 flex flex-col justify-between"
        >
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="text-slate-300" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Current Location</p>
                <p className="text-white">PO. 632014, Vellore, Tamil Nadu</p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-slate-400 font-medium">Permanent Location</p>
                  <p className="text-slate-300 text-sm mt-1">PO. 680712, Thrissur, Kerala</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <a href="https://github.com/syon-vt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:border-white/30 transition-all">
              <Github size={20} />
              <span className="font-medium">syon-vt</span>
            </a>
            <a href="https://www.linkedin.com/in/syon-vijae-thyvalappil-b551b73a7/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:border-white/30 transition-all">
              <Linkedin size={20} />
              <span className="font-medium">Syon Vijae</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
