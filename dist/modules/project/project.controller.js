"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const project_service_1 = require("./project.service");
const project_modal_1 = require("./project.modal");
const createProject = async (req, res, next) => {
    var _a, _b;
    try {
        const body = project_modal_1.createProjectSchema.parse(req.body);
        const user = req.user; // set by authMiddleware
        const authorId = Number((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.userId));
        if (!authorId) {
            return res.status(401).json({ success: false, message: "Unauthenticated" });
        }
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const project = await project_service_1.projectService.createProject(body, authorId, imageUrl);
        res.status(201).json({ success: true, data: project });
    }
    catch (err) {
        next(err);
    }
};
const listProjects = async (_req, res, next) => {
    try {
        const projects = await project_service_1.projectService.getAllProjects();
        res.json({ success: true, data: projects });
    }
    catch (err) {
        next(err);
    }
};
const getProject = async (req, res, next) => {
    try {
        const slug = String(req.params.slug || req.params.id);
        const project = await project_service_1.projectService.getProjectBySlug(slug);
        if (!project) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.json({ success: true, data: project });
    }
    catch (err) {
        next(err);
    }
};
const updateProject = async (req, res, next) => {
    var _a, _b;
    try {
        const id = Number(req.params.id);
        const body = project_modal_1.updateProjectSchema.parse(req.body);
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const updated = await project_service_1.projectService.updateProject(id, body, imageUrl);
        res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
};
const removeProject = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await project_service_1.projectService.deleteProject(id);
        res.json({ success: true, message: "Deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.projectController = {
    createProject,
    listProjects,
    getProject,
    updateProject,
    removeProject,
};
