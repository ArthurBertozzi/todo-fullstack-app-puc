import { IconButton } from "@mui/material";
import React from "react";
import styles from "../../../styles/navbar/navbar.module.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";

const ThemeIconButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      size="large"
      aria-label="toggle theme"
      onClick={toggleTheme}
      color="inherit"
      className={styles.iconLarger}
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeIconButton;
