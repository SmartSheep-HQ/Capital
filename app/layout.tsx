import type { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import { SITE_DESCRIPTION, SITE_NAME } from "@/app/consts";
import { theme } from "@/app/theme";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

import AppShell from "@/components/AppShell";
import NextTopLoader from "nextjs-toploader";

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `${SITE_NAME} | %s`
  },
  description: SITE_DESCRIPTION
};

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
    <body>
    <AppRouterCacheProvider>
      <CssBaseline />
      <SpeedInsights />
      <NextTopLoader color="#ffffff" />
      <ThemeProvider theme={theme}>
        <AppShell>{children}</AppShell>
      </ThemeProvider>
    </AppRouterCacheProvider>

    <script
      async
      src="https://analytics.smartsheep.studio/script.js"
      data-website-id="bbe87bab-bd5b-416b-8767-b29088c75ab2"
    />

    </body>
    </html>
  );
}
