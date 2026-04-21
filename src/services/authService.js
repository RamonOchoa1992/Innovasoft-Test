import api from '../api/axiosConfig';

export const loginService = async (username, password) => {
  try {
    const payload = {
      Username: username,
      Password: password,
    };

    const response = await api.post('/api/Authenticate/login', payload);
    
    if (response.data && response.data.token) {
      return {
        success: true,
        data: {
          token: response.data.token,
          userId: response.data.userid,
          username: response.data.username,
        },
      };
    }

    return { success: false, message: 'Error en el formato de respuesta' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Credenciales incorrectas',
    };
  }
};
