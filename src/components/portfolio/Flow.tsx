import { useEffect, useState } from "react";

type Node = { label: string; note: string };

/**
 * Symmetric pipeline diagram: every node gets an equal-width column,
 * connectors carry an animated data pulse, and the flow auto-steps
 * until the visitor interacts. Stacks vertically on small screens.
 */
export function Flow({ nodes, highlight }: { nodes: Node[]; highlight: number; compact?: boolean }) {
  const [active, setActive] = useState(highlight);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 2600);
    return () => clearInterval(id);
  }, [touched, nodes.length]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <div>
      <ol
        className="grid gap-3 md:gap-0"
        style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
      >
        {nodes.map((n, i) => {
          const on = i === active;
          const passed = i < active;
          return (
            <li key={n.label} className="relative flex flex-col items-center max-md:col-span-full md:px-2">
              {i < nodes.length - 1 && (
                <span
                  aria-hidden
                  className="flow-line pointer-events-none absolute left-[calc(50%+1.625rem)] right-[calc(-50%+1.625rem)] top-[1.375rem] hidden h-px md:block"
                  data-on={passed || on ? "true" : "false"}
                />
              )}
              <button
                type="button"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                aria-pressed={on}
                className={`group relative z-10 flex h-11 w-11 items-center justify-center border font-mono text-[11px] transition-all duration-300 hover:-translate-y-0.5 ${
                  on
                    ? "scale-110 border-nova bg-nova text-background shadow-[0_0_32px_-4px_var(--color-nova)]"
                    : passed
                      ? "border-nova/60 bg-nova/10 text-nebula"
                      : "border-border bg-card text-stardust hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <span className="absolute inset-1 border border-current opacity-25" aria-hidden />
                {String(i + 1).padStart(2, "0")}
                {on && <span aria-hidden className="absolute inset-0 animate-ping border border-nova/60" />}
              </button>
              <span
                className={`mt-3 text-center font-mono text-[10px] uppercase leading-tight tracking-widest transition-colors duration-300 ${
                  on ? "text-foreground" : "text-stardust"
                }`}
              >
                {n.label}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-8 flex items-start gap-3 border-t border-border pt-4">
        <span className="font-mono text-[11px] text-stardust">{String(active + 1).padStart(2, "0")} /</span>
        <p key={active} className="animate-fade-in font-mono text-[11px] text-nebula" aria-live="polite">
          {nodes[active]?.note}
        </p>
      </div>
    </div>
  );
}
