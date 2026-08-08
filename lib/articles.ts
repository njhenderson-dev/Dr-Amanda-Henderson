import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleCategory =
  | "womens-health"
  | "pregnancy"
  | "childrens-health"
  | "general-gp-care";

export const categoryLabels: Record<ArticleCategory, string> = {
  "womens-health": "Women's Health",
  pregnancy: "Pregnancy",
  "childrens-health": "Children's Health",
  "general-gp-care": "General GP Care",
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  datePublished: string;
  dateModified: string;
  draft: boolean;
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  html: string;
};

marked.setOptions({ gfm: true, breaks: false });

function readAll(): { meta: ArticleMeta; content: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).filter(Boolean).length;
      const meta: ArticleMeta = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        category: (data.category ?? "general-gp-care") as ArticleCategory,
        datePublished: String(data.datePublished ?? "2026-06-24"),
        dateModified: String(data.dateModified ?? data.datePublished ?? "2026-06-24"),
        draft: Boolean(data.draft ?? false),
        readingMinutes: Math.max(2, Math.round(words / 200)),
      };
      return { meta, content };
    });
}

export function getAllArticles(): ArticleMeta[] {
  return readAll()
    .filter((a) => !a.meta.draft)
    .map((a) => a.meta)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getArticlesByCategory(category: ArticleCategory): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticle(slug: string): Article | null {
  const all = readAll();
  const found = all.find((a) => a.meta.slug === slug);
  if (!found || found.meta.draft) return null;
  return { ...found.meta, html: marked.parse(found.content) as string };
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
