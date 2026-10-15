import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const entry = join(dist, "index.source.html");
if (!existsSync(entry)) {
  throw new Error("Expected Vite build output dist/index.source.html is missing.");
}
renameSync(entry, join(dist, "index.html"));

for (const folder of ["assets", "illustrations"]) {
  if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
  const from = join(dist, folder);
  if (!existsSync(from)) continue;

  // Only old Vite-generated JS/CSS files are removed; hand-authored files are preserved.
  if (folder === "assets") {
    for (const name of readdirSync(folder)) {
      if (/^index(?:\.source)?-[A-Za-z0-9_-]+\.(?:js|css)$/.test(name)) unlinkSync(join(folder, name));
    }
  }

  for (const filename of readdirSync(from)) {
    copyFileSync(join(from, filename), join(folder, filename));
  }
}
copyFileSync(join(dist, "index.html"), "index.html");
copyFileSync(join(dist, "favicon.svg"), "favicon.svg");

const html = readFileSync("index.html", "utf8");
if (!html.includes("/dyadzen/assets/") || html.includes("/src/main.jsx")) {
  throw new Error("Published root index.html does not point to the built JavaScript/CSS.");
}
console.log("Published production HTML, CSS, JS and illustrations into repository root.");
