"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../../config/db");
const deleteUser = async (userId) => {
    const deleted = await db_1.prisma.user.delete({
        where: { id: userId },
    });
    return deleted;
};
const updateUserRole = async (userId, role) => {
    const updated = await db_1.prisma.user.update({
        where: { id: userId },
        data: { role },
    });
    return updated;
};
exports.UserService = {
    deleteUser,
    updateUserRole
};
