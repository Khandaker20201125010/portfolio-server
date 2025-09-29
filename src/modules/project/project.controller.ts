import { Request, Response, NextFunction } from "express";
import { projectService } from "./project.service";
import { createProjectSchema, updateProjectSchema } from "./project.modal";

interface AuthRequest extends Request {
  user?: any;
}

const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = createProjectSchema.parse(req.body);
    const user = req.user as any; // set by authMiddleware
    const authorId = Number(user?.id || user?.userId);

    if (!authorId) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const imageUrl = (req.file as any)?.path ?? undefined;
    const project = await projectService.createProject(body, authorId, imageUrl);

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const listProjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug || req.params.id);
    const project = await projectService.getProjectBySlug(slug);

    if (!project) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const body = updateProjectSchema.parse(req.body);
    const imageUrl = (req.file as any)?.path ?? undefined;

    const updated = await projectService.updateProject(id, body, imageUrl);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const removeProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await projectService.deleteProject(id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const projectController = {
  createProject,
  listProjects,
  getProject,
  updateProject,
  removeProject,
};
