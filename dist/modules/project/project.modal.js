"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    slug: zod_1.z.string().min(3, "Slug must be at least 3 characters"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    thumbnail: zod_1.z.string().optional(),
    liveUrl: zod_1.z.string().url().optional(),
    frontendRepoUrl: zod_1.z.string().url().optional(),
    backendRepoUrl: zod_1.z.string().url().optional(),
});
exports.updateProjectSchema = exports.createProjectSchema.partial();
