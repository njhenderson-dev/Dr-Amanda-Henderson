import { site, practice, fullAddress, serviceAreas, nearbyAreas } from "@/lib/site";

// Experimental AI-discovery file (https://llmstxt.org). A concise, curated
// pointer for answer engines — NOT a replacement for the crawlable HTML/schema.
// The Fees page is intentionally omitted (it is noindex and excluded from AI
// crawlers by request).
export const dynamic = "force-static";

export function GET() {
  const u = site.url;
  const lines = [
    "# Dr Amanda Henderson — Female Family GP, Maroubra, Sydney",
    "",
    `> Dr Amanda Henderson is a female family GP (general practitioner, FRACGP) who consults at ${practice.name}, ${fullAddress}, Australia. She cares for patients of all ages, with particular experience and interest in women's health, pregnancy and preconception care (including shared antenatal care with the Royal Hospital for Women, Randwick), children's health, general family medicine and preventative health. She welcomes patients from across Sydney's eastern suburbs.`,
    "",
    "## Key pages",
    `- [About Dr Amanda Henderson](${u}/about): who she is, qualifications (MBBS, FRACGP), approach and practice location`,
    ...serviceAreas.map(
      (s) => `- [${s.title}](${u}${s.href}): ${s.summary}`,
    ),
    `- [Contact & location](${u}/contact): practice address, phone and online booking`,
    `- [Health articles](${u}/articles): medical articles written by Dr Amanda Henderson`,
    "",
    "## Practice",
    `- Practitioner: Dr Amanda Henderson — female family GP (FRACGP)`,
    `- Practice: ${practice.name}, ${fullAddress}, Australia`,
    `- Phone: ${practice.phone}`,
    `- Bookings: HotDoc (${practice.bookingUrl})`,
    `- Areas served: ${nearbyAreas.join(", ")} (Sydney's eastern suburbs)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
