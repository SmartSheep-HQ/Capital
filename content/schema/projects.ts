import { checkbox, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";
import { allowAdmin } from "../limit";
import { Session } from "../auth";

export const Project = list({
  access: {
    ...allowAdmin,

    filter: {
      query: ({ session }: { session: Session }) => {
        if (session?.data.isEditor || session?.data.isAdmin) return true;
        return { isPublished: { equals: true } };
      },
    },
  },

  fields: {
    icon: relationship({ ref: "Image" }),
    name: text({ validation: { isRequired: true } }),
    description: text(),
    link: text(),

    isPublished: checkbox(),

    status: select({
      type: "enum",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Constructing", value: "constructing" },
        { label: "Published", value: "published" },
        { label: "Abandoned", value: "abandoned" },
      ],
      defaultValue: "pending",
      db: { map: "project_status" },
      validation: { isRequired: true },
      ui: { displayMode: "select" },
    }),

    post: relationship({ ref: "Post" }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
