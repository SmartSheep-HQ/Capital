// @ts-ignore
import APlayer from "aplayer";
import Artplayer from "artplayer";
import { useState, Fragment, useRef, useEffect } from "react";

import "aplayer/dist/APlayer.min.css";

function Video({ url, ...rest }: { url: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new Artplayer({
      container: container.current as HTMLDivElement,
      url: url,
      setting: true,
      flip: true,
      loop: true,
      playbackRate: true,
      aspectRatio: true,
      subtitleOffset: true,
      fullscreen: true,
      fullscreenWeb: true,
      screenshot: true,
      autoPlayback: true,
      airplay: true,
      theme: "#49509e",
    });
  });

  return <div ref={container} {...rest}></div>;
}

function Audio({
  url,
  artist,
  caption,
  ...rest
}: {
  url: string;
  artist: string;
  caption: string;
  className?: string;
}) {
  const container = useRef(null);

  useEffect(() => {
    new APlayer({
      container: container.current,
      audio: [
        {
          name: caption,
          artist: artist,
          url: url,
          theme: "#49509e",
        },
      ],
    });
  });

  return <div ref={container} {...rest}></div>;
}

export default function Media({
  sources,
  author,
}: {
  sources: { filename: string; mimetype: string }[];
  author?: { name: string };
}) {
  const [focus, setFocus] = useState<boolean[]>(sources.map((_, idx) => idx === 0));

  function changeFocus(idx: number) {
    setFocus(focus.map((_, i) => i === idx));
  }

  function getUrl(item: any) {
    return item.external_url ? item.external_url : `https://feed.smartsheep.studio/api/attachments/o/${item.file_id}`;
  }

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {sources.map((item, idx) => (
        <Fragment key={idx}>
          <input
            type="radio"
            name={item.filename}
            role="tab"
            className="tab"
            aria-label={item.filename}
            checked={focus[idx]}
            onChange={() => changeFocus(idx)}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box w-full">
            {item.mimetype === "video" && (
              <div className="w-full h-[460px]">
                <Video className="w-full h-full" url={getUrl(item)} />
              </div>
            )}
            {item.mimetype === "audio" && (
              <div className="w-full">
                <Audio url={getUrl(item)} artist={author?.name ?? "佚名"} caption={item.filename} />
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
