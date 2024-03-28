import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../bcrypt";

export const signIn = async (
  credentials: { email: string; password: string } | null,
  prisma: PrismaClient
) => {
  if (!credentials) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      return null;
    }

    const isMatch = await comparePassword(credentials.password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
