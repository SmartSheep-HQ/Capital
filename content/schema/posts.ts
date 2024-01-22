import { checkbox, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { list } from "@keystone-6/core";
import { allowEditor } from "../limit";
import { Session } from "../auth";

export const Post = list({
  access: {
    ...allowEditor,

    filter: {
      query: ({ session }: { session: Session }) => {
        if (session?.data.isEditor || session?.data.isAdmin) return true;
        return { isPublished: { equals: true } };
      },
    },
  },

  fields: {
    slug: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    title: text({ validation: { isRequired: true } }),
    cover: relationship({ ref: "Image" }),

    description: text(),

    assets: relationship({ ref: "Asset", many: true }),
    images: relationship({ ref: "Image", many: true }),
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),

    type: select({
      type: "enum",
      options: [
        { label: "Article", value: "article" },
        { label: "Podcast", value: "podcast" },
      ],
      defaultValue: "article",
      db: { map: "post_type" },
      validation: { isRequired: true },
      ui: { displayMode: "select" },
    }),

    isPublished: checkbox(),

    author: relationship({
      ref: "User.posts",

      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
    }),

    categories: relationship({
      ref: "Category.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
    }),

    tags: relationship({
      ref: "Tag.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
