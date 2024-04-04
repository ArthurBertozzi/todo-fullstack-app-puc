import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { signOutUser } from "../../utils/auth/signOut";
import styles from "../../styles/navbar/navbar.module.css";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => {
  const handleQuit = () => {
    signOutUser();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={styles.menu}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleQuit}>Quit</MenuItem>
    </Menu>
  );
};

export default UserMenu;
