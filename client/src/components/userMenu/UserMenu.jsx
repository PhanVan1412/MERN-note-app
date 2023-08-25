import React, { useContext, useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider';

export default function UserMenu() {
  const auth = getAuth();
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    auth.signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar alt="user image" src={photoURL} sx={{ width: 24, height: 24, marginLeft: '5px' }} />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: 200, justifyContent: 'right', alignItems: 'flex-end' }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
