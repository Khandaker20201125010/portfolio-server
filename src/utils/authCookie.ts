import { Response } from "express";
import { generateToken } from "./jwt";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

interface SetTokenOptions {
  res: Response;
  userId: number;
  role: "OWNER" | "USER";
  isProduction?: boolean;
  accessTokenExpiresIn?: string;
  refreshTokenExpiresIn?: string;
}

export const setToken = ({
  res,
  userId,
  role,
  isProduction = false,
  accessTokenExpiresIn = "15m",
  refreshTokenExpiresIn = "7d",
}: SetTokenOptions) => {
  const secret = process.env.JWT_SECRET || "supersecret";

  // generate tokens
  const accessToken = generateToken({ userId, role }, secret, accessTokenExpiresIn);
  const refreshToken = generateToken({ userId, role }, secret, refreshTokenExpiresIn);

  // cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", 
  } as const; 

  // set cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return { accessToken, refreshToken };
};
