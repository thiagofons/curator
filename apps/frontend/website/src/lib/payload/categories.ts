import { CMS_BASE_URL, fetchJSON, pickLocale } from "./client";
import { lexicalToHTML } from "./richtext";

export type PayloadCategory = {
  id: string;
  slug: string;
  title: string;
  description?: any;
};

export type AdaptedCategory = {
  id: string;
  slug: string;
  data: {
    title: string;
  };
  contentHtml?: string;
};

function adaptCategory(doc: any): AdaptedCategory {
  const slug = String(doc.slug ?? doc.id ?? "");
  const title = String(pickLocale(doc.title) ?? slug);
  const description = pickLocale(doc.description);
  const html = lexicalToHTML(description);
  return { id: slug, slug, data: { title }, contentHtml: html };
}

export async function getPayloadCategories(): Promise<AdaptedCategory[]> {
  type ListResponse = { docs: PayloadCategory[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/categories?limit=100&depth=0&locale=pt`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const docs = Array.isArray((data as any).docs) ? (data as any).docs : [];
    return docs.map(adaptCategory);
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch categories from ${url}: ${err?.message || err}`);
    return [];
  }
}

export async function getPayloadCategoryBySlug(slug: string): Promise<AdaptedCategory | null> {
  type ListResponse = { docs: PayloadCategory[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/categories?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0&locale=pt`;
  try {
    const data = await fetchJSON<ListResponse>(url);
    const doc = Array.isArray((data as any).docs) && (data as any).docs.length ? (data as any).docs[0] : null;
    return doc ? adaptCategory(doc) : null;
  } catch (err: any) {
    console.warn(`[payload] Failed to fetch category by slug from ${url}: ${err?.message || err}`);
    return null;
  }
}

