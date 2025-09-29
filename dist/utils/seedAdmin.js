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
exports.seedSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME || "Super Admin";
    // check if already exists
    const existing = yield db_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log("Super admin already exists");
        return;
    }
    // hash password
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    // create super admin
    yield db_1.prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
            role: "OWNER", // highest privilege role
        },
    });
    console.log("🚀 Super admin created successfully");
});
exports.seedSuperAdmin = seedSuperAdmin;
