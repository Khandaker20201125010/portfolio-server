"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.getAllUsers = void 0;
const user_services_1 = require("./user.services");
const db_1 = require("../../config/db");
const getAllUsers = async (req, res) => {
    try {
        const users = await db_1.prisma.user.findMany({
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
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const deletedUser = await user_services_1.UserService.deleteUser(userId);
        res.json({ success: true, message: "User deleted", user: deletedUser });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { role } = req.body;
        if (!role || !["OWNER", "USER"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }
        const updatedUser = await user_services_1.UserService.updateUserRole(userId, role);
        res.json({ success: true, message: "Role updated", user: updatedUser });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.UserController = {
    deleteUser,
    updateUserRole
};
