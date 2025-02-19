import { getAttachmentUrl, sni } from 'solar-js-sdk'
import { SnPost } from 'solar-js-sdk'
import { listAttachment, SnAttachment } from 'solar-js-sdk'
import {
  Grid2 as Grid,
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Collapse,
  Container,
  IconButton,
  Link,
  Typography,
  Divider,
} from '@mui/material'
import { AttachmentItem } from '@/components/attachments/AttachmentItem'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { unified } from 'unified'
import Head from 'next/head'
import Image from 'next/image'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'

import CloseIcon from '@mui/icons-material/Close'

export const getServerSideProps = (async (context) => {
  const id = context.params!.id as string[]
  try {
    const { data: post } = await sni.get<SnPost>('/cgi/co/posts/' + id.join(':'))
    if (post.body.content) {
      let processor: any = unified().use(remarkParse)
      if (post.type != 'article') {
        processor = processor.use(remarkBreaks)
      }
      post.body.content = post.body.content.replace(
        /!\[.*?\]\(solink:\/\/attachments\/([\w-]+)\)/g,
        '![alt](https://api.sn.solsynth.dev/cgi/uc/attachments/$1)',
      )
      const out = await processor
        .use(remarkRehype)
        .use(remarkGfm)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(post.body.content)
      post.body.rawContent = post.body.content
      post.body.content = String(out)
    }
    let attachments: SnAttachment[] = []
    if (post.body.attachments) {
      attachments = await listAttachment(post.body.attachments)
    }
    return { props: { post, attachments } }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}) satisfies GetServerSideProps<{ post: SnPost; attachments: SnAttachment[] }>

export default function Post({ post, attachments }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const appLink = useMemo(() => `https://sn.solsynth.dev/posts/${post.id}`, [post])
  const link = useMemo(
    () =>
      post.alias && post.aliasPrefix
        ? `https://solsynth.dev/posts/${post.aliasPrefix}/${post.alias}`
        : `https://solsynth.dev/posts/${post.id}`,
    [post],
  )

  const title = useMemo(
    () =>
      post.body.title
        ? `${post.body.title} / @${post.publisher.name} / Solar Network`
        : `Post #${post.id} / @${post.publisher.name} / Solar Network`,
    [post],
  )
  const description = useMemo(
    () =>
      post.body.description ? post.body.description : post.body.rawContent.replaceAll('\n', ' ').substring(0, 200),
    [post],
  )

  const image = useMemo(() => {
    if (post.body.thumbnail) {
      return getAttachmentUrl(post.body.thumbnail)
    }
    if (attachments) {
      const images = attachments.filter((a) => a.mimetype.startsWith('image'))
      if (images && images[0]) return getAttachmentUrl(images[0].rid)
    }
    return null
  }, [post])
  const video = useMemo(() => {
    if (attachments) {
      const videos = attachments.filter((a) => a.mimetype.startsWith('video'))
      if (videos && videos[0]) return getAttachmentUrl(videos[0].rid)
    }
    return null
  }, [post])
  const audio = useMemo(() => {
    if (attachments) {
      const audios = attachments.filter((a) => a.mimetype.startsWith('audio'))
      if (audios && audios[0]) return getAttachmentUrl(audios[0].rid)
    }
    return null
  }, [post])

  const displayableAttachments = useMemo(() => {
    if (post.type == 'article') {
      return attachments.filter((a) => !a.mimetype.startsWith('image'))
    }
    return attachments
  }, [post])

  const [openAppHint, setOpenAppHint] = useState<boolean>()

  useEffect(() => {
    if (!localStorage.getItem('sol-hide-app-hint')) {
      setOpenAppHint(true)
    }
  }, [])

  useEffect(() => {
    if (openAppHint === false) {
      localStorage.setItem('sol-hide-app-hint', 'yes')
    }
  }, [openAppHint])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={`@${post.publisher.name}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={`@${post.publisher.name}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta property="og:url" content={link} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Solar Network" />
        {image && <meta property="og:image" content={image} />}
        {video && <meta property="og:video" content={video} />}
        {audio && <meta property="og:audio" content={audio} />}
      </Head>

      <Collapse in={openAppHint}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ borderRadius: 0, px: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAppHint(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle gutterBottom={false}>Open in Solian</AlertTitle>
          All feature supported, cross-platform, the official app of Solar Network.{' '}
          <Link href={appLink} color="#ffffff">
            Launch
          </Link>
        </Alert>
      </Collapse>

      {post.body.thumbnail && (
        <Box sx={{ aspectRatio: 16 / 9, position: 'relative', borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
          <Image src={getAttachmentUrl(post.body.thumbnail)} alt="post thumbnail" fill />
        </Box>
      )}

      <Container sx={{ mt: 3, pb: 5 }} maxWidth="md" component="article">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={getAttachmentUrl(post.publisher.avatar)} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold">{post.publisher.nick}</Typography>
              <Typography fontFamily="monospace" fontSize={13} lineHeight={1.2}>
                @{post.publisher.name}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ my: 2.5 }} display="flex" flexDirection="column" gap={1}>
          {(post.body.title || post.body.content) && (
            <Box>
              {post.body.title && <Typography variant="h6">{post.body.title}</Typography>}
              {post.body.description && <Typography variant="subtitle1">{post.body.description}</Typography>}
            </Box>
          )}
          <Box display="flex" gap={2} sx={{ opacity: 0.8 }}>
            <Typography variant="body2">
              Published at {new Date(post.publishedAt ?? post.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: 2.5, maxWidth: 'unset' }} className="prose prose-lg dark:prose-invert">
          {post.body.content && <div dangerouslySetInnerHTML={{ __html: post.body.content }} />}
        </Box>

        {displayableAttachments && (
          <Grid
            container
            spacing={2}
            sx={{ mt: 3 }}
            columns={{
              xs: 1,
              sm: Math.min(2, attachments.length),
              md: Math.min(3, attachments.length),
              lg: Math.min(4, attachments.length),
            }}
          >
            {displayableAttachments.map((a) => (
              <Grid size={1} key={a.id}>
                <AttachmentItem item={a} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}
