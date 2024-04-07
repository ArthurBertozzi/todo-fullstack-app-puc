import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../../styles/navbar/navbar.module.css";
import { IconButton } from "@mui/material";

const EditTaskIcon = () => {
  return (
    <IconButton
      size="large"
      aria-label="toggle theme"
      //onClick={''}
      color="inherit"
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditTaskIcon;
