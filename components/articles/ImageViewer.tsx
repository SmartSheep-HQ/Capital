"use client";

import { useEffect, useRef } from "react";
import Zoomist from "zoomist";

import "zoomist/css";

export default function ImageViewer({ src, alt }: { src: string, alt: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      new Zoomist(container.current, {
        maxScale: 5,
        bounds: true,
        pinchable: true,
      });
    }
  });

  return (
    <div ref={container} className="zoomist-container h-fit">
      <div className="zoomist-wrapper">
        <div className="zoomist-image h-fit">
          <img src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}