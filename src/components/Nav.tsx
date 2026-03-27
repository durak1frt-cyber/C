'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '../app/[lang]/types';

interface NavProps {
  d: Dictionary['nav'];
}

export default function Nav({ d }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group">
          <span
            className="text-base font-semibold tracking-[0.2em] uppercase text-white group-hover:text-[#C5A059] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {d.logo}
          </span>
          <span
            className="font-mono-data text-[10px] text-slate-500 mt-0.5"
          >
            {d.tagline}
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {d.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:flex btn-accent text-xs px-5 py-2.5">
            {d.cta}
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-3 h-0.5 bg-[#C5A059] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 w-5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } glass border-t border-white/5`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {d.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link block pb-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-accent w-full text-center justify-center text-xs py-2.5">
              {d.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
