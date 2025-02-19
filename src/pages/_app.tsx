import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Roboto } from 'next/font/google'
import { CapAppBar } from '@/components/CapAppBar'
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar'
import { AppProvider } from '@toolpad/core/nextjs'
import { useUserStore } from 'solar-js-sdk'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const siteTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#1e88e5',
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  const userStore = useUserStore()

  useEffect(() => {
    userStore.fetchUser()
  }, [])

  const title = pageProps.title
    ? pageProps.title.startsWith('Solar Console')
      ? pageProps.title
      : `${pageProps.title} | Solsynth LLC`
    : 'Solsynth LLC'

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontRoboto.style.fontFamily};
          scroll-behavior: smooth;
        }
      `}</style>

      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" />
      </Head>

      <AppProvider>
        <ThemeProvider theme={siteTheme}>
          <CssBaseline />
          <ProgressBar
            height="4px"
            color={siteTheme.palette.primary.main}
            options={{ showSpinner: false }}
            shallowRouting
          />

          {(pageProps.showAppBar ?? true) && <CapAppBar />}
          <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
            <Component {...pageProps} />
          </Box>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default appWithTranslation(App)