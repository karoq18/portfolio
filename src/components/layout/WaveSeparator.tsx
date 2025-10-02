'use client';

import { motion } from 'framer-motion';

export default function WaveSeparator({
  flip = false,
  color = 'var(--color-section)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  borderWidth = 2,
  showRing = true,
  ringColor = '#ffffff',
  ringOpacity = 0.10,
  ringRadius = 1,
  className = '',
}: {
  flip?: boolean;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  showRing?: boolean;
  ringColor?: string;
  ringOpacity?: number;
  ringRadius?: number;
  className?: string;
}) {
  const fillDs = [
    'M0 80L30 75C60 70 120 60 180 65C240 70 300 90 360 95C420 100 480 90 540 80C600 70 660 60 720 65C780 70 840 90 870 100L900 110L900 0L0 0Z',
    'M0 90L30 95C60 100 120 110 180 105C240 100 300 80 360 75C420 70 480 80 540 90C600 100 660 110 720 105C780 100 840 80 870 70L900 60L900 0L0 0Z',
    'M0 80L30 75C60 70 120 60 180 65C240 70 300 90 360 95C420 100 480 90 540 80C600 70 660 60 720 65C780 70 840 90 870 100L900 110L900 0L0 0Z',
  ];

  const waveDs = fillDs.map((d) =>
    d.replace(/L900 0L0 0Z$/, '').replace(/L900 0 L0 0 Z$/, '')
  );

  const leftYs = [80, 90, 80];
  const rightYs = [110, 60, 110];

  const transition = { duration: 8, repeat: Infinity, ease: 'easeInOut' as const };

  const safeFillDs = (fillDs ?? []).filter(Boolean);
  const safeWaveDs = (waveDs ?? []).filter(Boolean);
  const safeLeftYs = (leftYs ?? []).filter((v) => Number.isFinite(v));
  const safeRightYs = (rightYs ?? []).filter((v) => Number.isFinite(v));

  return (
    <svg
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-[60px] ${flip ? 'rotate-180' : ''} ${className}`}
      preserveAspectRatio="none"
      style={{ overflow: 'visible' }}
    >
      {showRing && (
        <defs>
          <filter
            id="outer-ring"
            filterUnits="userSpaceOnUse"
            x={-1}
            y={-20}
            width={902}
            height={240}
          >
            <feMorphology in="SourceAlpha" operator="dilate" radius={ringRadius} result="DILATED" />
            <feComposite in="DILATED" in2="SourceAlpha" operator="out" result="OUTLINE" />
            <feFlood floodColor={ringColor} floodOpacity={ringOpacity} result="RINGCOLOR" />
            <feComposite in="RINGCOLOR" in2="OUTLINE" operator="in" result="RING" />
            <feMerge>
              <feMergeNode in="RING" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

      )}

      <motion.path
        initial={false}              // ⬅ ważne
        d={safeFillDs[0]}            // ⬅ startowa wartość
        fill={color}
        animate={{ d: safeFillDs }}  // ⬅ keyframes
        transition={transition}
      />

      <g filter={showRing ? 'url(#outer-ring)' : undefined}>
        {/* STROKE PATH */}
        <motion.path
          initial={false}               // ⬅ ważne
          d={safeWaveDs[0]}             // ⬅ startowa wartość
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
          vectorEffect="non-scaling-stroke"
          shapeRendering="geometricPrecision"
          animate={{ d: safeWaveDs }}   // ⬅ keyframes
          transition={transition}
        />

        {/* LEWA LINIA */}
        <motion.line
          initial={false}                 // ⬅ ważne
          x1="0" x2="0" y1="0"
          y2={safeLeftYs[0]}              // ⬅ startowa wartość
          stroke={borderColor}
          strokeWidth={borderWidth}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          animate={{ y2: safeLeftYs }}    // ⬅ keyframes
          transition={transition}
        />

        {/* PRAWA LINIA */}
        <motion.line
          initial={false}                  // ⬅ ważne
          x1="900" x2="900" y1="0"
          y2={safeRightYs[0]}              // ⬅ startowa wartość
          stroke={borderColor}
          strokeWidth={borderWidth}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
          animate={{ y2: safeRightYs }}    // ⬅ keyframes
          transition={transition}
        />
      </g>
    </svg>
  );
}