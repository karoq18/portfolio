import { useLayoutEffect, useMemo, useRef, useCallback } from "react";

type Milestone = { year: string; title: string; where: string; desc?: string };

export default function Timeline({
  items,
  speedSec = 8,
}: { items: Milestone[]; speedSec?: number }) {

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  const step = useMemo(() => speedSec / Math.max(items.length + 1, 2), [items.length, speedSec]);

  const setLiRef = useCallback(
  (idx: number) => (el: HTMLLIElement | null) => { liRefs.current[idx] = el; },
  []
);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const recalc = () => {
      const box = wrap.getBoundingClientRect();
      const H = box.height || 1;
      const bandPct = 12;
      const bandFrac = bandPct / 100;

      liRefs.current.forEach((li) => {
        if (!li) return;
        const node = li.querySelector(".timeline-node") as HTMLElement | null;
        const nodeBox = (node ?? li).getBoundingClientRect();

        const centerY = (nodeBox.top + nodeBox.height / 2) - box.top;
        let ratio = centerY / H;
        ratio = Math.min(1, Math.max(0, ratio));

        const delaySec = Math.min(
          speedSec,
          Math.max(0, (1 - ratio) * speedSec - (bandFrac * 0.5) * speedSec)
        );

        li.style.setProperty("--node-delay", `${delaySec}s`);
      });
    };

    requestAnimationFrame(recalc);

    const ro = new ResizeObserver(() => recalc());
    ro.observe(wrap);
    liRefs.current.forEach((li) => li && ro.observe(li));
    return () => ro.disconnect();
  }, [items.length, speedSec]);

  return (
    <div className="h-auto lg:overflow-hidden min-h-0 flex flex-col">
      <div ref={wrapRef} className="mt-4 relative flex-1 min-h-0">

        <div
          ref={railRef}
          className="timeline-rail"
          style={{ "--speed": `${speedSec}s` } as React.CSSProperties}
        />

        <ol className="pl-10 pr-2 space-y-4 pt-2 overflow-visible lg:h-full lg:overflow-y-auto">
          {items.map((m, i) => (
            <li key={i} 
            ref={setLiRef(i)} 
            className="relative group"
            >
              <span
                className="timeline-node"
                style={{
                  animation: `node-pop ${speedSec}s linear infinite`,

                  animationDelay: `var(--node-delay, ${(i + 1) * step}s)`,
                }}
              />

              <time className="text-[11px] font-semibold tracking-wide text-white/80">
                {m.year}
              </time>

              <div className="text-sm font-semibold mt-0.5">
                {m.title}
                <div className="text-xs font-light mt-0.5">{m.where}</div>
                <div className="timeline-title-underline transition-transform duration-300 group-hover:scale-x-100 scale-x-95" />
              </div>

              {m.desc && <p className="text-sm text-white/80 mt-1 max-w-prose leading-relaxed">{m.desc}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
