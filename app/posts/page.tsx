import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "博客"
}

export default async function PostList() {
  const posts = await client.fetch<any[]>(`*[_type == "post"] {
    title, description, slug, author, publishedAt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    "categories": categories[]->title,
    "author_name": author->name,
    "author_image": author->image
  }`);

  return (
    posts.map((post) => (
      <Card key={post.slug.current} sx={{ width: "100%" }}>
        {
          post.mainImage &&
          <CardMedia sx={{ height: 160, position: "relative" }} title={post.mainImage.alt}>
            <Image
              fill
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt}
              style={{ objectFit: "cover" }}
            />
          </CardMedia>
        }

        <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
          <Typography variant="h3">
            {post.title}
          </Typography>

          <Stack direction="row" sx={{ mx: -0.5, mt: 1, mb: 1.2 }}>
            {post.categories.map((category: string, idx: number) => <Chip size="small" label={category} key={idx} />)}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {post.description ? post.description : "No description yet."}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingX: 4, paddingBottom: 2 }}>
          <Link href={`/p/${post.slug.current}`} passHref>
            <Button>Read more</Button>
          </Link>
        </CardActions>
      </Card>
    ))
  );
}