import type { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import { SITE_DESCRIPTION, SITE_NAME } from "@/app/consts";
import { theme } from "@/app/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `${SITE_NAME} | %s`
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
