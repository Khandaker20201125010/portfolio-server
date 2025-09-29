"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
const jwt_1 = require("./jwt");
const setToken = ({ res, userId, role, isProduction = false, accessTokenExpiresIn = "15m", refreshTokenExpiresIn = "7d", }) => {
    const secret = process.env.JWT_SECRET || "supersecret";
    // generate tokens
    const accessToken = (0, jwt_1.generateToken)({ userId, role }, secret, accessTokenExpiresIn);
    const refreshToken = (0, jwt_1.generateToken)({ userId, role }, secret, refreshTokenExpiresIn);
    // cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    };
    // set cookies
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return { accessToken, refreshToken };
};
exports.setToken = setToken;
