"use client";

import MuiMarkdown from "mui-markdown";

export default function PostContent({ content }: { content: string }) {
  return <MuiMarkdown>{content}</MuiMarkdown>;
}