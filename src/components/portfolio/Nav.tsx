import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const links = [
  { n: "01", label: "Work", hash: "work" },
  { n: "02", label: "Experience", hash: "experience" },
  { n: "03", label: "Stack", hash: "stack" },
  { n: "04", label: "Education", hash: "education" },
];

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/70 py-3 backdrop-blur-xl" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8" aria-label="Main">
        <Link to="/" className="flex items-center gap-4 font-mono text-sm font-bold uppercase tracking-tighter text-nova">THESUNNYCODE<span aria-hidden className="hidden h-px w-8 bg-foreground/40 md:block" /><span className="hidden font-mono text-[10px] font-normal tracking-[0.2em] text-stardust md:block">Bengaluru / 12.97° N</span></Link>
        <div className="hidden items-baseline gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} className="font-mono text-[10px] uppercase tracking-widest text-stardust story-link transition-colors hover:text-foreground">
              <sup className="mr-1 text-nova">{l.n}</sup>{l.label}
            </Link>
          ))}
          <span aria-hidden className="h-4 w-px bg-border" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-stardust transition-colors hover:text-foreground" aria-label={s.label}>
              {s.label}
            </a>
          ))}
          <a href={profile.links.resume} className="border border-border bg-foreground/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md transition-colors hover:border-nova hover:text-nebula">
            Resume
          </a>
        </div>
        <button
          type="button"
          className="font-mono text-[11px] uppercase tracking-widest md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-0 -z-10 flex flex-col justify-center gap-6 bg-background/95 px-8 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} onClick={() => setOpen(false)} className="font-display text-5xl tracking-tighter">
              <sup className="mr-2 font-mono text-xs text-nova">{l.n}</sup>{l.label}
            </Link>
          ))}
          <a href={profile.links.resume} className="mt-4 w-fit border border-nova px-6 py-3 font-mono text-xs uppercase tracking-widest text-nebula">Resume</a>
          <div className="mt-2 flex gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-widest text-stardust transition-colors hover:text-foreground">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
