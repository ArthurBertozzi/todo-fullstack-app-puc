import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const initializePrisma = () => {
  if (process.env.NODE_ENV === "production") {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
};
