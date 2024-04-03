import React, { useEffect, useState } from "react";
import AuthGuard from "../components/Auth/AuthGuard";
import { getSession, useSession } from "next-auth/react";
import { decode } from "next-auth/jwt";
import CreateTask from "../components/Task/createTask";
import axios from "axios";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import TaskCard from "../components/Task/taskCard";

interface Task {
  id: string; // Defina o tipo da propriedade id conforme necessário
  title: string;
  description: string;
}

const LoggedTest = () => {
  const session = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log(session);

  const userEmail = session.data?.user?.email;

  console.log(userEmail);

  useEffect(() => {
    const fetchData = async () => {
      setTasks([]);

      if (!userEmail) {
        return;
      }
      try {
        const response = await axios.get(`/api/tasks/task?email=${userEmail}`);

        // Configurando as tarefas no estado do componente
        setTasks(response.data);
      } catch (error: any) {
        console.log(error);
        console.log(error.response.data);
      }
    };

    // Chama a função fetchData assim que o componente monta
    fetchData();
  }, [userEmail]); // O array vazio como segundo argumento garante que o useEffect será executado apenas uma vez, ao montar o componente

  return (
    <div>
      <AuthGuard>
        loggedTest
        <p>{session?.data?.user?.email}</p>
        <CreateTask />
        {tasks.map((task) => {
          return (
            // <div key={task.id}>
            //   <h3>{task.title}</h3>
            //   <p>{task.description}</p>
            // </div>
            <TaskCard key={task.id} task={task} />
          );
        })}
      </AuthGuard>
    </div>
  );
};

export default LoggedTest;
