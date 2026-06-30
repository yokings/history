import { useEffect, useState } from 'react';

const navItems = [
  { id: 'hero', label: '夏' },
  { id: 'emperors', label: '帝王世系' },
  { id: 'events', label: '历史事件' },
  { id: 'artifacts', label: '国宝文物' },
  { id: 'quiz', label: '知识问答' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // 检测当前激活区块
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
  }, []);

  const handleClick = (id: string) => {
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
          className="font-display text-2xl text-gradient-gold tracking-widest"
        >
          夏
        </button>
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
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
