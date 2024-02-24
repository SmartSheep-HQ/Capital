"use client";

import Markdown from "react-markdown";

export default function PostContent({ content }: { content: string }) {
  return <Markdown>{content}</Markdown>;
}