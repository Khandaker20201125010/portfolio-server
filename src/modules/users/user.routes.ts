import { Router } from "express";
import { getAllUsers, UserController } from "./user.controller";

const router = Router();

// All routes in this router are already protected via app.ts
router.get("/", getAllUsers);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id/role", UserController.updateUserRole);

export const userRoutes = router;
