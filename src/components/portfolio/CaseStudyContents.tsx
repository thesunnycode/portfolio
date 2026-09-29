import { useEffect, useState } from "react";

export type CaseStudySection = { id: string; label: string };

export function CaseStudyContents({ sections }: { sections: CaseStudySection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const update = () => {
      const current = sections.reduce((last, section) => {
        const element = document.getElementById(section.id);
        return element && element.getBoundingClientRect().top <= 180 ? section.id : last;
      }, sections[0]?.id ?? "");
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="-mx-6 mb-8 border-y border-border bg-background/95 backdrop-blur-xl lg:mx-0 lg:mb-0 lg:border-y-0 lg:border-l lg:bg-transparent lg:pl-5 lg:backdrop-blur-none">
      <p className="hidden font-mono text-[10px] uppercase tracking-widest text-stardust lg:mb-5 lg:block">On this page</p>
      <ol className="flex overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
        {sections.map((section, index) => (
          <li key={section.id} className="shrink-0">
            <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} className={`flex items-center gap-2 border-b-2 px-3 py-3 font-mono text-[10px] uppercase transition-colors lg:border-b-0 lg:border-l-2 lg:py-2 ${active === section.id ? "border-nova text-nova" : "border-transparent text-stardust hover:text-foreground"}`}>
              <span aria-hidden className="opacity-60">{String(index + 1).padStart(2, "0")}</span>{section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}