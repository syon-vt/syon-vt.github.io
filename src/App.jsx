import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Education from './components/Education'
import BentoGrid from './components/BentoGrid'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Contact from './components/Contact'

function App() {
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
        
        <footer className="border-t border-white/5 py-8 text-center bg-slate-950">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Syon Vijae Thyvalappil. Built with React & Tailwind CSS.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
