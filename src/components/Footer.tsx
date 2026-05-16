import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-100 bg-neutral-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="font-headline font-bold text-neutral-900 text-xl uppercase tracking-tighter">
            Adbeyond Communications
          </div>
          <p className="font-sans text-sm text-neutral-500 max-w-xs leading-relaxed">
            © 2024 Adbeyond Communications. Architecting Impact. All rights reserved. Registered for social change.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Navigation</span>
            <Link className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" to="/">Work</Link>
            <Link className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" to="/services/training">Training</Link>
            <Link className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" to="#">Privacy Policy</Link>
            <Link className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" to="#">Terms of Service</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Connect</span>
            <a className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" href="#">LinkedIn</a>
            <a className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" href="#">Instagram</a>
            <a className="text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline decoration-primary decoration-2 underline-offset-4 text-sm" href="#">Twitter (X)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
