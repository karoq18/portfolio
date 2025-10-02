'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion';

export type RadarTarget = {
  angleUI: number;
  r: number;
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export type RadarProps = {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  beamWidth?: number;
  rings?: number[];
  targets: RadarTarget[];
};

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function uiDegToMathDeg(uiDeg: number) {

  return ((90 - uiDeg) % 360 + 360) % 360;
}

export default memo(function Radar({
  cx = 150, cy = 90, rx = 140, ry = 49,
  beamWidth = 18,
  rings = [140, 100, 60],
  targets,
}: RadarProps) {
  const phase = useMotionValue(0);
  const autoRef = useRef<ReturnType<typeof animate> | null>(null);
  const [highlightRadius, setHighlightRadius] = useState<number | null>(null);

  const scaleRy = (rxi: number) => (rxi / rx) * ry;

  useEffect(() => {
    autoRef.current = animate(phase, 360, { duration: 8, ease: 'linear', repeat: Infinity });
    return () => autoRef.current?.stop();
  }, [phase]);

  const focusAngle = (angleMath: number) => {
    autoRef.current?.stop();
    animate(phase, angleMath, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
  };
  const resumeAuto = () => {
    const start = phase.get();
    autoRef.current = animate(phase, start + 360, { duration: 8, ease: 'linear', repeat: Infinity });
  };

  const sectorPath = useTransform(phase, (degMath) => {
    const a = toRad(degMath - beamWidth / 2);
    const b = toRad(degMath + beamWidth / 2);
    const x1 = cx + rx * Math.cos(a);
    const y1 = cy + ry * Math.sin(a);
    const x2 = cx + rx * Math.cos(b);
    const y2 = cy + ry * Math.sin(b);
    const largeArc = beamWidth > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${rx} ${ry} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  });
  const beamOpacity = useTransform(phase, [0, 360], [0.95, 0.95]);

  return (
    <div className="absolute inset-0 overflow-visible">
      <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full opacity-95">
        <defs>
          <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(163,230,53,0.03)" />
            <stop offset="40%" stopColor="rgba(163,230,53,0.18)" />
            <stop offset="80%" stopColor="rgba(163,230,53,0.35)" />
            <stop offset="100%" stopColor="rgba(163,230,53,0.00)" />
          </linearGradient>
        </defs>

        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={r}
            ry={scaleRy(r)}
            fill="none"
            stroke={highlightRadius === r ? 'rgba(163,230,53,0.45)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={highlightRadius === r ? 2 : 1}
          />
        ))}

        <motion.path d={sectorPath as unknown as string} fill="url(#beamGrad)" style={{ opacity: beamOpacity }} />

        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry={(5 / rx) * ry}
            stroke="rgba(162, 230, 53, 0.13)"
            fill="none"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.25], opacity: [0.25, 0] }}
            transition={{ duration: 1.15, repeat: Infinity, delay: i * 0.28, repeatDelay: 2.1, ease: 'easeOut' }}
          />
        ))}

        {targets.map((t, idx) => (
          <RadarTargetSVG
            key={idx}
            cx={cx}
            cy={cy}
            angleMath={uiDegToMathDeg(t.angleUI)}
            rx={t.r}
            ry={scaleRy(t.r)}
            Icon={t.Icon}
            href={t.href}
            label={t.label}
            phase={phase}
            onHoverStart={() => { setHighlightRadius(t.r); focusAngle(uiDegToMathDeg(t.angleUI)); }}
            onHoverEnd={() => { setHighlightRadius(null); resumeAuto(); }}
          />
        ))}
      </svg>
    </div>
  );
});

function RadarTargetSVG({
  cx, cy, angleMath, rx, ry, Icon, href, label, phase, onHoverStart, onHoverEnd,
}: {
  cx: number; cy: number; angleMath: number; rx: number; ry: number;
  Icon: React.ComponentType<{ className?: string }>;
  href: string; label: string; phase: MotionValue<number>;
  onHoverStart?: () => void; onHoverEnd?: () => void;
}) {
  const x = cx + rx * Math.cos((angleMath * Math.PI) / 180);
  const y = cy + ry * Math.sin((angleMath * Math.PI) / 180);

  const diff = useTransform(phase, (p) => Math.abs(((p - angleMath + 540) % 360) - 180));
  const glow = useTransform(diff, [0, 25, 60, 180], [1, 0.8, 0.2, 0.0]);
  const scale = useTransform(diff, [0, 25, 60, 180], [1.15, 1.08, 1.0, 1.0]);

  const [hovered, setHovered] = useState(false);
  const baseAlpha = useTransform(glow, (g) => 0.35 * g);
  const alpha = useTransform(baseAlpha, (a) => (hovered ? Math.max(a, 0.6) : a));

  const ext = href.startsWith('http');

  return (
    <motion.g
      transform={`translate(${x} ${y})`}
      onPointerEnter={() => { setHovered(true); onHoverStart?.(); }}
      onPointerLeave={() => { setHovered(false); onHoverEnd?.(); }}
      style={{ cursor: 'pointer' }}
    >

      <motion.circle r={16} fill="rgba(162,212,54,0.65)" style={{ opacity: alpha, scale }} filter="url(#radarGlow)" pointerEvents="none" />
      <circle r={13} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />

      <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} aria-label={label}>
        <g>

          <circle
            r={12}
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.1)"
            style={{ backdropFilter: "blur(2px)" }}
          />

          <g transform="translate(-8 -8)">
            <Icon className="text-white/90" />
          </g>
        </g>
      </a>
    </motion.g>
  );
}

