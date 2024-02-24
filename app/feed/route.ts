import { Feed } from "feed";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/app/consts";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    favicon: `${SITE_URL}/favicon.png`,
    feedLinks: { atom: `${SITE_URL}/feed` },
    language: "zh-CN",
    copyright: `Copyright © ${new Date().getFullYear()} SmartSheep Studio`,
  });

  const posts = await client.fetch<any[]>(`*[_type == "post"] {
    title, description, slug, publishedAt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    "categories": categories[]->title,
  }`);

  posts.forEach((item) => {
    feed.addItem({
      id: `${SITE_URL}/p/${item.slug.current}`,
      link: `${SITE_URL}/p/${item.slug.current}`,
      title: item.title,
      description: item.description ?? "No description yet.",
      date: new Date(item.publishedAt)
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "content-type": "application/xml"
    }
  });
}
