import { Router } from "express";
import { projectController } from "./project.controller";
import {
  authMiddleware,
  ownerMiddleware,
} from "../../middleware/auth.middleware";
import { multerUpload } from "../../config/multer.config";

const router = Router();

// Public Routes
router.get("/", projectController.listProjects);
router.get("/:slug", projectController.getProject);

// Owner-only Routes
router.post(
  "/",
  authMiddleware,
  ownerMiddleware,
  multerUpload.single("thumbnail"),
  projectController.createProject
);

router.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  multerUpload.single("thumbnail"),
  projectController.updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  projectController.removeProject
);

export const projectRoutes = router;
