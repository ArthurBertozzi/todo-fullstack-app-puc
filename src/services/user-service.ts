import { PrismaClient } from "@prisma/client";

interface User {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  createUser(data: User) {
    return this.db.user.create({
      data,
    });
  }
}
