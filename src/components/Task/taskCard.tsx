import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import styles from "../../styles/tasks/task-page.module.css"; // Importe os estilos CSS

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card
      // className={styles.cardTest}
      variant="soft"
      size="md"
      key={task.id}
      sx={{ width: 280 }}
    >
      <CardContent>
        <Typography level="title-md">{task.title}</Typography>
        <Divider orientation="horizontal" />
        <Typography level="body-sm">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
