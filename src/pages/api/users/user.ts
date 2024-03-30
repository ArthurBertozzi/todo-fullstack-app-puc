import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../../../services/user.service";
import { hashPassword } from "../../../utils/bcrypt";
import { initializePrisma } from "../../../../prisma";

// Initialize PrismaClient and UserService
const prisma = initializePrisma();
const userService = new UserService(prisma);

async function validateExistingUser(email: string) {
  try {
    const existingUser = await userService.findByEmail(email);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to handle POST request
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password } = req.body;

    const userExists = await validateExistingUser(email);
    console.log(userExists);

    if (userExists === true) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await userService.createUser({
      name,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle PUT request for updating user
async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string; // Extract user ID from request query
    const { name, email, password } = req.body;

    const updatedUser = await userService.updateUser(userId, {
      name,
      email,
      password,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle DELETE request for deleting user
async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string; // Extract user ID from request query

    await userService.deleteUser(userId);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle GET request for retrieving user tasks
async function handleGetUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body; // Extract user ID from request query

    const user = await userService.findByEmail(email);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user tasks:", error);
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
    case "GET":
      await handleGetUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE", "GET"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }

  // Disconnect PrismaClient after handling the request
  await prisma.$disconnect();
}
