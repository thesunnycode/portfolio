<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio structure
- All portfolio content lives in `src/data/portfolio.ts`; components only render it — keeps edits to one file.
- Case studies are one dynamic route `src/routes/projects.$slug.tsx` driven by `projects[]` — adding a project needs no new route.
- Architecture diagrams use the shared `Flow` component (CSS nodes, no images) — consistent, accessible, fast.
- Case-study screenshot slots are data-driven placeholders until genuine project captures arrive — prevents reference imagery being mistaken for actual product evidence.
- Case-study section navigation uses shared section IDs and a sticky index — keeps anchors and scroll state consistent across all projects.
- Navigation between pages uses the router's `defaultViewTransition` cross-fade — no per-page animation code; reduced-motion users get an instant swap.
- Email addresses copy via the shared `CopyEmail` component (hero + footer) — keep copy behavior in one place.
- Favicon is `public/favicon.svg` (framed square + emerald dot); the default `favicon.ico` was removed on purpose.
- Nav brand mark is THESUNNYCODE (the user's handle) — not SKS.DEV.
