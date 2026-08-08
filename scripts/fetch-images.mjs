// One-off migration script: download the legitimate images off the Squarespace
// CDN (before it is decommissioned), archive the originals, and generate
// optimised display derivatives with sharp. Run: `node scripts/fetch-images.mjs`
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const CDN =
  "https://images.squarespace-cdn.com/content/v1/627c4c7133a2cc18122b8c8b";

// name → CDN path. `use:false` = archived only (retired skin/cosmetic image).
const IMAGES = [
  { name: "dr-amanda-henderson", src: "435ba99b-737e-4c57-b8d0-fa41120d3ec0/Dr+Amanda+Bennett.jpg", kind: "portrait" },
  { name: "pregnancy", src: "1663897421573-TF9L7BV1XM0Z5U76N72K/unsplash-image-ux53SGpRAHU.jpg", kind: "wide" },
  { name: "children", src: "1663897698559-O47M7L94EXFJGINE9SDM/unsplash-image--f7bKsvOgwU.jpg", kind: "wide" },
  { name: "contraception", src: "1663899497760-T6OOCUTLQ3HGVCAIA714/unsplash-image-E4USFFAc_9A.jpg", kind: "wide" },
  { name: "womens-health", src: "1663897875500-GWP8QVQL9U5NQPGNW1KM/unsplash-image--nZynZmR3Ls.jpg", kind: "wide" },
  { name: "lifestyle", src: "1663897934579-RUV3WNFVE6FVZ7LPZPMS/unsplash-image-mmsQUgMLqUo.jpg", kind: "wide" },
  { name: "travel", src: "1663898309039-KCS6KOCIHZ3SIMNBFJKN/unsplash-image-nf7W_hn6DKQ.jpg", kind: "wide" },
  { name: "mens-health", src: "1663900127414-5S0GQMWXBPDBLNU8KJC1/unsplash-image-zfPOelmDc-M.jpg", kind: "wide" },
  // Retired positioning — archived so nothing is lost, but not used on the site.
  { name: "skin-cosmetic-RETIRED", src: "1663897614062-1K4G800WMCU58GLRVIJ0/unsplash-image-zDWoH7r-JsM.jpg", kind: "archive" },
];

const OUT = path.join(process.cwd(), "public", "images");
const ARCHIVE = path.join(OUT, "_archive");

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(ARCHIVE, { recursive: true });

  for (const img of IMAGES) {
    // Archive the best available original (CDN serves WebP).
    const originalUrl = `${CDN}/${img.src}?format=2500w`;
    let buf;
    try {
      buf = await get(originalUrl);
    } catch (e) {
      console.error(`SKIP ${img.name}: ${e.message}`);
      continue;
    }
    await writeFile(path.join(ARCHIVE, `${img.name}.webp`), buf);
    const meta = await sharp(buf).metadata();
    console.log(`archived ${img.name}.webp (${meta.width}x${meta.height})`);

    if (img.kind === "archive") continue;

    if (img.kind === "portrait") {
      // Portrait: 4:5 crop at two widths (webp) + a JPG OG card.
      for (const w of [640, 960]) {
        await sharp(buf)
          .resize(w, Math.round((w * 5) / 4), { fit: "cover", position: "top" })
          .webp({ quality: 82 })
          .toFile(path.join(OUT, `${img.name}-${w}.webp`));
      }
      // Social OG image (1200x630 JPG — crawlers prefer raster jpg/png).
      await sharp(buf)
        .resize(1200, 630, { fit: "cover", position: "attention" })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(path.join(OUT, "og-amanda.jpg"));
      console.log(`  → portrait derivatives + og-amanda.jpg`);
    } else {
      // Wide supporting images: 3:2 at two widths (webp).
      for (const w of [800, 1200]) {
        await sharp(buf)
          .resize(w, Math.round((w * 2) / 3), { fit: "cover", position: "attention" })
          .webp({ quality: 80 })
          .toFile(path.join(OUT, `${img.name}-${w}.webp`));
      }
      console.log(`  → ${img.name} derivatives`);
    }
  }
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
