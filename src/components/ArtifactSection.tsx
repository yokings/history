import { useState } from 'react';
import type { Artifact, ArtifactTag } from '../types/dynasty';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const artifactTagLabels: Record<ArtifactTag, string> = {
  'national-treasure': '国宝',
  bronze: '青铜',
  jade: '玉器',
  pottery: '陶器',
  painting: '书画',
  calligraphy: '书法',
  porcelain: '瓷器',
  silk: '丝织',
  stone: '石刻',
  'gold-silver': '金银器',
};

interface ArtifactSectionProps {
  artifacts: Artifact[];
}

export function ArtifactSection({ artifacts }: ArtifactSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Artifact | null>(null);

  return (
    <section id="artifacts" className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(58, 107, 92, 0.12), transparent 60%)',
        }}
      />

      <div ref={ref} className={`container mx-auto px-6 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <p className="font-serif text-gold/85 tracking-[0.4em] text-xs mb-3">TREASURES</p>
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">国宝文物</h2>
          <div className="meander-divider w-32 mx-auto mb-4" />
          <p className="font-serif text-jade/80 tracking-wider">
            传世遗珍 · 华夏瑰宝 · 文明见证
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {artifacts.map((artifact, idx) => (
            <button
              key={artifact.id}
              onClick={() => setSelected(artifact)}
              className={`card-gold-glow group text-left bg-white/60 border border-gold/15 hover:border-gold/40 rounded-sm overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden bg-white/50">
                {artifact.imageUrl ? (
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/70">
                    <span className="font-display text-6xl text-gold/20">{artifact.name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                {artifact.tag === 'national-treasure' && (
                  <div className="absolute top-3 left-3 seal-tag animate-glow-pulse">
                    {artifactTagLabels[artifact.tag]}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display text-xl text-gradient-gold">{artifact.name}</h3>
                  {artifact.tag !== 'national-treasure' && (
                    <span className="text-xs text-bronze-light/70 border border-bronze/30 px-2 py-0.5 rounded-sm">
                      {artifactTagLabels[artifact.tag]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gold/70 tracking-wider mb-2">{artifact.era}</p>
                <p className="text-sm text-jade/85 leading-relaxed line-clamp-2">{artifact.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ArtifactModal artifact={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ArtifactModal({ artifact, onClose }: { artifact: Artifact; onClose: () => void }) {
  useLockBodyScroll(true);
  const isTreasure = artifact.tag === 'national-treasure';
  const accent = isTreasure ? 'var(--color-gold)' : 'var(--color-bronze-light)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      style={{ background: 'rgba(247, 242, 234, 0.7)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="modal-content relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur-xl border rounded-sm"
        style={{ borderColor: `${accent}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-jade/70 hover:text-gold transition-colors text-2xl w-10 h-10 flex items-center justify-center bg-white/50 rounded-full"
          aria-label="关闭"
        >
          ×
        </button>

        {artifact.imageUrl && (
          <div className="relative h-72 md:h-96 overflow-hidden bg-white/50">
            <img
              src={artifact.imageUrl}
              alt={artifact.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1) contrast(1.05)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-8 md:p-10">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <h3 className="font-display text-4xl text-gradient-gold">{artifact.name}</h3>
            {isTreasure && <span className="seal-tag animate-glow-pulse">国宝</span>}
            {!isTreasure && (
              <span className="text-xs text-bronze-light/70 border border-bronze/30 px-2 py-0.5 rounded-sm">
                {artifactTagLabels[artifact.tag]}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 p-4 bg-white/50 border border-gold/10 rounded-sm">
            <div>
              <div className="text-xs text-jade/60 tracking-widest mb-1">年代</div>
              <div className="font-serif text-gold-light text-sm">{artifact.era}</div>
            </div>
            <div>
              <div className="text-xs text-jade/60 tracking-widest mb-1">出土地</div>
              <div className="font-serif text-gold-light text-sm">{artifact.unearthed}</div>
            </div>
            <div>
              <div className="text-xs text-jade/60 tracking-widest mb-1">材质</div>
              <div className="font-serif text-gold-light text-sm">{artifact.material}</div>
            </div>
            {artifact.location && (
              <div>
                <div className="text-xs text-jade/60 tracking-widest mb-1">现藏</div>
                <div className="font-serif text-gold-light text-sm">{artifact.location}</div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold/50" /> 详细描述
              </h4>
              <p className="text-jade/90 leading-relaxed">{artifact.description}</p>
            </div>

            <div>
              <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold/50" /> 历史意义
              </h4>
              <p className="text-jade/90 leading-relaxed italic border-l-2 pl-4" style={{ borderColor: `${accent}66` }}>
                {artifact.significance}
              </p>
            </div>

            {artifact.textbookPoints && artifact.textbookPoints.length > 0 && (
              <div className="p-4 bg-cinnabar/8 border border-cinnabar/20 rounded-sm">
                <h4 className="font-serif text-cinnabar text-sm tracking-widest mb-2 flex items-center gap-2">
                  📖 课本考点
                </h4>
                <ul className="space-y-1">
                  {artifact.textbookPoints.map((p, i) => (
                    <li key={i} className="text-jade/90 text-sm leading-relaxed pl-3 border-l-2 border-cinnabar/40">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
