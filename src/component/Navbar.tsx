
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, color: 'white' }}>
          <Typography variant="h6">
            Job Application Form
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
