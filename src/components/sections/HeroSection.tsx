'use client';

import { useState, useEffect, useRef } from 'react';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useT } from '@/app/i18n/useT';
import { CONTACT, ICONS } from '@/app/config/profile';
import type { IconType } from "react-icons";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import atomAnim from '@/app/assets/atom.json';

export default function HeroSection() {
  const t = useT();

  const [text] = useTypewriter({
    words: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    loop: 1,
    typeSpeed: 80,
    deleteSpeed: 60,
    delaySpeed: 1000,
  });

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (text === "Fullstack Developer") {
      setShowCursor(false);
    }
  }, [text]);

  type ButtonItem = {
    label: string;
    href: string;
    icon: IconType;
    external?: boolean;
  }

  const ButtonList: ButtonItem[] = [
    { label: t.nav.about, href: "#about", icon: ICONS.about },
    { label: t.nav.projects, href: "#projects", icon: ICONS.projects },
    { label: t.nav.contact, href: "#contact", icon: ICONS.email },
    { label: t.nav.skills, href: "#skills", icon: ICONS.skills },
    { label: t.labels.contact.cv, href: CONTACT.cv, icon: ICONS.cv, external: true },
    { label: t.labels.contact.github, href: CONTACT.github, icon: ICONS.github, external: true },
    { label: t.labels.contact.linkedin, href: CONTACT.linkedin, icon: ICONS.linkedin, external: true },
    { label: t.labels.contact.discord, href: CONTACT.discord, icon: ICONS.discord, external: true },
  ];

  const angleIncrement = 360 / ButtonList.length;

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.25);
  }, []);

  return (

    <section id="home" className="min-h-[100svh] text-white grid grid-rows-2   
    md:flex flex-col md:flex-row items-center md:justify-between">
      <div className="h-full flex flex-col justify-end text-center md:flex-1 md:text-left space-y-6">
        <p className="text-[var(--color-text)] text-md uppercase tracking-widest h-6">
          {text}
          {showCursor && <Cursor />}
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          {t.hero.prefix}
          <span className="block text-[var(--color-primary)]"> {t.hero.name}</span>
        </h1>
        <p className="text-[var(--color-text)] md:max-w-xl text-center md:text-left">
          {t.hero.lead}
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a
            href= {CONTACT.cv}
            className="btn btn--primary"
            download
          >
            {t.labels.contact.cv}
          </a>
        </div>
      </div>

      <div className="flex-1 md:mt-0 flex justify-center items-center relative group"
      onMouseEnter={() => lottieRef.current?.pause()}
          onMouseLeave={() => lottieRef.current?.play()}
          >

        <div
          className="absolute left-1/2 top-1/2
               w-[clamp(180px,24vw,440px)] h-[clamp(180px,24vw,440px)]
               -translate-x-1/2 -translate-y-1/2
               animate-spin-slow pointer-events-none inner-spin z-10 rounded-full bg-[var(--color-secondary)]">
          {ButtonList.map((btn, index) => {
            const angleRad = (index * angleIncrement * Math.PI) / 180;
            const unit = '%';
            const R = 55;
            const x = `calc(${Math.cos(angleRad)} * ${R}${unit})`;
            const y = `calc(${Math.sin(angleRad)} * ${R}${unit})`;
            const Icon = btn.icon;

            return (
              <a
                key={index}
                href={btn.href}
                target={btn.external ? "_blank" : "_self"}
                rel="noreferrer"
                className="absolute bg-white/8 text-white text-2xl border-1 rounded-full p-2 border-[var(--color-primary)] hover:text-[var(--color-primary)] transition pointer-events-auto"
                style={{
                  left: `calc(50% + ${x})`,
                  top: `calc(50% + ${y})`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={btn.label}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="relative 
                  w-[clamp(120px,20vw,400px)] h-[clamp(120px,20vw,400px)]
                  rounded-full 
                  overflow-hidden z-20"
          >
          <Lottie
            animationData={atomAnim}
            loop={true}
            lottieRef={lottieRef}
            className="w-full h-full object-cover"
          />


        </div>
      </div>
    </section>
  );
}