import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { name, email, password } = await req.body;
  console.log(name, email, password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json(user);
}
