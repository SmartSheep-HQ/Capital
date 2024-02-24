"use client";

import { Box, Card, CardContent, Container } from "@mui/material";
import { ReactNode } from "react";


export default function LegalLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", gap: 4, py: 2 }}>
      <Card sx={{ flexGrow: 1, maxWidth: 720 }}>
        {children}
      </Card>
    </Container>
  );
}
