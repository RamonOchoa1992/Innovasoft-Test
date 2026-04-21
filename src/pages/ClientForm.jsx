import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Avatar,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Slide,
  Button,
} from '@mui/material';
import { Save, ArrowBack, PhotoCamera, Edit } from '@mui/icons-material';
import { useClientForm } from '../hooks/useClientForm';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  identificacion: Yup.string().required('Requerido'),
  nombre: Yup.string().required('Requerido'),
  apellidos: Yup.string().required('Requerido'),
  genero: Yup.string().required('Requerido'),
  fechaNacimiento: Yup.string().required('Requerido'),
  fechaAfiliacion: Yup.string().required('Requerido'),
  telefonoCelular: Yup.string().required('Requerido'),
  telefonoOtro: Yup.string().required('Requerido'),
  interes: Yup.string().required('Requerido'),
  direccion: Yup.string().required('Requerido'),
  resena: Yup.string().required('Requerido'),
});

const ClientForm = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    isEdit,
    interests,
    loading,
    submitting,
    snackbar,
    handleCloseSnackbar,
    saveClient,
    initialValues,
  } = useClientForm();

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await saveClient(values);
      if (result) setTimeout(() => navigate('/clients'), 1500);
    },
  });

  useEffect(() => {
    const imagen = formik.values.imagen;

    if (!imagen) {
      setPreview(null);
      return;
    }

    if (imagen instanceof File || imagen instanceof Blob) {
      const objectUrl = URL.createObjectURL(imagen);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof imagen === 'string') {
      setPreview(imagen);
    }
  }, [formik.values.imagen]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        width: '100%',
        backgroundColor: '#f4f6f8',
        p: { xs: 1, sm: 2, md: 4 },
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: { xs: 2, md: 4 },
          border: '1px solid #e0e0e0',
          overflowY: 'auto',
          backgroundColor: '#fcfcfc',
          p: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  bgcolor: '#f5f5f5',
                  border: '1px solid #ddd',
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt='Preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : isEdit ? (
                  <Edit color='disabled' />
                ) : null}
              </Avatar>
              <IconButton
                component='label'
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  bgcolor: '#fff',
                  boxShadow: 1,
                  '&:hover': { bgcolor: '#f0f0f0' },
                }}
                size='small'
              >
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  onChange={(e) =>
                    formik.setFieldValue('imagen', e.target.files[0])
                  }
                />
                <PhotoCamera fontSize='small' />
              </IconButton>
            </Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Mantenimiento de clientes
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
            }}
          >
            <Button
              variant='contained'
              onClick={formik.handleSubmit}
              disabled={submitting}
              fullWidth={{ xs: true, sm: false }}
              startIcon={
                submitting ? (
                  <CircularProgress size={20} color='inherit' />
                ) : (
                  <Save />
                )
              }
              sx={{
                bgcolor: '#1890ff',
                '&:hover': { bgcolor: '#0050b3' },
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: { xs: 1, md: 1 },
              }}
            >
              {isEdit ? 'Actualizar' : 'Guardar'}
            </Button>
            <Button
              variant='outlined'
              startIcon={<ArrowBack />}
              onClick={() => navigate('/clients')}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                flex: { xs: 1, sm: 'none' },
              }}
            >
              Regresar
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 10,
            }}
          >
            <CircularProgress size={40} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Cargando información...
            </Typography>
          </Box>
        ) : (
          <Box component='form' noValidate sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {[
                { id: 'identificacion', label: 'Identificación', size: 4 },
                { id: 'nombre', label: 'Nombre', size: 4 },
                { id: 'apellidos', label: 'Apellidos', size: 4 },
                { id: 'genero', label: 'Género', size: 4, select: true },
                {
                  id: 'fechaNacimiento',
                  label: 'Fecha de nacimiento',
                  size: 4,
                  type: 'date',
                },
                {
                  id: 'fechaAfiliacion',
                  label: 'Fecha de afiliación',
                  size: 4,
                  type: 'date',
                },
                { id: 'telefonoCelular', label: 'Teléfono Celular', size: 4 },
                { id: 'telefonoOtro', label: 'Teléfono Otro', size: 4 },
                { id: 'interes', label: 'Interés', size: 4, select: true },
              ].map((f) => (
                <Grid item xs={12} sm={6} md={f.size} key={f.id}>
                  <TextField
                    fullWidth
                    size='small'
                    required // 👈 AQUI SE AGREGA EL ASTERISCO
                    select={f.select}
                    type={f.type || 'text'}
                    label={f.label}
                    name={f.id}
                    value={formik.values[f.id] || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[f.id] && !!formik.errors[f.id]}
                    helperText={formik.touched[f.id] && formik.errors[f.id]}
                    InputLabelProps={{
                      shrink:
                        !!formik.values[f.id] || f.type === 'date' || f.select,
                    }}
                  >
                    {f.id === 'genero' && [
                      <MenuItem key='m' value='Masculino'>
                        Masculino
                      </MenuItem>,
                      <MenuItem key='f' value='Femenino'>
                        Femenino
                      </MenuItem>,
                    ]}
                    {f.id === 'interes' &&
                      interests.map((opt) => (
                        <MenuItem
                          key={opt.id || opt.idInteres}
                          value={opt.id || opt.idInteres}
                        >
                          {opt.nombre || opt.nombreInteres || opt.descripcion}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required // 👈 AQUI SE AGREGA EL ASTERISCO
                  multiline
                  rows={2}
                  label='Dirección'
                  name='direccion'
                  value={formik.values.direccion || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.direccion && !!formik.errors.direccion}
                  helperText={
                    formik.touched.direccion && formik.errors.direccion
                  }
                  InputLabelProps={{ shrink: !!formik.values.direccion }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required // 👈 AQUI SE AGREGA EL ASTERISCO
                  multiline
                  rows={3}
                  label='Reseña'
                  name='resena'
                  value={formik.values.resena || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.resena && !!formik.errors.resena}
                  helperText={formik.touched.resena && formik.errors.resena}
                  InputLabelProps={{ shrink: !!formik.values.resena }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide {...props} direction='down' />}
      >
        <Alert
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientForm;
