"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
// Public Routes
router.get("/", project_controller_1.projectController.listProjects);
router.get("/:slug", project_controller_1.projectController.getProject);
// Owner-only Routes
router.post("/", auth_middleware_1.authMiddleware, auth_middleware_1.ownerMiddleware, multer_config_1.multerUpload.single("thumbnail"), project_controller_1.projectController.createProject);
router.put("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.ownerMiddleware, multer_config_1.multerUpload.single("thumbnail"), project_controller_1.projectController.updateProject);
router.delete("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.ownerMiddleware, project_controller_1.projectController.removeProject);
exports.projectRoutes = router;
