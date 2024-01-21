import { useState, Fragment } from "react";

export default function Video({
  sources,
}: {
  sources: { caption: string; url: string }[];
}) {
  const [focus, setFocus] = useState<boolean[]>(
    sources.map((_, idx) => idx === 0)
  );

  function changeFocus(idx: number) {
    setFocus(focus.map((_, idx) => idx === idx));
  }

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {sources.map((item, idx) => (
        <Fragment key={idx}>
          <input
            type="radio"
            name={item.caption}
            role="tab"
            className="tab"
            aria-label={item.caption}
            checked={focus[idx]}
            onChange={() => changeFocus(idx)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box"
          >
            <video className="mb-0 block w-full h-[360px]" controls>
                <source src={item.url} />
            </video>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
