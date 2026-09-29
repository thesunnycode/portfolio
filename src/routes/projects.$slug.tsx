import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { Flow } from "@/components/portfolio/Flow";
import { CaseStudyContents, type CaseStudySection } from "@/components/portfolio/CaseStudyContents";
import { ProjectVisuals } from "@/components/portfolio/ProjectVisuals";
import { projects } from "@/data/portfolio";

const baseSections: CaseStudySection[] = [
  { id: "problem", label: "Problem" },
  { id: "workflow", label: "How it works" },
  { id: "architecture", label: "Architecture" },
  { id: "visuals", label: "Visuals" },
  { id: "security", label: "Security" },
  { id: "stack", label: "Stack" },
];
const endSections: CaseStudySection[] = [
  { id: "challenges", label: "Tradeoffs" },
  { id: "decisions", label: "Decisions" },
  { id: "links", label: "Links" },
];

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const title = `${p.name} — ${p.subtitle} | Sunny Kr Singh`;
    return {
      meta: [
        { title },
        { name: "description", content: p.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <div aria-hidden className="pointer-events-none fixed inset-0 grain" />
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-nova">Error 404</p>
      <h1 className="font-display text-5xl font-extrabold tracking-tighter md:text-6xl">
        Project not found<span className="text-nova">.</span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-stardust">This case study doesn't exist — the write-ups live under Selected work.</p>
      <Link to="/" hash="work" className="mt-10 inline-block border border-foreground/20 px-7 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-nova hover:text-nova">← All case studies</Link>
    </div>
  );
}

function SectionLabel({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className="md:col-span-4">
      <p className="font-mono text-[10px] text-nova">{String(index).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((x) => x.slug !== p.slug);
  const sections = [...baseSections, ...(p.progress ? [{ id: "progress", label: "Progress" }] : []), ...endSections];
  let sectionIndex = 0;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-void">
      <div aria-hidden className="pointer-events-none fixed inset-0 star-field" />
      <div aria-hidden className="pointer-events-none fixed inset-0 grain" />
      <Nav />
      <main className="relative">
        {/* HERO — what it does first, capabilities beside */}
        <section className="relative px-6 pt-40 pb-16">
          <div aria-hidden className="glow-breathe absolute top-1/2 left-1/2 h-[360px] w-[560px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nova/20 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl animate-fade-in">
            <Link to="/" hash="work" className="mb-10 inline-block font-mono text-[10px] uppercase tracking-widest text-stardust hover:text-foreground">← All case studies</Link>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="border border-nova/40 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-nebula">{p.tag}</span>
              <span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-widest ${p.status === "In Development" ? "bg-nova/15 text-nebula" : "bg-foreground/5 text-stardust"}`}>{p.status}</span>
            </div>
            <h1 className="mb-4 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-extrabold tracking-tighter">{p.name}<span className="text-nova">.</span></h1>
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-stardust">{p.subtitle}</p>
            <div className="grid gap-10 md:grid-cols-12">
              <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:col-span-8">{p.summary}</p>
              <ul className="space-y-3 border-l border-border pl-5 text-sm leading-relaxed text-stardust md:col-span-4">
                {p.capabilities.map((c) => (
                  <li key={c} className="flex gap-3"><span className="shrink-0 text-nova">—</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-12">
          <div className="sticky top-[60px] z-40 self-start lg:top-28"><CaseStudyContents sections={sections} /></div>
          <div className="min-w-0">
        {/* 01 PROBLEM & GOAL */}
        <section id="problem" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 reveal">
            <SectionLabel index={++sectionIndex}>Problem & goal</SectionLabel>
            <p className="text-stardust md:col-span-8 md:leading-relaxed">{p.problem}</p>
          </div>
        </section>

        {/* 02 HOW IT WORKS */}
        <section id="workflow" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 reveal">
            <SectionLabel index={++sectionIndex}>How it works</SectionLabel>
            <ul className="space-y-3 text-sm leading-relaxed text-stardust md:col-span-8">
              {p.howItWorks.map((step) => <li key={step} className="flex gap-3"><span className="shrink-0 text-nova">—</span>{step}</li>)}
            </ul>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" aria-label="Architecture" className="scroll-mt-36 py-10">
          <div className="reveal mx-auto max-w-5xl rounded-md border border-border bg-card/70 backdrop-blur-xl">
            <h2 className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-stardust">Architecture</h2>
            <div className="p-5 md:p-8"><Flow nodes={p.flow} highlight={p.highlight} /></div>
          </div>
        </section>

        <section id="visuals" className="scroll-mt-36 mx-auto max-w-5xl border-t border-border py-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4"><p className="font-mono text-[10px] text-nova">VISUALS</p><h2 className="mt-1 font-display text-2xl font-bold">Project screens</h2></div>
            <div className="md:col-span-8"><ProjectVisuals visuals={p.visuals} /></div>
          </div>
        </section>

        {/* 03 SECURITY MODEL */}
        <section id="security" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 reveal">
            <SectionLabel index={++sectionIndex}>Security model</SectionLabel>
            <ul className="space-y-3 text-sm leading-relaxed text-stardust md:col-span-8">
              {p.security.map((s) => <li key={s} className="flex gap-3"><span className="shrink-0 text-nova">—</span>{s}</li>)}
            </ul>
          </div>
        </section>

        {/* BUILT WITH */}
        <section id="stack" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 reveal">
            <SectionLabel index={++sectionIndex}>Built with</SectionLabel>
            <div className="flex flex-wrap content-start gap-2 md:col-span-8">
              {p.stack.map((t) => <span key={t} className="border border-border px-3 py-1.5 font-mono text-[11px] text-foreground/80">{t}</span>)}
            </div>
          </div>
        </section>

        {/* LIVE PROGRESS — per-project extra (ResolveAI) */}
        {p.progress && (
          <section id="progress" aria-label="Live progress" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
            <div className="reveal border border-border bg-card/40">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-nova">Live progress</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stardust">Updated as work lands</p>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="border-b border-border p-6 md:border-r md:border-b-0 md:p-8">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-nebula">Built so far</p>
                  <ul className="space-y-4">
                    {p.progress.done.map((d) => (
                      <li key={d} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                        <span className="mt-0.5 shrink-0 font-mono text-[10px] text-nova">✓</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:p-8">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-stardust">Next up</p>
                  <ul className="space-y-4">
                    {p.progress.next.map((d) => (
                      <li key={d} className="flex gap-3 text-sm leading-relaxed text-stardust">
                        <span className="mt-0.5 shrink-0 font-mono text-[10px] text-foreground/40">→</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 04 CHALLENGES & TRADEOFFS */}
        <section id="challenges" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="border-t border-border py-10">
            <div className="grid gap-4 md:grid-cols-12 reveal">
              <SectionLabel index={++sectionIndex}>Challenges & tradeoffs</SectionLabel>
              <div className="space-y-6 md:col-span-8">
                {p.challenges.map((c) => (
                  <details key={c.t} className="group border-l-2 border-nova/40 pl-5 open:border-nova" open={p.challenges[0] === c ? true : undefined}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold marker:hidden [&::-webkit-details-marker]:hidden">
                      {c.t}<span aria-hidden className="font-mono text-nova transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pt-2 text-sm leading-relaxed text-stardust">{c.d}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 DECISIONS — brief */}
        <section id="decisions" className="scroll-mt-36 mx-auto max-w-5xl pb-4">
          <div className="border-t border-border py-10">
            <div className="grid gap-4 md:grid-cols-12 reveal">
              <SectionLabel index={++sectionIndex}>Decisions</SectionLabel>
              <div className="space-y-3 md:col-span-8">
                {p.decisions.map((d) => (
                  <p key={d} className="text-sm leading-relaxed text-stardust transition-colors hover:text-foreground">{d}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LINKS */}
        <section id="links" className="scroll-mt-36 mx-auto max-w-5xl pb-20">
          <div className="grid gap-4 border-y border-border py-10 md:grid-cols-12 reveal">
            <h2 className="font-display text-2xl font-bold tracking-tight md:col-span-4">Links</h2>
            <div className="flex flex-wrap gap-4 md:col-span-8">
              <span className="border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-stardust">Project repository coming soon</span>
            </div>
          </div>
        </section>

        {/* NEXT */}
        <section className="mx-auto max-w-5xl pb-28">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-nova">Next</p>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} to="/projects/$slug" params={{ slug: o.slug }} className="reveal group bg-void p-8 transition-colors hover:bg-card">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-stardust">{o.status}</p>
                <h3 className="font-display text-3xl font-bold tracking-tighter transition-transform group-hover:translate-x-1">{o.name} →</h3>
              </Link>
            ))}
          </div>
        </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
