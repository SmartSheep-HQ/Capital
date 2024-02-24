import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { getSortedPosts } from "@/content/posts";
import Image from "next/image";
import Link from "next/link";

export default function PostList() {
  const posts = getSortedPosts();

  return (
    posts.map((post) => (
      <Card key={post.id} sx={{ width: "100%" }}>
        {
          post.thumbnail &&
          <CardMedia sx={{ height: 160, position: "relative" }} title={post.title}>
            <Image
              fill
              src={post.thumbnail}
              alt={post.title}
              style={{ objectFit: "cover" }}
            />
          </CardMedia>
        }

        <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description ?? "No description yet."}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingX: 4, paddingBottom: 2 }}>
          <Link href={`/posts/${post.id}`} passHref>
            <Button>Read more</Button>
          </Link>
        </CardActions>
      </Card>
    ))
  );
}