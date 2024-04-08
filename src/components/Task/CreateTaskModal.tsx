import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { Box, TextField, InputLabel, MenuItem } from "@mui/material";
import { Button } from "@mui/joy";
import styles from "../../styles/modal/create-task-modal.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TaskPriority, TaskStatus } from "@prisma/client";
import axios from "axios";
import { getUserEmail } from "../../utils/auth/checkSession";
import { add, isAfter, format } from "date-fns";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onTaskAdded: (newTask: any) => void;
}

const initialTaskState = {
  taskTitle: "",
  taskDescription: "",
  priority: TaskPriority.LOW as TaskPriority,
  dueDate: "",
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  open,
  onClose,
  onTaskAdded,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(
    TaskPriority.LOW as TaskPriority
  );
  const [dueDate, setDueDate] = useState<string>(
    "" // Define o valor inicial formatado como a data atual mais 24 horas
  );

  useEffect(() => {
    if (!open) {
      setTaskTitle(initialTaskState.taskTitle);
      setTaskDescription(initialTaskState.taskDescription);
      setPriority(initialTaskState.priority);
      setDueDate(initialTaskState.dueDate);
    }
  }, [open]);

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as any);
  };

  const handleSubmit = async () => {
    const userEmail = await getUserEmail();

    const data = {
      title: taskTitle,
      description: taskDescription,
      priority: priority,
      dueDate: dueDate,
      email: userEmail,
    };

    console.log(data);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post("/api/tasks/task", data, { headers });
      console.log(response);
      onTaskAdded(response.data);
    } catch (error: any) {
      console.error(error);
      console.log(error.response?.data.message);
    }

    console.log("Enviando a task", taskTitle, taskDescription, priority);
    onClose(); // Fecha o modal após o envio do formulário
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.createTask}>
        <Typography id="modal-modal-description" level="h4">
          Crie uma tarefa
        </Typography>
        <TextField
          id="taskTitle"
          label="Titulo da tarefa"
          variant="standard"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <br />
        <TextField
          id="taskDescription"
          label="Descrição"
          variant="standard"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <br /> <br />
        <InputLabel id="task-priority">Prioridade</InputLabel>
        <Select
          labelId="task-priority"
          id="taskPriority"
          value={priority}
          label="Age"
          onChange={handlePriorityChange}
        >
          <MenuItem value={TaskPriority.LOW}>Baixa</MenuItem>
          <MenuItem value={TaskPriority.MEDIUM}>Média</MenuItem>
          <MenuItem value={TaskPriority.HIGH}>Alta</MenuItem>
        </Select>
        <br /> <br />
        <InputLabel id="task-due-date">Due Date</InputLabel>
        <TextField
          id="dueDate"
          type="text"
          value={dueDate} // Utiliza a string formatada diretamente
          placeholder="01/04/2024 - dd/mm/yyyy"
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br /> <br />
        <Button onClick={handleSubmit}>Enviar</Button>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
