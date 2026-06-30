import { useState } from 'react';
import type { QuizQuestion } from '../types/dynasty';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface QuizSectionProps {
  questions: QuizQuestion[];
  dynastyName: string;
}

export function QuizSection({ questions, dynastyName }: QuizSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [current, setCurrent] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const total = questions.length;
  const isAnswered = selectedIdx !== null;
  const isCorrect = isAnswered && selectedIdx === question.correctIndex;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setAnswers([...answers, idx]);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelectedIdx(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelectedIdx(null);
    setAnswers([]);
    setFinished(false);
  };

  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;

  return (
    <section id="quiz" className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(201, 169, 97, 0.1), transparent 50%)',
        }}
      />

      <div ref={ref} className={`container mx-auto px-6 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <p className="font-serif text-gold/70 tracking-[0.4em] text-xs mb-3">EXAMINATION</p>
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">知识问答</h2>
          <div className="meander-divider w-32 mx-auto mb-4" />
          <p className="font-serif text-jade/60 tracking-wider">
            {dynastyName}考点精练 · 对标中小学历史课本
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!finished ? (
            <div className="bg-white/70 border border-gold/20 rounded-sm p-8 md:p-10 backdrop-blur-sm">
              <div className="mb-8">
                <div className="flex justify-between text-xs text-jade/50 tracking-widest mb-2">
                  <span>第 {current + 1} 题 / 共 {total} 题</span>
                  <span className="flex items-center gap-2">
                    {question.difficulty && (
                      <span className={`px-1.5 py-0.5 rounded-sm text-[10px] ${
                        question.difficulty === 'easy' ? 'bg-bronze-dark/40 text-bronze-light' :
                        question.difficulty === 'medium' ? 'bg-gold/10 text-gold' :
                        'bg-cinnabar/20 text-cinnabar'
                      }`}>
                        {question.difficulty === 'easy' ? '基础' : question.difficulty === 'medium' ? '中等' : '拔高'}
                      </span>
                    )}
                    {question.textbookSource && (
                      <span className="text-cinnabar">📖 {question.textbookSource}</span>
                    )}
                  </span>
                </div>
                <div className="h-1 bg-gold/3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bronze to-gold transition-all duration-500"
                    style={{ width: `${((current + (isAnswered ? 1 : 0)) / total) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-jade mb-6 leading-relaxed">
                {question.question}
              </h3>

              <div className="space-y-3 mb-8">
                {question.options.map((opt, idx) => {
                  const optionLabels = ['甲', '乙', '丙', '丁', '戊', '己'];
                  let bgClass = 'bg-white/50 border-gold/15 hover:border-gold/40 hover:bg-white/80';
                  let textClass = 'text-jade/80';
                  if (isAnswered) {
                    if (idx === question.correctIndex) {
                      bgClass = 'bg-bronze-dark/40 border-bronze-light';
                      textClass = 'text-bronze-light';
                    } else if (idx === selectedIdx) {
                      bgClass = 'bg-cinnabar/20 border-cinnabar';
                      textClass = 'text-cinnabar';
                    } else {
                      bgClass = 'bg-gold/3 border-gold/10 opacity-50';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 border rounded-sm transition-all duration-300 flex items-center gap-3 ${bgClass} ${textClass} ${
                        !isAnswered ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <span className="font-display text-lg text-gold/70 w-6">{optionLabels[idx]}</span>
                      <span className="flex-1">{opt}</span>
                      {isAnswered && idx === question.correctIndex && (
                        <span className="text-bronze-light text-xl">✓</span>
                      )}
                      {isAnswered && idx === selectedIdx && idx !== question.correctIndex && (
                        <span className="text-cinnabar text-xl">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="animate-fade-in-up">
                  <div
                    className={`p-4 rounded-sm border mb-4 ${
                      isCorrect
                        ? 'bg-bronze-dark/30 border-bronze-light/40'
                        : 'bg-cinnabar/10 border-cinnabar/40'
                    }`}
                  >
                    <p className={`font-serif text-sm mb-1 ${isCorrect ? 'text-bronze-light' : 'text-cinnabar'}`}>
                      {isCorrect ? '答对了！' : '答错了'}
                    </p>
                    <p className="text-jade/70 text-sm leading-relaxed">{question.explanation}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-gradient-to-r from-bronze to-gold-dark text-bg-deep font-serif tracking-widest rounded-sm hover:from-bronze-light hover:to-gold transition-all duration-300"
                  >
                    {current + 1 >= total ? '查看结果' : '下一题 →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/70 border border-gold/30 rounded-sm p-8 md:p-12 backdrop-blur-sm text-center">
              <p className="font-serif text-gold/70 tracking-[0.4em] text-xs mb-4">RESULT</p>
              <div className="font-display text-7xl text-gradient-gold mb-2">
                {score} <span className="text-3xl text-jade/40">/ {total}</span>
              </div>
              <p className="font-serif text-jade/70 text-lg mb-2">
                {score === total
                  ? '满分！你已是该朝代历史达人'
                  : score >= total * 0.8
                  ? '优秀！历史知识扎实'
                  : score >= total * 0.6
                  ? '良好！仍有进步空间'
                  : '继续努力！温习一遍再来'}
              </p>
              <p className="text-jade/50 text-sm mb-8">
                答对 {score} 题 · 答错 {total - score} 题
              </p>

              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-gradient-to-r from-bronze to-gold-dark text-bg-deep font-serif tracking-widest rounded-sm hover:from-bronze-light hover:to-gold transition-all duration-300"
              >
                重新挑战
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
