"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.authController = void 0;
const AuthService = __importStar(require("./auth.service"));
const authCookie_1 = require("../../utils/authCookie");
const auth_modal_1 = require("./auth.modal");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = auth_modal_1.registerSchema.parse(req.body);
        const user = yield AuthService.registerUser(data);
        const tokens = (0, authCookie_1.setToken)({
            res,
            userId: user.id,
            role: user.role,
            isProduction: process.env.NODE_ENV === "production",
        });
        res.status(201).json({ success: true, user, tokens });
    }
    catch (err) {
        res
            .status(400)
            .json({ success: false, message: err.errors || err.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = auth_modal_1.loginSchema.parse(req.body);
        const { user } = yield AuthService.loginUser(data);
        const tokens = (0, authCookie_1.setToken)({
            res,
            userId: user.id,
            role: user.role,
            isProduction: process.env.NODE_ENV === "production",
        });
        res.json({ success: true, user, tokens });
    }
    catch (err) {
        res
            .status(401)
            .json({ success: false, message: err.errors || err.message });
    }
});
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
});
exports.authController = {
    register,
    login,
    logout,
};
