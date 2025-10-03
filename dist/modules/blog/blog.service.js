"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
// src/modules/blog/blog.service.ts
const db_1 = require("../../config/db");
const createBlog = async (data, authorId, imageUrl) => {
    var _a, _b;
    const blog = await db_1.prisma.blog.create({
        data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            published: (_a = data.published) !== null && _a !== void 0 ? _a : false,
            tags: (_b = data.tags) !== null && _b !== void 0 ? _b : [],
            coverImage: imageUrl !== null && imageUrl !== void 0 ? imageUrl : null,
            authorId,
        },
    });
    return blog;
};
const getAllBlogs = async () => {
    return db_1.prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
};
const getBlogBySlug = async (slug) => {
    return db_1.prisma.blog.findUnique({ where: { slug } });
};
const updateBlog = async (id, data, imageUrl) => {
    const payload = { ...data };
    if (imageUrl)
        payload.coverImage = imageUrl;
    return db_1.prisma.blog.update({ where: { id }, data: payload });
};
const deleteBlog = async (id) => {
    return db_1.prisma.blog.delete({ where: { id } });
};
exports.blogService = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};
