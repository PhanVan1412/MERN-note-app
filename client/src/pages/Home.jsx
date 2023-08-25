import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Outlet, useLoaderData } from 'react-router-dom';

import UserMenu from '../components/userMenu/UserMenu';
import FolderList from '../components/folders/FolderList';

const Home = () => {
  const { folders } = useLoaderData();
  return (
    <>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        Note App
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          mb: '10px',
          width: 300,
        }}
      >
        <UserMenu sx={{ width: '100%' }} />
      </Box>
      <Grid
        container
        sx={{
          height: '50vh',
          boxShadow: '0 0 15px 0 rgba(193, 193, 193, 0.6)',
        }}
      >
        <Grid item xs={3} sx={{ height: '100%' }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
