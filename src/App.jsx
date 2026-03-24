import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Education from './components/Education';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Modals from './components/Modals';
import Resume from './components/Resume';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const horizontalRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastUpdated, setLastUpdated] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  // Fetch last updated from GitHub API
  useEffect(() => {
    fetch('https://api.github.com/repos/syon-vt/syon-vt.github.io')
      .then(res => res.json())
      .then(data => {
        if (data.pushed_at) {
          const date = new Date(data.pushed_at);
          // Changed to Month Year format
          setLastUpdated(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
        }
      })
      .catch(() => setLastUpdated('Recently'));
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
    });

    lenis.on('scroll', ScrollTrigger.update);

    lenis.on('scroll', (e) => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      if (scrollY < vh * 0.5) setActiveSection('hero');
      else if (scrollY > document.body.scrollHeight - vh * 1.5) setActiveSection('contact');
    });

    window.lenisScrollTo = (target) => {
      lenis.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    };

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    // Detect if the device has hover capabilities (desktop) vs touch (mobile)
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const horizontalScroll = horizontalRef.current;
      if (horizontalScroll) {
        const totalScroll = horizontalScroll.scrollWidth - window.innerWidth;
        
        ScrollTrigger.create({
          trigger: ".horizontal-view-trigger",
          pin: true,
          start: "top top",
          end: () => `+=${totalScroll * 0.8}`,
          animation: gsap.to(horizontalScroll, {
            x: -totalScroll,
            ease: "none"
          }),
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.25) setActiveSection('education');
            else if (progress < 0.50) setActiveSection('experience');
            else if (progress < 0.75) setActiveSection('projects');
            else setActiveSection('tech');
          },
          invalidateOnRefresh: true
        });
      }
    });

    // Vertical flow for tablets and mobile
    mm.add("(max-width: 1023px)", () => {
      const sections = ['hero', 'education', 'experience', 'projects', 'tech', 'resume', 'contact'];
      sections.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      mm.revert();
    };
  }, []);

  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setShowCursor(window.matchMedia('(hover: hover)').matches && window.innerWidth >= 1024);
  }, []);

  return (
    <div className="min-h-screen relative bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30">
      
      {showCursor && (
        <>
          <motion.div 
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#00F5FF] shadow-[0_0_15px_#00F5FF] pointer-events-none z-[99999]"
            animate={{ 
              x: mousePosition.x - 8, 
              y: mousePosition.y - 8 
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, rgba(189, 0, 255, 0.02) 40%, rgba(0, 0, 0, 0) 70%)'
            }}
            animate={{ 
              x: mousePosition.x - 300, 
              y: mousePosition.y - 300 
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
          />
        </>
      )}

      <Navigation activeSection={activeSection} />
      <Modals activeModal={activeModal} onClose={() => setActiveModal(null)} />
      
      <main>
        <Hero />

        <div className="horizontal-view-trigger lg:h-screen w-full relative lg:overflow-hidden">
          <div ref={horizontalRef} className="horizontal-scroll-container lg:h-full flex flex-col lg:flex-row lg:items-center w-full lg:w-max">
            <Education openModal={setActiveModal} />
            <BentoGrid openModal={setActiveModal} />
            <Projects />
            <Skills />
          </div>
        </div>

        <div className="relative z-10 bg-[#050505]">
          <Resume />
          <Contact />
        </div>
      </main>

      <footer className="py-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between px-8 md:px-24 text-slate-500 text-sm font-mono relative z-20 bg-[#050505] text-center md:text-left">
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap">© {new Date().getFullYear()} — Syon Vijae</p>
          <div className="group flex items-center gap-2 cursor-pointer transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 px-2 py-0.5 rounded-md border border-white/10 whitespace-nowrap">Open for Opportunities</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <span className="text-xs">
            Last Updated: <span className="text-white/80">{lastUpdated}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
