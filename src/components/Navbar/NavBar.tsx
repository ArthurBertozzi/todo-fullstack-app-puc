import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Typography, Toolbar, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import UserMenu from "./UserMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTaskModal from "../Task/CreateTaskModal";
import styles from "../../styles/navbar/navbar.module.css";

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const handleCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tasks control
          </Typography>

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
          <UserMenu
            anchorEl={anchorEl}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        </Toolbar>
      </AppBar>
      <CreateTaskModal
        open={isCreateTaskModalOpen}
        onClose={handleCloseCreateTaskModal}
      />
    </Box>
  );
};

export default NavBar;
