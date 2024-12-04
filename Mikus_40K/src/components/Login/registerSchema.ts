import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Las contraseñas no coinciden',
});
