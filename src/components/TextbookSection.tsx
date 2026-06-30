import type { TextbookKnowledge } from '../types/dynasty';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TextbookSectionProps {
  textbook: TextbookKnowledge[];
}

export function TextbookSection({ textbook }: TextbookSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="textbook" className="relative py-20 md:py-24 bg-bg-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(168, 50, 50, 0.08), transparent 60%)',
        }}
      />

      <div ref={ref} className={`container mx-auto px-6 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <p className="font-serif text-cinnabar/80 tracking-[0.4em] text-xs mb-3">📖 TEXTBOOK</p>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">课本考点</h2>
          <div className="meander-divider w-32 mx-auto mb-4" />
          <p className="font-serif text-jade/60 tracking-wider">
            对标统编版历史教材 · 必背知识点 · 高频考点
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {textbook.map((tb, idx) => (
            <div
              key={idx}
              className={`bg-bg-card/60 border border-cinnabar/20 rounded-sm p-6 backdrop-blur-sm transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gold/10">
                <span className="seal-tag" style={{ background: 'var(--color-cinnabar)' }}>
                  {tb.grade}
                </span>
                <h3 className="font-serif text-gold text-base">{tb.unit}</h3>
              </div>

              <div className="mb-4">
                <h4 className="font-serif text-gold/80 text-xs tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-4 h-px bg-cinnabar/50" /> 必背知识点
                </h4>
                <ul className="space-y-1.5">
                  {tb.keyPoints.map((p, i) => (
                    <li key={i} className="text-jade/80 text-sm leading-relaxed pl-4 relative">
                      <span className="absolute left-0 text-cinnabar/70">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-cinnabar text-xs tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-4 h-px bg-cinnabar/50" /> ⭐ 高频考点
                </h4>
                <ul className="space-y-1.5">
                  {tb.examFrequent.map((p, i) => (
                    <li key={i} className="text-jade/80 text-sm leading-relaxed pl-4 relative">
                      <span className="absolute left-0 text-gold">★</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
