import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Work', href: '/portfolio' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export function Navbar({ logoUrl = "/logo.png" }: { logoUrl?: string }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-8 py-3 md:py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center z-50">
            <img 
              src={logoUrl} 
              alt="Adbeyond Communications" 
              className="h-12 md:h-20 w-auto object-contain" 
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "font-headline uppercase tracking-wider text-sm font-semibold transition-colors duration-300",
                  (location.pathname + location.hash === link.href) || (location.pathname === link.href && !location.hash && link.href === '/')
                    ? "text-primary border-b-2 border-primary" 
                    : "text-neutral-600 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-50">
            <Link to="/#contact" className="hidden md:inline-block bg-gradient-to-r from-primary to-primary-container text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm uppercase tracking-widest hover:shadow-lg transition-all scale-95 active:scale-90">
              Let's Talk
            </Link>
            
            <button 
              className="md:hidden p-2 text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col space-y-6 text-center mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "font-headline uppercase tracking-wider text-xl font-bold transition-colors duration-300",
                    (location.pathname + location.hash === link.href) || (location.pathname === link.href && !location.hash && link.href === '/')
                      ? "text-primary" 
                      : "text-neutral-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8">
                <Link 
                  to="/#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-block bg-gradient-to-r from-primary to-primary-container text-white px-6 py-4 rounded-xl font-headline font-bold text-lg uppercase tracking-widest text-center shadow-lg"
                >
                  Let's Talk
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
