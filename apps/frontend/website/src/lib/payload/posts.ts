import { CMS_BASE_URL, fetchJSON, pickLocale } from "./client";
import { lexicalToHTML, lexicalToPlainText } from "./richtext";

/** Raw post document as returned by Payload. */
export type PayloadPost = {
  id: string;
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  body?: any;
  author?: any;
  categories?: any[];
};

/**
 * Post shape adapted for the website components and routes.
 * Contains normalized fields, plain text, and rendered HTML.
 */
export type AdaptedPost = {
  id: string;
  slug: string;
  data: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    date?: string;
    authors: string[];
    authorSlugs?: string[];
    categories: string[];
    categorySlugs?: string[];
  };
  body?: string;
  contentHtml?: string;
};

/**
 * Adapts a Payload post document into the site format.
 */
function adapt(doc: any): AdaptedPost {
  const slug = String(doc.slug ?? doc.id ?? "");
  const created = String(doc.createdAt ?? doc.updatedAt ?? "");
  const body = pickLocale(doc.body);
  const title = pickLocale<string>(doc.title);
  const plain = lexicalToPlainText(body);
  const html = lexicalToHTML(body);

  const authorObj = doc.author && typeof doc.author === "object" ? doc.author : null;
  const authorsArr: string[] = authorObj && authorObj.name ? [String(pickLocale(authorObj.name))] : [];
  const authorSlugs: string[] | undefined = authorObj && authorObj.slug ? [String(authorObj.slug)] : undefined;

  const catDocs: any[] = Array.isArray(doc.categories) ? doc.categories : [];
  const categories: string[] = catDocs
    .map((c) => (c && typeof c === "object" ? pickLocale<string>(c.title) : undefined))
    .filter(Boolean) as string[];
  const categorySlugs: string[] | undefined = catDocs
    .map((c) => (c && typeof c === "object" && c.slug ? String(c.slug) : undefined))
    .filter(Boolean) as string[];

  return {
    id: slug,
    slug,
    data: {
      title: String(title ?? slug),
      meta_title: String(title ?? slug),
      description: plain ? plain.slice(0, 200) : undefined,
      image: undefined,
      date: created,
      authors: authorsArr,
      authorSlugs,
      categories,
      categorySlugs,
    },
    body: plain,
    contentHtml: html,
  };
}

/**
 * Fetches posts from Payload (paginated up to 100) and adapts them.
 * @param options Optional filters (e.g., authorId)
 */
export async function getPayloadPosts(options?: { authorId?: string }): Promise<AdaptedPost[]> {
  type ListResponse = { docs: PayloadPost[] } & Record<string, unknown>;
  const params = new URLSearchParams();
  params.set("limit", "100");
  params.set("depth", "1");
  params.set("locale", "pt");
  if (options?.authorId) {
    params.set("where[author][equals]", options.authorId);
  }
  const url = `${CMS_BASE_URL}/api/posts?${params.toString()}`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const docs = Array.isArray((data as any).docs) ? (data as any).docs : [];
    const adapted = docs.map(adapt);
    adapted.sort((a, b) => new Date(b.data.date || 0).valueOf() - new Date(a.data.date || 0).valueOf());
    return adapted;
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch posts from ${url}. Error: ${err?.message || err}`);
    return [];
  }
}

/** Fetches a single post by slug with depth=1 and locale=pt. */
export async function getPayloadPostBySlug(slug: string): Promise<AdaptedPost | null> {
  type ListResponse = { docs: PayloadPost[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1&locale=pt`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const doc = Array.isArray((data as any).docs) && (data as any).docs.length ? (data as any).docs[0] : null;
    return doc ? adapt(doc) : null;
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch post by slug from ${url}. Error: ${err?.message || err}`);
    return null;
  }
}

/** Fetches posts filtered by an author's slug (client-side filter). */
export async function getPayloadPostsByAuthorSlug(slug: string): Promise<AdaptedPost[]> {
  type ListResponse = { docs: any[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/posts?limit=100&depth=1&locale=pt`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const docs = (Array.isArray((data as any).docs) ? (data as any).docs : []).filter((d) => {
      const a = d && d.author && typeof d.author === "object" ? d.author : null;
      return a && a.slug === slug;
    });
    const adapted = docs.map(adapt);
    adapted.sort((a, b) => new Date(b.data.date || 0).valueOf() - new Date(a.data.date || 0).valueOf());
    return adapted;
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch posts by author from ${url}. Error: ${err?.message || err}`);
    return [];
  }
}

/** Fetches posts filtered by a category slug (client-side filter). */
export async function getPayloadPostsByCategorySlug(slug: string): Promise<AdaptedPost[]> {
  type ListResponse = { docs: any[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/posts?limit=100&depth=1&locale=pt`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const docs = Array.isArray((data as any).docs) ? (data as any).docs : [];
    const filtered = docs.filter((d) =>
      Array.isArray(d.categories) && d.categories.some((c: any) => c && typeof c === "object" && c.slug === slug),
    );
    const adapted = filtered.map(adapt);
    adapted.sort((a, b) => new Date(b.data.date || 0).valueOf() - new Date(a.data.date || 0).valueOf());
    return adapted;
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch posts by category from ${url}. Error: ${err?.message || err}`);
    return [];
  }
}
