import parse from "html-react-parser";
import mediumZoom from "medium-zoom";
import DOMPurify from "dompurify";
import * as marked from "marked";
import { useEffect } from "react";

export default function Content({ content }: { content: string }) {
  useEffect(() => {
    mediumZoom(document.querySelectorAll(".post img"), {
      background: "var(--fallback-b1,oklch(var(--b1)/1))",
    });
  });

  return <article className="prose max-w-none">{parse(DOMPurify.sanitize(marked.parse(content) as string))}</article>;
}
