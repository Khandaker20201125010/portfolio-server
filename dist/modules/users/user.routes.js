"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// All routes in this router are already protected via app.ts
router.get("/", user_controller_1.getAllUsers);
router.delete("/:id", user_controller_1.UserController.deleteUser);
router.patch("/:id/role", user_controller_1.UserController.updateUserRole);
exports.userRoutes = router;
