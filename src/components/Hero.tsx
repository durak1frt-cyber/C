'use client';

import { useEffect, useRef } from 'react';
import type { Dictionary } from '../app/[lang]/types';

interface HeroProps {
  d: Dictionary['hero'];
}

export default function Hero({ d }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  /* ── Canvas Particle Field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,89,${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(197,160,89,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Magnetic CTA ── */
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 80) {
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      }
    };
    const onLeave = () => {
      btn.style.transform = 'translate(0,0)';
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center mesh-bg overflow-hidden">
      <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(197,160,89,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(197,160,89,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fadeUp">
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="font-mono-data text-[#C5A059]">
              {d.eyebrow}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-8 animate-fadeUp delay-100"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {d.h1.split('Molecular Industry').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-[#C5A059]"> Molecular Industry</span>
                )}
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12 animate-fadeUp delay-200">
            {d.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20 animate-fadeUp delay-300">
            <a href="#pillars" ref={btnRef} className="btn-accent">
              {d.cta_primary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#protocol" className="btn-outline">
              {d.cta_secondary}
            </a>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 animate-fadeUp delay-400">
            {d.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-3xl font-semibold text-white"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {stat.value}
                </span>
                <span className="font-mono-data text-slate-500 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeUp delay-600">
        <span className="font-mono-data text-slate-600">{d.scroll_hint}</span>
        <span className="w-px h-10 bg-gradient-to-b from-[#C5A059]/40 to-transparent" />
      </div>
    </section>
  );
}
