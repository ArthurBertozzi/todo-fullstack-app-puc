import { IconButton } from "@mui/material";
import React from "react";
import styles from "../../../styles/navbar/navbar.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface CreateTaskIconModalProps {
  handleOpenCreateTaskModal: () => void;
}

const CreateTaskIconModal: React.FC<CreateTaskIconModalProps> = ({
  handleOpenCreateTaskModal,
}) => {
  return (
    <IconButton
      size="large"
      aria-label="add task"
      aria-haspopup="true"
      onClick={handleOpenCreateTaskModal}
      color="inherit"
      className={styles.iconLarger}
    >
      <AddCircleOutlineIcon />
    </IconButton>
  );
};

export default CreateTaskIconModal;
