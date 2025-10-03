"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
const jwt_1 = require("./jwt");
const setToken = ({ res, userId, role, accessTokenExpiresIn = "1d", refreshTokenExpiresIn = "7d", }) => {
    const secret = process.env.JWT_SECRET || "supersecret";
    const isProduction = process.env.NODE_ENV === "production";
    const accessToken = (0, jwt_1.generateToken)({ userId, role }, secret, accessTokenExpiresIn);
    const refreshToken = (0, jwt_1.generateToken)({ userId, role }, secret, refreshTokenExpiresIn);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    return { accessToken, refreshToken };
};
exports.setToken = setToken;
