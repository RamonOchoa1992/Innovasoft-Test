import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: localStorage.getItem('rememberedUser') || '',
      password: '',
      rememberMe: !!localStorage.getItem('rememberedUser'),
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(null);

      const result = await loginService(values.username, values.password);

      if (result.success) {
        // Manejo de "Recuérdame"
        if (values.rememberMe) {
          localStorage.setItem('rememberedUser', values.username);
        } else {
          localStorage.removeItem('rememberedUser');
        }

        // Guardamos todo en el contexto (esto también guarda en localStorage por la lógica del AuthProvider)
        login(result.data);

        navigate('/home');
      } else {
        setServerError(result.message);
      }
      setLoading(false);
    },
  });

  const togglePassword = () => setShowPassword(!showPassword);

  return { formik, loading, serverError, showPassword, togglePassword };
};
