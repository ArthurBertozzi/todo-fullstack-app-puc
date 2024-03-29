import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { hashPassword } from "../utils/bcrypt";

const userSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export class UserService {
  db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createUser(data: z.infer<typeof userSchema>) {
    try {
      userSchema.parse(data);
    } catch (error: any) {
      throw new Error(`Invalid user data: ${error.message}`);
    }

    data.password = await hashPassword(data.password);

    return await this.db.user.create({
      data,
    });
  }

  async updateUser(userId: string, data: Partial<z.infer<typeof userSchema>>) {
    try {
      userSchema.partial().parse(data);
    } catch (error: any) {
      throw new Error(`Invalid user data: ${error.message}`);
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return await this.db.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: string) {
    return await this.db.user.delete({
      where: { id: userId },
    });
  }

  async getUserTasks(userId: string) {
    return await this.db.user.findUnique({
      where: { id: userId },
      include: { Task: true },
    });
  }

  async findByEmail(email: string) {
    return await this.db.user.findFirstOrThrow({
      where: { email: email },
    });
  }
}
