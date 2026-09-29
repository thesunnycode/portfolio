# Portfolio build — Cinematic Noir (violet glow)

Build Sunny Kr Singh's Java / Spring Boot backend portfolio in the chosen Cinematic Noir look: near-black background, faint star dots and grain, one soft violet glow, Syne display type, JetBrains Mono for labels, Inter for body text.

## Pages

- **Home (/)**: the full one-page portfolio
- **/projects/hyperlocal**, **/projects/ecommerce-api**, **/projects/resolveai**: full case-study pages

## Home page sections (in order)

1. **Nav**: fixed, "S.K.S" mark, numbered links (01 Work, 02 Experience, 03 Stack, 04 Education), pill Resume button. Shrinks on scroll. On mobile it becomes a full-screen menu.
2. **Hero**: centered with the violet glow behind it. Pill badge "Open to backend roles". Giant headline "I build reliable backend systems." (the name sits above it in small mono text, so the headline states the positioning). Short supporting line, **View Projects** (violet) and **Download Resume** (outline) buttons, "Scroll to explore" line.
3. **System panel**: a dark "console" panel that rises from the bottom of the hero (in the style of your Magic UI reference). It shows the ResolveAI pipeline as connected glowing nodes: POST /tickets → Outbox → Worker → PII Redaction → LLM → Signals → Deterministic Policy. Hovering a node shows a one-line explanation.
4. **About**: short, honest intro. MCA student, backend-focused, learning through real systems.
5. **Experience**: Redalis internship, Jun–Sep 2026, with the 5 documented bullets.
6. **Case studies**: the split 2-column grid from the mockup, extended to 3 projects. Each tile has a status tag (Completed / In Development), subtitle, a line-drawn architecture diagram (no placeholder images), tech list, and an arrow to its case-study page.
7. **Engineering decisions**: short answers to questions like "Why PostgreSQL? / Why Redis? / Why an outbox? / Why a modular monolith? / Why pgvector? / Why a deterministic policy after AI?".
8. **Stack**: tree-style groups (Java, Data, Engineering, Tools, AI systems). No percentages. Hovering an item shows how it was used.
9. **Principles**: 4 short lines (correctness, deterministic decisions, security by design, measure what matters).
10. **Education**: the two-column record from the mockup (MCA 8.739, BCA 8.29) with the tick-bar detail.
11. **Resume call-out**: "Want the complete overview?" with Download Resume.
12. **Contact and footer**: large email link, GitHub / LinkedIn / LeetCode, a faint giant "BACKEND_SYSTEMS" wordmark, © 2026, Bengaluru.

## Case-study page structure

Overview, Problem, Solution, Architecture diagram, Key features, Engineering decisions, Security, Database / API design, Stack, Challenges, Status, GitHub / demo links. ResolveAI gets extra sections: ticket state machine, SLA engine, hybrid retrieval, citation-enforced drafts, incident correlation (38 tickets → one incident). It is clearly marked **In Development**.

## Content rules

- Only the facts from your brief. No invented metrics, awards or technologies.
- Links you haven't given me (GitHub, LinkedIn, LeetCode, resume file) will be clearly marked placeholders until you send them.
- Location is Bengaluru everywhere. The mockup's "Patna / 2025" footer text will be corrected.

## Motion and accessibility

Slow glow "breathing", fade-ins as you scroll, node highlights on hover. All motion turns off when "reduce motion" is enabled. Headings in proper order, visible keyboard focus, good contrast, and nothing spills sideways on mobile (diagrams scroll horizontally on small screens).

## Technical details

- Design tokens go in `src/styles.css` (oklch): void, nova #8B5CF6, nebula, stardust, border. Fonts load via `<link>` in `__root.tsx`. Dark only, because the design is built around it.
- Data lives in `src/data/` (profile, experience, projects, skills, education, decisions). Components live in `src/components/portfolio/` (Nav, Hero, SystemPanel, ArchitectureDiagram, CaseStudyTile, DecisionList, StackTree, etc.).
- Routes: `index.tsx`, `projects.$slug.tsx`, with a not-found state for unknown slugs.
- Each route gets its own title, description and og tags. Home title: "Sunny Kr Singh — Java & Spring Boot Backend Developer". Plus Person JSON-LD.
- Diagrams are SVG/CSS. There's no backend and no contact form (just an email link).
- Record structure rules in AGENTS.md and design rules in project memory.
