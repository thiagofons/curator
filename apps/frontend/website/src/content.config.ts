import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

/**
 * Astro content collection definitions for static content areas.
 * Note: blog posts/authors/categories are sourced from Payload CMS;
 * these collections are used for site pages and legacy content only.
 */

// Homepage Collection schema
const homepageCollection = defineCollection({
  schema: z.object({
    banner: z
      .object({
        title: z.string(),
        image: z.string(),
      })
      .optional(),
    call_to_action: z
      .object({
        title: z.string(),
        content: z.string(),
        image: z.string(),
        button_label: z.string(),
        button_link: z.string(),
      })
      .optional(),
  }),
})

// Homepage Collection schema
const blogCollection = defineCollection({
  schema: z.object({
    banner: z
      .object({
        title: z.string(),
        image: z.string(),
      })
      .optional(),
    call_to_action: z
      .object({
        title: z.string(),
        content: z.string(),
        image: z.string(),
        button_label: z.string(),
        button_link: z.string(),
      })
      .optional(),
  }),
})

// Post collection schema
const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date(),
    image: z.string().optional(),
    authors: z.array(z.string()).default([
      "admin",
    ]),
    categories: z.array(z.string()).default([
      "others",
    ]),
    tags: z.array(z.string()).default([
      "others",
    ]),
    draft: z.boolean().optional(),
  }),
})

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/contact",
  }),
  schema: z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/authors",
  }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    meta_title: z.string().optional(),
  }),
})

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pages",
  }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

/** Exported Astro collections used by the site build. */
export const collections = {
  homepage: homepageCollection,
  blog: blogCollection,
  posts: postsCollection,
  pages: pagesCollection,
  authors: authorsCollection,
  contact: contactCollection,
}
