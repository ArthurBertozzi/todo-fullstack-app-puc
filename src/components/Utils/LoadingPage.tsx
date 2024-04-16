import { Button } from "@mui/joy";
import styles from "../../styles/loading/loading.module.css";
import React from "react";

export const LoadingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Button loading variant="plain" size="lg" disabled />
    </div>
  );
};
