import { Request, Response } from "express";
import * as AuthService from "./auth.service";

import { setToken } from "../../utils/authCookie";
import { loginSchema, registerSchema } from "./auth.modal";

const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.registerUser(data);

    const tokens = setToken({
      res,
      userId: user.id,
      role: user.role,
      isProduction: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user, tokens });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.errors || err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user } = await AuthService.loginUser(data);

    const tokens = setToken({
      res,
      userId: user.id,
      role: user.role,
      isProduction: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, user, tokens });
  } catch (err: any) {
    res
      .status(401)
      .json({ success: false, message: err.errors || err.message });
  }
};
const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

export const authController = {
  register,
  login,
  logout,
};
