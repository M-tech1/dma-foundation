/**
 * Blog / activities data layer, backed by the foundation's Drupal CMS (JSON:API).
 *
 * Posts are Drupal "Article" nodes at {BLOG_API_URL}/jsonapi/node/article:
 *   title, created, body (HTML), field_image (one or more photos), field_tags (optional).
 *
 * Pages only ever call getPosts(), getPost() and getCategories(), so swapping CMS
 * later means rewriting this file alone. Responses are cached and refreshed every
 * REVALIDATE seconds; if the API is unreachable the blog shows "no posts" rather
 * than failing the page.
 *
 * Brand guidelines (sections 9.1 and 13): posts must never show or name
 * identifiable clients without written consent.
 */

const API = (process.env.BLOG_API_URL ?? "https://api.dmaimpact.org").replace(/\/$/, "");
const REVALIDATE = 300;

export type Image = { src: string; alt: string; width?: number; height?: number };

export type Post = {
  /** "<nid>-<title-slug>"; only the leading node id is used for lookups. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO timestamp */
  date: string;
  category?: string;
  cover?: Image;
  gallery: Image[];
  author: string;
  /** Sanitised body HTML from the CMS. */
  html: string;
  readingMinutes: number;
};

export type PostSummary = Omit<Post, "html" | "gallery">;

/* ───────── JSON:API plumbing ───────── */

type Ref = { type: string; id: string; meta?: { alt?: string; width?: number; height?: number } };
type Resource = {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, { data: Ref | Ref[] | null }>;
};
type Doc = { data: Resource[]; included?: Resource[]; links?: { next?: { href: string } } };

const QUERY = "include=field_image,field_tags&sort=-created&filter[status]=1";

async function fetchDoc(url: string): Promise<Doc | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.api+json" },
      next: { revalidate: REVALIDATE, tags: ["blog"] },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as Doc;
  } catch (err) {
    console.error("[blog] CMS request failed:", url, err);
    return null;
  }
}

/** Fetches every page of a collection, merging `included`. */
async function fetchAll(url: string): Promise<Doc | null> {
  const first = await fetchDoc(url);
  if (!first) return null;
  const doc: Doc = { data: [...first.data], included: [...(first.included ?? [])] };
  for (let next = first.links?.next?.href, guard = 0; next && guard < 20; guard++) {
    const page = await fetchDoc(next);
    if (!page) break;
    doc.data.push(...page.data);
    doc.included!.push(...(page.included ?? []));
    next = page.links?.next?.href;
  }
  return doc;
}

/* ───────── HTML helpers ───────── */

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—", hellip: "…" };
const decode = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) =>
    e[0] === "#" ? String.fromCodePoint(parseInt(e.slice(e[1] === "x" ? 2 : 1), e[1] === "x" ? 16 : 10)) : ENTITIES[e.toLowerCase()] ?? m);

const toText = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const clip = (s: string, max = 180) => (s.length <= max ? s : s.slice(0, s.lastIndexOf(" ", max)).replace(/[,;:.\s]+$/, "") + "…");

/**
 * Defence in depth on top of Drupal's text-format filtering: drops scripts, inline
 * handlers and javascript: URLs, makes CMS-relative links absolute, and turns
 * whole-bold paragraphs (how editors write subheadings) into real <h2>s.
 */
function cleanHtml(html: string) {
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
    .replace(/(href|src)=(["'])\/(?!\/)/gi, `$1=$2${API}/`)
    .replace(/<p>\s*<strong>([^<]{1,140})<\/strong>\s*<\/p>/gi, "<h2>$1</h2>");
}

/** First real paragraph, skipping "Date: …" / "Location: …" style lead-ins. */
function excerptFrom(html: string) {
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => toText(m[1]));
  return clip(paras.find((p) => p.length >= 80) ?? toText(html));
}

/** URL slug, at most ~80 chars, cut on a word boundary. */
export const slugify = (s: string) => {
  const full = s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return full.length <= 80 ? full : full.slice(0, 81).replace(/-[^-]*$/, "");
};

/* ───────── mapping ───────── */

function toPost(node: Resource, included: Map<string, Resource>): Post {
  const a = node.attributes as {
    drupal_internal__nid: number; title: string; created: string;
    body?: { processed?: string; value?: string; summary?: string } | null;
  };
  const refs = (k: string) => {
    const d = node.relationships?.[k]?.data;
    return d ? (Array.isArray(d) ? d : [d]) : [];
  };

  const images: Image[] = refs("field_image").flatMap((r) => {
    const file = included.get(r.id);
    const url = (file?.attributes.uri as { url?: string } | undefined)?.url;
    if (!url) return [];
    return [{ src: url.startsWith("http") ? url : `${API}${url}`, alt: r.meta?.alt || a.title, width: r.meta?.width, height: r.meta?.height }];
  });
  const tags = refs("field_tags").map((r) => included.get(r.id)?.attributes.name as string | undefined).filter(Boolean) as string[];

  const raw = a.body?.processed ?? a.body?.value ?? "";
  const summary = a.body?.summary?.trim();
  const words = toText(raw).split(" ").filter(Boolean).length;

  return {
    slug: `${a.drupal_internal__nid}-${slugify(a.title)}`,
    title: a.title,
    excerpt: summary ? clip(toText(summary)) : excerptFrom(raw),
    date: a.created,
    category: tags[0],
    cover: images[0],
    gallery: images.slice(1),
    author: "DMA Foundation",
    html: cleanHtml(raw),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

const index = (doc: Doc) => new Map((doc.included ?? []).map((r) => [r.id, r]));

const summarise = ({ html: _h, gallery: _g, ...p }: Post): PostSummary => p;

/* ───────── public API ───────── */

/** All published posts, newest first. */
export async function getPosts(): Promise<PostSummary[]> {
  const doc = await fetchAll(`${API}/jsonapi/node/article?${QUERY}&page[limit]=50`);
  if (!doc) return [];
  const inc = index(doc);
  return doc.data.map((n) => summarise(toPost(n, inc)));
}

/** Looks a post up by the node id at the start of its slug. */
export async function getPost(slug: string): Promise<Post | null> {
  const nid = Number.parseInt(slug, 10);
  if (!Number.isFinite(nid)) return null;
  const doc = await fetchDoc(`${API}/jsonapi/node/article?${QUERY}&filter[drupal_internal__nid]=${nid}`);
  const node = doc?.data[0];
  return node ? toPost(node, index(doc)) : null;
}

/** Tag names in use, for the category filter (empty when nothing is tagged). */
export async function getCategories(): Promise<string[]> {
  const cats = (await getPosts()).map((p) => p.category).filter(Boolean) as string[];
  return [...new Set(cats)].sort();
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
