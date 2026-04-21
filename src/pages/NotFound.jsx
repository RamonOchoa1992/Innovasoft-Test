import React from 'react';
import { Box, Typography } from '@mui/material';
import { WarningAmber } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ textAlign: 'center', p: 3 }}>
        {/* ICONO Y NÚMERO 404 JUNTOS (Heredando el estilo de la imagen) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 1,
          }}
        >
          <WarningAmber
            sx={{
              fontSize: '6rem',
              color: '#1890ff', // Azul Material UI (como el de tu imagen)
            }}
          />
          <Typography
            variant='h1'
            sx={{
              fontWeight: 800,
              fontSize: '7rem',
              color: '#1890ff',
              lineHeight: 1, // Para alinear bien con el icono
            }}
          >
            404
          </Typography>
        </Box>

        {/* TEXTO DE Oops... */}
        <Typography
          variant='h3'
          sx={{
            fontWeight: 600,
            color: '#555', // Un gris oscuro, no negro puro
            letterSpacing: 0.5,
          }}
        >
          Oops... Page Not Found!
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
