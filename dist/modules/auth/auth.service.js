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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const registerUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_1.prisma.user.findUnique({ where: { email: input.email } });
    if (existingUser)
        throw new Error("User already exists");
    const hashed = yield bcryptjs_1.default.hash(input.password, 10);
    // Explicitly set role to USER
    const user = yield db_1.prisma.user.create({
        data: {
            email: input.email,
            password: hashed,
            name: input.name,
            role: "USER",
        },
    });
    return user;
});
exports.registerUser = registerUser;
const loginUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email: input.email } });
    if (!user)
        throw new Error("Invalid credentials");
    const isValid = yield bcryptjs_1.default.compare(input.password, user.password);
    if (!isValid)
        throw new Error("Invalid credentials");
    return { user };
});
exports.loginUser = loginUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield db_1.prisma.user.delete({
        where: { id: userId },
    });
    return deleted;
});
exports.deleteUser = deleteUser;
const updateUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield db_1.prisma.user.update({
        where: { id: userId },
        data: { role },
    });
    return updated;
});
exports.updateUserRole = updateUserRole;
