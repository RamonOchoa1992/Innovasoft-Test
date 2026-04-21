import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import {
  Add,
  ArrowBack,
  Search,
  Edit,
  Delete,
  WarningAmber,
} from '@mui/icons-material';
import { useClients } from '../hooks/useClients';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const navigate = useNavigate();
  const {
    clients,
    totalCount,
    loading,
    filters,
    handleFilterChange,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    openDeleteDialog,
    clientToDelete,
    handleOpenDelete,
    handleCloseDelete,
    deleteClient,
    snackbar,
    handleCloseSnackbar,
  } = useClients();

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
          overflow: 'hidden',
          backgroundColor: '#fcfcfc',
        }}
      >
        {/* HEADER */}
        <Box sx={{ p: { xs: 2, md: 4 }, pb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Consulta de clientes
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={() => navigate('/clients/new')}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  flex: { xs: 1, sm: 'none' },
                  bgcolor: '#1890ff',
                  '&:hover': { bgcolor: '#0050b3' },
                }}
              >
                Agregar
              </Button>
              <Button
                variant='outlined'
                startIcon={<ArrowBack />}
                onClick={() => navigate('/home')}
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

          {/* FILTROS */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              mb: 2,
            }}
          >
            <TextField
              fullWidth
              label='Filtrar por nombre'
              size='small'
              value={filters.fullName}
              onChange={(e) => handleFilterChange('fullName', e.target.value)}
              sx={{ bgcolor: '#fff' }}
            />
            <TextField
              fullWidth
              label='Filtrar por identificación'
              size='small'
              value={filters.identification}
              onChange={(e) =>
                handleFilterChange('identification', e.target.value)
              }
              sx={{ bgcolor: '#fff' }}
            />
            <IconButton
              sx={{
                bgcolor: '#1890ff',
                color: 'white',
                '&:hover': { bgcolor: '#0050b3' },
                borderRadius: 2,
                width: 40,
                height: 40,
                flexShrink: 0,
              }}
            >
              <Search />
            </IconButton>
          </Box>
        </Box>

        {/* TABLA */}
        <TableContainer
          sx={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '1145px',
            mx: 'auto',
            borderRadius: 2,
            border: '1px solid #e5e7eb',
          }}
        >
          <Table
            stickyHeader
            size={window.innerWidth < 600 ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  Identificación
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  Nombre completo
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    backgroundColor: '#1890ff',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align='center' sx={{ py: 10 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : clients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align='center'
                    sx={{ py: 10, color: '#9ca3af' }}
                  >
                    No hay coincidencias
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow
                    key={client.idCliente || client.id}
                    sx={{
                      '&:nth-of-type(even)': { backgroundColor: '#f9fafb' },
                      '&:hover': { backgroundColor: '#f0f7ff' },
                    }}
                  >
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                      {client.identificacion || client.identification}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                      {client.nombre || client.fullName}
                    </TableCell>
                    <TableCell align='center'>
                      {/* BOTÓN DE EDITAR ACTUALIZADO */}
                      <IconButton
                        size='small'
                        sx={{ color: '#1890ff' }}
                        onClick={() =>
                          navigate(
                            `/clients/edit/${client.idCliente || client.id}`,
                          )
                        }
                      >
                        <Edit fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        sx={{ color: '#ff4d4f' }}
                        onClick={() => handleOpenDelete(client)}
                      >
                        <Delete fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            width: '100%',
            maxWidth: '1145px',
            mx: 'auto',
            bgcolor: '#fff',
            mb: { xs: 0, sm: 2 },
            border: '1px solid #e5e7eb',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <TablePagination
            component='div'
            count={totalCount}
            page={page}
            onPageChange={(e, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage={window.innerWidth < 600 ? '' : 'Filas:'}
          />
        </Box>
      </Paper>

      {/* DIÁLOGO DE ELIMINACIÓN */}
      <Dialog
        open={openDeleteDialog}
        onClose={!loading ? handleCloseDelete : undefined}
        fullWidth
        maxWidth='xs'
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 700,
            color: '#d32f2f',
          }}
        >
          <WarningAmber color='error' /> ¿Eliminar registro?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#4b5563' }}>
            ¿Estás seguro de que deseas eliminar a{' '}
            <strong>
              {clientToDelete?.nombre || clientToDelete?.fullName}
            </strong>
            ? Esta acción es permanente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDelete}
            disabled={loading}
            sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 500 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={deleteClient}
            variant='contained'
            color='error'
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              minWidth: '100px',
              fontWeight: 600,
            }}
          >
            {loading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Confirmar'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR DE NOTIFICACIÓN */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide {...props} direction='down' />}
        sx={{ top: { xs: 10, sm: 20 } }}
      >
        <Alert
          onClose={handleCloseSnackbar}
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

export default Clients;
