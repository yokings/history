import { useEffect, useMemo, useState } from 'react';
import { dynastyList } from '../dynasties';

interface HomePageProps {
  onSelectDynasty: (id: string) => void;
}

const dynastyColors: Record<string, { primary: string; secondary: string }> = {
  xia: { primary: '#c9a961', secondary: '#5b9a9d' },
  shang: { primary: '#b87a20', secondary: '#8b5a3c' },
  zhou: { primary: '#b8860b', secondary: '#6b8e5a' },
};

export function HomePage({ onSelectDynasty }: HomePageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => {
        const type = Math.random() > 0.5 ? 'gold' : 'cyan';
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${3 + Math.random() * 10}px`,
          duration: `${8 + Math.random() * 12}s`,
          delay: `${Math.random() * 8}s`,
          type,
        };
      }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 柔光装饰球 */}
      <div className="warm-glow" style={{ width: 600, height: 600, top: '-15%', left: '-10%', background: 'radial-gradient(circle, #f5dcd4, transparent)' }} />
      <div className="warm-glow" style={{ width: 500, height: 500, bottom: '-10%', right: '-8%', background: 'radial-gradient(circle, #a8d4e0, transparent)' }} />
      <div className="warm-glow" style={{ width: 350, height: 350, top: '40%', right: '20%', background: 'radial-gradient(circle, #f0c887, transparent)', opacity: 0.25 }} />

      {/* 粒子背景 */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.type === 'gold'
              ? 'radial-gradient(circle, rgba(240, 200, 135, 0.7), rgba(212, 160, 99, 0.15), transparent)'
              : 'radial-gradient(circle, rgba(168, 212, 224, 0.5), rgba(91, 154, 157, 0.1), transparent)',
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
            boxShadow: p.type === 'gold'
              ? '0 0 10px rgba(240, 200, 135, 0.3)'
              : '0 0 8px rgba(168, 212, 224, 0.25)',
          }}
        />
      ))}

      {/* Hero 区 */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-6">
        <div className="hero-watermark" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(180px, 40vw, 450px)' }}>
          史
        </div>

        <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-serif text-gold-dark/80 tracking-[0.5em] text-xs md:text-sm mb-6">五千年文明 · 交互式学习</p>

          <h1 className="font-display text-6xl md:text-8xl text-gradient-gold mb-4 leading-none tracking-widest">
            华夏史册
          </h1>

          <p className="font-serif text-bronze text-base md:text-lg tracking-widest mb-3">
            以史为鉴 · 可以知兴替
          </p>
          <p className="font-serif text-warmgray/80 text-sm tracking-wider mb-12 max-w-xl mx-auto leading-relaxed">
            从夏商周到明清，逐朝探索帝王世系、关键事件、国宝文物<br />
            对标中小学历史课本，考点标注，边玩边学
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
            <span className="px-3 py-1.5 text-xs font-serif border border-cinnabar/25 text-cinnabar rounded-full bg-cinnabar/5 backdrop-blur-sm shadow-sm">📖 课本考点</span>
            <span className="px-3 py-1.5 text-xs font-serif border border-gold/30 text-gold-dark rounded-full bg-gold/5 backdrop-blur-sm shadow-sm">👑 帝王世系</span>
            <span className="px-3 py-1.5 text-xs font-serif border border-bronze/30 text-bronze rounded-full bg-bronze/5 backdrop-blur-sm shadow-sm">🏺 国宝文物</span>
            <span className="px-3 py-1.5 text-xs font-serif border border-bronze/25 text-bronze-dark rounded-full bg-white/50 backdrop-blur-sm shadow-sm">📝 知识问答</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/70 animate-bounce">
          <span className="text-xs tracking-widest font-serif">选择朝代开始探索</span>
          <svg width="16" height="24" viewBox="0 0 20 32" fill="none">
            <path d="M10 4 V26 M4 20 L10 28 L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* 朝代选择网格 */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-serif text-gold/80 tracking-[0.4em] text-xs mb-3">DYNASTIES</p>
            <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">选择朝代</h2>
            <div className="meander-divider w-32 mx-auto" />
          </div>

          <div className="space-y-6">
            {dynastyList.map((d, idx) => {
              const colors = dynastyColors[d.id] || dynastyColors.xia;
              return (
                <button
                  key={d.id}
                  onClick={() => onSelectDynasty(d.id)}
                  className={`card-gold-glow w-full text-left bg-white/60 border rounded-2xl p-6 md:p-8 backdrop-blur-md group transition-all duration-500 relative ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + idx * 150}ms` }}
                >
                  {/* 暖色光晕 */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 20% 50%, ${colors.primary}10, transparent 60%)` }} />

                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div
                      className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center border-2 group-hover:scale-110 transition-transform duration-500 shadow-lg"
                      style={{ borderColor: `${colors.primary}55`, background: `linear-gradient(135deg, ${colors.primary}12, ${colors.secondary}08)` }}
                    >
                      <span className="font-display text-5xl md:text-6xl" style={{ color: colors.primary }}>
                        {d.name}
                      </span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                        <h3 className="font-display text-2xl md:text-3xl text-gradient-gold">{d.fullName}</h3>
                        <span className="text-xs text-warmgray/85 font-serif tracking-wider">{d.period}</span>
                      </div>

                      <p className="text-sm text-jade/80 leading-relaxed mb-3 line-clamp-2">
                        {d.summary}
                      </p>

                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                        {d.highlights.slice(0, 4).map((h) => (
                          <span
                            key={h}
                            className="px-2.5 py-0.5 text-[11px] font-serif rounded-full"
                            style={{
                              color: `${colors.primary}cc`,
                              border: `1px solid ${colors.primary}30`,
                              background: `${colors.primary}08`,
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {d.textbook.length > 0 && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-cinnabar text-xs">
                          📖 {d.textbook.reduce((sum, t) => sum + t.keyPoints.length, 0)} 个课本考点
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-gold/60 group-hover:text-gold group-hover:translate-x-2 transition-all duration-300">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M10 6 L22 14 L10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="text-center py-8 opacity-70">
              <p className="font-serif text-warmgray/80 text-sm tracking-widest mb-2">更多朝代即将推出</p>
              <p className="text-warmgray/85 text-xs">运行 <code className="text-gold/80 bg-gold/5 px-1.5 py-0.5 rounded">npm run gen 朝代名</code> 添加新朝代</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
