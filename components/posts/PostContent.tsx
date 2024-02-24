"use client";

import { PortableText } from "@portabletext/react";

export default function PostContent({ content }: { content: any }) {
  return <PortableText value={content} />;
}
