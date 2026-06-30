import { useEffect, useMemo, useState } from 'react';
import type { DynastyInfo } from '../types/dynasty';

interface HeroProps {
  dynasty: DynastyInfo;
}

export function Hero({ dynasty }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    const onScroll = () => {
      setScrollOpacity(Math.max(0, 1 - window.scrollY / 600));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 35 }).map(() => {
        const type = Math.random() > 0.5 ? 'gold' : 'cyan';
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${4 + Math.random() * 12}px`,
          duration: `${8 + Math.random() * 10}s`,
          delay: `${Math.random() * 8}s`,
          type,
        };
      }),
    []
  );

  const scrollToNext = () => {
    document.getElementById('textbook')?.scrollIntoView({ behavior: 'smooth' });
  };

  const accentColor = dynasty.accent.primary;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bronze-texture"
    >
      {/* 柔光装饰球 */}
      <div className="warm-glow" style={{ width: 500, height: 500, top: '-10%', left: '-10%', background: 'radial-gradient(circle, #f5dcd4, transparent)' }} />
      <div className="warm-glow" style={{ width: 400, height: 400, bottom: '-5%', right: '-5%', background: 'radial-gradient(circle, #a8d4e0, transparent)' }} />
      <div className="warm-glow" style={{ width: 300, height: 300, top: '30%', right: '15%', background: 'radial-gradient(circle, #f0c887, transparent)', opacity: 0.2 }} />

      <div
        className="hero-watermark"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {dynasty.accent.watermark}
      </div>

      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.type === 'gold'
              ? 'radial-gradient(circle, rgba(240, 200, 135, 0.8), rgba(212, 160, 99, 0.2), transparent)'
              : 'radial-gradient(circle, rgba(168, 212, 224, 0.6), rgba(91, 154, 157, 0.15), transparent)',
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
            boxShadow: p.type === 'gold'
              ? '0 0 12px rgba(240, 200, 135, 0.4)'
              : '0 0 10px rgba(168, 212, 224, 0.3)',
          }}
        />
      ))}

      <div
        className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ opacity: scrollOpacity }}
      >
        <p className="font-serif text-gold-dark/60 tracking-[0.4em] text-sm mb-6">{dynasty.period}</p>

        <h1 className="font-display text-7xl md:text-9xl text-gradient-gold mb-4 leading-none drop-shadow-sm">
          {dynasty.name}
        </h1>

        <p className="font-serif text-bronze/60 text-lg md:text-xl tracking-widest mb-2">
          {dynasty.accent.subtitle}
        </p>
        <p className="font-serif text-warmgray/60 text-sm tracking-wider mb-6 max-w-xl mx-auto">
          {dynasty.summary.slice(0, 50)}……
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xl mx-auto">
          {dynasty.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 text-xs font-serif border border-gold/25 text-jade/70 rounded-full bg-white/40 backdrop-blur-sm shadow-sm"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {dynasty.stats.map((s, i) => (
            <div
              key={s.label}
              className={`border border-gold/20 bg-white/50 backdrop-blur-md rounded-xl py-5 px-3 transition-all duration-700 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${400 + i * 120}ms`, boxShadow: '0 4px 20px rgba(212, 160, 99, 0.08)' }}
            >
              <div className="font-serif text-2xl md:text-3xl text-gradient-gold mb-1">
                {s.value}
                {s.unit && <span className="text-sm text-gold-dark/60 ml-1">{s.unit}</span>}
              </div>
              <div className="text-xs text-warmgray/60 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/50 hover:text-gold transition-colors"
        style={{ opacity: scrollOpacity }}
        aria-label="向下滚动"
      >
        <span className="text-xs tracking-widest font-serif">往下探索</span>
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="animate-bounce">
          <path d="M10 4 V26 M4 20 L10 28 L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
