import { list } from "@keystone-6/core";

import {
  text,
  relationship,
  password,
  timestamp,
  checkbox,
} from "@keystone-6/core/fields";

import { allowAdmin } from "../limit";

import { Image, Asset } from "./assets";
import { Moment } from "./moments";
import { Category, Tag } from "./categories";
import { Project } from "./projects";
import { Post } from "./posts";
import { Event } from "./events";

export const lists = {
  User: list({
    access: allowAdmin,

    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),

      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
      moments: relationship({ ref: "Moment.author", many: true }),
      events: relationship({ ref: "Event.author", many: true }),

      isAdmin: checkbox(),
      isEditor: checkbox(),

      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),

  Image,
  Asset,

  Post,
  Moment,
  Project,
  Event,

  Category,
  Tag,
};
