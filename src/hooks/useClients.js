import { useState, useEffect, useCallback, useMemo } from 'react';
import { clientsService } from '../services/clientsService';
import { useAuth } from '../context/AuthContext';

export const useClients = () => {
  const { user } = useAuth();
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados de UI
  const [filters, setFilters] = useState({ fullName: '', identification: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados del Diálogo de Eliminación
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Estado para el Toast (Snackbar)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchData = useCallback(async () => {
    if (!user || !user.token) return;
    const currentUserId = user.id || user.usuarioId || user.userId;
    if (!currentUserId) return;

    setLoading(true);
    try {
      const data = await clientsService.getClients(
        { userId: currentUserId },
        user.token,
      );
      setAllClients(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    const filtered = allClients.filter((client) => {
      const name = (client.nombre || client.fullName || '').toLowerCase();
      const id = (
        client.identificacion ||
        client.identification ||
        ''
      ).toLowerCase();
      return (
        name.includes(filters.fullName.toLowerCase()) &&
        id.includes(filters.identification.toLowerCase())
      );
    });
    return {
      total: filtered.length,
      rows: filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    };
  }, [allClients, filters, page, rowsPerPage]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(0);
  };

  const handleOpenDelete = (client) => {
    setClientToDelete(client);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setClientToDelete(null);
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const deleteClient = async () => {
    if (!clientToDelete || !user?.token) return;

    const idTarget = clientToDelete.idCliente || clientToDelete.id;
    setLoading(true);

    try {
      await clientsService.deleteClient(idTarget, user.token);

      // Éxito: Eliminamos de la lista local
      setAllClients((prev) =>
        prev.filter((c) => (c.idCliente || c.id) !== idTarget),
      );
      setSnackbar({
        open: true,
        message: 'Cliente eliminado correctamente',
        severity: 'success',
      });
      // Solo cerramos el modal si la operación fue exitosa
      handleCloseDelete();
    } catch (error) {
      // Error: NO eliminamos nada de la lista y mostramos alerta roja
      setSnackbar({
        open: true,
        message: 'No se pudo eliminar el cliente. Intente de nuevo.',
        severity: 'error',
      });
      // Opcional: Podrías cerrar el modal aquí o dejarlo abierto para reintentar.
      // Por UX, lo cerramos para limpiar el estado.
      handleCloseDelete();
    } finally {
      setLoading(false);
    }
  };

  return {
    clients: filteredData.rows,
    totalCount: filteredData.total,
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
  };
};
