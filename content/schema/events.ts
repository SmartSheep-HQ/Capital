import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { list } from "@keystone-6/core";
import { allowEditor } from "../limit";
import { Session } from "../auth";

export const Event = list({
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
    description: text(),

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

    isPublished: checkbox(),
    isHistory: checkbox(),

    author: relationship({
      ref: "User.events",

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
      ref: "Category.events",
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
      ref: "Tag.events",
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
