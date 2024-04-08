// EditTaskIcon.tsx
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

interface EditTaskIconProps {
  onClick: () => void; // Adiciona a propriedade onClick
}

const EditTaskIcon: React.FC<EditTaskIconProps> = ({ onClick }) => {
  return (
    <IconButton
      size="large"
      aria-label="Editar tarefa" // Atualiza a descrição do botão
      onClick={onClick} // Adiciona o evento onClick
      color="inherit"
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditTaskIcon;
