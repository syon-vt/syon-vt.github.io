import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, BookOpen, Briefcase, GraduationCap, LayoutGrid, Mail, FileText } from 'lucide-react';

function DockIcon({ mouseX, item, activeSection, scrollTo }) {
  const ref = useRef(null);

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

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size, y }}
      onClick={() => scrollTo(item.id)}
      className={`relative group rounded-full transition-colors flex items-center justify-center shrink-0 ${activeSection === item.id ? 'bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30' : 'hover:bg-white/10 text-slate-400 bg-transparent'}`}
      aria-label={item.label}
    >
      <item.icon size={20} className={`transition-colors ${activeSection === item.id ? 'text-[#00F5FF]' : 'group-hover:text-[#00F5FF]'}`} />
      
      <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#131313] border border-white/10 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {item.label}
      </span>
    </motion.button>
  );
}

export default function Navigation({ activeSection }) {
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
    if (window.lenisScrollTo) {
      if (id === 'hero' || id === 'contact' || id === 'resume') {
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
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Defined strict height bounds to force hovering items to cleanly overflow downward out of the box vertically */}
      <div 
        className="flex items-start gap-2 px-3 pt-[10px] h-[64px] rounded-full glass-card bg-[#191919]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {navItems.map((item) => (
          <DockIcon key={item.id} mouseX={mouseX} item={item} activeSection={activeSection} scrollTo={scrollTo} />
        ))}
      </div>
    </motion.nav>
  );
}
