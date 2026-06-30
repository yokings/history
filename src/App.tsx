import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { DynastyPage } from './components/DynastyPage';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { getDynasty, getAllDynastyIds } from './dynasties';

function getDynastyIdFromHash(): string | null {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return null;
  const parts = hash.split('/');
  if (parts[0] === 'dynasty' && parts[1]) {
    return parts[1];
  }
  // 兼容 #/xia 简写
  if (getAllDynastyIds().includes(parts[0])) {
    return parts[0];
  }
  return null;
}

function App() {
  const [currentDynastyId, setCurrentDynastyId] = useState<string | null>(() => getDynastyIdFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setCurrentDynastyId(getDynastyIdFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToDynasty = (id: string) => {
    window.location.hash = `#/dynasty/${id}`;
  };

  const navigateHome = () => {
    window.location.hash = '';
  };

  const dynasty = currentDynastyId ? getDynasty(currentDynastyId) : null;

  if (dynasty) {
    return <DynastyPage dynasty={dynasty} onNavigateHome={navigateHome} />;
  }

  return (
    <div className="min-h-screen bg-bg-deep">
      <NavBar />
      <HomePage onSelectDynasty={navigateToDynasty} />
      <Footer />
    </div>
  );
}

export default App;
