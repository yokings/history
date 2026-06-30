import { useEffect, useMemo, useState } from 'react';

const stats = [
  { label: '起止年份', value: '约前2070—前1600', unit: '' },
  { label: '延续年数', value: '约470', unit: '年' },
  { label: '传承世代', value: '14', unit: '代' },
  { label: '君主数量', value: '17', unit: '王' },
];

export function Hero() {
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

  // 生成青铜粒子
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${4 + Math.random() * 10}px`,
        duration: `${6 + Math.random() * 8}s`,
        delay: `${Math.random() * 8}s`,
        opacity: 0.2 + Math.random() * 0.5,
      })),
    []
  );

  const scrollToNext = () => {
    document.getElementById('emperors')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bronze-texture"
    >
      {/* 巨型"夏"字水印 */}
      <div className="hero-watermark" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        夏
      </div>

      {/* 青铜粒子 */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* 内容层 */}
      <div
        className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ opacity: scrollOpacity }}
      >
        <p className="font-serif text-gold/80 tracking-[0.4em] text-sm mb-6">华夏第一王朝</p>

        <h1 className="font-display text-7xl md:text-9xl text-gradient-gold mb-4 leading-none">
          夏
        </h1>

        <p className="font-serif text-jade/70 text-lg md:text-xl tracking-widest mb-2">
          青铜为礼 · 龙腾九州
        </p>
        <p className="font-serif text-jade/50 text-sm tracking-wider mb-12">
          探索中国第一个世袭制王朝的人物、事件与国宝
        </p>

        {/* 数据条 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border border-gold/20 bg-bg-card/40 backdrop-blur-sm rounded-sm py-5 px-3 transition-all duration-700 hover:border-gold/60 hover:bg-bg-card/60 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${400 + i * 120}ms` }}
            >
              <div className="font-serif text-2xl md:text-3xl text-gradient-bronze mb-1">
                {s.value}
                <span className="text-sm text-gold/70 ml-1">{s.unit}</span>
              </div>
              <div className="text-xs text-jade/50 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 滚动指引 */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors"
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
