'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../app/[lang]/types';

type ArtifactsDict = Dictionary['artifacts'];

/* ═══════════════════════════════════════
   1. HEXAGONAL DATA GRID
═══════════════════════════════════════ */
function HexGrid({ labels }: { labels: string[] }) {
  const [values, setValues] = useState<string[]>(() =>
    labels.map(() => (Math.random() * 100).toFixed(1))
  );
  const [actives, setActives] = useState<boolean[]>(() =>
    labels.map(() => Math.random() > 0.6)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setValues((prev) =>
        prev.map((v) => {
          const n = parseFloat(v) + (Math.random() - 0.5) * 4;
          return Math.max(0, Math.min(999, n)).toFixed(1);
        })
      );
      setActives((prev) =>
        prev.map((a) => (Math.random() < 0.15 ? !a : a))
      );
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Hexagon rows: offset even rows
  const rows = [
    labels.slice(0, 4),
    labels.slice(4, 8),
    labels.slice(8, 12),
  ];
  const valueRows = [
    values.slice(0, 4),
    values.slice(4, 8),
    values.slice(8, 12),
  ];
  const activeRows = [
    actives.slice(0, 4),
    actives.slice(4, 8),
    actives.slice(8, 12),
  ];

  return (
    <div className="flex flex-col gap-1 items-center select-none">
      {rows.map((row, ri) => (
        <div
          key={ri}
          className="flex gap-1"
          style={{ marginLeft: ri % 2 === 1 ? '42px' : '0' }}
        >
          {row.map((label, ci) => {
            const active = activeRows[ri][ci];
            const value = valueRows[ri][ci];
            const idx = ri * 4 + ci;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center transition-all duration-700"
                style={{
                  width: 80,
                  height: 88,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: active
                    ? 'rgba(197,160,89,0.12)'
                    : '#0f172a',
                  border: `1px solid ${active ? 'rgba(197,160,89,0.3)' : '#1e293b'}`,
                  cursor: 'default',
                }}
              >
                <span
                  className="font-semibold text-xs"
                  style={{
                    color: active ? '#C5A059' : '#475569',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.55rem',
                    color: active ? '#a8874a' : '#334155',
                    marginTop: 2,
                  }}
                >
                  {active ? value : '—'}
                </span>
                {active && (
                  <span
                    className="animate-pulse"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#C5A059',
                      marginTop: 3,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   2. MOLECULAR SHUFFLER
═══════════════════════════════════════ */
type ShufflerCard = { compound: string; status: string; efficacy: string; class: string };

function Shuffler({ cards }: { cards: ShufflerCard[] }) {
  const [active, setActive] = useState(0);
  const [bouncing, setBouncing] = useState(false);

  const next = useCallback(() => {
    setBouncing(true);
    setTimeout(() => {
      setActive((a) => (a + 1) % cards.length);
      setBouncing(false);
    }, 300);
  }, [cards.length]);

  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);

  const statusColor: Record<string, string> = {
    ACTIVE: '#4ade80',
    SYNTHESIS: '#C5A059',
    'FIELD TEST': '#60a5fa',
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ height: 180 }}
      onClick={next}
    >
      {cards.map((card, i) => {
        const isTop = i === active;
        const isPrev = i === (active - 1 + cards.length) % cards.length;
        const zIndex = isTop ? 30 : isPrev ? 20 : 10;
        const offset = i === active ? 0 : i === (active + 1) % cards.length ? 12 : 24;
        const rotate = i === active ? 0 : i === (active + 1) % cards.length ? -1.5 : -3;
        const scale = i === active ? 1 : i === (active + 1) % cards.length ? 0.97 : 0.94;

        return (
          <div
            key={i}
            className={`absolute inset-x-0 top-0 transition-all duration-500 ${
              isTop && bouncing ? 'shuffler-bounce' : ''
            }`}
            style={{
              zIndex,
              transform: `translate(${offset}px, ${offset * 0.5}px) rotate(${rotate}deg) scale(${scale})`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              className="p-5 border"
              style={{
                background: '#0f172a',
                borderColor: isTop ? 'rgba(197,160,89,0.3)' : '#1e293b',
                boxShadow: isTop ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.65rem',
                    color: '#64748b',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.class}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.6rem',
                    color: statusColor[card.status] ?? '#C5A059',
                    border: `1px solid ${statusColor[card.status] ?? '#C5A059'}40`,
                    padding: '2px 6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  {card.status}
                </span>
              </div>
              <h4
                className="text-white font-semibold mb-2"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem' }}
              >
                {card.compound}
              </h4>
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 h-1"
                  style={{ background: '#1e293b' }}
                >
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: card.efficacy,
                      background: 'linear-gradient(90deg, #C5A059, #a8874a)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.7rem',
                    color: '#C5A059',
                  }}
                >
                  {card.efficacy}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Tap hint */}
      <div
        className="absolute -bottom-8 right-0"
        style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.1em' }}
      >
        CLICK TO CYCLE
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   3. SOIL PULSE (EKG Waveform)
═══════════════════════════════════════ */
function SoilPulse() {
  const pathRef = useRef<SVGPathElement>(null);
  const [key, setKey] = useState(0); // re-trigger animation

  useEffect(() => {
    const t = setInterval(() => setKey((k) => k + 1), 4000);
    return () => clearInterval(t);
  }, []);

  // EKG path: flat line with occasional spikes
  const w = 520;
  const h = 80;
  const mid = h / 2;

  // Build a realistic EKG path
  const segments: string[] = [];
  let x = 0;
  segments.push(`M 0 ${mid}`);

  const pushFlat = (length: number) => {
    segments.push(`L ${x + length} ${mid}`);
    x += length;
  };
  const pushSpike = () => {
    segments.push(`L ${x + 5} ${mid}`);
    segments.push(`L ${x + 8} ${mid - 28}`);
    segments.push(`L ${x + 12} ${mid + 18}`);
    segments.push(`L ${x + 16} ${mid - 12}`);
    segments.push(`L ${x + 19} ${mid + 6}`);
    segments.push(`L ${x + 22} ${mid}`);
    x += 22;
  };

  pushFlat(40);
  pushSpike();
  pushFlat(60);
  pushSpike();
  pushFlat(40);
  pushSpike();
  pushFlat(80);
  pushSpike();
  pushFlat(60);

  const d = segments.join(' ');

  return (
    <div className="relative overflow-hidden" style={{ height: 100 }}>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="ekg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
            <stop offset="20%" stopColor="#C5A059" stopOpacity="1" />
            <stop offset="80%" stopColor="#C5A059" stopOpacity="1" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
          <filter id="ekg-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background scan line */}
        <line x1="0" y1={mid} x2={w} y2={mid} stroke="#1e293b" strokeWidth="1" />

        {/* EKG path */}
        <path
          key={key}
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#ekg-grad)"
          strokeWidth="1.5"
          filter="url(#ekg-glow)"
          style={{
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
            animation: 'ekg-draw 3s linear forwards',
          }}
        />

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={i * (w / 4)}
            y1={0}
            x2={i * (w / 4)}
            y2={h}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Live dot */}
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5"
      >
        <span
          className="animate-ping"
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A059', display: 'block' }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN ARTIFACTS SECTION
═══════════════════════════════════════ */
export default function Artifacts({ d }: { d: ArtifactsDict }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="artifacts" className="py-32 relative" style={{ background: '#020617' }} ref={sectionRef}>
      <div className="divider mb-0" />
      <div className="max-w-7xl mx-auto px-6 pt-20">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="font-mono-data text-[#C5A059]">{d.eyebrow}</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-semibold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {d.h2}
          </h2>
          <p
            className={`text-slate-400 text-lg leading-relaxed transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {d.sub}
          </p>
        </div>

        {/* 3 Artifact Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 1 — Hexagonal Data Grid */}
          <div
            className={`glass border border-slate-800 p-6 flex flex-col gap-6 transition-all duration-700 delay-100 lg:col-span-2 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div>
              <span className="font-mono-data text-[#C5A059] block mb-1">{d.hex.title}</span>
              <p className="text-slate-500 text-sm">{d.hex.desc}</p>
            </div>
            <div className="flex justify-center py-2">
              {inView && <HexGrid labels={d.hex.labels} />}
            </div>
          </div>

          {/* 2 — Molecular Shuffler */}
          <div
            className={`glass border border-slate-800 p-6 flex flex-col gap-6 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div>
              <span className="font-mono-data text-[#C5A059] block mb-1">{d.shuffler.title}</span>
              <p className="text-slate-500 text-sm">{d.shuffler.desc}</p>
            </div>
            <div className="flex-1 flex items-center">
              {inView && <Shuffler cards={d.shuffler.cards} />}
            </div>
          </div>

          {/* 3 — Soil Pulse */}
          <div
            className={`glass border border-slate-800 p-6 flex flex-col gap-4 transition-all duration-700 delay-300 lg:col-span-3 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-data text-[#C5A059] block mb-1">{d.pulse.title}</span>
                <p className="text-slate-500 text-sm">{d.pulse.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="font-mono-data text-[10px] text-slate-600">LIVE</span>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-4">
              {inView && <SoilPulse />}
            </div>
          </div>
        </div>
      </div>
      <div className="divider mt-20" />
    </section>
  );
}
