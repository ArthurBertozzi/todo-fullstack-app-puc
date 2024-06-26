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
import { format } from "date-fns";

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

interface EditTaskModalProps {
  open: boolean;
  onClose: (updatedTask: Task | null) => void; // Atualiza a definição da propriedade onClose
  task: Task; // Adiciona a propriedade para receber os dados da tarefa
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  task,
}) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [dueDate, setDueDate] = useState<string | null>(
    task.dueDate ? format(new Date(task.dueDate), "dd/MM/yyyy") : null
  );
  const [status, setStatus] = useState<TaskStatus>(
    task.status ? task.status : TaskStatus.NEW
  );

  useEffect(() => {
    if (open) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setPriority(task.priority);
      setDueDate(
        task.dueDate ? format(new Date(task.dueDate), "dd/MM/yyyy") : null
      ); // Adjusted formatting
      setStatus(task.status ? task.status : TaskStatus.NEW);
    }
  }, [open, task]);

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as any);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as any);
  };

  const handleSubmit = async () => {
    const userEmail = await getUserEmail();
    const data = {
      id: task.id,
      title: taskTitle,
      description: taskDescription,
      priority: priority,
      dueDate: dueDate
        ? new Date(dueDate.split("/").reverse().join("-"))
        : null, // Adjusted date format for backend
      email: userEmail,
      status: status,
    };

    console.log(data);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(`/api/tasks/task`, data, {
        headers,
      }); // Altera para o método PUT para atualizar a tarefa
      console.log(response);
      onClose(response.data);
    } catch (error: any) {
      console.error(error);
      console.log(error.response?.data.message);
    }
  };

  return (
    <Modal open={open} onClose={() => onClose(null)}>
      <Box className={styles.createTask}>
        <Typography id="modal-modal-description" level="h4">
          Editar Tarefa
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
        <br />
        <InputLabel id="task-status">Prioridade</InputLabel>
        <Select
          labelId="task-status"
          id="taskStatus"
          value={status}
          label="Age"
          onChange={handleStatusChange}
        >
          <MenuItem value={TaskStatus.NEW}>Nova</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>Em progresso</MenuItem>
          <MenuItem value={TaskStatus.COMPLETED}>Finalizada</MenuItem>
        </Select>
        <br />
        <InputLabel id="task-due-date">Due Date</InputLabel>
        <TextField
          id="dueDate"
          type="text"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <Button onClick={handleSubmit}>Salvar Alterações</Button>
        {/* Altera o texto do botão */}
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
