/**
 * Barrel exports for Payload accessors and types.
 * Import from `@/lib/payload` across the website codebase.
 */
export { CMS_BASE_URL } from "./client";
export {
  getPayloadPosts,
  getPayloadPostBySlug,
  getPayloadPostsByAuthorSlug,
  getPayloadPostsByCategorySlug,
} from "./posts";
export { getPayloadAuthors, getPayloadAuthorBySlug } from "./authors";
export {
  getPayloadCategories,
  getPayloadCategoryBySlug,
} from "./categories";

// Optionally export types
export type { AdaptedPost } from "./posts";
export type { AdaptedAuthor } from "./authors";
export type { AdaptedCategory } from "./categories";
