import { list } from "@keystone-6/core";
import { allowEditor } from "../limit";
import { relationship, text } from "@keystone-6/core/fields";

export const Category = list({
  access: allowEditor,

  fields: {
    slug: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    name: text(),
    posts: relationship({ ref: "Post.categories", many: true }),
    moments: relationship({ ref: "Moment.categories", many: true }),
    events: relationship({ ref: "Event.categories", many: true }),
  },
});

export const Tag = list({
  access: allowEditor,

  fields: {
    slug: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    name: text(),
    posts: relationship({ ref: "Post.tags", many: true }),
    moments: relationship({ ref: "Moment.tags", many: true }),
    events: relationship({ ref: "Event.tags", many: true }),
  },
});
