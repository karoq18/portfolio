'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import clsx from 'clsx';
import { useT } from '@/app/i18n/useT';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const isPL = lang === 'pl';
  const nextLang = useMemo(() => (isPL ? 'en' : 'pl'), [isPL]);
  const t = useT();

  const toggle = () => setLang(nextLang);

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPL}
      aria-label={`${t.labels.changeLang} ${nextLang.toUpperCase()}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={clsx(
        'cursor-pointer relative inline-flex select-none items-center',
        'h-9 w-20 px-1.5',
        'rounded-md border border-white/15',
        'backdrop-blur-xl bg-white/8',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60',
        'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.45)]',
        'hover:border-[var(--color-primary)]/50'
      )}
    >
      {!isPL ? (
        <span className="absolute left-3 text-xs font-semibold text-white/40">PL</span>
      ) : (
        <span className="absolute right-3 text-xs font-semibold text-white/40">EN</span>
      )}

      <motion.div
        layout
        className={clsx(
          'h-7 w-7 rounded-md flex items-center justify-center',
          !isPL && 'ml-auto'
        )}
        style={{
          backgroundColor: 'var(--color-primary)',
        }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.25 }}
      >
        <span className="text-xs font-semibold text-[var(--color-secondary)]">
          {isPL ? 'PL' : 'EN'}
        </span>
      </motion.div>
    </button>
  );
}
