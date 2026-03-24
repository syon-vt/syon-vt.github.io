import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Briefcase, GraduationCap, LayoutGrid, Mail, FileText, Menu, X } from 'lucide-react';

function DockIcon({ mouseX, item, activeSection, scrollTo }) {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Measure X distance from cursor to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Balanced dynamic bounds for subtle macOS pop-out tracking (max 56px instead of 72px)
  const sizeSync = useTransform(distance, [-100, 0, 100], [44, 56, 44]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 200, damping: 18 });
  
  // Extremely gentle downward translation so the dock doesn't bulge terrifyingly into the container
  const ySync = useTransform(distance, [-100, 0, 100], [0, 6, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 200, damping: 18 });

  const finalSize = isMobile ? 40 : size;
  const finalY = isMobile ? 0 : y;

  return (
    <motion.button
      ref={ref}
      style={{ width: finalSize, height: finalSize, y: finalY }}
      whileTap={{ scale: 0.9 }}
      onClick={() => scrollTo(item.id)}
      className={`relative group rounded-full transition-colors flex items-center justify-center shrink-0 ${activeSection === item.id ? 'bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30' : 'hover:bg-white/10 text-slate-400 bg-transparent'}`}
      aria-label={item.label}
    >
      <item.icon size={isMobile ? 18 : 20} className={`transition-colors ${activeSection === item.id ? 'text-[#00F5FF]' : 'group-hover:text-[#00F5FF]'}`} />
      
      {!isMobile && (
        <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#131313] border border-white/10 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {item.label}
        </span>
      )}
    </motion.button>
  );
}

export default function Navigation({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'tech', label: 'Skills', icon: BookOpen },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id) => {
    setIsOpen(false);
    if (window.lenisScrollTo) {
      if (id === 'hero' || id === 'contact' || id === 'resume' || window.innerWidth < 1024) {
        window.lenisScrollTo(`#${id}`);
      } else {
        const pinContainer = document.querySelector('.horizontal-view-trigger');
        const targetSection = document.getElementById(id);
        const scrollContainer = document.querySelector('.horizontal-scroll-container');
        
        if (!pinContainer || !targetSection || !scrollContainer) return;
        
        const containerLeft = scrollContainer.getBoundingClientRect().left;
        const sectionLeft = targetSection.getBoundingClientRect().left;
        const offsetLeft = sectionLeft - containerLeft;
        
        const pinTop = pinContainer.offsetTop;
        const targetScroll = pinTop + offsetLeft;
        
        window.lenisScrollTo(targetScroll);
      }
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mouseX = useMotionValue(Infinity);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-6 left-6 z-[110]">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-2xl glass-card bg-[#191919]/80 backdrop-blur-xl border border-white/10 shadow-lg text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[105] bg-[#050505]/80 backdrop-blur-[40px] border-r border-white/10 flex flex-col items-center justify-center gap-8 shadow-[20px_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col items-center gap-10">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => scrollTo(item.id)}
                  className="group relative flex flex-col items-center gap-2"
                >
                  <div className={`flex items-center gap-4 text-3xl font-bold tracking-tighter transition-all duration-300 ${activeSection === item.id ? 'text-[#00F5FF]' : 'text-slate-400 group-hover:text-white'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <item.icon size={32} className={activeSection === item.id ? 'text-[#00F5FF]' : 'text-slate-500 group-hover:text-[#00F5FF] transition-colors'} />
                    {item.label}
                  </div>
                  {activeSection === item.id && (
                    <motion.div layoutId="activeNav" className="absolute -bottom-2 w-12 h-1 bg-[#00F5FF] rounded-full shadow-[0_0_10px_#00F5FF]" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dock */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw]"
      >
        <div 
          className="flex items-start gap-2 px-3 pt-[10px] h-[64px] rounded-full glass-card bg-[#191919]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] !overflow-visible"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {navItems.map((item) => (
            <DockIcon key={item.id} mouseX={mouseX} item={item} activeSection={activeSection} scrollTo={scrollTo} />
          ))}
        </div>
      </motion.nav>
    </>
  );
}
