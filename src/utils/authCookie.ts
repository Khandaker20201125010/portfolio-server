import { Response } from "express";
import { generateToken } from "./jwt";

interface SetTokenOptions {
  res: Response;
  userId: number;
  role: "OWNER" | "USER";
  accessTokenExpiresIn?: string;
  refreshTokenExpiresIn?: string;
}

export const setToken = ({
  res,
  userId,
  role,
  accessTokenExpiresIn = "1d",
  refreshTokenExpiresIn = "7d",
}: SetTokenOptions) => {
  const secret = process.env.JWT_SECRET || "supersecret";
  const isProduction = process.env.NODE_ENV === "production";

  const accessToken = generateToken({ userId, role }, secret, accessTokenExpiresIn);
  const refreshToken = generateToken({ userId, role }, secret, refreshTokenExpiresIn);

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
