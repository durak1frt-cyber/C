'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../app/[lang]/types';

interface HookProps {
  d: Dictionary['hook'];
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hook({ d }: HookProps) {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle horizon line */}
      <div className="divider mb-0" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="w-8 h-px bg-[#C5A059]" />
          <span className="font-mono-data text-[#C5A059]">{d.eyebrow}</span>
        </div>

        {/* Two Columns: Legacy vs Biology-Driven */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-24">
          {/* Left — Legacy Manufacturing */}
          <div
            className={`transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono-data text-slate-600 block mb-4">
              {d.legacy_label}
            </span>
            <ul className="space-y-3">
              {d.legacy_items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-600 text-lg"
                >
                  <span className="w-5 h-px bg-slate-700 flex-shrink-0" />
                  <span className="line-through decoration-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Efficiency percentages */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border border-slate-800 p-4">
                <div className="font-mono-data text-slate-600 mb-1">Yield Index</div>
                <div className="text-2xl font-semibold text-slate-600">
                  <AnimatedCounter to={34} suffix="%" />
                </div>
              </div>
              <div className="border border-slate-800 p-4">
                <div className="font-mono-data text-slate-600 mb-1">Carbon Cost</div>
                <div className="text-2xl font-semibold text-slate-600">
                  +<AnimatedCounter to={280} suffix="%" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Biology-Driven (MASSIVE drama) */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono-data text-[#C5A059]/60 block mb-4">
              {d.modern_label}
            </span>
            <p
              className="text-[#C5A059] font-semibold leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Biology-<br/>Driven<br/>Efficiency
            </p>

            {/* Gold accent metrics */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="glass-accent p-4">
                <div className="font-mono-data text-[#C5A059]/60 mb-1">Yield Index</div>
                <div className="text-2xl font-semibold text-[#C5A059]">
                  <AnimatedCounter to={412} suffix="%" />
                </div>
              </div>
              <div className="glass-accent p-4">
                <div className="font-mono-data text-[#C5A059]/60 mb-1">Carbon Cost</div>
                <div className="text-2xl font-semibold text-[#C5A059]">
                  -<AnimatedCounter to={61} suffix="%" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manifesto */}
        <div
          className={`max-w-4xl border-l-2 border-[#C5A059] pl-8 py-4 transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <blockquote
            className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            &ldquo;{d.manifesto}&rdquo;
          </blockquote>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            {d.manifesto_sub}
          </p>
        </div>
      </div>

      <div className="divider mt-32" />
    </section>
  );
}
