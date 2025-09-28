import { Router } from "express";

import {
  authMiddleware,
  ownerMiddleware,
} from "../../middleware/auth.middleware";
import { UserController } from "./user.controller";

const router = Router();

router.use(authMiddleware, ownerMiddleware);

router.delete("/users/:id", UserController.deleteUser);
router.patch("/users/:id/role", UserController.updateUserRole);

export default router;
