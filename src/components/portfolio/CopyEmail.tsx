import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`min-w-[7.5rem] text-right font-mono text-[10px] uppercase tracking-widest transition-colors ${
        copied ? "text-nova" : "text-stardust hover:text-nova"
      } ${className}`}
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
