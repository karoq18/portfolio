'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from '@/app/i18n/useT';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ICONS } from "@/app/config/profile";

type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  screens?: string[];
  desktopImg?: string;
  mobileImg?: string;
  desktopUrl?: string;
  mobileUrl?: string;
};


export default function ProjectsSection() {
  const t = useT();
  const ref = useRef(null);
  const projects = t.projects.items as Project[];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.8], [-5, 0]);

  const [index, setIndex] = useState(0);
  const active = projects[index];

  const goPrev = useCallback(() => {
    setIndex(i => (i === 0 ? projects.length - 1 : i - 1));
  }, [projects.length]);

  const goNext = useCallback(() => {
    setIndex(i => (i === projects.length - 1 ? 0 : i + 1));
  }, [projects.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const screens = getScreens(active);

  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsXl(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section ref={ref} className="h-auto min-h-[calc(100svh-var(--header-h))] text-white overflow-visible relative pt-2 xl:pt-0" aria-label={t.nav.projects} id="m-projects">
      <motion.div style={isXl ? { scale, rotate } : undefined}
        className="h-full min-h-[calc(100svh-var(--header-h))] origin-top justify-center
    bg-[var(--color-section)] border border-white/10 border-b-0 ring-1 ring-white/10
    transition-[box-shadow,border-color] duration-500
    shadow-[inset_0_1px_0_rgba(255,255,255,0),_0_8px_24px_rgba(0,0,0,0)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_20px_50px_rgba(0,0,0,0.45),_0_0_0_1px_rgba(255,255,255,0.06)]
      transform-gpu will-change-transform min-h-0"
      >

        <div className="container lg:min-h-[calc(100svh-var(--header-h))] content-center mx-auto w-full h-full flex flex-col px-5 py-8">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-4 shrink-0 uppercase">
            <span className="text-[var(--color-primary)]">{t.projects.title}</span>
          </h2>

          <div className="grid grid-rows-[auto_1fr] gap-2 flex-1 min-h-0">

            <div className="grid lg:grid-cols-[3fr_1fr] gap-10 flex-1 min-h-0">

              <AnimatePresence mode="wait">
                <motion.div
                  key={`slider-${index}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="h-full"
                >
                  <h3 className="md:hidden text-2xl md:text-3xl font-bold text-white flex-1 text-center">
                    {active.title}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid lg:grid-cols-[3fr_1fr] lg:grid-rows-2 gap-10 items-center flex-1 lg:grid-rows-[auto_1fr] min-h-0">

              {/* SLIDER*/}
              <div className="flex flex-col min-h-0 lg:row-span-2">
                <div className="flex-1 min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`slider-${index}`}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="h-full"
                    >
                      <BrowserFrame title={active.title}>
                        <ScreensSlider screens={screens} title={active.title} />
                      </BrowserFrame>
                      <div className="hidden">
                        <PhoneFrame>
                          <ScreensSlider screens={screens} title={active.title} />
                        </PhoneFrame>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Opis */}

              <div className="hidden lg:flex justify-end gap-2">
                <button
                  aria-label={t.projects.prev}
                  onClick={goPrev}
                  className="btn btn--ghost border-0"
                >
                  <ICONS.left className="text-xl" />
                </button>
                <button
                  aria-label={t.projects.next}
                  onClick={goNext}
                  className="btn btn--ghost border-0"
                >
                  <ICONS.right className="text-xl" />
                </button>
              </div>


              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="lg:sticky"
                >

                  <p className="leading-relaxed text-sm text-white/80 text-pretty antialiased hyphens-auto lg:max-w-[35ch] whitespace-pre-line">{active.description}</p>

                  <ul className="flex flex-wrap gap-2 mt-6 justify-center">
                    {active.tech.map((tch) => (
                      <li key={tch} className="rounded-md bg-white/5 border border-white/10 px-3 py-1.5
                   text-xs md:text-sm text-white/75 hover:text-white transition">
                        {tch}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 mt-8 ">
                    {active.live && (
                      <a href={active.live} target="_blank" rel="noreferrer" className="btn btn--primary">
                        <ICONS.demo /> {t.projects.demo}
                      </a>
                    )}
                    {active.repo && (
                      <a href={active.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
                        <ICONS.github /> {t.projects.code}
                      </a>
                    )}
                  </div>

                  <div className="mt-10 flex items-center justify-between  lg:justify-start lg:gap-6">
                    <div className="flex lg:hidden gap-2">
                      <button onClick={goPrev} className="btn btn--ghost border-0" aria-label={t.projects.prev}>
                        <ICONS.left className="text-xl" />
                      </button>
                      <button onClick={goNext} className="btn btn--ghost border-0" aria-label={t.projects.next}>
                        <ICONS.right className="text-xl" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-[var(--color-primary)] h-3.5 w-3.5' : 'bg-white/8 hover:bg-gray-600'}`}
                          aria-label={`${t.projects.showProject} ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section >
  );
}


function getScreens(p: Project): string[] {
  const explicit = p.screens ?? [];
  const legacy = [p.desktopImg, p.mobileImg].filter(Boolean) as string[];
  return Array.from(new Set([...explicit, ...legacy]));
}

function ScreensSlider({ screens, title }: { screens: string[]; title: string }) {
  const t = useT();
  const [i, setI] = useState(0);
  const count = screens.length || 0;
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const to = useCallback((n: number) => {
    if (count === 0) return;
    setI(((n % count) + count) % count);
  }, [count]);

  const prev = useCallback(() => to(i - 1), [i, to]);
  const next = useCallback(() => to(i + 1), [i, to]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const startX = useRef<number | null>(null);
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => { startX.current = e.clientX; };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
    startX.current = null;
  };

  if (!count) {
    return <div className="w-full h-full grid place-items-center text-gray-400 text-sm">{t.projects.empty}</div>;
  }

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      className="relative w-full h-full outline-none select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        className="
          relative mx-auto w-full max-w-5xl
          h-[min(56vw,60vh)]
          overflow-hidden ring-1 ring-white/10
        "
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

          <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_40%,transparent_30%,rgba(3,7,18,0.6)_100%)]" />

          <div
            className="
      absolute inset-0 opacity-30
      [background-size:20px_20px]
      [background-position:0_0]
    "
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(162,212,54,0.25) 1px, transparent 1px)',
            }}
          />
        </div>


        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={screens[i]}
            src={screens[i]}
            alt={`${title} — screen ${i + 1}`}
            className="absolute p-2 inset-0 w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            draggable={false}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Strzalki */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full btn bg-white/60 
                        btn--ghost border-[var(--color-secondary)] border-1 p-2 text-[var(--color-secondary)] opacity-20 hover:opacity-100"
              aria-label={t.projects.prev_screen}
            >
              <ICONS.left />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full btn bg-white/60 
                        btn--ghost border-[var(--color-secondary)] border-1 p-2 text-[var(--color-secondary)] opacity-20 hover:opacity-100"
              aria-label={t.projects.next_screen}
            >
              <ICONS.right />
            </button>
          </>
        )}

        {/* Przelaczniki */}
        {count > 1 && (
          <div className="bg-[var(--color-project-nav)] p-2 rounded-full absolute bottom-3 left-1/2 -translate-x-1/2 
                        flex justify-center items-center gap-2 z-10">
            {screens.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out ${k === i ? 'bg-[var(--color-primary)] h-3.5 w-3.5' : 'bg-white/50 hover:bg-[var(--color-primary)]'}`}
                aria-label={`${t.projects.showScreen} ${k + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BrowserFrame({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {

  const t = useT();
  const display = title

  return (
    <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-white/10 bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
      <div className="flex items-center gap-2 px-4 h-10 bg-[var(--color-secondary)] border-b border-white/10 shrink-0">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>

        <div
          className="flex ml-3 h-6 flex-1 rounded-md bg-gray-800/80 items-center px-3 text-sm text-gray-300 truncate"
          title={display}
          aria-label={`${t.projects.projectTitle}: ${display}`}
        >
          <span className="hidden md:flex">{display}</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white/8 grid place-items-center">
        {children}
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full h-full max-w-sm">
      <div className="relative h-full rounded-[2rem] bg-gradient-to-b from-gray-900 to-gray-950 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-2 h-6 w-40 rounded-full bg-black/60" />
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
