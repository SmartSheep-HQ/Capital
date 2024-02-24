import { Box, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography } from "@mui/material";
import { client } from "@/sanity/lib/client";
import PostContent from "@/components/posts/PostContent";
import Image from "next/image";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await client.fetch<any>(`*[_type == "post" && slug.current == $slug][0] {
    title, description
  }`, { slug: params.id });


  return {
    title: post.title,
    description: post.description
  };
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await client.fetch<any>(`*[_type == "post" && slug.current == $slug][0] {
    title, description, slug, body, author, publishedAt,
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
  }`, { slug: params.id });

  return (
    <Card>
      {
        post.mainImage &&
        <CardMedia sx={{ height: 360, position: "relative" }} title={post.mainImage.alt}>
          <Image
            fill
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt}
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
      }

      <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
        <Box>
          <Typography variant="h2">
            {post.title}
          </Typography>

          <Stack direction="row" sx={{ mx: -0.5, mt: 1, mb: 1.2 }}>
            {post.categories.map((category: string, idx: number) => <Chip size="small" label={category} key={idx} />)}
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {post.description ?? "No description yet."}
          </Typography>
        </Box>
        <Divider sx={{ my: 2.5, mx: -5 }} />
        <Box component="article" className="prose max-w-none" sx={{ minWidth: 0 }}>
          <PostContent content={post.body} />
        </Box>
      </CardContent>
    </Card>
  );
}
