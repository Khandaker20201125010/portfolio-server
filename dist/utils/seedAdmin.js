"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const seedSuperAdmin = async () => {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME || "Super Admin";
    // check if already exists
    const existing = await db_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log("Super admin already exists");
        return;
    }
    // hash password
    const hashed = await bcryptjs_1.default.hash(password, 10);
    // create super admin
    await db_1.prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
            role: "OWNER", // highest privilege role
        },
    });
    console.log("🚀 Super admin created successfully");
};
exports.seedSuperAdmin = seedSuperAdmin;
