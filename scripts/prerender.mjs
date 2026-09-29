// Renders each route through the built SSR handler and writes static HTML
// into .output/public so the site can be served from GitHub Pages.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const out = ".output/public";
const { default: ssr } = await import(pathToFileURL(join(".output", "server", "_ssr", "ssr.mjs")).href);
const slugs = ["resolveai", "hyperlocal", "ecommerce-api"];
const routes = [
  ["/", "index.html"],
  ...slugs.map((s) => [`/projects/${s}`, `projects/${s}/index.html`]),
  ["/__not-found__", "404.html"],
];

for (const [route, file] of routes) {
  const res = await ssr.fetch(new Request(`http://localhost${route}`));
  const expected = file === "404.html" ? 404 : 200;
  if (res.status !== expected) throw new Error(`${route} returned ${res.status}, expected ${expected}`);
  const target = join(out, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await res.text());
  console.log("wrote", target);
}
