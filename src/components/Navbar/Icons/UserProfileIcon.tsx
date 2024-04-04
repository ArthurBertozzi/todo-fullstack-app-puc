import { IconButton } from "@mui/material";
import React from "react";
import styles from "../../../styles/navbar/navbar.module.css";
import { AccountCircle } from "@mui/icons-material";

interface UserProfileIconProps {
  handleProfileMenuOpen: any;
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({
  handleProfileMenuOpen,
}) => {
  return (
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls="primary-search-account-menu"
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
      className={styles.iconLarger}
    >
      <AccountCircle />
    </IconButton>
  );
};

export default UserProfileIcon;
