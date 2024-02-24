import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

export default function PostLayout({children}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", gap: 4, py: 2 }}>
      <Box sx={{ flexGrow: 1, maxWidth: 720 }}>
        {children}
      </Box>
    </Container>
  )
}