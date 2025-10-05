"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/users/user.routes");
const auth_middleware_1 = require("./middleware/auth.middleware");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const blog_routes_1 = require("./modules/blog/blog.routes");
const project_routes_1 = require("./modules/project/project.routes");
const contact_route_1 = require("./modules/Contact/contact.route");
const app = (0, express_1.default)();
// Middleware
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // important for cookies
}));
// Routes
app.use("/api/auth", auth_routes_1.AuthRoutes);
app.use("/api/users", auth_middleware_1.authMiddleware, auth_middleware_1.ownerMiddleware, user_routes_1.userRoutes);
app.use("/api/blogs", blog_routes_1.blogRoutes);
app.use("/api/projects", project_routes_1.projectRoutes);
app.use("/api/contact", contact_route_1.contactRoutes);
// Health check
app.get("/", (_req, res) => res.send("API is running"));
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route Not Found" });
});
// Global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
