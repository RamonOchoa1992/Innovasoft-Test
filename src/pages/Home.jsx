import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%', // Asegura que ocupe todo el ancho del main
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // O el color de fondo que prefieras
      }}
    >
      <Typography
        variant='h1'
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '3rem', md: '5rem' }, // Responsivo
          textAlign: 'center',
        }}
      >
        Bienvenido
      </Typography>
    </Box>
  );
};

export default Home;
