import { Request, Response, NextFunction } from "express";
import { blogService } from "./blog.service"; 
import { createBlogSchema, updateBlogSchema } from "./blog.modal";

interface AuthRequest extends Request {
  user?: any;
}

const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const body = createBlogSchema.parse(req.body);
    const user = req.user as any; // assuming authMiddleware sets req.user
    const authorId = Number(user?.id || user?.userId);

    if (!authorId)
      return res.status(401).json({ success: false, message: "Unauthenticated" });

    const imageUrl = (req.file as any)?.path ?? undefined;
    const blog = await blogService.createBlog(body, authorId, imageUrl);

    res.status(201).json({ success: true, data: blog });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};


const listBlogs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug || req.params.id);
    const blog = await blogService.getBlogBySlug(slug);
    if (!blog) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

const updateExisting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const body = updateBlogSchema.parse(req.body);
    const imageUrl = (req.file as any)?.path ?? undefined;
    const updated = await blogService.updateBlog(id, body, imageUrl); 
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const removeBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await blogService.deleteBlog(id); // <- Use service object
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const blogController = {
  createBlog,
  listBlogs,
  getBlog,
  updateExisting,
  removeBlog,
};
