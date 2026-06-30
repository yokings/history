import type { DynastyInfo } from '../types/dynasty';
import { NavBar } from './NavBar';
import { Hero } from './Hero';
import { TextbookSection } from './TextbookSection';
import { EmperorTimeline } from './EmperorTimeline';
import { EventSection } from './EventSection';
import { ArtifactSection } from './ArtifactSection';
import { QuizSection } from './QuizSection';
import { Footer } from './Footer';
import { useEffect } from 'react';

interface DynastyPageProps {
  dynasty: DynastyInfo;
  onNavigateHome: () => void;
}

export function DynastyPage({ dynasty, onNavigateHome }: DynastyPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dynasty.id]);

  const emperors = dynasty.emperors_data || [];
  const events = dynasty.events_data || [];
  const artifacts = dynasty.artifacts_data || [];
  const quiz = dynasty.quiz_data || [];

  return (
    <div className="min-h-screen bg-bg-deep">
      <NavBar dynasty={dynasty} onNavigateHome={onNavigateHome} />
      <main>
        <Hero dynasty={dynasty} />
        {dynasty.textbook.length > 0 && <TextbookSection textbook={dynasty.textbook} />}
        {emperors.length > 0 && <EmperorTimeline emperors={emperors} dynastyName={dynasty.fullName} />}
        {events.length > 0 && <EventSection events={events} />}
        {artifacts.length > 0 && <ArtifactSection artifacts={artifacts} />}
        {quiz.length > 0 && <QuizSection questions={quiz} dynastyName={dynasty.fullName} />}
      </main>
      <Footer dynastyName={dynasty.fullName} source={`内容依据正史及考古成果整理`} />
    </div>
  );
}
