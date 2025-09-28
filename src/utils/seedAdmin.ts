import bcrypt from "bcryptjs";
import { prisma } from "../config/db";

export const seedSuperAdmin = async () => {
  const email = process.env.SUPER_ADMIN_EMAIL!;
  const password = process.env.SUPER_ADMIN_PASSWORD!;
  const name = process.env.SUPER_ADMIN_NAME || "Super Admin";

  // check if already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Super admin already exists");
    return;
  }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // create super admin
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: "OWNER", // highest privilege role
    },
  });

  console.log("🚀 Super admin created successfully");
};
