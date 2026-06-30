interface FooterProps {
  dynastyName?: string;
  source?: string;
}

export function Footer({ dynastyName, source }: FooterProps) {
  return (
    <footer className="relative bg-transparent border-t border-gold/15 py-12">
      <div className="meander-divider w-48 mx-auto mb-8" />
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-3xl text-gradient-gold mb-3">{dynastyName || '中华历史'}</p>
        <p className="font-serif text-jade/80 text-sm tracking-widest mb-2">
          {dynastyName ? `${dynastyName}历史知识 · 交互式学习` : '中华历史知识学习平台'}
        </p>
        {source && (
          <p className="text-jade/70 text-xs tracking-wider">
            {source}
          </p>
        )}
        <p className="text-jade/60 text-xs mt-4">
          交互式历史学习页面 · 对标中小学历史课本 · 仅供学习交流
        </p>
      </div>
    </footer>
  );
}
