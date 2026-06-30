import { useState } from 'react';
import type { Emperor, EmperorTag } from '../types/dynasty';
import { useScrollReveal } from '../hooks/useScrollReveal';

const emperorTagLabels: Record<EmperorTag, string> = {
  founder: '开国',
  normal: '承平',
  restore: '中兴',
  lost: '失国',
  tyrant: '暴政',
  reform: '改革',
  golden: '盛世',
};

const emperorTagColors: Record<EmperorTag, string> = {
  founder: 'var(--color-gold)',
  normal: 'var(--color-bronze-light)',
  restore: 'var(--color-bronze-light)',
  lost: 'var(--color-cinnabar)',
  tyrant: 'var(--color-cinnabar)',
  reform: '#7b9ea8',
  golden: '#e8c84a',
};

interface EmperorTimelineProps {
  emperors: Emperor[];
  dynastyName: string;
}

export function EmperorTimeline({ emperors, dynastyName }: EmperorTimelineProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Emperor | null>(null);

  return (
    <section id="emperors" className="relative py-24 md:py-32 bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(58, 107, 92, 0.15), transparent 50%)',
        }}
      />

      <div
        ref={ref}
        className={`container mx-auto px-6 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <p className="font-serif text-gold/70 tracking-[0.4em] text-xs mb-3">SUCCESSION</p>
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">帝王世系</h2>
          <div className="meander-divider w-32 mx-auto mb-4" />
          <p className="font-serif text-jade/60 tracking-wider">
            {dynastyName}君主传承 · 自始祖至末帝
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8">
            {emperors.map((emperor, idx) => {
              const isLeft = idx % 2 === 0;
              const isTyrant = emperor.tag === 'tyrant' || emperor.tag === 'lost';
              return (
                <div
                  key={emperor.id}
                  className={`relative flex items-center gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <button
                      onClick={() => setSelected(emperor)}
                      className="timeline-node group flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110"
                      style={{
                        borderColor: emperorTagColors[emperor.tag],
                        background: 'var(--color-bg-deep)',
                      }}
                      aria-label={`查看${emperor.name}详情`}
                    >
                      <span
                        className="font-serif text-sm font-bold"
                        style={{ color: emperorTagColors[emperor.tag] }}
                      >
                        {emperor.id}
                      </span>
                    </button>
                  </div>

                  <div className={`flex-1 ml-20 md:ml-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <button
                      onClick={() => setSelected(emperor)}
                      className="card-gold-glow w-full text-left bg-bg-card/60 border border-gold/15 hover:border-gold/40 rounded-sm p-5 backdrop-blur-sm"
                    >
                      <div className={`flex items-baseline gap-3 mb-1 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="font-display text-2xl text-gradient-gold">{emperor.name}</span>
                        {emperor.alias && (
                          <span className="text-xs text-jade/50">{emperor.alias}</span>
                        )}
                        <span
                          className="seal-tag ml-auto"
                          style={{
                            background: isTyrant ? 'var(--color-cinnabar)' : 'var(--color-bronze-dark)',
                            color: 'var(--color-jade)',
                          }}
                        >
                          {emperorTagLabels[emperor.tag]}
                        </span>
                      </div>
                      <p className={`text-xs text-gold/60 tracking-wider mb-2 ${isLeft ? 'md:text-right' : ''}`}>
                        {emperor.reign}
                        {emperor.yearsOnThrone && ` · 在位 ${emperor.yearsOnThrone} 年`}
                      </p>
                      <p className={`text-sm text-jade/70 line-clamp-2 ${isLeft ? 'md:text-right' : ''}`}>
                        {emperor.achievements}
                      </p>
                    </button>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selected && <EmperorCard emperor={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function EmperorCard({ emperor, onClose }: { emperor: Emperor; onClose: () => void }) {
  const tagColor = emperorTagColors[emperor.tag];
  const isTyrant = emperor.tag === 'tyrant' || emperor.tag === 'lost';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      style={{ background: 'rgba(10, 8, 7, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="modal-content relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-bg-card border border-gold/30 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, transparent, ${tagColor}, transparent)` }} />

        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-jade/50 hover:text-gold transition-colors text-2xl"
            aria-label="关闭"
          >
            ×
          </button>

          <div className="flex items-baseline gap-4 mb-2 flex-wrap">
            <span className="text-gold/40 font-serif text-sm">
              第 {emperor.generation || '?'} 代 · 第 {emperor.id} 位
            </span>
            {emperor.era && <span className="text-gold/40 font-serif text-sm">年号：{emperor.era}</span>}
          </div>
          <div className="flex items-baseline gap-4 mb-6 flex-wrap">
            <h3 className="font-display text-6xl text-gradient-gold">{emperor.name}</h3>
            {emperor.alias && <span className="font-serif text-jade/60 text-lg">{emperor.alias}</span>}
            <span
              className="seal-tag"
              style={{
                background: isTyrant ? 'var(--color-cinnabar)' : 'var(--color-bronze-dark)',
              }}
            >
              {emperorTagLabels[emperor.tag]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-bg-deep/50 border border-gold/10 rounded-sm">
            <div>
              <div className="text-xs text-jade/40 tracking-widest mb-1">在位时间</div>
              <div className="font-serif text-gold-light">{emperor.reign}</div>
            </div>
            {emperor.yearsOnThrone && (
              <div>
                <div className="text-xs text-jade/40 tracking-widest mb-1">在位年数</div>
                <div className="font-serif text-gold-light">{emperor.yearsOnThrone} 年</div>
              </div>
            )}
          </div>

          {emperor.textbookPoints && emperor.textbookPoints.length > 0 && (
            <div className="mb-6 p-4 bg-cinnabar/5 border border-cinnabar/20 rounded-sm">
              <h4 className="font-serif text-cinnabar text-sm tracking-widest mb-2 flex items-center gap-2">
                📖 课本考点
              </h4>
              <ul className="space-y-1">
                {emperor.textbookPoints.map((p, i) => (
                  <li key={i} className="text-jade/80 text-sm leading-relaxed pl-3 border-l-2 border-cinnabar/40">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold/50" /> 主要事迹
            </h4>
            <p className="text-jade/80 leading-relaxed">{emperor.achievements}</p>
          </div>

          <div>
            <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold/50" /> 历史评价
            </h4>
            <p className="text-jade/80 leading-relaxed italic border-l-2 border-gold/40 pl-4">
              {emperor.evaluation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
