import React, { useState } from "react";
import { initializePrisma } from "../../../prisma";
import { useSession } from "next-auth/react";
import { TaskPriority, TaskStatus } from "@prisma/client";
import axios from "axios";

interface UserFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

interface Task {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
}

const prisma = initializePrisma();

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>(
    TaskPriority.LOW as TaskPriority
  );

  const session = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userEmail = session.data?.user?.email;
    if (!userEmail) {
      return; // Handle error
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        email: userEmail,
        title,
        description,
        priority,
      };

      const response = await axios.post("/api/tasks/task", body, {
        headers,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="description"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        {Object.values(TaskPriority).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button type="submit">Criar Task</button>
    </form>
  );
};

export default CreateTask;
