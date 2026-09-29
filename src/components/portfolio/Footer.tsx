import { profile } from "@/data/portfolio";
import { CopyEmail } from "@/components/portfolio/CopyEmail";

export function Footer() {
  const socials = [
    ["GitHub", profile.links.github],
    ["LinkedIn", profile.links.linkedin],
    ["LeetCode", profile.links.leetcode],
  ] as const;
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border px-6 pt-24 pb-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-nova">Contact</p>
        <h2 className="mb-6 max-w-3xl font-display text-4xl font-extrabold tracking-tighter md:text-6xl">Let's build something reliable<span className="text-nova">.</span></h2>
        <p className="mb-10 max-w-xl text-stardust">
          I'm interested in backend engineering, Java / Spring Boot opportunities, and technically challenging systems.
        </p>
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <a href={`mailto:${profile.email}`} className="break-all font-display text-2xl font-bold tracking-tighter underline decoration-nova/40 decoration-1 underline-offset-8 transition-colors hover:text-nova md:text-4xl">
              {profile.email}
            </a>
            <CopyEmail className="self-start md:self-end" />
          </div>
          <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest md:items-end">
            <div className="flex gap-6">
              {socials.map(([l, h]) => (
                <a key={l} href={h} className="text-stardust transition-colors hover:text-foreground" title="Link coming soon">{l}</a>
              ))}
            </div>
            <span className="text-stardust">© 2026 {profile.name} · Bengaluru, India</span>
            <span className="text-stardust/60">{profile.role}</span>
          </div>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none mt-16 -mb-8 -translate-y-[12%] select-none whitespace-nowrap font-display text-[15vw] font-extrabold leading-none tracking-tighter text-foreground/[0.04] [mask-image:linear-gradient(90deg,black_50%,transparent_92%)]"
      >
        BACKEND_SYSTEMS
      </p>
    </footer>
  );
}
