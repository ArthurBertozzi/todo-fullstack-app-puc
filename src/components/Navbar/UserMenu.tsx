import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { signOutUser } from "../../utils/auth/signOut";
import styles from "../../styles/navbar/navbar.module.css";
import ProfileModal from "../User/ProfileModal";

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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleQuit = () => {
    signOutUser();
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    handleMenuClose(); // Fecha o menu ao abrir o modal de perfil
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
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
        <MenuItem onClick={handleOpenProfileModal}>Profile</MenuItem>
        <MenuItem onClick={handleQuit}>Quit</MenuItem>
      </Menu>
      {/* Adicione o ProfileModal aqui */}
      <ProfileModal
        open={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      />
    </>
  );
};

export default UserMenu;
