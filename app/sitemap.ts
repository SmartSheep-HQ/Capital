import { MetadataRoute } from "next";
import { SITE_URL } from "@/app/consts";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<any[]>(`*[_type == "post"] {
    slug, publishedAt,
  }`);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    ...posts.map((item: any) => ({
      url: `${SITE_URL}/posts/${item.slug.current}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "daily" as any,
      priority: 0.75,
    })),
  ];
}
