import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectVisuals({ visuals }: { visuals: { label: string; caption: string }[] }) {
  const [selected, setSelected] = useState(0);
  const current = visuals[selected];
  if (!current) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-border pb-4" role="group" aria-label="Screenshot slots">
        {visuals.map((visual, index) => (
          <Button key={visual.label} type="button" variant="ghost" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`h-auto rounded-none border px-4 py-2 font-mono text-[11px] ${selected === index ? "border-nova bg-nova/10 text-nebula" : "border-border text-stardust hover:border-foreground/30"}`}>
            <span className="text-nova">{String(index + 1).padStart(2, "0")}</span>{visual.label}
          </Button>
        ))}
      </div>
      <div className="mt-5 flex aspect-[16/9] min-h-48 flex-col items-center justify-center border border-dashed border-border bg-card/40 px-5 text-center">
        <ImageIcon aria-hidden className="mb-5 h-7 w-7 text-stardust/60" strokeWidth={1} />
        <p className="font-display text-lg font-semibold">{current.label}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-stardust">{current.caption}</p>
      </div>
    </div>
  );
}