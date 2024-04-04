import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { Box, TextField, InputLabel, MenuItem } from "@mui/material";
import { Button } from "@mui/joy";
import styles from "../../styles/modal/create-task-modal.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const initialTaskState = {
  taskTitle: "",
  taskDescription: "",
  priority: TaskPriority.LOW as TaskPriority,
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ open, onClose }) => {
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [priority, setPriority] = useState<TaskPriority>(
    TaskPriority.LOW as TaskPriority
  );

  useEffect(() => {
    if (!open) {
      setTaskTitle(initialTaskState.taskTitle);
      setTaskDescription(initialTaskState.taskDescription);
      setPriority(initialTaskState.priority);
    }
  }, [open]);

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as any);
  };

  const handleSubmit = () => {
    // Lógica para lidar com o envio do formulário
    // Por exemplo, enviar os dados para o servidor
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
        <Button onClick={handleSubmit}>Enviar</Button>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
