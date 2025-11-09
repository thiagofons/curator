import { slug } from "github-slugger"
import { marked } from "marked"

/**
 * Converts arbitrary text to a URL-friendly slug using github-slugger.
 * @param content Input text
 * @returns kebab-case slug or null when empty
 */
export const slugify = (content: string) => {
  if (!content) return null

  return slug(content)
}

/**
 * Renders a markdown inline string to HTML using marked.
 * Note: for full blocks, use markdown pipelines in Astro.
 */
export const markdownify = (content: string) => {
  if (!content) return null

  return marked.parseInline(content)
}

/**
 * Humanizes a slug/string to Title Case-ish with spaces.
 */
export const humanize = (content: string) => {
  if (!content) return null

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (m) => m.toUpperCase())
}

/**
 * Removes HTML tags and collapses whitespace, returning plain text.
 */
export const plainify = (content: string) => {
  if (!content) return null

  const filterBrackets = content.replace(/<\/?[^>]+(>|$)/gm, "")
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "")
  const stripHtml = htmlEntityDecoder(filterSpaces)
  return stripHtml
}

/** Decodes common HTML entities to their literal characters. */
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList: {
    [key: string]: string
  } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  }
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity] as string
    },
  )
  return htmlWithoutEntities
}
