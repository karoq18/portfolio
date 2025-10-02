'use client';

import { useEffect, useMemo, useState } from 'react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useLenisScroll } from '@/app/hooks/useLenisScroll';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { useT } from '@/app/i18n/useT';
import { FiTerminal } from "react-icons/fi";

export default function HeaderNav() {
  const t = useT();
  const scrollTo = useLenisScroll();

  const items = useMemo(
    () => [
      { id: 'home', label: t.nav.home },
      { id: 'about', label: t.nav.about },
      { id: 'skills', label: t.nav.skills },
      { id: 'projects', label: t.nav.projects },
      { id: 'contact', label: t.nav.contact },
    ],
    [t]
  );

  const activeId = useActiveSection(items.map((i) => i.id));

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="hidden md:block fixed top-0 inset-x-0 z-[100]"
      style={{ height: 'var(--header-h)' }}
      aria-label= {t.nav.aria}
    >
      <div
        className={[
          'h-full px-5 md:px-8 flex items-center justify-between',
          'transition-colors duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-white/8 border-b border-white/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]'
            : 'backdrop-blur-0 bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="hidden lg:block text-lg font-bold tracking-tight">
          <span className="text-white">{t.nav.name}</span>{' '}
          <span className="text-[var(--color-primary)]">{t.nav.surname}</span>
        </div>

        <nav className="hidden md:flex items-center gap-2 text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              aria-current={activeId === item.id ? 'page' : undefined}
              className={[
                'relative rounded-md px-3.5 py-2 transition focus:outline-none uppercase',
                activeId === item.id
                  ? 'text-white ring-1 ring-[var(--color-primary)] bg-white/8'
                  : 'text-gray-200/90 hover:text-white ring-1 ring-lime-400/0 hover:ring-lime-400/45 hover:bg-white/6',
                'focus:ring-2 focus:ring-lime-400/60',
              ].join(' ')}
            >
              {item.label}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[1.5px] bg-gradient-to-r from-transparent via-lime-400/70 to-transparent opacity-0 hover:opacity-100 transition" />
            </a>
          ))}
        </nav>

       <div className="ml-3 flex items-center gap-2 pr-2">
  <CommandButton />
  <LanguageToggle />
</div>
      </div>
    </header>
  );
}

function CommandButton() {
    const open = () => window.dispatchEvent(new Event("command-palette:open"));
    const t = useT();

  return (
    <button
      type="button"
      onClick={open}
      aria-label= {t.command.aria}
      title= {t.command.title}
      className="
        cursor-pointer inline-flex items-center justify-center
        h-9 w-9
        rounded-md
        bg-white/8
        border border-white/15
        text-white/80 hover:text-white
        hover:border-[var(--color-primary)]/50
        transition
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60
      "
    >
      <FiTerminal className="text-lg text-[var(--color-primary)]" aria-hidden />
    </button>
  );
}