import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Clubs', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#tech' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      let current = '';

      // Find the current section taking into account header height offset
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on your layout (150px here accounts for the sticky nav)
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
    // Call once initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav className="glass-card px-8 py-3 w-max">
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
    </motion.header>
  );
}
