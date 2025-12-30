const fs = require("fs");
const path = require("path");

const BASE_URL = "https://example.com";
const ROOT_DIR = path.resolve(__dirname, "./"); // پوشه سایت

let urls = [];

function scan(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(item => {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      scan(fullPath);
    }

    if (item.isFile() && item.name.toLowerCase() === "index.html") {
      const urlPath = fullPath
        .replace(ROOT_DIR, "")
        .replace(/\\/g, "/")
        .replace("index.html", "/");
      urls.push(BASE_URL + urlPath);
    }
  });
}

scan(ROOT_DIR);

if (urls.length === 0) {
  console.log("⚠ هیچ index.html پیدا نشد");
  process.exit();
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url => {
  sitemap += `
  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

sitemap += `\n</urlset>`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sitemap, "utf8");

console.log("✅ sitemap.xml ساخته شد");
