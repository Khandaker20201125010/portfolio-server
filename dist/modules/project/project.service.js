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
exports.projectService = void 0;
const db_1 = require("../../config/db");
const createProject = (data, authorId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    return db_1.prisma.project.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            features: (_a = data.features) !== null && _a !== void 0 ? _a : [],
            thumbnail: (_b = imageUrl !== null && imageUrl !== void 0 ? imageUrl : data.thumbnail) !== null && _b !== void 0 ? _b : null,
            liveUrl: (_c = data.liveUrl) !== null && _c !== void 0 ? _c : null,
            repoUrl: (_d = data.repoUrl) !== null && _d !== void 0 ? _d : null,
            authorId,
        },
    });
});
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
});
const getProjectBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.project.findUnique({ where: { slug } });
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.project.findUnique({ where: { id } });
});
const updateProject = (id, data, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({}, data);
    if (imageUrl)
        payload.thumbnail = imageUrl;
    return db_1.prisma.project.update({ where: { id }, data: payload });
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.project.delete({ where: { id } });
});
exports.projectService = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    getProjectById,
    updateProject,
    deleteProject,
};
