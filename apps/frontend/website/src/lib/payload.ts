// Utility to fetch posts from Payload CMS and adapt to the site's expected shape
// Uses localhost:4001 in development and cms.curator.com.br in production

type PayloadPost = {
  id: string;
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  body?: any;
};

type AdaptedPost = {
  id: string; // reuse slug as id to match existing routes
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
  };
  body?: string; // plain text for previews
  contentHtml?: string; // full HTML for single page rendering
};

type PayloadAuthor = {
  id: string;
  slug: string;
  name: string;
  bio?: any;
  avatar?: any;
};

type AdaptedAuthor = {
  id: string; // use slug for consistency with routing
  slug: string;
  data: {
    title: string;
    image?: string;
  };
  contentHtml?: string;
};

// CMS base URL can be overridden via env var.
// Falls back to localhost in dev and production hostname otherwise.
const ENV = (import.meta as any).env || {};
export const CMS_BASE_URL: string =
  (ENV.PUBLIC_CMS_BASE_URL as string) ||
  (ENV.CMS_BASE_URL as string) ||
  (ENV.DEV ? "http://localhost:4001" : "https://cms.curator.com.br");

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

function lexicalNodes(input: any): any[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (input.root && Array.isArray(input.root.children))
    return input.root.children;
  if (Array.isArray(input.children)) return input.children;
  return [];
}

// Resolve localized Payload fields into a single value.
function pickLocale<T = any>(value: any, preferred: string = "pt"): T {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value as T;
  if (preferred in value) return value[preferred] as T;
  const firstKey = Object.keys(value)[0];
  return firstKey ? (value as any)[firstKey] : value;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textFromNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.type === "text" && typeof node.text === "string") return node.text;
  const children = Array.isArray(node.children) ? node.children : [];
  return children.map(textFromNode).join("");
}

function lexicalToPlainText(input: any): string {
  const nodes = lexicalNodes(input);
  const parts: string[] = [];
  for (const n of nodes) {
    if (!n) continue;
    if (n.type === "linebreak") {
      parts.push("\n");
      continue;
    }
    const t = textFromNode(n);
    if (t)
      parts.push(
        t + (n.type === "paragraph" || n.type === "heading" ? "\n\n" : ""),
      );
  }
  const text = parts.join("");
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function lexicalToHTML(input: any): string {
  const nodes = lexicalNodes(input);
  const htmlParts: string[] = [];

  const renderNode = (node: any): string => {
    if (!node) return "";
    if (node.type === "text") {
      return escapeHtml(String(node.text ?? ""));
    }
    if (node.type === "linebreak") return "<br/>";

    const children = Array.isArray(node.children) ? node.children : [];
    const inner = children.map(renderNode).join("");

    if (node.type === "paragraph") return `<p>${inner}</p>`;
    if (node.type === "heading") {
      const tag = typeof node.tag === "string" ? node.tag : "h2";
      return `<${tag}>${inner}</${tag}>`;
    }
    if (node.type === "link") {
      const url = node.url ? String(node.url) : "#";
      return `<a href="${escapeHtml(url)}">${inner}</a>`;
    }
    if (node.type === "list") {
      const tag = node.listType === "number" || node.tag === "ol" ? "ol" : "ul";
      const items = children
        .map((c: any) => `<li>${renderNode(c)}</li>`)
        .join("");
      return `<${tag}>${items}</${tag}>`;
    }
    if (node.type === "listitem") {
      return `<li>${inner}</li>`;
    }
    // Fallback: wrap unknown nodes in a div to avoid dropping content entirely
    return inner ? `<div>${inner}</div>` : "";
  };

  for (const n of nodes) {
    htmlParts.push(renderNode(n));
  }
  return htmlParts.join("");
}

function adapt(doc: any): AdaptedPost {
  const slug = String(doc.slug ?? doc.id ?? "");
  const created = String(doc.createdAt ?? doc.updatedAt ?? "");
  const body = pickLocale(doc.body);
  const title = pickLocale<string>(doc.title);
  const plain = lexicalToPlainText(body);
  const html = lexicalToHTML(body);
  const authorObj =
    doc.author && typeof doc.author === "object" ? doc.author : null;
  const authorsArr: string[] =
    authorObj && authorObj.name ? [String(pickLocale(authorObj.name))] : [];
  const authorSlugs: string[] | undefined =
    authorObj && authorObj.slug ? [String(authorObj.slug)] : undefined;
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
      categories: [],
    },
    body: plain,
    contentHtml: html,
  };
}

export async function getPayloadPosts(options?: {
  authorId?: string;
}): Promise<AdaptedPost[]> {
  type ListResponse = { docs: PayloadPost[] } & Record<string, unknown>;
  const params = new URLSearchParams();
  params.set("limit", "100");
  params.set("depth", "1");
  params.set("locale", "pt");
  if (options?.authorId) {
    params.set("where[author][equals]", options.authorId);
  }
  const url = `${CMS_BASE_URL}/api/posts?${params.toString()}`;
  let data: ListResponse | null = null;
  try {
    data = await fetchJSON<ListResponse>(url);
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch posts from ${url}. Building with zero posts. Error: ${err?.message || err}`,
    );
    return [];
  }
  const docs = Array.isArray((data as any).docs) ? (data as any).docs : [];
  const adapted = docs.map(adapt);
  // Sort by date desc to match previous behavior
  adapted.sort(
    (a, b) =>
      new Date(b.data.date || 0).valueOf() -
      new Date(a.data.date || 0).valueOf(),
  );
  return adapted;
}

export async function getPayloadPostBySlug(
  slug: string,
): Promise<AdaptedPost | null> {
  type ListResponse = { docs: PayloadPost[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1&locale=pt`;
  let data: ListResponse | null = null;
  try {
    data = await fetchJSON<ListResponse>(url);
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch post by slug from ${url}. Building without this post. Error: ${err?.message || err}`,
    );
    return null;
  }
  const doc =
    Array.isArray((data as any).docs) && (data as any).docs.length
      ? (data as any).docs[0]
      : null;
  return doc ? adapt(doc) : null;
}

// Authors
function resolveMediaURL(file: any): string | undefined {
  if (!file) return undefined;
  if (typeof file === "string") return undefined;
  if (file.url) {
    const url = String(file.url);
    // Ensure absolute URL
    return url.startsWith("http") ? url : `${CMS_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  if (file.filename) return `${CMS_BASE_URL}/api/media/${file.filename}`;
  return undefined;
}

function adaptAuthor(doc: any): AdaptedAuthor {
  const slug = String(doc.slug ?? doc.id ?? "");
  const bio = pickLocale(doc.bio);
  const name = pickLocale<string>(doc.name);
  const html = lexicalToHTML(bio);
  const image = resolveMediaURL(doc.avatar);
  return {
    id: slug,
    slug,
    data: {
      title: String(name ?? slug),
      image,
    },
    contentHtml: html,
  };
}

export async function getPayloadAuthors(): Promise<AdaptedAuthor[]> {
  type ListResponse = { docs: PayloadAuthor[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/authors?limit=100&depth=1&locale=pt`;
  let data: ListResponse | null = null;
  try {
    data = await fetchJSON<ListResponse>(url);
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch authors from ${url}. Building with zero authors. Error: ${err?.message || err}`,
    );
    return [];
  }
  const docs = Array.isArray((data as any).docs) ? (data as any).docs : [];
  return docs.map(adaptAuthor);
}

export async function getPayloadAuthorBySlug(
  slug: string,
): Promise<AdaptedAuthor | null> {
  type ListResponse = { docs: PayloadAuthor[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/authors?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1&locale=pt`;
  let data: ListResponse | null = null;
  try {
    data = await fetchJSON<ListResponse>(url);
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch author by slug from ${url}. Building without this author. Error: ${err?.message || err}`,
    );
    return null;
  }
  const doc =
    Array.isArray((data as any).docs) && (data as any).docs.length
      ? (data as any).docs[0]
      : null;
  return doc ? adaptAuthor(doc) : null;
}

export async function getPayloadPostsByAuthorSlug(
  slug: string,
): Promise<AdaptedPost[]> {
  type ListResponse = { docs: any[] } & Record<string, unknown>;
  const url = `${CMS_BASE_URL}/api/posts?limit=100&depth=1&locale=pt`;
  let data: ListResponse | null = null;
  try {
    data = await fetchJSON<ListResponse>(url);
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch posts by author from ${url}. Building with zero posts for author '${slug}'. Error: ${err?.message || err}`,
    );
    return [];
  }
  const docs = (Array.isArray(data.docs) ? data.docs : []).filter((d) => {
    const a = d && d.author && typeof d.author === "object" ? d.author : null;
    return a && a.slug === slug;
  });
  const adapted = docs.map(adapt);
  adapted.sort(
    (a, b) =>
      new Date(b.data.date || 0).valueOf() -
      new Date(a.data.date || 0).valueOf(),
  );
  return adapted;
}
