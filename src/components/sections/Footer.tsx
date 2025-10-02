'use client';

import { useT } from '@/app/i18n/useT';
import { ICONS, CONTACT } from '@/app/config/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useT();

  return (
    <footer className="border-t border-white/10 text-white/80">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          © {year} Karolina Ćwiklińska • Portfolio.
        </div>
        <div className="flex items-center gap-3 hidden md:flex">
          <a
            href={CONTACT.email}
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
            aria-label={t.labels.contact.email}
          >
            <ICONS.email />
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
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
            aria-label={t.labels.contact.github}
          >
            <ICONS.github />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
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
            aria-label={t.labels.contact.linkedin}
          >
            <ICONS.linkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
