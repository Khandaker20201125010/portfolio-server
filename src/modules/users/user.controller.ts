import { Request, Response } from "express";
import { UserService } from "./user.services";

 const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const deletedUser = await UserService.deleteUser(userId);
    res.json({ success: true, message: "User deleted", user: deletedUser });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

 const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (!role || !["OWNER", "USER"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const updatedUser = await UserService.updateUserRole(
      userId,
      role as "OWNER" | "USER"
    );
    res.json({ success: true, message: "Role updated", user: updatedUser });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const UserController = {
    deleteUser,
    updateUserRole
}