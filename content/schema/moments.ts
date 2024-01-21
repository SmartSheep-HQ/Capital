import { list } from "@keystone-6/core";
import { allowUser } from "../limit";
import { document } from "@keystone-6/fields-document";
import { relationship, text, timestamp } from "@keystone-6/core/fields";

export const Moment = list({
    access: allowUser,

    fields: {
      title: text({ validation: { isRequired: true } }),
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

      author: relationship({
        ref: "User.moments",

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
        ref: "Category.moments",
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
        ref: "Tag.moments",
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
  })