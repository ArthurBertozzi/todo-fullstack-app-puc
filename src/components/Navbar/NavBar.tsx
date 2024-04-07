import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Typography, Toolbar, IconButton } from "@mui/material";
import UserMenu from "./UserMenu";
import CreateTaskModal from "../Task/CreateTaskModal";
import ThemeIconButton from "./Icons/ThemeIconButton";
import CreateTaskIconModal from "./Icons/CreateTaskIconModal";
import UserProfileIcon from "./Icons/UserProfileIcon";
import ProfileModal from "../User/ProfileModal";

const NavBar: React.FC<{ onTaskAdded: (newTask: any) => void }> = ({
  onTaskAdded,
}) => {
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

          <CreateTaskIconModal
            handleOpenCreateTaskModal={handleOpenCreateTaskModal}
          />

          <ThemeIconButton />

          <UserProfileIcon handleProfileMenuOpen={handleProfileMenuOpen} />
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
        onTaskAdded={onTaskAdded}
      />
    </Box>
  );
};

export default NavBar;
