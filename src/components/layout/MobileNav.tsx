'use client';

import { useT } from '@/app/i18n/useT';
import { ICONS } from '@/app/config/profile';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/app/hooks/useActiveSection';

type Item = {
  id: 'about' | 'skills' | 'projects' | 'contact';
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
};

export default function MobileNav() {
  const t = useT();
  const { lang, setLang } = useLanguage();
  const activeId = useActiveSection(['about', 'skills', 'projects', 'contact']);

  const items: Item[] = [
    { id: 'about',    icon: ICONS.about,    href: '#m-about',    label: t.nav.about },
    { id: 'skills',   icon: ICONS.skills,   href: '#m-skills',   label: t.nav.skills },
    { id: 'projects', icon: ICONS.projects, href: '#m-projects', label: t.nav.projects },
    { id: 'contact',  icon: ICONS.email,    href: '#contact',  label: t.nav.contact },
  ];

  const toggleLang = () => setLang(lang === 'pl' ? 'en' : 'pl');

  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-[var(--color-section)]/95 backdrop-blur
                 text-white flex justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]
                 border-t border-white/10 z-50 md:hidden"
      aria-label={t.nav.mobile}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center text-xs transition-colors
                       ${isActive ? 'text-[var(--color-primary)]' : 'text-white hover:text-[var(--color-primary)]/90'}`}
            aria-current={isActive ? 'page' : undefined}
            title={item.label}
          >
            <Icon className="text-sm" />
            <span className="leading-4">{item.label}</span>
            <span
              className={`mt-0.5 h-1 w-1 rounded-full transition-transform
                         ${isActive ? 'scale-100 bg-[var(--color-primary)]' : 'scale-0 bg-transparent'}`}
              aria-hidden
            />
          </a>
        );
      })}

      <button
        className="flex flex-col items-center text-xs hover:text-[var(--color-primary)]"
        onClick={toggleLang}
        aria-label={t.labels.changeLang}
        title={t.labels.changeLang}
      >
        <ICONS.globe className="text-sm" />
        <span>{lang.toUpperCase()}</span>
      </button>
    </nav>
  );
}
