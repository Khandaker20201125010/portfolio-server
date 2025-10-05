import compression from "compression";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { AuthRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/user.routes";
import { authMiddleware, ownerMiddleware } from "./middleware/auth.middleware";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { blogRoutes } from "./modules/blog/blog.routes";
import { projectRoutes } from "./modules/project/project.routes";
import { contactRoutes } from "./modules/Contact/contact.route";

const app = express();

// Middleware
app.use(compression());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // important for cookies
  })
);

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", authMiddleware, ownerMiddleware, userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (_req, res) => res.send("API is running"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
