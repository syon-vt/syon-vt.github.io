import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Clubs', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#tech' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent pt-6 md:pt-4 pb-16 px-4 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto flex justify-start md:justify-center items-center relative pointer-events-auto">
          {/* Desktop Nav */}
          <nav className="glass-card px-8 py-3 w-max hidden md:block rounded-full">
            <ul className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.name} className="relative">
                    <a
                      href={item.href}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden glass-card p-3 rounded-full text-slate-300 hover:text-white z-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-32 px-6 md:hidden flex flex-col"
          >
            <ul className="flex flex-col space-y-8 w-full">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full"
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-3xl font-bold transition-colors duration-200 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
