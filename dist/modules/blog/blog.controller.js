"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const blog_modal_1 = require("./blog.modal");
const cloudinary_1 = require("../../config/cloudinary");
const createBlog = async (req, res) => {
    try {
        const body = blog_modal_1.createBlogSchema.parse(req.body);
        const user = req.user;
        const authorId = Number((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.userId));
        if (!authorId)
            return res
                .status(401)
                .json({ success: false, message: "Unauthenticated" });
        let imageUrl = undefined;
        if (req.file) {
            const result = await cloudinary_1.cloudinaryUpload.uploader.upload(req.file.path, {
                folder: "blogs",
            });
            imageUrl = result.secure_url;
        }
        const blog = await blog_service_1.blogService.createBlog(body, authorId, imageUrl);
        res.status(201).json({ success: true, data: blog });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};
const listBlogs = async (_req, res, next) => {
    try {
        const blogs = await blog_service_1.blogService.getAllBlogs();
        res.json({ success: true, data: blogs });
    }
    catch (err) {
        next(err);
    }
};
const getBlog = async (req, res, next) => {
    try {
        const slug = String(req.params.slug || req.params.id);
        const blog = await blog_service_1.blogService.getBlogBySlug(slug);
        if (!blog)
            return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: blog });
    }
    catch (err) {
        next(err);
    }
};
const updateExisting = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const body = blog_modal_1.updateBlogSchema.parse(req.body);
        let imageUrl = undefined;
        // Get existing blog to delete old image
        const existingBlog = await blog_service_1.blogService.getBlogBySlug(String(id));
        if (req.file) {
            if (existingBlog === null || existingBlog === void 0 ? void 0 : existingBlog.coverImage) {
                await (0, cloudinary_1.deleteImageFromCLoudinary)(existingBlog.coverImage);
            }
            const result = await cloudinary_1.cloudinaryUpload.uploader.upload(req.file.path, {
                folder: "blogs",
            });
            imageUrl = result.secure_url;
        }
        const updated = await blog_service_1.blogService.updateBlog(id, body, imageUrl);
        res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
};
const removeBlog = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const blog = await blog_service_1.blogService.getBlogBySlug(String(id));
        if (blog === null || blog === void 0 ? void 0 : blog.coverImage)
            await (0, cloudinary_1.deleteImageFromCLoudinary)(blog.coverImage);
        await blog_service_1.blogService.deleteBlog(id);
        res.json({ success: true, message: "Deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.blogController = {
    createBlog,
    listBlogs,
    getBlog,
    updateExisting,
    removeBlog,
};
