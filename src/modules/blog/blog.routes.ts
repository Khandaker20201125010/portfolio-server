// src/modules/blog/blog.routes.ts
import { Router } from "express";
import { blogController } from "./blog.controller";
import { authMiddleware, ownerMiddleware } from "../../middleware/auth.middleware";
import { multerUpload } from "../../config/multer.config";


const router = Router();

// Public routes
router.get("/", blogController.listBlogs);
router.get("/:slug", blogController.getBlog);

// Protect all routes for authenticated users
router.use(authMiddleware);

// Only OWNER can create, update, delete blogs
router.post("/", ownerMiddleware, multerUpload.single("coverImage"), blogController.createBlog);
router.patch("/:id", ownerMiddleware, multerUpload.single("coverImage"), blogController.updateExisting);
router.delete("/:id", ownerMiddleware, blogController.removeBlog);



export const blogRoutes = router;
