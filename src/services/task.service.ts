import { PrismaClient } from "@prisma/client";
import { z } from "zod";

enum TaskStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// Define Zod schema for task validation
const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date().optional(),
});

export class TaskService {
  db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createTask(userId: string, data: z.infer<typeof taskSchema>) {
    try {
      taskSchema.parse(data);
    } catch (error: any) {
      throw new Error(`Invalid task data: ${error.message}`);
    }

    return await this.db.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateTask(taskId: string, data: Partial<z.infer<typeof taskSchema>>) {
    try {
      taskSchema.partial().parse(data);
    } catch (error: any) {
      throw new Error(`Invalid task data: ${error.message}`);
    }

    return await this.db.task.update({
      where: { id: taskId },
      data,
    });
  }

  async deleteTask(taskId: string) {
    return await this.db.task.delete({
      where: { id: taskId },
    });
  }

  async getUserTasks(userId: string) {
    return await this.db.task.findMany({
      where: { userId },
    });
  }

  async getTaskById(taskId: string) {
    return await this.db.task.findUnique({
      where: { id: taskId },
    });
  }
}
