import { prisma } from "@/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

interface User {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  db: PrismaClient;
  constructor(
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
    this.db = db;
  }

  createUser(data: User) {
    return this.db.user.create({
      data,
    });
  }
}
