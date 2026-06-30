import { useEffect, useMemo, useState } from 'react';
import { dynastyList } from '../dynasties';

interface HomePageProps {
  onSelectDynasty: (id: string) => void;
}

// 朝代颜色映射（每个朝代有自己的主题色，与各朝代 accent 一致）
const dynastyColors: Record<string, { primary: string; secondary: string; bg: string }> = {
  xia: { primary: '#c9a961', secondary: '#3a6b5c', bg: 'from-bronze-dark/20 to-bg-deep' },
  shang: { primary: '#b87a20', secondary: '#4a2c1a', bg: 'from-amber-900/20 to-bg-deep' },
  zhou: { primary: '#b8860b', secondary: '#556b2f', bg: 'from-yellow-900/15 to-bg-deep' },
};

export function HomePage({ onSelectDynasty }: HomePageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${3 + Math.random() * 8}px`,
        duration: `${8 + Math.random() * 10}s`,
        delay: `${Math.random() * 8}s`,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <div className="relative min-h-screen bg-bg-deep overflow-hidden">
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
            opacity: p.opacity,
            background: 'radial-gradient(circle, var(--color-gold), transparent)',
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Hero 区 */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="hero-watermark" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(180px, 40vw, 400px)' }}>
          史
        </div>

        <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-serif text-gold/70 tracking-[0.5em] text-xs md:text-sm mb-6">五千年文明 · 交互式学习</p>

          <h1 className="font-display text-6xl md:text-8xl text-gradient-gold mb-4 leading-none tracking-widest">
            华夏史册
          </h1>

          <p className="font-serif text-jade/60 text-base md:text-lg tracking-widest mb-3">
            以史为鉴 · 可以知兴替
          </p>
          <p className="font-serif text-jade/40 text-sm tracking-wider mb-12 max-w-xl mx-auto">
            从夏商周到明清，逐朝探索帝王世系、关键事件、国宝文物<br />
            对标中小学历史课本，考点标注，边玩边学
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
            <span className="px-3 py-1 text-xs font-serif border border-gold/30 text-gold/80 rounded-sm bg-gold/5">📖 课本考点</span>
            <span className="px-3 py-1 text-xs font-serif border border-bronze/30 text-bronze-light/80 rounded-sm bg-bronze/5">👑 帝王世系</span>
            <span className="px-3 py-1 text-xs font-serif border border-jade/30 text-jade/70 rounded-sm bg-jade/5">🏺 国宝文物</span>
            <span className="px-3 py-1 text-xs font-serif border border-cinnabar/30 text-cinnabar/80 rounded-sm bg-cinnabar/5">📝 知识问答</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/50 animate-bounce">
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
            <p className="font-serif text-gold/70 tracking-[0.4em] text-xs mb-3">DYNASTIES</p>
            <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">选择朝代</h2>
            <div className="meander-divider w-32 mx-auto" />
          </div>

          {/* 朝代时间线 */}
          <div className="relative">
            {/* 时间轴线 */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/20 to-gold/30 -translate-x-1/2" />

            <div className="space-y-6 md:space-y-8">
              {dynastyList.map((d, idx) => {
                const colors = dynastyColors[d.id] || { primary: '#c9a961', secondary: '#3a6b5c' };
                const isLeft = idx % 2 === 0;
                return (
                  <button
                    key={d.id}
                    onClick={() => onSelectDynasty(d.id)}
                    className={`card-gold-glow w-full text-left bg-bg-card/50 border border-gold/15 hover:border-gold/50 rounded-sm p-6 md:p-8 backdrop-blur-sm group transition-all duration-500 relative ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${300 + idx * 120}ms` }}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* 朝代字 */}
                      <div
                        className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-sm flex items-center justify-center border-2 group-hover:scale-110 transition-transform duration-500"
                        style={{ borderColor: `${colors.primary}55`, background: `${colors.primary}08` }}
                      >
                        <span className="font-display text-5xl md:text-6xl" style={{ color: colors.primary }}>
                          {d.name}
                        </span>
                      </div>

                      {/* 信息 */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                          <h3 className="font-display text-2xl md:text-3xl text-gradient-gold">{d.fullName}</h3>
                          <span className="text-xs text-jade/50 font-serif tracking-wider">{d.period}</span>
                        </div>

                        <p className="text-sm text-jade/60 leading-relaxed mb-3 line-clamp-2">
                          {d.summary}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                          {d.highlights.slice(0, 4).map((h) => (
                            <span
                              key={h}
                              className="px-2 py-0.5 text-[11px] font-serif border rounded-sm"
                              style={{ borderColor: `${colors.primary}30`, color: `${colors.primary}cc` }}
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {d.textbook.length > 0 && (
                          <div className="flex items-center justify-center md:justify-start gap-2 text-cinnabar text-xs">
                            📖 {d.textbook.length} 个课本考点
                          </div>
                        )}
                      </div>

                      {/* 箭头 */}
                      <div className="flex-shrink-0 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M10 6 L18 14 L10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* 即将推出 */}
              <div className="text-center py-8 opacity-40">
                <p className="font-serif text-jade/40 text-sm tracking-widest mb-2">更多朝代即将推出</p>
                <p className="text-jade/30 text-xs">运行 <code className="text-gold/50 bg-gold/5 px-1 rounded">npm run gen 朝代名</code> 添加新朝代</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
