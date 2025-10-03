// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { setToken } from "../../utils/authCookie";
import { loginSchema, registerSchema } from "./auth.modal";

const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.registerUser(data);

    const tokens = setToken({ res, userId: user.id, role: user.role });

    res.status(201).json({ success: true, user, tokens });
  } catch (err: any) {
    console.error("Register Error:", err);
    res
      .status(400)
      .json({ success: false, message: err.errors || err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user } = await AuthService.loginUser(data);

    const tokens = setToken({ res, userId: user.id, role: user.role });

    res.json({ success: true, user, tokens });
  } catch (err: any) {
    console.error("Login Error:", err);
    res
      .status(401)
      .json({ success: false, message: err.errors || err.message });
  }
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully" });
};

export const authController = { register, login, logout };
