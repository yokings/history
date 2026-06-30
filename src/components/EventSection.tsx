import { useState } from 'react';
import type { HistoricalEvent, EventCategory } from '../types/dynasty';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const categoryDanger: Record<EventCategory, boolean> = {
  founding: false,
  war: true,
  reform: false,
  prosperity: false,
  disaster: true,
  fall: true,
  culture: false,
  diplomacy: false,
};

interface EventSectionProps {
  events: HistoricalEvent[];
}

export function EventSection({ events }: EventSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<HistoricalEvent | null>(null);

  return (
    <section id="events" className="relative py-24 md:py-32 bg-bg-deep overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(168, 50, 50, 0.08), transparent 50%)',
        }}
      />

      <div ref={ref} className={`container mx-auto px-6 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <p className="font-serif text-gold/70 tracking-[0.4em] text-xs mb-3">CHRONICLES</p>
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">历史事件</h2>
          <div className="meander-divider w-32 mx-auto mb-4" />
          <p className="font-serif text-jade/60 tracking-wider">
            关键事件 · 兴衰转折 · 王朝命运
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, idx) => {
            const isLast = idx === events.length - 1;
            const isDanger = categoryDanger[event.category] ?? false;
            return (
              <button
                key={event.id}
                onClick={() => setSelected(event)}
                className={`card-gold-glow group text-left bg-bg-card/60 border rounded-sm p-6 backdrop-blur-sm transition-all duration-500 ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  borderColor: isDanger ? 'rgba(168, 50, 50, 0.25)' : 'rgba(201, 169, 97, 0.15)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center font-display text-2xl border transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: isDanger ? 'var(--color-cinnabar)' : 'var(--color-gold)',
                      color: isDanger ? 'var(--color-cinnabar)' : 'var(--color-gold)',
                      background: 'var(--color-bg-deep)',
                    }}
                  >
                    {event.icon}
                  </div>
                  <span className="font-serif text-5xl text-gold/10 group-hover:text-gold/20 transition-colors">
                    {String(event.id).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-gradient-gold mb-2">{event.title}</h3>
                <p className="text-xs text-gold/60 tracking-widest mb-3">{event.time}</p>
                <p className="text-sm text-jade/70 leading-relaxed line-clamp-3">{event.summary}</p>

                {event.textbookPoints && event.textbookPoints.length > 0 && (
                  <span className="inline-block mt-3 px-2 py-0.5 text-[10px] text-cinnabar border border-cinnabar/30 rounded-sm bg-cinnabar/5">
                    📖 课本考点
                  </span>
                )}

                <div className="mt-4 flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors text-xs tracking-widest">
                  展开详情
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function EventModal({ event, onClose }: { event: HistoricalEvent; onClose: () => void }) {
  useLockBodyScroll(true);
  const isDanger = categoryDanger[event.category] ?? false;
  const accent = isDanger ? 'var(--color-cinnabar)' : 'var(--color-gold)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      style={{ background: 'rgba(10, 8, 7, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="modal-content relative max-w-3xl w-full max-h-[88vh] overflow-y-auto bg-bg-card border rounded-sm"
        style={{ borderColor: `${accent}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-jade/50 hover:text-gold transition-colors text-2xl"
            aria-label="关闭"
          >
            ×
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-sm flex items-center justify-center font-display text-3xl border-2"
              style={{ borderColor: accent, color: accent, background: 'var(--color-bg-deep)' }}
            >
              {event.icon}
            </div>
            <div>
              <h3 className="font-display text-4xl text-gradient-gold">{event.title}</h3>
              <p className="text-sm text-gold/60 tracking-widest mt-1">{event.time}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold/50" /> 事件经过
              </h4>
              <p className="text-jade/80 leading-relaxed">{event.details}</p>
            </div>

            <div>
              <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold/50" /> 历史影响
              </h4>
              <p className="text-jade/80 leading-relaxed italic border-l-2 pl-4" style={{ borderColor: `${accent}66` }}>
                {event.impact}
              </p>
            </div>

            <div>
              <h4 className="font-serif text-gold text-sm tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold/50" /> 相关人物
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.figures.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 bg-bg-deep/60 border border-gold/20 rounded-sm text-sm text-jade/80 font-serif"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {event.textbookPoints && event.textbookPoints.length > 0 && (
              <div className="p-4 bg-cinnabar/5 border border-cinnabar/20 rounded-sm">
                <h4 className="font-serif text-cinnabar text-sm tracking-widest mb-2 flex items-center gap-2">
                  📖 课本考点
                </h4>
                <ul className="space-y-1">
                  {event.textbookPoints.map((p, i) => (
                    <li key={i} className="text-jade/80 text-sm leading-relaxed pl-3 border-l-2 border-cinnabar/40">
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
