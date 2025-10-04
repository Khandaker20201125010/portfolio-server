"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const db_1 = require("../../config/db");
const createProject = async (data, authorId, imageUrl) => {
    var _a, _b, _c, _d, _e;
    return db_1.prisma.project.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            features: (_a = data.features) !== null && _a !== void 0 ? _a : [],
            thumbnail: (_b = imageUrl !== null && imageUrl !== void 0 ? imageUrl : data.thumbnail) !== null && _b !== void 0 ? _b : null,
            liveUrl: (_c = data.liveUrl) !== null && _c !== void 0 ? _c : null,
            frontendRepoUrl: (_d = data.frontendRepoUrl) !== null && _d !== void 0 ? _d : null,
            backendRepoUrl: (_e = data.backendRepoUrl) !== null && _e !== void 0 ? _e : null,
            authorId,
        },
    });
};
const getAllProjects = async () => {
    return db_1.prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
};
const getProjectBySlug = async (slug) => {
    return db_1.prisma.project.findUnique({ where: { slug } });
};
const getProjectById = async (id) => {
    return db_1.prisma.project.findUnique({ where: { id } });
};
const updateProject = async (id, data, imageUrl) => {
    const payload = { ...data };
    if (imageUrl)
        payload.thumbnail = imageUrl;
    return db_1.prisma.project.update({ where: { id }, data: payload });
};
const deleteProject = async (id) => {
    return db_1.prisma.project.delete({ where: { id } });
};
exports.projectService = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    getProjectById,
    updateProject,
    deleteProject,
};
