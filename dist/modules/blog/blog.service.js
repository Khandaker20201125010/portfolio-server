"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
// src/modules/blog/blog.service.ts
const db_1 = require("../../config/db");
const createBlog = (data, authorId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blog = yield db_1.prisma.blog.create({
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
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
});
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.findUnique({ where: { slug } });
});
const updateBlog = (id, data, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({}, data);
    if (imageUrl)
        payload.coverImage = imageUrl;
    return db_1.prisma.blog.update({ where: { id }, data: payload });
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.delete({ where: { id } });
});
exports.blogService = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};
