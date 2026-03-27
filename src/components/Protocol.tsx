'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../app/[lang]/types';

interface ProtocolProps {
  d: Dictionary['protocol'];
}

const cardColors = ['#C5A059', '#94a3b8', '#cbd5e1'];

export default function Protocol({ d }: ProtocolProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 through entire section
  const [headInView, setHeadInView] = useState(false);

  /* ── Track scroll within the protocol section ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadInView(true); },
      { threshold: 0.05 }
    );
    obs.observe(section);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when top of section hits bottom of viewport
      // progress 1 when bottom of section hits top of viewport
      const total = rect.height - vh;
      if (total <= 0) return;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className="relative" style={{ minHeight: `${d.cards.length * 100 + 20}vh` }}>
      {/* Header — normal in-flow */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className={`transition-all duration-700 ${headInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="font-mono-data text-[#C5A059]">{d.eyebrow}</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold text-white leading-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {d.h2}
          </h2>
        </div>
      </div>

      {/* Sticky Stack */}
      <div className="sticky-cards-container" style={{ position: 'relative' }}>
        {d.cards.map((card, i) => {
          // Each card's reveal progress
          const cardProgress = Math.max(0, Math.min(1, (progress * d.cards.length) - i));
          // Previous cards: scale down + blur as next card pushes
          const isPast = i < Math.floor(progress * d.cards.length);
          const scaleVal = isPast ? 0.9 - (Math.floor(progress * d.cards.length) - i - 1) * 0.03 : 1;
          const blurVal = isPast ? 4 : 0;
          const opacityVal = isPast ? Math.max(0.2, 1 - (Math.floor(progress * d.cards.length) - i) * 0.3) : 1;

          return (
            <div
              key={i}
              className="protocol-card"
              id={`protocol-card-${i}`}
              style={{
                zIndex: 10 + i,
                transform: `scale(${scaleVal})`,
                filter: `blur(${blurVal}px)`,
                opacity: opacityVal,
              }}
            >
              <div className="max-w-5xl mx-auto px-6 w-full">
                <div
                  className="grid md:grid-cols-2 gap-12 items-center"
                  style={{
                    opacity: Math.min(1, cardProgress * 3),
                    transform: `translateY(${Math.max(0, 40 - cardProgress * 40)}px)`,
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                >
                  {/* Left: Number + Tag */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="text-[7rem] font-semibold leading-none"
                        style={{
                          color: 'rgba(197,160,89,0.08)',
                          fontFamily: 'var(--font-inter)',
                          lineHeight: 1,
                        }}
                      >
                        {card.number}
                      </span>
                      <div className="flex flex-col gap-2">
                        <span
                          className="font-mono-data border px-2 py-1 text-[10px]"
                          style={{ color: cardColors[i], borderColor: `${cardColors[i]}40` }}
                        >
                          {card.tag}
                        </span>
                        <span className="font-mono-data text-slate-600 text-[10px]">
                          Protocol {card.number} / 0{d.cards.length}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                      {card.sub}
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex flex-col gap-4">
                    {card.metric.map((m, mi) => (
                      <div
                        key={mi}
                        className="glass-accent p-6 flex flex-col gap-1"
                        style={{ transitionDelay: `${mi * 100}ms` }}
                      >
                        <span
                          className="text-xl font-semibold"
                          style={{ color: cardColors[i], fontFamily: 'var(--font-inter)' }}
                        >
                          {m}
                        </span>
                        <span className="font-mono-data text-slate-600 text-[10px]">
                          Verified metric
                        </span>
                      </div>
                    ))}

                    {/* Visual accent bar */}
                    <div className="h-1 mt-2" style={{ background: '#1e293b' }}>
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          background: `linear-gradient(90deg, ${cardColors[i]}, transparent)`,
                          width: `${cardProgress * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
