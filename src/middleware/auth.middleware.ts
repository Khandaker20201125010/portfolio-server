import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Case-insensitive check for Authorization header
  let authHeader = req.headers.authorization || req.headers.Authorization;

  // If header is array, pick first
  if (Array.isArray(authHeader)) authHeader = authHeader[0];

  // If header starts with Bearer, strip prefix
  if (typeof authHeader === "string") {
    token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  }

  // Fallback: x-access-token
  if (!token && req.headers["x-access-token"]) {
    const xToken = req.headers["x-access-token"];
    token = Array.isArray(xToken) ? xToken[0] : xToken;
  }

  // Fallback: query param ?token=...
  if (!token && req.query.token) {
    token = req.query.token as string;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET || "");
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


// Only OWNER access
export const ownerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user || user.role !== "OWNER") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};