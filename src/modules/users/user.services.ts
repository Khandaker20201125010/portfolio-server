import { prisma } from "../../config/db";

 const deleteUser = async (userId: number) => {
  const deleted = await prisma.user.delete({
    where: { id: userId },
  });
  return deleted;
};

 const updateUserRole = async (userId: number, role: "OWNER" | "USER") => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
  return updated;
};
export const UserService = {
    deleteUser,
    updateUserRole
}