import api from '../api/axiosConfig';

export const clientsService = {
  /**
   * Obtiene la lista filtrada de clientes.
   */
  getClients: async (filters, token) => {
    try {
      const response = await api.post(
        '/api/Cliente/Listado',
        {
          Identificacion: filters.identification || '',
          Nombre: filters.fullName || '',
          UsuarioId: filters.userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al obtener el listado';
      throw new Error(errorMessage);
    }
  },

  /**
   * Obtiene un cliente específico por su ID (Para edición).
   */
  getClientById: async (clientId, token) => {
    try {
      const response = await api.get(`/api/Cliente/Obtener/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Error al obtener los datos del cliente';
      throw new Error(errorMessage);
    }
  },

  /**
   * Crea un nuevo cliente.
   */
  createClient: async (payload, token) => {
    try {
      const response = await api.post('/api/Cliente/Crear', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al crear el cliente';
      throw new Error(errorMessage);
    }
  },

  /**
   * Actualiza un cliente existente.
   */
  updateClient: async (payload, token) => {
    try {
      // Nota: Verifica si tu API usa PUT o POST para editar. Lo estándar es PUT.
      const response = await api.post('/api/Cliente/Actualizar', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al actualizar el cliente';
      throw new Error(errorMessage);
    }
  },

  /**
   * Elimina un cliente por ID.
   */
  deleteClient: async (clientId, token) => {
    try {
      const response = await api.delete(`/api/Cliente/Eliminar/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al eliminar cliente';
      throw new Error(errorMessage);
    }
  },

  /**
   * Obtiene la lista de intereses (Endpoint corregido).
   */
  getInterests: async (token) => {
    try {
      // Ajustado a la ruta que funcionó en los pasos anteriores
      const response = await api.get('/api/Intereses/Listado', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Retornamos la data directamente asegurando que sea un array
      return Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
    } catch (error) {
      console.error('Error fetching interests:', error);
      throw new Error('No se pudieron cargar los intereses');
    }
  },
};
