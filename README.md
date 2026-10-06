# thesunnycode.me

My personal portfolio — **[thesunnycode.me](https://thesunnycode.me)**.

Built with TanStack Start, React, TypeScript and Tailwind CSS. Designed in Lovable.
All content lives in `src/data/portfolio.ts`.

## Develop

```sh
# npm
npm i
npm run dev

# bun
bun i
bun run dev
```

> Both `package-lock.json` (npm) and `bun.lock` (bun) are committed.
> Use whichever runtime you prefer — just stay consistent within a session.

## Deploy

`npm run build:static` (or `bun run build:static`) builds the app and prerenders every
route to `.output/public`.

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes that folder to
GitHub Pages (custom domain via `CNAME`).
