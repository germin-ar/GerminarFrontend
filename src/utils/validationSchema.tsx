// /validation/validationSchema.ts
import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email('El email no es válido').required('El email es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirm_password: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas deben coincidir')
    .required('La confirmación de la contraseña es obligatoria'),
});
