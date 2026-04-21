import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerCustomerService } from '../services/customerService';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // <--- Nuevo estado
  const navigate = useNavigate();

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,20}$/;

  const formik = useFormik({
    initialValues: {
      username: '',
      correo: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      correo: Yup.string()
        .email('Debe ingresar un correo válido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(9, 'La contraseña debe ser mayor a 8 caracteres')
        .max(20, 'La contraseña debe ser menor o igual a 20 caracteres')
        .matches(passwordRules, {
          message: 'Debe incluir números, una mayúscula y una minúscula',
        })
        .required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(null);
      const result = await registerCustomerService(values);
      if (result.success) navigate('/login');
      else setServerError(result.message);
      setLoading(false);
    },
  });

  const togglePassword = () => setShowPassword(!showPassword); // <--- Nueva función

  return { formik, loading, serverError, showPassword, togglePassword };
};
