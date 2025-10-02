"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import UnifiedSkillsCloud from "../layout/UnifiedSkillsCloud";
import SkillSpotlight from "../layout/SkillSpotlight";
import { useT } from "@/app/i18n/useT";


export default function SkillsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const t = useT();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.8], [2, 0]);

  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // lg breakpoint
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={ref}
      aria-label={t.nav.skills}
      id="m-skills"
      className="relative text-white py-6 lg:py-10 h-auto min-h-[100svh] lg:min-h-[0] lg:h-[calc(100svh-var(--header-h))] px-[1px]"
    >
      <motion.div
        style={isLg ? { rotate } : undefined}
        className="h-full w-full bg-[var(--color-secondary)] shadow-2xl"
      >
        <div className="w-full h-full flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 shrink-0 uppercase">
            <span className="text-[var(--color-primary)]">{t.skills.titleStart} </span>
            <span className="text-white">{t.skills.titleHighlight}</span>
          </h2>

          <div
            className="
                flex-1 min-h-0
                grid grid-cols-1 
                lg:grid-cols-2 gap-2
                items-stretch h-full
              "
          >

            <div
              className="
                  h-full w-full min-w-0  p-5
                  bg-[var(--color-section)] border border-white/10 ring-1 ring-white/10
                  transition-[box-shadow,border-color] duration-500
                  shadow-[inset_0_1px_0_rgba(255,255,255,0),_0_8px_24px_rgba(0,0,0,0)]
                  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_20px_50px_rgba(0,0,0,0.45),_0_0_0_1px_rgba(255,255,255,0.06)]
                  hover:border-[var(--color-primary)]/40
                  transform-gpu will-change-transform min-h-0
                "
            >
              <UnifiedSkillsCloud
                intervalMs={10000}
                autoCycle
                showControls
                controlsAlign="right"
              />
            </div>

            <div
              className="
                  min-h-[600px] md:min-h-[500px] lg:min-h-0 h-full w-full min-w-0  
                  bg-[var(--color-section)] border border-white/10 ring-1 ring-white/10
                  transition-[box-shadow,border-color] duration-500
                  shadow-[inset_0_1px_0_rgba(255,255,255,0),_0_8px_24px_rgba(0,0,0,0)]
                  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_20px_50px_rgba(0,0,0,0.45),_0_0_0_1px_rgba(255,255,255,0.06)]
                  hover:border-[var(--color-primary)]/40
                  transform-gpu will-change-transform min-h-0
                "
            >
              <SkillSpotlight className="h-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
