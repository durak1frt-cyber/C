import type { Dictionary } from '../app/[lang]/types';

interface FooterProps {
  d: Dictionary['footer'];
}

export default function Footer({ d }: FooterProps) {
  return (
    <footer id="contact" className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="divider mb-0" />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(197,160,89,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Top: Logo + Nav */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-2 mb-6">
              <span
                className="text-base font-semibold tracking-[0.2em] uppercase text-white"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                BIODUSTRY
              </span>
              <span className="font-mono-data text-slate-600 text-[10px]">Molecular Technologies</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {d.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="font-mono-data text-[#C5A059] text-[10px] mb-4 block">Platform</span>
            <ul className="space-y-2.5">
              {['Technologies', 'Artifacts', 'Protocol', 'Data'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono-data text-[#C5A059] text-[10px] mb-4 block">Contact</span>
            <ul className="space-y-2.5">
              {['Partnerships', 'Research Access', 'Media', 'Careers'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono-data text-slate-700 text-[10px]">
            {d.copyright}
          </span>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'IP Policy'].map((l) => (
              <a key={l} href="#" className="font-mono-data text-slate-700 text-[10px] hover:text-slate-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
