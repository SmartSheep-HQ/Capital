import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { getSinglePost } from "@/content/posts";
import Image from "next/image";
import PostContent from "@/components/posts/PostContent";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = getSinglePost(params.id);

  return (
    <Card>
      {
        post.thumbnail &&
        <CardMedia sx={{ height: 360, position: "relative" }} title={post.title}>
          <Image
            fill
            src={post.thumbnail}
            alt={post.title}
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
      }

      <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
        <Box>
          <Typography gutterBottom variant="h2">
            {post.title}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {post.description ?? "No description yet."}
          </Typography>
        </Box>
        <Divider sx={{ my: 5 }} />
        <Box component="article" className="prose max-w-none" sx={{ minWidth: 0 }}>
          <PostContent content={post.content ?? ""} />
        </Box>
      </CardContent>
    </Card>
  );
}