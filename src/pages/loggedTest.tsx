import React, { useEffect, useState } from "react";
import AuthGuard from "../components/Auth/AuthGuard";
import { useSession } from "next-auth/react";
import CreateTask from "../components/Task/createTask";
import axios from "axios";
import TaskCard from "../components/Task/taskCard";
import NavBar from "../components/Navbar/NavBar";
import styles from "../styles/tasks/task-page.module.css";
import CreateTaskModal from "../components/Task/CreateTaskModal";

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
    <div className={styles.container}>
      <AuthGuard>
        <NavBar />
        <div className={styles.content}>
          <p>{session?.data?.user?.email}</p>

          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </AuthGuard>
    </div>
  );
};

export default LoggedTest;
