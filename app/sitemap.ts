import { MetadataRoute } from "next";
import { getSortedPosts, Post } from "@/content/posts";
import { SITE_URL } from "@/app/consts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPosts();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    },

    ...posts.map((item: Post) => ({
      url: `${SITE_URL}/posts/${item.id}`,
      lastModified: item.date,
      changeFrequency: "daily" as any,
      priority: 0.75
    }))
  ];
}