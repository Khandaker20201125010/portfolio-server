import { Request, Response } from "express";
import * as AuthService from "./auth.service";

import { setToken } from "../../utils/authCookie";
import { loginSchema, registerSchema } from "./auth.modal";

export const register = async (req: Request, res: Response) => {
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
    res.status(400).json({ success: false, message: err.errors || err.message });
  }
};

export const login = async (req: Request, res: Response) => {
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
    res.status(401).json({ success: false, message: err.errors || err.message });
  }
};
