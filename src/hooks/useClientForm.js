import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clientsService } from '../services/clientsService';
import { useAuth } from '../context/AuthContext';

export const useClientForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [initialValues, setInitialValues] = useState({
    identificacion: '',
    nombre: '',
    apellidos: '',
    genero: '',
    fechaNacimiento: '',
    fechaAfiliacion: '',
    telefonoCelular: '',
    telefonoOtro: '',
    interes: '',
    direccion: '',
    resena: '',
    imagen: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      if (isEdit) setLoading(true);
      try {
        const intData = await clientsService.getInterests(user.token);
        setInterests(Array.isArray(intData) ? intData : []);
        if (isEdit) {
          const client = await clientsService.getClientById(id, user.token);
          setInitialValues({
            identificacion: client.identificacion || '',
            nombre: client.nombre || '',
            apellidos: client.apellidos || '',
            genero: client.sexo === 'M' ? 'Masculino' : 'Femenino',
            fechaNacimiento: client.fNacimiento
              ? client.fNacimiento.split('T')[0]
              : '',
            fechaAfiliacion: client.fAfiliacion
              ? client.fAfiliacion.split('T')[0]
              : '',
            telefonoCelular: client.celular || client.telefonoCelular || '',
            telefonoOtro: client.otroTelefono || '',
            interes: client.interesFK || client.interesesId || '',
            direccion: client.direccion || '',
            resena: client.resennaPersonal || client.resenaPersonal || '',
            // 💡 CAMBIO 1: Cargar la imagen que viene del servidor en lugar de null
            imagen: client.imagen || null,
          });
        }
      } catch (error) {
        console.error('Error al cargar:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user?.token, isEdit]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const saveClient = async (values) => {
    if (!user?.token) return false;
    setSubmitting(true);

    try {
      let base64Image = '';

      // 💡 CAMBIO 2: Corregido "values.foto" por "values.imagen"
      if (values.imagen instanceof File) {
        try {
          base64Image = await toBase64(values.imagen);
        } catch (e) {
          console.error('Error convirtiendo a base64', e);
        }
      } else {
        base64Image = values.imagen || '';
      }

      const payload = {
        ...(isEdit && { id }),
        nombre: values.nombre,
        apellidos: values.apellidos,
        identificacion: values.identificacion,
        celular: values.telefonoCelular,
        otroTelefono: values.telefonoOtro,
        direccion: values.direccion,
        fNacimiento: new Date(values.fechaNacimiento).toISOString(),
        fAfiliacion: new Date(values.fechaAfiliacion).toISOString(),
        sexo: values.genero === 'Masculino' ? 'M' : 'F',
        resennaPersonal: values.resena,
        imagen: base64Image,
        interesFK: values.interes,
        usuarioId: String(user.id || user.usuarioId || user.userId),
      };

      if (isEdit) {
        await clientsService.updateClient(payload, user.token);
      } else {
        await clientsService.createClient(payload, user.token);
      }

      setSnackbar({
        open: true,
        message: 'Operación exitosa',
        severity: 'success',
      });
      return true;
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Error en la operación',
        severity: 'error',
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    isEdit,
    interests,
    loading,
    submitting,
    snackbar,
    handleCloseSnackbar: () => setSnackbar((p) => ({ ...p, open: false })),
    saveClient,
    initialValues,
  };
};
