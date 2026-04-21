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
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { formik, loading, serverError, showPassword, togglePassword } =
    useLogin();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
          Iniciar Sesión
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: 'text.secondary' }}>
          Ingrese sus credenciales para acceder
        </Typography>

        {serverError && (
          <Alert severity='error' sx={{ mb: 2, textAlign: 'left' }}>
            {serverError}
          </Alert>
        )}

        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete='off'
        >
          {/* BLOQUE ANTI-AUTOFILL: 
            Estos campos invisibles capturan el autocompletado del navegador 
            para que no llenen los campos reales de abajo.
          */}
          <input
            type='text'
            name='prevent_autofill'
            style={{ display: 'none' }}
            tabIndex='-1'
          />
          <input
            type='password'
            name='password_prevent_autofill'
            style={{ display: 'none' }}
            tabIndex='-1'
          />

          <TextField
            fullWidth
            margin='normal'
            label='Nombre de Usuario *'
            placeholder='Nombre de usuario'
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            // 'one-time-code' es un truco para confundir a los gestores de contraseñas
            autoComplete='one-time-code'
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
            label='Contraseña *'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            // 'new-password' indica al navegador que no debe sugerir contraseñas viejas
            autoComplete='new-password'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Lock sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name='rememberMe'
                  size='small'
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                />
              }
              label={<Typography variant='body2'>Recuérdame</Typography>}
            />
          </Box>

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
              'INICIAR SESIÓN'
            )}
          </Button>

          <Typography variant='body2' sx={{ mt: 2 }}>
            ¿No tiene una cuenta?{' '}
            <Link
              component={RouterLink}
              to='/register'
              sx={{
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Regístrese
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
