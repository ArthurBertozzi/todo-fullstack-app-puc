import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { Box, TextField, InputLabel, MenuItem } from "@mui/material";
import { Button } from "@mui/joy";
import styles from "../../styles/modal/create-task-modal.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TaskPriority, TaskStatus } from "@prisma/client";
import axios from "axios";
import { getUser, getUserEmail } from "../../utils/auth/checkSession";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const [userData, setUserData] = useState<any>(null); // Estado para armazenar os dados do usuário

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (open) {
      fetchUserData(); // Chame a função para buscar os dados do usuário apenas quando o modal estiver aberto
    }
  }, [open]);

  const handleSubmit = () => {
    onClose(); // Fecha o modal após o envio do formulário
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.createTask}>
        <Typography id="modal-modal-description" level="h4">
          Painel do usuário
        </Typography>
        <br />
        {userData && (
          <>
            <Typography id="modal-modal-description" level="body-md">
              Nome: {userData.name}
            </Typography>
            <br />
            <Typography id="modal-modal-description" level="body-md">
              Email: {userData.email}
            </Typography>
            <br />
          </>
        )}
        <Button onClick={handleSubmit} color="success">
          Sair
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
