'use client';
import React from 'react';
import Image from "next/image";
import clsx from 'clsx';

type Props = {
  src: string;
  hoverSrc: string;
  alt?: string;
  className?: string;
  pulseMs?: number;
  burstMs?: number;
  strength?: number;
  glowRGB?: string;
};

export default function GlitchPhoto({
  src,
  hoverSrc,
  alt = '',
  className = '',
  pulseMs = 10000,
  burstMs = 2000,
  strength = 5.5,
  glowRGB = '162 212 54',
}: Props) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden select-none will-change-transform",
        className
      )}
      style={{
        "--pulse": `${pulseMs}ms`,
        "--burst": `${burstMs}ms`,
        "--shift": `${strength}px`,
        "--glow": glowRGB,
      } as React.CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="absolute inset-0 object-cover"
        sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 640px,
         (max-width: 1024px) 384px,
         (max-width: 1280px) 341px,
         (max-width: 1536px) 426px,
         512px"
        priority={false} 
        decoding="async"
      />

      <Image
        src={hoverSrc}
        alt=""
        fill
        aria-hidden
        className="alt-img absolute inset-0 object-cover"
        sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 640px,
         (max-width: 1024px) 384px,
         (max-width: 1280px) 341px,
         (max-width: 1536px) 426px,
         512px"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
      />

      <span
        aria-hidden
        className="g1 absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <span
        aria-hidden
        className="g2 absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <span
        aria-hidden
        className="h1 absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${hoverSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <span
        aria-hidden
        className="h2 absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${hoverSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <style jsx>{`

        .g1,.g2,.h1,.h2 {
          mix-blend-mode: screen;
          will-change: transform, opacity, clip-path;
          filter: drop-shadow(0 0 0 rgba(var(--glow), 0.95));
          -webkit-mask-image: repeating-linear-gradient(
            to bottom,
            #000 0 3px, transparent 3px 10px
          );
          mask-image: repeating-linear-gradient(
            to bottom,
            #000 0 3px, transparent 3px 10px
          );
        }

   
          :global(.alt-img) {
            will-change: opacity;
            animation: swap var(--pulse) steps(1, end) infinite;
            opacity: 0; 
          }

        .g1 { animation: periodic-base var(--pulse) steps(1, end) infinite; }
        .g2 { animation: periodic-base var(--pulse) steps(1, end) infinite; animation-delay: calc(var(--pulse) * 0.08); }
        .h1 { animation: periodic-alt  var(--pulse) steps(1, end) infinite; }
        .h2 { animation: periodic-alt  var(--pulse) steps(1, end) infinite; animation-delay: calc(var(--pulse) * 0.08); }

        @keyframes swap {
          0%, 89%   { opacity: 0; }
          90%, 98%  { opacity: 1; }
          98.01%, 100% { opacity: 0; }
        }

        @keyframes periodic-base {
          0%, 88%   { opacity: 0; transform: translate(0,0); }
          89%       { opacity: 0; }
          90%       { opacity: 0; }      
          98%       { opacity: 0; }
          98.01%    { opacity: .28; transform: translate(0,0) skewX(0.5deg); }
          100%      { opacity: 0; transform: translate(0,0); }
        }

        @keyframes periodic-alt {
          0%, 89%   { opacity: 0;   transform: translate(0,0); }
          90%       { opacity: .45; transform: translate(var(--shift), -0.6px); }
          92%       { opacity: .4;  transform: translate(calc(var(--shift) * -1), .6px); }
          94%       { opacity: .35; transform: translate(calc(var(--shift) * .5), 0); }
          96%       { opacity: .28; transform: translate(0,0) skewX(0.5deg); }
          98%,100%  { opacity: 0;   transform: translate(0,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .g1,.g2,.h1,.h2,.alt-img { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </div>
  );
}
