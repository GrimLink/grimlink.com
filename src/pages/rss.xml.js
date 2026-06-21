import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { siteTitle, siteDescription, author } from "@/consts";

export async function GET(context) {
  const posts = (await getCollection("blog"))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 50);
  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: [
      `<atom:link href="${new URL("rss.xml", context.site).toString()}" rel="self" type="application/rss+xml" />`,
      `<language>en</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join(""),
    items: posts.map((post) => {
      const thumbnail = post.data.thumb || post.data.image;
      const mimeType = thumbnail ? ({
        jpg: "image/jpeg", jpeg: "image/jpeg",
        png: "image/png", webp: "image/webp",
        gif: "image/gif", avif: "image/avif",
      }[thumbnail.format] ?? "image/jpeg") : undefined;
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        enclosure: thumbnail
          ? {
              url: new URL(thumbnail.src, context.site).toString(),
              type: mimeType,
              length: 0,
            }
          : undefined,
        customData: [
          `<dc:creator>${author}</dc:creator>`,
          post.data.tags?.map((tag) => `<category>${tag}</category>`).join("") ?? "",
          thumbnail ? `<media:thumbnail url="${new URL(thumbnail.src, context.site).toString()}" />` : "",
        ].join(""),
      };
    }),
  });
}
