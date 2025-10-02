'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT, ICONS } from '@/app/config/profile';
import { useT } from '@/app/i18n/useT';
import type { IconType } from 'react-icons';

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: IconType;
  external?: boolean;
  run: () => void;
};

export default function CommandPalette({ placeholder }: { placeholder?: string }) {
  const t = useT();
  const placeholderText =
    placeholder ?? t.command?.placeholder ?? 'Szukaj poleceń…';

  const actions: Action[] = useMemo(
  () => [
    {
      id: 'email',
      label: t.labels.contact.email,
      hint: CONTACT.email,
      icon: ICONS.email,
      run: () => (window.location.href = CONTACT.email),
    },
    {
      id: 'github',
      label: t.labels.contact.github,
      hint: CONTACT.github,
      icon: ICONS.github,
      external: true,
      run: () => window.open(CONTACT.github, '_blank', 'noopener'),
    },
    {
      id: 'linkedin',
      label: t.labels.contact.linkedin,
      hint: CONTACT.linkedin,
      icon: ICONS.linkedin,
      external: true,
      run: () => window.open(CONTACT.linkedin, '_blank', 'noopener'),
    },
    {
      id: 'cv',
      label: t.labels.contact.cv,
      hint: CONTACT.cv,
      icon: ICONS.cv,
      external: true,
      run: () => window.open(CONTACT.cv, '_blank', 'noopener'),
    },
    {
      id: 'discord',
      label: t.labels.contact.discord,
      hint: CONTACT.discord,
      icon: ICONS.discord,
      external: true,
      run: () => window.open(CONTACT.discord, '_blank', 'noopener'),
    },

    {
      id: 'hero',
      label: t.nav.home,
      icon: ICONS.home,
      run: () => document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'about',
      label: t.nav.about,
      icon: ICONS.about,
      run: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'skills',
      label: t.nav.skills,
      icon: ICONS.skills,
      run: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'projects',
      label: t.nav.projects,
      icon: ICONS.projects,
      run: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'contact',
      label: t.nav.contact,
      icon: ICONS.email,
      run: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ],
  [t]
);


  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const MIN_CHARS = 2;
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < MIN_CHARS) return [];
    return actions.filter((a) =>
      [a.label, a.hint ?? ''].join(' ').toLowerCase().includes(s)
    );
  }, [q, actions]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (!filtered.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((p) => Math.min(p + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((p) => Math.max(p - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        filtered[active]?.run?.();
        setOpen(false);
      }
    };

    const onOpenEv = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener('command-palette:open', onOpenEv as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('command-palette:open', onOpenEv as EventListener);
    };
  }, [open, filtered, active]);


  useEffect(() => {
    if (!open) return;
    setQ('');
    setActive(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);


  useEffect(() => setActive(0), [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative z-50 w-full max-w-xl rounded-md border-2 border-white/10 bg-[var(--color-secondary)] [box-shadow:0_0_0_1px_rgba(255,255,255,.06),_0_30px_80px_rgba(0,0,0,.45)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <div className="border-b border-white/10 p-3">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholderText}
                className="w-full bg-transparent outline-none text-sm placeholder-white/40"
                autoComplete="off"
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-sm text-white/80">
                  {q.trim().length < MIN_CHARS
                    ? t.command.type_serch
                    : t.command.no_result }
                </div>
              ) : (
                filtered.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      a.run();
                      setOpen(false);
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left px-3 py-3 rounded-md border-2 transition-all ${
                      i === active
                        ? 'border-lime-400/60 bg-white/[0.06]'
                        : 'border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {a.icon ? <a.icon className="text-lime-300/90" /> : null}
                      <div className="flex-1">
                        <div className="text-sm font-medium">{a.label}</div>
                        {a.hint ? (
                          <div className="text-xs text-white/60">{a.hint}</div>
                        ) : null}
                      </div>
                      <kbd className="hidden sm:inline rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/70">
                        Enter
                      </kbd>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 p-2 text-[11px] text-white/60">
              <div>{t.command.help}</div>
              <div>
                <kbd className="rounded border border-white/10 px-1 py-0.5">Ctrl/Cmd</kbd>{' '}
                + <kbd className="rounded border border-white/10 px-1 py-0.5">K</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
