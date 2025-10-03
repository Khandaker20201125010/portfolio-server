"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
// src/modules/auth/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const registerUser = async (input) => {
    const existingUser = await db_1.prisma.user.findUnique({
        where: { email: input.email },
    });
    if (existingUser)
        throw new Error("User already exists");
    const hashed = await bcryptjs_1.default.hash(input.password, 10);
    const user = await db_1.prisma.user.create({
        data: {
            email: input.email,
            password: hashed,
            name: input.name,
            role: "USER",
        },
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const user = await db_1.prisma.user.findUnique({ where: { email: input.email } });
    if (!user)
        throw new Error("Invalid credentials");
    const isValid = await bcryptjs_1.default.compare(input.password, user.password);
    if (!isValid)
        throw new Error("Invalid credentials");
    return { user };
};
exports.loginUser = loginUser;
const deleteUser = async (userId) => {
    return await db_1.prisma.user.delete({ where: { id: userId } });
};
exports.deleteUser = deleteUser;
const updateUserRole = async (userId, role) => {
    return await db_1.prisma.user.update({ where: { id: userId }, data: { role } });
};
exports.updateUserRole = updateUserRole;
