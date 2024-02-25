"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Zoomist from "zoomist";

import "zoomist/css";

export default function ImageViewer({ src, alt }: { src: string, alt: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      new Zoomist(container.current, {
        maxScale: 5,
        bounds: true,
        pinchable: true
      });
    }
  });

  return (
    <div ref={container} className="zoomist-container h-fit">
      <div className="zoomist-wrapper">
        <div className="zoomist-image h-fit">
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}