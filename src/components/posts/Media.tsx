// @ts-ignore
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";

import "video.js/dist/video-js.css";

import videojs from "video.js";
import { VideoPlayer } from "@videojs-player/react";
import { useState, Fragment, useRef, useEffect } from "react";

function Video({ url, mimetype, ...rest }: { url: string; mimetype: string; className?: string }) {
  const liveList = ["application/x-mpegURL"];
  const isSafari = videojs.browser.IS_SAFARI;

  return (
    <VideoPlayer
      className="video-js"
      height={480}
      crossorigin="anonymous"
      playsinline
      controls
      src={url}
      liveui={liveList.includes(mimetype)}
      html5={{
        vhs: {
          overrideNative: !isSafari,
          maxPlaylistRetries: Infinity,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      }}
    />
  );
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
  sources: { id: number; filename: string; mimetype: string }[];
  author?: { name: string };
}) {
  const items = sources.sort((a, b) => a.id > b.id ? 1 : -1)
  console.log(items)
  const [focus, setFocus] = useState<boolean[]>(items.map((_, idx) => idx === 0));

  function changeFocus(idx: number) {
    setFocus(focus.map((_, i) => i === idx));
  }

  function getUrl(item: any) {
    return item.external_url ? item.external_url : `https://feed.smartsheep.studio/api/attachments/o/${item.file_id}`;
  }

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {items.map((item, idx) => (
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
            {item.mimetype.startsWith("video") && (
              <div className="w-full h-[460px]">
                <Video className="w-full h-full" mimetype={item.mimetype} url={getUrl(item)} />
              </div>
            )}
            {item.mimetype.startsWith("audio") && (
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
