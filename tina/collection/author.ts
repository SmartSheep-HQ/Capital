import type { Collection } from "tinacms";

const Author: Collection = {
  label: "Authors",
  name: "author",
  path: "content/authors",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
    },
    {
      type: "rich-text",
      label: "Introduction",
      name: "_body",
      templates: [],
      isBody: true,
    },
  ],
};
export default Author;