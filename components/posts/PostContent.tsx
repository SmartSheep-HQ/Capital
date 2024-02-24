import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import ImageViewer from "@/components/articles/ImageViewer";

export default function PostContent({ content }: { content: any }) {
  const imageBuilder = imageUrlBuilder(client);

  const componentSet = {
    types: {
      image: ({ value }: any) => {
        const image = imageBuilder.image(value);
        return <ImageViewer src={image.url()} alt={value.alt} />;
      }
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
        return (
          <Link href={value.href} rel={rel}>
            {children}
          </Link>
        );
      }
    }
  };

  return <PortableText value={content} components={componentSet} />;
}
