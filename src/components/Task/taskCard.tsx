import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import styles from "../../styles/tasks/taskcard.module.css"; // Importe os estilos CSS
import { TaskPriority, TaskStatus } from "@prisma/client";
import { format } from "date-fns"; // Importe a função format do date-fns
import EditTaskIcon from "./Icons/EditTaskIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

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
  const formattedCreatedDate = task.createdAt
    ? format(new Date(task.createdAt), "dd/MM/yyyy HH:mm")
    : "";

  const formattedFinishedDate = task.completedAt
    ? format(new Date(task.completedAt), "dd/MM/yyyy HH:mm")
    : "";

  return (
    <Card className={styles.card}>
      <CardContent>
        <div className={styles.cardRow}>
          <Typography className={styles.title} level="title-md">
            {task.title}
          </Typography>
          <EditTaskIcon />
        </div>
        <div>
          <Typography className={styles.description} level="title-md">
            Priority: {task.priority.toLocaleLowerCase()}
          </Typography>
          <Typography className={styles.description} level="title-md">
            Status: {task.status?.toLocaleLowerCase()}
          </Typography>
          <Typography className={styles.description} level="title-md">
            <CalendarMonthIcon className={styles.iconCalendar} />
            {formattedCreatedDate}
          </Typography>
          <Typography className={styles.description} level="title-md">
            <EventAvailableIcon className={styles.iconCalendar} />
            {formattedDueDate}
          </Typography>
        </div>
        <Divider orientation="horizontal" />

        <Typography className={styles.description} level="body-sm">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
