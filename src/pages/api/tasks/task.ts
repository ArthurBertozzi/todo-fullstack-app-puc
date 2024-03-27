import { NextApiRequest, NextApiResponse } from "next";
import { TaskService } from "../../../services/task.service";
import { initializePrisma } from "../../../../prisma";

// Initialize PrismaClient and TaskService
const prisma = initializePrisma();
const taskService = new TaskService(prisma);

// Function to handle POST request for creating a task
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.userId as string; // Extract user ID from request query
    const { title, description, status, priority, dueDate } = req.body;

    const newTask = await taskService.createTask(userId, {
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle PUT request for updating a task
async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = req.query.id as string; // Extract task ID from request query
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTask = await taskService.updateTask(taskId, {
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle DELETE request for deleting a task
async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = req.query.id as string; // Extract task ID from request query

    await taskService.deleteTask(taskId);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }

  // Disconnect PrismaClient after handling the request
  await prisma.$disconnect();
}
