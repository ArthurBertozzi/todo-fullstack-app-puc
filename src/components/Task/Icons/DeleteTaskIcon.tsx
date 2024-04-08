import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { IconButton } from "@mui/material";

interface EditTaskIconProps {
  onClick: () => void; // Adiciona a propriedade onClick
}

const DeleteTaskIcon: React.FC<EditTaskIconProps> = ({ onClick }) => {
  return (
    <IconButton
      size="large"
      aria-label="Editar tarefa" // Atualiza a descrição do botão
      onClick={onClick} // Adiciona o evento onClick
      color="inherit"
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteTaskIcon;
