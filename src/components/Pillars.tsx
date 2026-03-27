'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../app/[lang]/types';

interface PillarsProps {
  d: Dictionary['pillars'];
}

// SVG icons for each pillar
const Icons: Record<string, React.FC<{ className?: string }>> = {
  dna: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/>
      <path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/>
      <path d="m20 9 .5.5"/><path d="m6.5 17.5 1 1"/><path d="m16.5 6.5 1 1"/>
    </svg>
  ),
  wheat: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/>
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/>
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/>
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4z"/>
      <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0z"/>
    </svg>
  ),
  flask: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l3 10H6L9 3z"/><path d="M6 13s-2 1-2 3 2 3 2 3h12s2-1 2-3-2-3-2-3"/>
      <path d="M10 6h4"/><path d="M9 20v.01"/><path d="M12 18v.01"/>
    </svg>
  ),
  recycle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
      <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
    </svg>
  ),
  network: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/>
      <rect x="9" y="2" width="6" height="6" rx="1"/>
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
      <path d="M12 12V8"/>
    </svg>
  ),
};

function PillarCard({
  item,
  index,
}: {
  item: Dictionary['pillars']['items'][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = Icons[item.icon] ?? Icons.network;

  return (
    <div
      ref={ref}
      className={`pillar-card p-8 flex flex-col gap-5 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon + Metric row */}
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 flex items-center justify-center border border-[#C5A059]/20 bg-[#C5A059]/5">
          <Icon className="w-5 h-5 text-[#C5A059]" />
        </div>
        <span className="font-mono-data text-[#C5A059] text-[10px] border border-[#C5A059]/20 px-2 py-1 bg-[#C5A059]/5">
          {item.metric}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3
          className="text-lg font-semibold text-white mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{item.sub}</p>
      </div>

      {/* Bottom indicator */}
      <div className="mt-auto pt-4 border-t border-slate-800 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
        <span className="font-mono-data text-slate-600">Active deployment</span>
      </div>
    </div>
  );
}

export default function Pillars({ d }: PillarsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headInView, setHeadInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pillars" className="py-32 bg-slate-950 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="font-mono-data text-[#C5A059]">{d.eyebrow}</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-semibold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {d.h2}
          </h2>
          <p
            className={`text-slate-400 text-lg leading-relaxed transition-all duration-700 delay-200 ${
              headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {d.sub}
          </p>
        </div>

        {/* 5-Card Grid */}
        {/* 5 cards: 2x2 on left, 1 tall on right (lg) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.items.slice(0, 4).map((item, i) => (
            <PillarCard key={item.id} item={item} index={i} />
          ))}
          {/* 5th card spans 2 cols on sm, 1 col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <PillarCard key={d.items[4].id} item={d.items[4]} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
}
