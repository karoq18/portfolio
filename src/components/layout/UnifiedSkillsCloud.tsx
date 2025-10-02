'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TECH_ICONS } from '@/app/config/profile';
import { motion } from "framer-motion";
import * as THREE from 'three';
import { TbSphere, TbSpiral, TbGridDots, TbHeart } from 'react-icons/tb';

type Mode = 'sphere' | 'spiral' | 'grid' | 'heart';
export const MODES: Mode[] = ['sphere', 'spiral', 'grid', 'heart'];

type IconKey = keyof typeof TECH_ICONS;

const ICONS_ORDER: { key: IconKey; color: string }[] = [
  { key: 'html5', color: '#E34F26' },
  { key: 'css3', color: '#1572B6' },
  { key: 'javascript', color: '#F7DF1E' },
  { key: 'typescript', color: '#3178C6' },
  { key: 'react', color: '#61DAFB' },
  { key: 'redux', color: '#764ABC' },
  { key: 'reactQuery', color: '#FF4154' },
  { key: 'zod', color: '#3E67B1' },
  { key: 'node', color: '#68A063' },
  { key: 'express', color: '#000000' },
  { key: 'next', color: '#000000' },
  { key: 'spring', color: '#6DB33F' },
  { key: 'tailwind', color: '#38BDF8' },
  { key: 'bootstrap', color: '#7952B3' },
  { key: 'framerMotion', color: '#FF0050' },
  { key: 'mysql', color: '#4479A1' },
  { key: 'mongodb', color: '#47A248' },
  { key: 'docker', color: '#2496ED' },
  { key: 'postman', color: '#FF6C37' },
  { key: 'wordpress', color: '#21759B' },
  { key: 'drupal', color: '#0678BE' },
  { key: 'ghost', color: '#3f454fff' },
  { key: 'strapi', color: '#2F2E8B' },
  { key: 'astro', color: '#FF5D01' },
  { key: 'gsap', color: '#88CE02' },
  { key: 'git', color: '#F05033' },
  { key: 'github', color: '#c5c5c5ff' },
  { key: 'java', color: '#007396' },
  { key: 'azure', color: '#0078D4' },
  { key: 'vercel', color: '#000000' },
  { key: 'vscode', color: '#007ACC' },
  { key: 'mybb', color: '#000000ff' },
  { key: 'intellij', color: '#A53CFF' },
  { key: 'figma', color: '#ff0000ff' },
];

const RADIUS = 1.7;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));


function sampleParametric(n: number, f: (t: number) => THREE.Vector3, t0 = 0, t1 = 2 * Math.PI) {
  const arr: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const t = t0 + (i / n) * (t1 - t0);
    arr.push(f(t));
  }
  return arr;
}
function normalize(points: THREE.Vector3[], scale = 1) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  points.forEach(p => { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
  const w = Math.max(1e-6, maxX - minX);
  const h = Math.max(1e-6, maxY - minY);
  const s = (2 / Math.max(w, h)) * scale;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return points.map(p => new THREE.Vector3((p.x - cx) * s, (p.y - cy) * s, 0));
}
function makeLayouts(count: number) {
  const sphere: THREE.Vector3[] = [];
  const spiral: THREE.Vector3[] = [];
  const grid: THREE.Vector3[] = [];

  const cols = 5;
  const spacing = 0.5;

  for (let i = 0; i < count; i++) {
    // sphere
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    sphere.push(new THREE.Vector3(x * RADIUS, y * RADIUS, z * RADIUS));

    // spiral
    const angle = i * 0.25;
    const yS = i * 0.15 - count * 0.075;
    const xS = Math.cos(angle) * 1.2;
    const zS = Math.sin(angle) * 1.2;
    spiral.push(new THREE.Vector3(xS, yS, zS));

    // grid
    const row = Math.floor(i / cols);
    const col = i % cols;
    const xG = (col - cols / 2) * spacing;
    const yG = (-(row - 1.5)) * spacing;
    const zG = 0;
    grid.push(new THREE.Vector3(xG, yG, zG));
  }

  // heart
  const heartRaw = sampleParametric(count, (t) => {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return new THREE.Vector3(x, y, 0);
  });
  const heart = normalize(heartRaw, 2);

  return { sphere, spiral, grid, heart };
}
function Icons3D({ mode }: { mode: Mode }) {
  const rotRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const iconDivRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { camera } = useThree();
  const { sphere, spiral, grid, heart } = useMemo(() => makeLayouts(ICONS_ORDER.length), []);
  const modes = { sphere, spiral, grid, heart };
  const positions = useMemo(() => sphere.map(p => p.clone()), [sphere]);

  useFrame(() => {
    const rot = rotRef.current;
    const grp = groupRef.current;
    if (!rot || !grp) return;

    rot.rotation.y += 0.002;
    rot.rotation.x += mode === 'sphere' ? 0.002 : 0;

    positions.forEach((pos, i) => {
      const target = modes[mode][i];
      pos.lerp(target, 0.06);
      const child = grp.children[i];
      if (child) child.position.copy(pos);
    });

    grp.children.forEach((child, i) => {
      child.lookAt(camera.position);

      const worldPos = (child as THREE.Object3D).getWorldPosition(new THREE.Vector3());
      const dist = camera.position.distanceTo(worldPos);
      const minDist = 3, maxDist = 8;

      const opacity = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(dist, minDist, maxDist, 1, 0.3), 0.3, 1);
      const scale = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(dist, minDist, maxDist, 1, 0.6), 0.6, 1);

      const el = iconDivRefs.current[i];
      if (el) {
        el.style.opacity = opacity.toFixed(2);
        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(2)})`;
        el.style.transition = 'opacity 0.2s, transform 0.2s';
      }
    });
  });

  return (
    <group ref={rotRef}>
      <group ref={groupRef}>
        {positions.map((pos, i) => {
          const { key, color } = ICONS_ORDER[i];
          const Icon = TECH_ICONS[key];
          return (
            <group key={i} position={pos.toArray()}>
              <Html center transform distanceFactor={mode === 'sphere' ? 3.5 : 3}>
                <div
                  ref={el => { iconDivRefs.current[i] = el; }}
                  style={{
                    width: '64px', height: '64px', fontSize: '48px',
                    transform: 'translate(-50%, -50%)', position: 'absolute',
                    top: '50%', left: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    willChange: 'transform',
                  }}
                >
                  <Icon size={48} color={color} />
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default function UnifiedSkillsCloud({

  intervalMs = 10000,
  autoCycle = true,
  mode: modeProp,
  onModeChange,
  showControls = true,
  controlsAlign = 'right',        // 'left' | 'center' | 'right'
}: {
  intervalMs?: number;
  autoCycle?: boolean;
  mode?: Mode;
  onModeChange?: (m: Mode) => void;
  showControls?: boolean;
  controlsAlign?: 'left' | 'center' | 'right';
}) {
  const [internalMode, setInternalMode] = useState<Mode>(modeProp ?? 'sphere');
  const [auto, setAuto] = useState(autoCycle);
  const mode = modeProp ?? internalMode;

 const setMode = useCallback((m: Mode | ((prev: Mode) => Mode)) => {
  const next = typeof m === 'function' ? (m as (prev: Mode) => Mode)(mode) : m;
  if (onModeChange) onModeChange(next);
  else setInternalMode(next);
}, [mode, onModeChange]);

  const [showShimmer, setShowShimmer] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);

  function triggerShimmer() {
    setShowShimmer(true);
    setShimmerKey(k => k + 1);
  }

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    triggerShimmer();
  }, [mode]);

  useEffect(() => {
    if (modeProp) setInternalMode(modeProp);
  }, [modeProp]);

  useEffect(() => {
  if (!auto) return;
  const id = setInterval(() => {
    setMode((m) => {
      const i = MODES.indexOf(m);
      return MODES[(i + 1) % MODES.length];
    });
  }, intervalMs);
  return () => clearInterval(id);
}, [auto, intervalMs, setMode]);

  const alignClass =
    controlsAlign === 'left' ? 'justify-start' :
      controlsAlign === 'center' ? 'justify-center' : 'justify-end';

  return (
    <div
      className="h-full w-full grid grid-rows-[9fr_1fr] min-h-0"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(autoCycle)}
    >

      <div className="relative min-h-0 overflow-hidden">
        <Canvas
          className="!absolute inset-0"
          camera={{ position: [0, 0, 5], fov: 60 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          <Icons3D mode={mode} />
        </Canvas>

        {showShimmer && (
          <motion.div
            key={shimmerKey}
            initial={{ x: "-100%" }}
            animate={{ x: "160%" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            onAnimationComplete={() => setShowShimmer(false)}
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          >
            <div
              className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[140%] h-[32%] rotate-45
                bg-gradient-to-r from-transparent via-[rgba(var(--color-primary-rgb),0.08)] to-transparent
                skew-x-12
              "
              style={{ filter: 'blur(25px) brightness(1.1)', opacity: 0.3 }}
            />
          </motion.div>
        )}
      </div>

      <div className={`flex items-end ${alignClass} gap-2`}>
        {showControls && (
          <div className="flex items-end gap-2">
            <ModeButton mode={mode} setMode={setMode} value="sphere" title="Sphere" Icon={TbSphere} />
            <ModeButton mode={mode} setMode={setMode} value="spiral" title="Spiral" Icon={TbSpiral} />
            <ModeButton mode={mode} setMode={setMode} value="grid" title="Grid" Icon={TbGridDots} />
            <ModeButton mode={mode} setMode={setMode} value="heart" title="Heart" Icon={TbHeart} />
          </div>
        )}
      </div>
    </div>
  );
}

function ModeButton({
  mode, setMode, value, title, Icon,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  value: Mode;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const isActive = mode === value;
  return (
    <button
      type="button"
      onClick={() => setMode(value)}
      title={title}
      aria-label={title}
      className={`
        relative size-8 grid place-items-center rounded-md
        border ${isActive ? 'border-[var(--color-primary)]/60' : 'border-white/15'}
        ${isActive ? 'bg-white/10' : 'bg-white/5'}
        text-white/80 hover:text-white
        hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10
        transition shadow-sm focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60
      `}
    >
      <Icon className={`text-base ${isActive ? 'text-white' : ''}`} />
      {isActive && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-md animate-[pulse_glow_1.8s_ease-out_infinite]"
          style={{ boxShadow: '0 0 0 0 rgba(var(--color-primary-rgb),0.5)' }}
        />
      )}
    </button>
  );
}

