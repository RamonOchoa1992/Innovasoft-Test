import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'; // <--- Iconos añadidos
import { Link as RouterLink } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
  const { formik, loading, serverError, showPassword, togglePassword } =
    useRegister();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={15}
        sx={{
          p: 6,
          width: '100%',
          maxWidth: 450,
          borderRadius: 5,
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography
          variant='h4'
          sx={{ mb: 1, fontWeight: 700, color: '#1976d2' }}
        >
          Crear Cuenta
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: 'text.secondary' }}>
          Regístrese para comenzar
        </Typography>

        {serverError && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete='off'
        >
          <TextField
            fullWidth
            margin='normal'
            label='Nombre de usuario *'
            name='username'
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            placeholder='Nombre de usuario'
            autoComplete='new-off'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Person sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin='normal'
            label='Dirección de correo *'
            name='correo'
            {...formik.getFieldProps('correo')}
            error={formik.touched.correo && Boolean(formik.errors.correo)}
            helperText={formik.touched.correo && formik.errors.correo}
            placeholder='ejemplo@correo.com'
            autoComplete='new-off'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin='normal'
            label='Contraseña *'
            name='password'
            type={showPassword ? 'text' : 'password'} // <--- Dinámico
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder='••••••••'
            autoComplete='new-password'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Lock sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              // <--- El "ojito" añadido aquí
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            disabled={loading}
            sx={{ mt: 4, mb: 2, py: 1.8, borderRadius: 2, fontWeight: 'bold' }}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              'REGISTRARME'
            )}
          </Button>

          <Typography variant='body2' sx={{ mt: 2 }}>
            ¿Ya tiene una cuenta?{' '}
            <Link
              component={RouterLink}
              to='/login'
              sx={{ fontWeight: 'bold', textDecoration: 'none' }}
            >
              Inicie sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
