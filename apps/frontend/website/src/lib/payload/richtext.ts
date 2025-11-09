/**
 * Helpers to convert Payload Lexical richtext to plain text / HTML.
 * These utilities are intentionally minimal and cover common nodes
 * like headings, paragraphs, links, and lists.
 */

/**
 * Extracts a flat array of nodes from a Lexical editor state.
 */
function lexicalNodes(input: any): any[] {
  if (!input) return []
  if (Array.isArray(input)) return input
  if (input.root && Array.isArray(input.root.children))
    return input.root.children
  if (Array.isArray(input.children)) return input.children
  return []
}

/** Escapes HTML entities for safe rendering. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Returns plain text content for a given node recursively. */
function textFromNode(node: any): string {
  if (!node) return ""
  if (typeof node === "string") return node
  if (node.type === "text" && typeof node.text === "string") return node.text
  const children = Array.isArray(node.children) ? node.children : []
  return children.map(textFromNode).join("")
}

/**
 * Converts a Lexical editor state to plain text.
 * Suitable for summaries / descriptions.
 */
export function lexicalToPlainText(input: any): string {
  const nodes = lexicalNodes(input)
  const parts: string[] = []
  for (const n of nodes) {
    if (!n) continue
    if (n.type === "linebreak") {
      parts.push("\n")
      continue
    }
    const t = textFromNode(n)
    if (t)
      parts.push(
        t + (n.type === "paragraph" || n.type === "heading" ? "\n\n" : ""),
      )
  }
  const text = parts.join("")
  return text.replace(/\n{3,}/g, "\n\n").trim()
}

/**
 * Converts a Lexical editor state to simplified HTML.
 * Intended for server-rendered content blocks.
 */
export function lexicalToHTML(input: any): string {
  const nodes = lexicalNodes(input)
  const htmlParts: string[] = []

  const renderNode = (node: any): string => {
    if (!node) return ""
    if (node.type === "text") {
      return escapeHtml(String(node.text ?? ""))
    }
    if (node.type === "linebreak") return "<br/>"

    const children = Array.isArray(node.children) ? node.children : []
    const inner = children.map(renderNode).join("")

    if (node.type === "paragraph") return `<p>${inner}</p>`
    if (node.type === "heading") {
      const tag = typeof node.tag === "string" ? node.tag : "h2"
      return `<${tag}>${inner}</${tag}>`
    }
    if (node.type === "link") {
      const url = node.url ? String(node.url) : "#"
      return `<a href="${escapeHtml(url)}">${inner}</a>`
    }
    if (node.type === "list") {
      const tag = node.listType === "number" || node.tag === "ol" ? "ol" : "ul"
      const items = children
        .map((c: any) => `<li>${renderNode(c)}</li>`)
        .join("")
      return `<${tag}>${items}</${tag}>`
    }
    if (node.type === "listitem") {
      return `<li>${inner}</li>`
    }
    return inner ? `<div>${inner}</div>` : ""
  }

  for (const n of nodes) {
    htmlParts.push(renderNode(n))
  }
  return htmlParts.join("")
}
