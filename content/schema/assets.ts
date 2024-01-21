import { image, select, text, timestamp } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";

import { allowEditor } from "../limit";

export const Image = list({
  access: allowEditor,

  fields: {
    caption: text(),
    image: image({ storage: "localImages" }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});

export const Asset = list({
  access: allowEditor,

  fields: {
    caption: text(),
    url: text({ validation: { isRequired: true } }),
    type: select({
      type: "enum",
      options: [
        { label: "Video", value: "video" },
        { label: "Audio", value: "audio" },
      ],
      defaultValue: "video",
      db: { map: "media_type" },
      validation: { isRequired: true },
      ui: { displayMode: "select" },
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
