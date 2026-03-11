import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Education from './components/Education'
import BentoGrid from './components/BentoGrid'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Contact from './components/Contact'
import { Github, Linkedin } from 'lucide-react';


function App() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/repos/syon-vt/syon-vt.github.io')
      .then(res => res.json())
      .then(data => {
        if (data.pushed_at) {
          const date = new Date(data.pushed_at);
          setLastUpdated(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        }
      })
      .catch(err => console.error("Could not fetch repo data:", err));
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-cyan-500/30">
      {/* Subtle background glow effect over the dark slate background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 font-sans">
        <Navigation />
        <main>
          <Hero />
          <Education />
          <BentoGrid />
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </main>

        <footer className="py-10 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="https://github.com/syon-vt" className="hover:text-cyan-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/syon-vt" className="hover:text-cyan-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-slate-500 text-xs font-mono mb-2">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} — Syon Vijae</span>
              <div className="relative flex h-2 w-2 group cursor-pointer">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-emerald-400 text-[10px] rounded border border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Open to internships
                </div>
              </div>
            </div>
            {lastUpdated && <span>Last updated: {lastUpdated}</span>}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
