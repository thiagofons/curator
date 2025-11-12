/**
 * Barrel exports for Payload accessors and types.
 * Import from `@/lib/payload` across the website codebase.
 */

export { getPayloadAuthorBySlug, getPayloadAuthors } from "./authors";
export { getPayloadCategories, getPayloadCategoryBySlug } from "./categories";
export { CMS_BASE_URL } from "./client";
export {
  getPayloadPostBySlug,
  getPayloadPosts,
  getPayloadPostsByAuthorSlug,
  getPayloadPostsByCategorySlug,
} from "./posts";
export type { AdaptedAuthor } from "./authors";
export type { AdaptedCategory } from "./categories";
// Optionally export types
export type { AdaptedPost } from "./posts";
