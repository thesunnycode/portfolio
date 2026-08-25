# thesunnycode.me

My personal site — **[thesunnycode.me](https://thesunnycode.me)**

Designed in [Framer](https://framer.com) and exported as a static site, hosted on **GitHub Pages**
with a custom domain.

## What's here

| | |
|---|---|
| **Live at** | [thesunnycode.me](https://thesunnycode.me) |
| **Built with** | Framer (visual design tool), exported to static HTML/JS |
| **Hosting** | GitHub Pages from the `main` branch |
| **Domain** | Custom domain via `CNAME`, HTTPS through GitHub |

## Note on the source

This repository holds the **exported static build**, not hand-written source. The design lives in
Framer; this is what gets published. Asset filenames under `assets/` are Framer's build output,
which is why they're hashed and not human-readable.

If you're looking for code I've written, see
**[ecommerce-rest-api](https://github.com/thesunnycode/ecommerce-rest-api)** — a Spring Boot REST
API with JWT authentication and Stripe payments.

## Deployment

Pushing to `main` publishes automatically via GitHub Pages. The `CNAME` file maps the custom
domain and `.nojekyll` stops Jekyll from processing the exported assets.

---

**Sunny Kr Singh** · [GitHub](https://github.com/thesunnycode) ·
[LinkedIn](https://linkedin.com/in/thesunnycode)
