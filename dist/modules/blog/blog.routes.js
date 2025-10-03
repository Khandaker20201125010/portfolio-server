"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
// src/modules/blog/blog.routes.ts
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
// Public routes
router.get("/", blog_controller_1.blogController.listBlogs);
router.get("/:slug", blog_controller_1.blogController.getBlog);
// Protect all routes for authenticated users
router.use(auth_middleware_1.authMiddleware);
// Only OWNER can create, update, delete blogs
router.post("/", auth_middleware_1.ownerMiddleware, multer_config_1.multerUpload.single("coverImage"), blog_controller_1.blogController.createBlog);
router.patch("/:id", auth_middleware_1.ownerMiddleware, multer_config_1.multerUpload.single("coverImage"), blog_controller_1.blogController.updateExisting);
router.delete("/:id", auth_middleware_1.ownerMiddleware, blog_controller_1.blogController.removeBlog);
exports.blogRoutes = router;
