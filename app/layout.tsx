import type { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import { SITE_NAME } from "@/app/consts";
import { theme } from "@/app/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "山羊寒舍，在这里最终智羊工作室的最新动态。"
};

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <AppRouterCacheProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppShell>{children}</AppShell>
      </ThemeProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
