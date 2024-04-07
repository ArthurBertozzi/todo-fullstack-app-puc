import React, { useEffect, useState } from "react";
import AuthGuard from "../../components/Auth/AuthGuard";
import { useSession } from "next-auth/react";
import axios from "axios";
import TaskCard from "../../components/Task/taskCard";
import NavBar from "../../components/Navbar/NavBar";
import styles from "../../styles/tasks/task-page.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fetchData } from "next-auth/client/_utils";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface Task {
  id: string;
  title: string;
  description: string;
  status?: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  userId: string;
}

const TaskView = () => {
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

        setTasks(response.data);
      } catch (error: any) {
        console.log(error);
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className={styles.container}>
      <AuthGuard>
        <NavBar onTaskAdded={handleTaskAdded} />
        <div className={styles.content}>
          {tasks.length === 0 ? (
            <p>
              Crie uma tarefa no botão Mais <AddCircleOutlineIcon /> na barra
              superior.
            </p>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </AuthGuard>
    </div>
  );
};

export default TaskView;
