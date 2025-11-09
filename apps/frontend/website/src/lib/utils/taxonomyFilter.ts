import { slugify } from "@/lib/utils/textConverter";

/**
 * Filters posts by a taxonomy collection (e.g., categories or tags).
 * @param posts List of posts with `data[name]` arrays
 * @param name Taxonomy field name in `data` (e.g., "categories")
 * @param key Slug (already slugified) to match
 */
const taxonomyFilter = (posts: any[], name: string, key: any) =>
  posts.filter((post) =>
    post.data[name].map((name: string) => slugify(name)).includes(key)
  );

export default taxonomyFilter;
