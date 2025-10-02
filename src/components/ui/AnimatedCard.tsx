'use client'

import { useState, useEffect } from "react"
import { FaMusic, FaGamepad, FaFutbol } from "react-icons/fa"
import { PiCookingPotBold } from "react-icons/pi"
import { GiIsland } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion"
import { useT } from "@/app/i18n/useT";


export default function AnimatedCard() {

   const t = useT();

  const words = t.hobbyCard.words as string[];
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 2500)
    return () => clearInterval(id)
  }, [words.length]);

  return (
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 hover:border-lime-400/30 
    transition-all duration-300 overflow-hidden flex flex-col items-center p-6">

      {/* MOBILE < sm */}
      <div className="grid grid-cols-[1fr_2fr] gap-2 items-start  sm:hidden">

        <div className="flex flex-col items-center gap-3">
          <IconWrapper><FaMusic className="text-white text-xl" /></IconWrapper>
          <ShimmerLineV />
          <IconWrapper><GiIsland className="text-white text-xl" /></IconWrapper>
          <ShimmerLineV />

          <motion.div
            whileHover={{ scale: 1.2, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative bg-lime-500/10 border-2 border-lime-500 rounded-md grid place-items-center
                       w-12 h-12 p-2 overflow-hidden shadow-[0_0_15px_5px_rgba(162,212,54,0.5)]"
          >
            <FaGamepad className="text-lime-400 text-2xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <ShimmerLineV />

          <IconWrapper><FaFutbol className="text-white text-xl" /></IconWrapper>
          <ShimmerLineV />
          <IconWrapper><PiCookingPotBold className="text-white text-xl" /></IconWrapper>
        </div>

        <div className="min-w-0 h-full flex flex-col justify-center">
          <h1 className="text-xl mb-2 flex items-center gap-1">
             {t.hobbyCard.firstWord}{" "}
            <span className="italic text-lime-400 inline-block relative h-[1em] overflow-hidden w-[6ch]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={words[index]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 leading-[1em] text-left"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="text-gray-300 text-sm">
            {t.hobbyCard.description}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-center">
        <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <IconWrapper>
            <FaMusic className="text-white text-lg sm:text-xl md:text-2xl" />
          </IconWrapper>

          <ShimmerLine />

          <IconWrapper>
            <GiIsland className="text-white text-lg sm:text-xl md:text-2xl" />
          </IconWrapper>

          <ShimmerLine />

          <motion.div
            whileHover={{ scale: 1.2, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative bg-lime-500/10 border-2 border-lime-500 rounded-md flex items-center justify-center
               w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-2 sm:p-2.5 md:p-3 overflow-hidden
               shadow-[0_0_15px_5px_rgba(162,212,54,0.5)]"
          >
            <FaGamepad className="text-lime-400 text-2xl sm:text-3xl md:text-4xl" />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <ShimmerLine reverse />

          <IconWrapper>
            <FaFutbol className="text-white text-lg sm:text-xl md:text-2xl" />
          </IconWrapper>

          <ShimmerLine reverse />

          <IconWrapper>
            <PiCookingPotBold className="text-white text-lg sm:text-xl md:text-2xl" />
          </IconWrapper>
        </div>


        <div className="text-center mt-4">
          <h1 className="md:text-2xl text-xl mb-2 flex justify-center items-center">
            {t.hobbyCard.firstWord}{" "}
            <span className="italic text-lime-400 inline-block text-align-left relative h-[1em] overflow-hidden w-[6ch]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={words[index]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 leading-[1em] text-center"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="text-gray-300 text-sm">
          {t.hobbyCard.description}
          </p>
        </div>
      </div>
    </div>
  )
}


function IconWrapper({ children }: { children: React.ReactNode }) {
  const [hoverAnim, setHoverAnim] = useState({ scale: 1, rotate: 0 })

  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  return (
    <motion.div
      onHoverStart={() =>
        setHoverAnim({ scale: getRandom(1.1, 1.3), rotate: getRandom(-12, 12) })
      }
      whileHover={hoverAnim}
      transition={{ type: "spring", stiffness: 250 }}
      className="bg-[var(--color-secondary)] border-2 border-[var(--color-border-10)]
                 rounded-md flex items-center justify-center
                 size-10 sm:size-12 md:size-14 p-2 sm:p-3 cursor-pointer"
    >
      {children}
    </motion.div>
  )
}


function ShimmerLine({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative w-0 sm:w-4 md:w-10 h-[2px] bg-[#33313d] overflow-hidden isolate">
      <motion.div
        className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-90 mix-blend-screen brightness-125 z-10"
        animate={{ x: reverse ? ['100%', '-200%'] : ['-100%', '200%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

function ShimmerLineV({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative w-[2px] h-4 bg-[#33313d] overflow-hidden isolate">
      <motion.div
        className="absolute left-0 top-0 w-full h-10 bg-gradient-to-b from-transparent via-lime-400 to-transparent opacity-90 mix-blend-screen brightness-125"
        animate={{ y: reverse ? ['100%', '-200%'] : ['-100%', '200%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}