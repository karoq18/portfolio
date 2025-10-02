'use client';

import { useEffect, useRef, useState } from 'react';
import { IconType } from "react-icons";
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/app/i18n/useT';
import { TECH_ICONS } from '@/app/config/profile';
import { useInView } from "react-intersection-observer";

type SubItem = {
  icon: IconType;
  name: string;
};

type Item = {
  icon: IconType;
  title: string;
  items: SubItem[];
};

export default function SkillSpotlight(props: {
  items?: Item[];
  intervalMs?: number;
  className?: string;
}) {
  const t = useT();
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.10],
  });

  const isVisible = inView && (entry?.intersectionRatio ?? 0) >= 0.10;

  const defaultItems: Item[] = [{
    icon: TECH_ICONS.typescript,
    title: t.skills.languages,
    items: [
      { icon: TECH_ICONS.java, name: "Java" },
      { icon: TECH_ICONS.javascript, name: "JavaScript" },
      { icon: TECH_ICONS.typescript, name: "TypeScript" },
      { icon: TECH_ICONS.php, name: "PHP" },
    ],
  },
  {
    icon: TECH_ICONS.react,
    title: t.skills.frontend,
    items: [
      { icon: TECH_ICONS.react, name: "React" },
      { icon: TECH_ICONS.reactQuery, name: "React Query" },
      { icon: TECH_ICONS.redux, name: "Redux" },
      { icon: TECH_ICONS.next, name: "Next.js" },
      { icon: TECH_ICONS.astro, name: "Astro" },
      { icon: TECH_ICONS.html5, name: "HTML5" },
      { icon: TECH_ICONS.css3, name: "CSS3" },
      { icon: TECH_ICONS.tailwind, name: "Tailwind" },
      { icon: TECH_ICONS.bootstrap, name: "Bootstrap" },
      { icon: TECH_ICONS.framerMotion, name: "Framer Motion" },
      { icon: TECH_ICONS.gsap, name: "GSAP" },
    ],
  },
  {
    icon: TECH_ICONS.database,
    title: t.skills.backend,
    items: [
      { icon: TECH_ICONS.node, name: "Node.js" },
      { icon: TECH_ICONS.express, name: "Express" },
      { icon: TECH_ICONS.spring, name: "Spring Boot" },
      { icon: TECH_ICONS.mysql, name: "MySQL" },
      { icon: TECH_ICONS.mongodb, name: "MongoDB" },
    ],
  },
  {
    icon: TECH_ICONS.tools,
    title: t.skills.tools,
    items: [
      { icon: TECH_ICONS.docker, name: "Docker" },
      { icon: TECH_ICONS.azure, name: "Azure" },
      { icon: TECH_ICONS.vercel, name: "Vercel" },
      { icon: TECH_ICONS.github, name: "GitHub" },
      { icon: TECH_ICONS.git, name: "Git" },
      { icon: TECH_ICONS.postman, name: "Postman" },
      { icon: TECH_ICONS.vscode, name: "Visual Studio Code" },
      { icon: TECH_ICONS.intellij, name: "IntelliJ IDEA" },
      { icon: TECH_ICONS.zod, name: "Zod" },
      { icon: TECH_ICONS.figma, name: "Figma" },
    ],
  },
  {
    icon: TECH_ICONS.wordpress,
    title: t.skills.cms,
    items: [
      { icon: TECH_ICONS.wordpress, name: "WordPress" },
      { icon: TECH_ICONS.drupal, name: "Drupal" },
      { icon: TECH_ICONS.strapi, name: "Strapi" },
      { icon: TECH_ICONS.ghost, name: "Ghost" },
      { icon: TECH_ICONS.mybb, name: "MyBB" },
    ],
  },
  ];

  const {
    intervalMs = 5000,
    className = '',
    items: itemsProp,
  } = props;

  const items = itemsProp ?? defaultItems;

  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const count = items.length;

  const progressPct = count ? ((i + 0.5) / count) * 100 : 0;
  const stepStartRef = useRef(performance.now());
  const pausedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    stepStartRef.current = performance.now();
    setP(0);
  }, [i]);

  useEffect(() => {
    if (!isVisible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (hover) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      pausedAtRef.current = performance.now();
      return;
    }

    if (pausedAtRef.current !== null) {
      stepStartRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - stepStartRef.current) / intervalMs);
      setP(ratio);

      if (ratio >= 1) {
        setI(prev => (prev + 1) % count);
        stepStartRef.current = now;
        setP(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hover, intervalMs, count, isVisible]);

  return (
    <div
      ref={ref}
      className={`
        relative w-full h-full min-w-0 box-border
        border border-white/10 bg-white/5
        shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        overflow-hidden p-6 md:p-8 ${className}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_5px_rgba(var(--color-primary-rgb),0.15)]"
      />

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10" />

        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-md bg-[var(--color-primary)]/60"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        <div
          className="relative z-10"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${count},1fr)` }}
        >
          {items.map((step, idx) => {
            const active = idx === i;
            return (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className="mx-auto relative grid place-items-center size-12 icon btn--ghost"
                title={`${step.title}`}
              >
                <motion.div
                  className={`
                    relative size-12 rounded-md grid place-items-center
                    border ${active ? 'border-[var(--color-primary)]/60' : 'border-white/15'}
                  `}
                  animate={active ? { scale: 1.06 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ fontSize: 20 }}
                >
                  <span className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]"><step.icon size={20} /></span>
                  {active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-md"
                      style={{}}
                    />
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 mb-8 md:mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -12, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-md border border-white/10 bg-white/5 p-5 md:p-6 h-full"
          >
            <h3 className="text-xl text-center uppercase text-[var(--color-primary)] md:text-2xl font-semibold">
              {items[i].title}{' '}
            </h3>

            <div className="mt-4 grid min-w-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
              {items[i].items.map((el, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 min-w-0"
                  title={el.name}
                >
                  <span className="text-white/80 group-hover:text-white transition">
                    <el.icon className="text-[18px] sm:text-[20px]" />
                  </span>
                  <span className="mt-1 text-xs text-white/60 group-hover:text-white/80 transition
        h-7 flex items-center justify-center text-center leading-snug truncate w-full">
                    {el.name}
                  </span>

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition"
                    style={{ boxShadow: '0 0 5px 3px rgba(var(--color-primary-rgb),0.25)' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-primary)]"
            style={{ transformOrigin: 'left', scaleX: p }}
            transition={{ type: false }}
          />
        </motion.div>
      </div>
    </div>
  );
}
