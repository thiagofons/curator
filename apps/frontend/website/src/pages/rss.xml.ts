import rss from "@astrojs/rss";
import { getPayloadPosts } from "@/lib/payload";
import config from "../config/config.json";
import type { RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
/**
 * Generates the site's RSS feed from Payload-backed blog posts.
 * Uses @astrojs/rss to produce XML.
 */
export async function GET(context: APIContext): Promise<Response> {
  const publishedPosts = await getPayloadPosts();

  const site = context.site || new URL(config.site.base_url);

  return rss({
    title: config.site.title,
    description:
      "A digital platform for Lifelong Learners, delivering curated roadmaps for deep, contextual learning.",
    site,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
    items: publishedPosts.map(
      (post) =>
        ({
          title: post.data.title,
          pubDate: post.data.date || new Date(),
          description: post.data.description,
          link: `/blog/${post.id}/`,
          categories: post.data.categories || [],
          customData: post.data.image
            ? `<media:content url="${new URL(post.data.image, site)}" medium="image" />`
            : "",
        }) as RSSFeedItem,
    ),
    customData: "<language>pt-br</language>",
  });
}
