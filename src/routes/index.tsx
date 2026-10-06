import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { CopyEmail } from "@/components/portfolio/CopyEmail";
import { Flow } from "@/components/portfolio/Flow";
import { decisions, education, experience, principles, profile, projects, stack } from "@/data/portfolio";

const TITLE = "Sunny Kr Singh — Java & Spring Boot Backend Developer";
const DESC =
  "Backend developer in Bengaluru building Java and Spring Boot systems: REST APIs, JWT/RBAC security, PostgreSQL, Redis, and AI-assisted backends.";
const OG_IMAGE = "https://thesunnycode.me/og-image.png";
const CANONICAL = "https://thesunnycode.me/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          email: `mailto:${profile.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Index,
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-nova">
      <span aria-hidden className="inline-block h-px w-8 bg-nova/60" />
      {children}
    </p>
  );
}

function Index() {
  const resolve = projects[0]!;
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void">

      <div aria-hidden className="pointer-events-none fixed inset-0 grain" />
      <Nav />

      <main className="relative">
        {/* HERO — name first */}
        <section className="relative flex flex-col px-6 pt-36 pb-20">
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mb-12 grid gap-10 border-b border-border pb-14 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div className="rise-in mb-8 flex w-fit items-center gap-2 border border-nova/50 px-3 py-1" style={{ animationDelay: "0ms" }}>
                  <span className="h-1.5 w-1.5 animate-pulse bg-nova" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-nova">Open to backend roles</span>
                </div>
                <h1 className="rise-in font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-extrabold tracking-tighter" style={{ animationDelay: "80ms" }}>
                  Sunny <span className="font-light text-stardust">Kr</span> Singh<span className="text-nova">.</span>
                </h1>
                <p className="rise-in mt-6 font-mono text-xs uppercase tracking-[0.25em] text-nova md:text-sm" style={{ animationDelay: "160ms" }}>
                  Java / Spring Boot Backend Engineer
                </p>
                <p className="rise-in mt-4 max-w-xl text-stardust" style={{ animationDelay: "240ms" }}>
                  I build REST APIs, security and data models that hold up under real use — currently working on ResolveAI.
                </p>
              </div>
              <div className="rise-in flex flex-col justify-end lg:col-span-3" style={{ animationDelay: "200ms" }}>
                <p className="mb-6 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-stardust">
                  Bengaluru, India
                </p>
                <div className="flex flex-col gap-3">
                  <a href="#work" className="bg-foreground px-7 py-4 text-sm font-bold tracking-tight text-background transition-colors hover:bg-nova">View Work</a>
                  <a href={profile.links.resume} className="border border-foreground/20 px-7 py-4 text-sm font-bold tracking-tight transition-colors hover:border-nova">Resume</a>
                  <div className="flex items-center justify-between gap-4 border-t border-border py-3">
                    <a href={`mailto:${profile.email}`} className="font-mono text-xs uppercase tracking-widest text-stardust transition-colors hover:text-nova">Email Sunny ↘</a>
                    <CopyEmail />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* SYSTEM IN FOCUS — ResolveAI pipeline, offset right */}
          <div className="relative z-10 mx-auto mt-4 w-full max-w-7xl animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stardust">
                  System in<br />focus<span className="text-nova">.</span>
                </p>
              </div>
              <div className="lg:col-span-10">
                <div className="border border-border bg-card/80">
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="h-2 w-2 rounded-full bg-nova" />
                      <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-stardust">resolveai / triage-pipeline</span>
                    </div>
                    <Link to="/projects/$slug" params={{ slug: resolve.slug }} className="font-mono text-[10px] uppercase tracking-widest text-nebula transition-colors hover:text-foreground">Open case study ↗</Link>
                  </div>
                  <div className="p-5 md:p-8">
                    <Flow nodes={resolve.flow} highlight={resolve.highlight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT — narrow label rail, offset body */}
        <section id="about" className="scroll-mt-20 relative mx-auto max-w-7xl border-t border-border px-6 py-32 reveal">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3"><Label>About</Label></div>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85 md:col-span-7 md:col-start-6">
              <p>
                I'm an MCA student and a backend-focused developer. I build real systems with <span className="text-foreground">Java and Spring Boot</span>, and I care about the parts that have to be right: REST API design, authentication and authorization, database modelling, and how the pieces fit together.
              </p>
              <p className="text-stardust">
                Most of what I know comes from building projects end to end: a delivery backend with a state machine, a payments API with verified webhooks, and now ResolveAI, where I'm exploring how AI fits into a backend without taking over its decisions.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE — short overview, full detail lives in the résumé */}
        <section id="experience" className="scroll-mt-20 mx-auto max-w-7xl border-t border-border px-6 py-32 reveal">
          <div className="mb-14 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4"><Label>Experience</Label></div>
            <h2 className="font-display text-4xl font-extrabold tracking-tighter md:col-span-7 md:col-start-6 md:text-5xl">Where I've built<span className="text-nova">.</span></h2>
          </div>
          <article className="border border-border bg-card/40 p-8 md:p-12">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-display text-4xl font-bold tracking-tighter md:text-5xl">{experience.company}</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stardust">{experience.period}</span>
            </div>
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-widest">
              <span className="text-nova">{experience.title}</span>
              <span className="h-px w-4 bg-border" aria-hidden />
              <span className="text-stardust">{experience.location}</span>
            </div>
            <p className="max-w-3xl border-t border-border pt-8 text-lg leading-relaxed text-foreground/85">
              {experience.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {experience.scope.map((s) => (
                <span key={s} className="border border-border px-3 py-1.5 font-mono text-[11px] text-stardust">{s}</span>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
              <p className="text-sm text-stardust">The full task-by-task breakdown lives in the résumé<span className="text-nova">.</span></p>
              <a href={profile.links.resume} className="shrink-0 font-mono text-xs uppercase tracking-widest text-nebula transition-colors hover:text-foreground">Open résumé ↘</a>
            </div>
          </article>
        </section>


        {/* CASE STUDIES — uniform card grid */}
        <section id="work" className="scroll-mt-20 relative border-t border-border py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 grid gap-6 md:grid-cols-12 reveal">
              <div className="md:col-span-7">
                <Label>Selected work</Label>
                <h2 className="font-display text-5xl font-extrabold tracking-tighter md:text-7xl">Case<br />Studies<span className="text-nova">.</span></h2>
              </div>
              <p className="self-end font-mono text-[10px] uppercase tracking-widest text-stardust md:col-span-3 md:col-start-10 md:text-right">3 Systems<br />Full write-ups inside</p>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {projects.map((p, i) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group reveal lift relative flex flex-col justify-between bg-void p-8 transition-colors hover:bg-foreground/[0.03] before:absolute before:left-0 before:top-0 before:h-px before:w-0 before:bg-nova before:transition-all before:duration-500 hover:before:w-full"
                >
                  <div>
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] text-nova">0{i + 1}</span>
                      <span className={`border px-3 py-1 font-mono text-[9px] uppercase tracking-widest ${p.status === "In Development" ? "border-nova/40 text-nebula" : "border-border text-stardust"}`}>{p.tag}</span>
                    </div>
                    <h3 className="mb-2 font-display text-2xl font-bold tracking-tighter transition-transform duration-300 group-hover:translate-x-1">{p.name}</h3>
                    <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-stardust">{p.subtitle}</p>
                    <p className="mb-8 text-sm leading-relaxed text-stardust">{p.summary}</p>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-border pt-6">
                    <div>
                      <span className="mb-2 block truncate font-mono text-[10px] text-foreground/50">{p.stack.slice(0, 3).join(" • ")}</span>
                      <span className={`font-mono text-[9px] uppercase tracking-widest ${p.status === "In Development" ? "text-nebula" : "text-stardust/60"}`}>{p.status}</span>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border transition-all group-hover:bg-foreground group-hover:text-background group-hover:-rotate-45">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DECISIONS — heading pushed right */}
        <section className="mx-auto max-w-7xl px-6 py-32 reveal">
          <div className="mb-14 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4"><Label>Engineering decisions</Label></div>
            <h2 className="font-display text-4xl font-extrabold tracking-tighter md:col-span-7 md:col-start-6 md:text-5xl">The reasoning behind the systems<span className="text-nova">.</span></h2>
          </div>
          <dl className="grid border-t border-border md:grid-cols-2">
            {decisions.map((d, i) => (
              <div
                key={d.q}
                className={`reveal group relative border-b border-border py-7 transition-colors duration-300 hover:bg-foreground/[0.03] md:px-6 ${i % 2 === 0 ? "md:border-r md:pl-0" : ""}`}
              >
                <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px origin-top scale-y-0 bg-nova transition-transform duration-300 group-hover:scale-y-100 md:block" />
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-nova">{String(i + 1).padStart(2, "0")}</span>
                  <dt className="font-display text-xl transition-colors duration-300 group-hover:text-nova">{d.q}</dt>
                </div>
                <dd className="pl-8 text-sm leading-relaxed text-stardust">{d.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* STACK */}
        <section id="stack" className="scroll-mt-20 border-t border-border px-6 py-32">
          <div className="mx-auto max-w-7xl reveal">
            <Label>Stack</Label>
            <h2 className="mb-14 max-w-2xl font-display text-4xl font-extrabold tracking-tighter md:text-5xl">Grouped by role, not ranked<span className="text-nova">.</span></h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {stack.map((g) => (
                <div key={g.group}>
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-nebula">{g.group}</p>
                  <ul className="border-l border-border font-mono text-[13px]">
                    {g.items.map((it) => (
                      <li key={it.name} className="group relative py-1.5 pl-4">
                        <span className="absolute top-1/2 left-0 h-px w-3 bg-border group-hover:bg-nova" />
                        <span className="text-foreground/85 group-hover:text-foreground">{it.name}</span>
                        <span className="block max-h-0 overflow-hidden text-[11px] text-stardust transition-all duration-300 group-hover:max-h-16 group-hover:pt-1">{it.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES — staggered columns */}
        <section className="mx-auto max-w-7xl border-t border-border px-6 py-32 reveal">
          <Label>How I work</Label>
          <div className="grid gap-10 md:grid-cols-4">
            {principles.map((p, i) => (
              <div key={p.t}>
                <p className="mb-3 font-mono text-[10px] text-nova">0{i + 1}</p>
                <h3 className="mb-3 font-display text-xl font-bold tracking-tight">{p.t}</h3>
                <p className="text-sm leading-relaxed text-stardust">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-20 px-6 py-24">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 border-y border-border py-12 md:flex-row reveal">
            {education.map((e, i) => (
              <div key={e.degree} className={`flex-1 ${i ? "md:border-l md:border-border md:pl-12" : ""}`}>
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-stardust">{i ? "Foundation" : "Academic record"}</p>
                <h3 className="font-display text-2xl font-bold tracking-tight">{e.degree}</h3>
                <p className="mt-1 text-sm text-stardust">{e.school}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-nova">{e.score} — {e.period}</p>
              </div>
            ))}
            <div aria-hidden className="flex flex-none items-end gap-2">
              <div className="h-6 w-1 bg-foreground/10" />
              <div className="h-10 w-1 bg-foreground/20" />
              <div className="h-16 w-1 bg-nova" />
              <div className="h-12 w-1 bg-foreground/20" />
            </div>
          </div>
        </section>

        {/* RESUME CTA — left-aligned panel */}
        <section className="px-6 pb-32">
          <div className="relative mx-auto max-w-7xl overflow-hidden border border-border bg-card/70 p-10 md:p-16 reveal">
            <div aria-hidden className="absolute top-full left-[20%] h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nova/30 blur-[110px]" />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-3xl font-extrabold tracking-tighter md:col-span-8 md:text-5xl">Want the complete overview<span className="text-nova">?</span></h2>
              <a href={profile.links.resume} className="w-fit bg-nova px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all  md:col-span-4 md:justify-self-end">Download Resume</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
