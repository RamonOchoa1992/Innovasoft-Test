import api from '../api/axiosConfig';

export const registerCustomerService = async (customerData) => {
  try {
    // Mapeamos los datos del frontend a lo que el backend espera
    // Según tu error de red, el campo debe llamarse "Email"
    const payload = {
      Username: customerData.username,
      Email: customerData.correo, // Transformamos 'correo' a 'Email'
      Password: customerData.password,
    };

    const response = await api.post('api/Authenticate/register', payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Si hay errores de validación específicos (como el del Email),
    // intentamos extraer el mensaje detallado del backend
    const errorMessage = error.response?.data?.errors
      ? 'Error de validación en los campos enviados'
      : error.response?.data?.message || 'Error al registrar el cliente';

    return {
      success: false,
      message: errorMessage,
    };
  }
};
