import { CMS_BASE_URL, fetchJSON, pickLocale, resolveMediaURL } from "./client"
import { lexicalToHTML } from "./richtext"

/** Raw author document as returned by Payload. */
export type PayloadAuthor = {
  id: string
  slug: string
  name: string
  bio?: any
  avatar?: any
}

/** Author shape adapted for the website components and routes. */
export type AdaptedAuthor = {
  id: string
  slug: string
  data: {
    title: string
    image?: string
  }
  contentHtml?: string
}

/** Adapts a Payload author document into the site format. */
function adaptAuthor(doc: any): AdaptedAuthor {
  const slug = String(doc.slug ?? doc.id ?? "")
  const bio = pickLocale(doc.bio)
  const name = pickLocale<string>(doc.name)
  const html = lexicalToHTML(bio)
  const image = resolveMediaURL(doc.avatar)
  return {
    id: slug,
    slug,
    data: {
      title: String(name ?? slug),
      image,
    },
    contentHtml: html,
  }
}

/** Fetches all authors with depth=1 (localized to pt). */
export async function getPayloadAuthors(): Promise<AdaptedAuthor[]> {
  type ListResponse = {
    docs: PayloadAuthor[]
  } & Record<string, unknown>
  const url = `${CMS_BASE_URL}/api/authors?limit=100&depth=1&locale=pt`
  try {
    const data = await fetchJSON<ListResponse>(url)
    const docs = Array.isArray((data as any).docs) ? (data as any).docs : []
    return docs.map(adaptAuthor)
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch authors from ${url}. Error: ${err?.message || err}`,
    )
    return []
  }
}

/** Fetches a single author by slug with depth=1 (localized to pt). */
export async function getPayloadAuthorBySlug(
  slug: string,
): Promise<AdaptedAuthor | null> {
  type ListResponse = {
    docs: PayloadAuthor[]
  } & Record<string, unknown>
  const url = `${CMS_BASE_URL}/api/authors?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1&locale=pt`
  try {
    const data = await fetchJSON<ListResponse>(url)
    const doc =
      Array.isArray((data as any).docs) && (data as any).docs.length
        ? (data as any).docs[0]
        : null
    return doc ? adaptAuthor(doc) : null
  } catch (err: any) {
    console.warn(
      `[payload] Failed to fetch author by slug from ${url}. Error: ${err?.message || err}`,
    )
    return null
  }
}
