import RSS from "rss";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/app/consts";
import { getSortedPosts } from "@/content/posts";

export async function GET() {
  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed`,
    language: "zh-CN"
  });

  getSortedPosts().forEach((item) => {
    feed.item({
      url: `${SITE_URL}/p/${item.id}`,
      title: item.title,
      description: item.description ?? "No description yet.",
      date: item.date,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml"
    }
  });
}