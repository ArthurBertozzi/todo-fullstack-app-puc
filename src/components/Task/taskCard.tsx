import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import styles from "../../styles/tasks/taskcard.module.css"; // Importe os estilos CSS
import { TaskPriority, TaskStatus } from "@prisma/client";
import { format } from "date-fns"; // Importe a função format do date-fns

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

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "dd/MM/yyyy HH:mm")
    : "";

  return (
    <Card className={styles.card}>
      <CardContent>
        <div>
          <Typography className={styles.title} level="title-md">
            {task.title}
          </Typography>
          <Typography className={styles.title} level="title-md">
            Priority: {task.priority.toLocaleLowerCase()}
          </Typography>
          <Typography className={styles.title} level="title-md">
            Status: {task.status?.toLocaleLowerCase()}
          </Typography>
        </div>
        <Divider orientation="horizontal" />
        <Typography className={styles.title} level="title-md">
          {formattedDueDate}
        </Typography>
        <Typography className={styles.description} level="body-sm">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
