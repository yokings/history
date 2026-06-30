import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { EmperorTimeline } from './components/EmperorTimeline';
import { EventSection } from './components/EventSection';
import { ArtifactSection } from './components/ArtifactSection';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <NavBar />
      <main>
        <Hero />
        <EmperorTimeline />
        <EventSection />
        <ArtifactSection />
        <QuizSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
