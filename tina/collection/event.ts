import type { Collection } from "tinacms";

const Event: Collection = {
  label: "Events",
  name: "event",
  path: "content/events",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/events/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"],
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: true,
    },
    {
      type: "datetime",
      label: "Published Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [],
      isBody: true,
    },
  ],
};

export default Event;