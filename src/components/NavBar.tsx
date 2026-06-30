import { useEffect, useState } from 'react';
import type { DynastyInfo } from '../types/dynasty';

interface NavBarProps {
  dynasty?: DynastyInfo;
  onNavigateHome?: () => void;
}

const defaultNavItems = [
  { id: 'hero', label: '首页' },
];

export function NavBar({ dynasty, onNavigateHome }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  const navItems = dynasty
    ? [
        { id: 'hero', label: dynasty.name },
        { id: 'emperors', label: '帝王世系' },
        { id: 'events', label: '历史事件' },
        { id: 'artifacts', label: '国宝文物' },
        { id: 'quiz', label: '知识问答' },
      ]
    : defaultNavItems;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActiveId(offsets[0].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems]);

  const handleClick = (id: string) => {
    if (id === 'hero' && onNavigateHome) {
      onNavigateHome();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-deep/85 backdrop-blur-md border-b border-gold/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleClick('hero')}
          className="font-display text-2xl text-gradient-gold tracking-widest flex items-center gap-2"
        >
          {onNavigateHome && dynasty && (
            <span className="text-sm text-gold/50 hover:text-gold transition-colors mr-1" onClick={(e) => { e.stopPropagation(); onNavigateHome(); }}>
              ← 朝代
            </span>
          )}
          {dynasty ? dynasty.name : '中华历史'}
        </button>
        {dynasty && (
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`font-serif text-sm tracking-wider transition-colors duration-300 relative group ${
                  activeId === item.id ? 'text-gold-light' : 'text-jade/70 hover:text-jade'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-gold transition-all duration-300 ${
                    activeId === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
                {item.id === 'quiz' && (
                  <span className="absolute -top-2 -right-4 text-[10px] text-cinnabar bg-cinnabar/10 px-1 rounded-sm">课本</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
