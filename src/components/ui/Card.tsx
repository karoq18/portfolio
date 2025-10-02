'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import clsx from 'clsx';

const easing = [0.22, 1, 0.36, 1] as const;

const variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
};

export default function Card({
  children,
  className = '',
}: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const inView = useInView(ref, {
    amount: 0.10,
    margin: '-5% 0px -5% 0px',
    once: isSmall,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    } else {
      if (!isSmall) controls.start('hidden');
    }
  }, [inView, isSmall, controls]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={clsx(
        'group relative flex flex-col justify-center p-5',
        'bg-[var(--color-section)] border border-white/10 ring-1 ring-white/10',
        'transition-[box-shadow,border-color] duration-500',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0),_0_8px_24px_rgba(0,0,0,0)]',
        'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_20px_50px_rgba(0,0,0,0.45),_0_0_0_1px_rgba(255,255,255,0.06)]',
        'hover:border-[var(--color-primary)]/40',
        'will-change-[opacity,transform] min-h-0',
        className,
      )}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',           
        contain: 'paint',                     
      }}
    >
      {children}
    </motion.div>
  );
}
