import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  access: {
    // Allow public read access for blog posts
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: false,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: false,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      required: false,
      admin: {
        description: "Short summary shown in post cards and the hero section.",
      },
    },
    {
      name: "body",
      type: "richText",
      localized: true,
    },
  ],
};
