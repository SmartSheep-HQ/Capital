import type { Collection } from "tinacms";

const Post: Collection = {
  label: "Posts",
  name: "post",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/posts/${document._sys.filename}`;
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
      label: "Categories",
      name: "categories",
      type: "string",
      list: true,
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
    },
    {
      label: "Type",
      name: "type",
      type: "string",
      // @ts-ignore
      component: "select",
      options: ["article", "podcast", "announcement"],
      list: true,
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

export default Post;
