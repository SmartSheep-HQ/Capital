"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core8 = require("@keystone-6/core");

// schema/index.ts
var import_core7 = require("@keystone-6/core");
var import_fields7 = require("@keystone-6/core/fields");

// limit.ts
var isUser = ({ session: session2 }) => session2?.data.id != null;
var allowUser = {
  operation: {
    create: isUser,
    update: isUser,
    delete: isUser
  }
};
var isEditor = ({ session: session2 }) => session2?.data.isEditor || session2?.data.isAdmin;
var allowEditor = {
  operation: {
    create: isEditor,
    update: isEditor,
    delete: isEditor
  }
};
var isAdmin = ({ session: session2 }) => session2?.data.isAdmin;
var allowAdmin = {
  operation: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  }
};

// schema/assets.ts
var import_fields = require("@keystone-6/core/fields");
var import_core = require("@keystone-6/core");
var Image = (0, import_core.list)({
  access: allowEditor,
  fields: {
    caption: (0, import_fields.text)(),
    image: (0, import_fields.image)({ storage: "localImages" }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});
var Asset = (0, import_core.list)({
  access: allowEditor,
  fields: {
    caption: (0, import_fields.text)(),
    url: (0, import_fields.text)({ validation: { isRequired: true } }),
    type: (0, import_fields.select)({
      type: "enum",
      options: [
        { label: "Video", value: "video" },
        { label: "Audio", value: "audio" }
      ],
      defaultValue: "video",
      db: { map: "media_type" },
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema/moments.ts
var import_core2 = require("@keystone-6/core");
var import_fields_document = require("@keystone-6/fields-document");
var import_fields2 = require("@keystone-6/core/fields");
var Moment = (0, import_core2.list)({
  access: allowUser,
  fields: {
    title: (0, import_fields2.text)({ validation: { isRequired: true } }),
    images: (0, import_fields2.relationship)({ ref: "Image", many: true }),
    content: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    author: (0, import_fields2.relationship)({
      ref: "User.moments",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      many: false
    }),
    categories: (0, import_fields2.relationship)({
      ref: "Category.moments",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    tags: (0, import_fields2.relationship)({
      ref: "Tag.moments",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema/categories.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var Category = (0, import_core3.list)({
  access: allowEditor,
  fields: {
    slug: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    name: (0, import_fields3.text)(),
    posts: (0, import_fields3.relationship)({ ref: "Post.categories", many: true }),
    moments: (0, import_fields3.relationship)({ ref: "Moment.categories", many: true }),
    events: (0, import_fields3.relationship)({ ref: "Event.categories", many: true })
  }
});
var Tag = (0, import_core3.list)({
  access: allowEditor,
  fields: {
    slug: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    name: (0, import_fields3.text)(),
    posts: (0, import_fields3.relationship)({ ref: "Post.tags", many: true }),
    moments: (0, import_fields3.relationship)({ ref: "Moment.tags", many: true }),
    events: (0, import_fields3.relationship)({ ref: "Event.tags", many: true })
  }
});

// schema/projects.ts
var import_fields4 = require("@keystone-6/core/fields");
var import_core4 = require("@keystone-6/core");
var Project = (0, import_core4.list)({
  access: {
    ...allowAdmin,
    filter: {
      query: ({ session: session2 }) => {
        if (session2?.data.isEditor || session2?.data.isAdmin)
          return true;
        return { isPublished: { equals: true } };
      }
    }
  },
  fields: {
    icon: (0, import_fields4.relationship)({ ref: "Image" }),
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    description: (0, import_fields4.text)(),
    link: (0, import_fields4.text)(),
    isPublished: (0, import_fields4.checkbox)(),
    status: (0, import_fields4.select)({
      type: "enum",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Constructing", value: "constructing" },
        { label: "Published", value: "published" },
        { label: "Abandoned", value: "abandoned" }
      ],
      defaultValue: "pending",
      db: { map: "project_status" },
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    post: (0, import_fields4.relationship)({ ref: "Post" }),
    createdAt: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema/posts.ts
var import_fields5 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var import_core5 = require("@keystone-6/core");
var Post = (0, import_core5.list)({
  access: {
    ...allowEditor,
    filter: {
      query: ({ session: session2 }) => {
        if (session2?.data.isEditor || session2?.data.isAdmin)
          return true;
        return { isPublished: { equals: true } };
      }
    }
  },
  fields: {
    slug: (0, import_fields5.text)({
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    title: (0, import_fields5.text)({ validation: { isRequired: true } }),
    cover: (0, import_fields5.relationship)({ ref: "Image" }),
    description: (0, import_fields5.text)(),
    assets: (0, import_fields5.relationship)({ ref: "Asset", many: true }),
    images: (0, import_fields5.relationship)({ ref: "Image", many: true }),
    content: (0, import_fields_document2.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    type: (0, import_fields5.select)({
      type: "enum",
      options: [
        { label: "Article", value: "article" },
        { label: "Podcast", value: "podcast" }
      ],
      defaultValue: "article",
      db: { map: "post_type" },
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    isPublished: (0, import_fields5.checkbox)(),
    author: (0, import_fields5.relationship)({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      many: false
    }),
    categories: (0, import_fields5.relationship)({
      ref: "Category.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    tags: (0, import_fields5.relationship)({
      ref: "Tag.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema/events.ts
var import_fields6 = require("@keystone-6/core/fields");
var import_fields_document3 = require("@keystone-6/fields-document");
var import_core6 = require("@keystone-6/core");
var Event = (0, import_core6.list)({
  access: {
    ...allowEditor,
    filter: {
      query: ({ session: session2 }) => {
        if (session2?.data.isEditor || session2?.data.isAdmin)
          return true;
        return { isPublished: { equals: true } };
      }
    }
  },
  fields: {
    slug: (0, import_fields6.text)({
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    title: (0, import_fields6.text)({ validation: { isRequired: true } }),
    description: (0, import_fields6.text)(),
    content: (0, import_fields_document3.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    isPublished: (0, import_fields6.checkbox)(),
    isHistory: (0, import_fields6.checkbox)(),
    author: (0, import_fields6.relationship)({
      ref: "User.events",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      many: false
    }),
    categories: (0, import_fields6.relationship)({
      ref: "Category.events",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    tags: (0, import_fields6.relationship)({
      ref: "Tag.events",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    createdAt: (0, import_fields6.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema/index.ts
var lists = {
  User: (0, import_core7.list)({
    access: allowAdmin,
    fields: {
      name: (0, import_fields7.text)({ validation: { isRequired: true } }),
      email: (0, import_fields7.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields7.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields7.relationship)({ ref: "Post.author", many: true }),
      moments: (0, import_fields7.relationship)({ ref: "Moment.author", many: true }),
      events: (0, import_fields7.relationship)({ ref: "Event.author", many: true }),
      isAdmin: (0, import_fields7.checkbox)(),
      isEditor: (0, import_fields7.checkbox)(),
      createdAt: (0, import_fields7.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Image,
  Asset,
  Post,
  Moment,
  Project,
  Event,
  Category,
  Tag
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "id name createdAt isAdmin isEditor",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password", "isAdmin"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
var databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:password@127.0.0.1:5432/capital";
var databaseProvider = process.env.DATABASE_PROVIDER ?? "postgresql";
var keystone_default = withAuth(
  (0, import_core8.config)({
    ui: {
      basePath: "/cms"
    },
    db: {
      provider: databaseProvider,
      url: databaseUrl
    },
    server: {
      cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
      }
    },
    storage: {
      localImages: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
