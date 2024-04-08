import React, { useEffect, useState } from "react";
import AuthGuard from "../../components/Auth/AuthGuard";
import { useSession } from "next-auth/react";
import axios from "axios";
import TaskCard from "../../components/Task/taskCard";
import NavBar from "../../components/Navbar/NavBar";
import styles from "../../styles/tasks/task-page.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface Task {
  id: string;
  title: string;
  description: string;
  status?: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate?: Date | null;
  completedAt?: Date;
  userId: string;
}

const TaskView = () => {
  const session = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByDateAsc, setSortByDateAsc] = useState<boolean>(true);

  const userEmail = session.data?.user?.email;

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const fetchData = async () => {
      setTasks([]);

      if (!userEmail) {
        return;
      }
      try {
        const response = await axios.get(`/api/tasks/task?email=${userEmail}`);

        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error: any) {
        console.log(error);
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    // Filter tasks based on search term
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tasks, searchTerm]);

  const handleSortByDate = () => {
    setSortByDateAsc((prev) => !prev);
    setFilteredTasks((prevTasks) =>
      prevTasks.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortByDateAsc ? dateA - dateB : dateB - dateA;
      })
    );
  };

  return (
    <div className={styles.container}>
      <AuthGuard>
        <NavBar onTaskAdded={handleTaskAdded} />
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSortByDate}>
            {sortByDateAsc ? "Mais antigos primeiro" : "Mais recentes primeiro"}
          </button>
        </div>
        <div className={styles.content}>
          {filteredTasks.length === 0 ? (
            <p>
              Crie uma tarefa no botão Mais <AddCircleOutlineIcon /> na barra
              superior.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleTaskUpdated={handleTaskUpdated}
                handleTaskDeleted={handleTaskDeleted}
              />
            ))
          )}
        </div>
      </AuthGuard>
    </div>
  );
};

export default TaskView;
