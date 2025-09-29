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
exports.UserController = exports.getAllUsers = void 0;
const user_services_1 = require("./user.services");
const db_1 = require("../../config/db");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        res.json({
            success: true,
            message: "All users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const deletedUser = yield user_services_1.UserService.deleteUser(userId);
        res.json({ success: true, message: "User deleted", user: deletedUser });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const { role } = req.body;
        if (!role || !["OWNER", "USER"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }
        const updatedUser = yield user_services_1.UserService.updateUserRole(userId, role);
        res.json({ success: true, message: "Role updated", user: updatedUser });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
exports.UserController = {
    deleteUser,
    updateUserRole
};
