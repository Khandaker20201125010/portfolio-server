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
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const blog_modal_1 = require("./blog.modal");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const body = blog_modal_1.createBlogSchema.parse(req.body);
        const user = req.user; // assuming authMiddleware sets req.user
        const authorId = Number((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.userId));
        if (!authorId)
            return res.status(401).json({ success: false, message: "Unauthenticated" });
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const blog = yield blog_service_1.blogService.createBlog(body, authorId, imageUrl);
        res.status(201).json({ success: true, data: blog });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
const listBlogs = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_service_1.blogService.getAllBlogs();
        res.json({ success: true, data: blogs });
    }
    catch (err) {
        next(err);
    }
});
const getBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = String(req.params.slug || req.params.id);
        const blog = yield blog_service_1.blogService.getBlogBySlug(slug);
        if (!blog)
            return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: blog });
    }
    catch (err) {
        next(err);
    }
});
const updateExisting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = Number(req.params.id);
        const body = blog_modal_1.updateBlogSchema.parse(req.body);
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const updated = yield blog_service_1.blogService.updateBlog(id, body, imageUrl);
        res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
});
const removeBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield blog_service_1.blogService.deleteBlog(id); // <- Use service object
        res.json({ success: true, message: "Deleted" });
    }
    catch (err) {
        next(err);
    }
});
exports.blogController = {
    createBlog,
    listBlogs,
    getBlog,
    updateExisting,
    removeBlog,
};
