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
exports.projectController = void 0;
const project_service_1 = require("./project.service");
const project_modal_1 = require("./project.modal");
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const body = project_modal_1.createProjectSchema.parse(req.body);
        const user = req.user; // set by authMiddleware
        const authorId = Number((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.userId));
        if (!authorId) {
            return res.status(401).json({ success: false, message: "Unauthenticated" });
        }
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const project = yield project_service_1.projectService.createProject(body, authorId, imageUrl);
        res.status(201).json({ success: true, data: project });
    }
    catch (err) {
        next(err);
    }
});
const listProjects = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_service_1.projectService.getAllProjects();
        res.json({ success: true, data: projects });
    }
    catch (err) {
        next(err);
    }
});
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = String(req.params.slug || req.params.id);
        const project = yield project_service_1.projectService.getProjectBySlug(slug);
        if (!project) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.json({ success: true, data: project });
    }
    catch (err) {
        next(err);
    }
});
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = Number(req.params.id);
        const body = project_modal_1.updateProjectSchema.parse(req.body);
        const imageUrl = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : undefined;
        const updated = yield project_service_1.projectService.updateProject(id, body, imageUrl);
        res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
});
const removeProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield project_service_1.projectService.deleteProject(id);
        res.json({ success: true, message: "Deleted" });
    }
    catch (err) {
        next(err);
    }
});
exports.projectController = {
    createProject,
    listProjects,
    getProject,
    updateProject,
    removeProject,
};
