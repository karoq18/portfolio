'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Timeline from '../layout/Timeline';
import AnimatedCard from '../ui/AnimatedCard';
import { useT } from '@/app/i18n/useT';
import { CONTACT, ICONS } from '@/app/config/profile';
import GlitchPhoto from '../ui/GlitchPhoto';




export default function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const t = useT();
  const isSmall = useIsSmall();

  return (
    <section ref={ref} className="h-auto lg:min-h-[calc(100svh-var(--header-h))] text-white relative" aria-label={t.nav.about} id="m-about">
      <motion.div className="h-full w-full origin-top lg:min-h-[calc(100svh-var(--header-h))] flex justify-center">
        <div className=" mx-auto my-auto w-full h-full py-2 lg:pb-10
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        md:[grid-template-rows:auto_1fr] lg:[grid-template-rows:3fr_1fr_2fr]
        gap-2"
        >

          {/* Zdjecie */}
          <motion.div
            initial={isSmall ? false : { opacity: 0, y: 24 }}
            animate={isSmall ? { opacity: 1, y: 0 } : undefined}
            whileInView={isSmall ? undefined : { opacity: 1, y: 0 }}
            viewport={{ amount: 0.1, margin: '-5% 0px -5% 0px', once: isSmall }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              contain: 'paint',
            }}
            className="w-full order-1 sm:order-1 md:[grid-column:1] md:[grid-row:1] lg:order-none lg:h-full ring-1 ring-white/10"
          >
            <div className="grid gap-2 min-h-0 lg:h-full">
              <GlitchPhoto
                src="/images/my_photo.webp"
                hoverSrc="/images/my_photo_glitch.webp"
                className="w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-full"
              />
            </div>
          </motion.div>

          {/* Opis */}
          <Card className="order-3 md:[grid-column:2] md:row-span-2 lg:row-span-2 md:self-stretch md:h-full lg:order-none">
            <h2 className="text-2xl font-bold leading-tight">{t.hero.name}</h2>
            <p className="text-sm text-white/80">{t.about.title}</p>

            <p className="mt-4 text-sm text-white/80 text-left max-w-prose leading-relaxed">
              {t.about.body}
            </p>

            <div className="flex gap-3 mt-6 justify-center">
              <a href={CONTACT.cv} className="btn btn--ghost" download>
                <ICONS.cv className="btn-ico text-base" aria-hidden />
                {t.labels.contact.cv}
              </a>

              <a
                href={CONTACT.mail}
                className="btn btn--ghost">
                <ICONS.email className="btn-ico text-base" aria-hidden />
                {t.labels.contact.email}
              </a>
            </div>


            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-3">Wykształcenie</h2>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-2">
                  <ICONS.education className="text-[var(--color-primary)]" />
                  {t.about.education}
                </li>
                <li className="ml-6 flex gap-3 text-xs">
                  <span className="flex items-center gap-1 text-green-400">
                    <ICONS.spec_1 /> {t.about.spec_1}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400 animate-pulse">
                    <ICONS.spec_2 className='animate-spin' /> {t.about.spec_2}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ICONS.education className="text-[var(--color-primary)]" />
                  {t.about.education_old}
                </li>
              </ul>
            </div>

          </Card>

          {/* Timeline */}
          <Card className="min-h-0 order-4 lg:h-full lg:overflow-hidden flex flex-col md:col-span-2 md:order-3 
          lg:order-none lg:col-span-1 lg:row-span-3">
            <Timeline items={t.timeline} speedSec={8} />
          </Card>

          {/* Lokalizacja */}
          <Card className="min-h-0 order-2 sm:order-2 md:[grid-column:1] md:[grid-row:2] lg:order-none">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <ICONS.location className="text-[var(--color-primary)]" aria-hidden /> {t.about.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <ICONS.clock className="text-[var(--color-primary)]" aria-hidden /> {t.about.availability}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <ICONS.globe className="text-[var(--color-primary)]" aria-hidden /> {t.about.langs}
            </div>
          </Card>

          {/* Hobby */}
          <Card className="grid order-5 md:col-span-2 lg:col-span-2 gap-2 md:order-4 lg:order-none">
            <AnimatedCard />
          </Card>

        </div>
      </motion.div >
    </section >
  );
}

function useIsSmall() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return isSmall;
}