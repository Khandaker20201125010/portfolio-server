"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
// src/modules/blog/blog.schema.ts
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    slug: zod_1.z.string().min(3, "Slug must be at least 3 characters"),
    excerpt: zod_1.z.string().optional(),
    content: zod_1.z.string().min(10, "Content must be at least 10 characters"),
    published: zod_1.z.boolean().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateBlogSchema = exports.createBlogSchema.partial();
