import React from 'react';
import { Box, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

const primary = lightBlue[500];

const NotFoundComponent = () => {
    return(
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
    )
} 

export default NotFoundComponent;