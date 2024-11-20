// authMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const state = store.getState() as any; // Evita la referencia circular
  const token = state.auth.token;

  if (token) {
    console.log('Autenticado');
  } else {
    console.log('No autenticado');
  }

  return next(action);
};
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Interfaz para el tipo de datos decodificados del token
interface DecodedToken {
  userId: number;
  iat: number; // issued at timestamp
  exp: number; // expiration timestamp
}

// Middleware para verificar el token
export function verifyToken(req: any, res: any, next: any) {
  const tokenlog = req.cookies.token;
  if (!tokenlog) {
      console.log('Token no proporcionado');
      return res.redirect('/login');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
      console.error('JWT_SECRET no está definido');
      return res.status(500).send('Error de configuración del servidor');
  }

  jwt.verify(tokenlog, secret, (err: unknown, decoded: any) => {
      if (err) {
          console.error(err);
          return res.redirect('/login');
      }
      req.user = decoded;
      next();
  });
}



// Middleware para redirigir si el usuario ya está autenticado
export function redirectIfAuthenticated(req: any, res: any, next: any) {
  const tokenlog = req.cookies.token;

  if (tokenlog) {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
          console.error('JWT_SECRET no está definido');
          return res.status(500).send('Error de configuración del servidor');
      }

      try {
          // Verificación sincrónica
          const decoded = jwt.verify(tokenlog, secret) as JwtPayload;

          // Si el token es válido y decodificado correctamente, redirigir
          if (decoded) {
              res.redirect('/');
          }
      } catch (err: unknown) {
          // Verificar si 'err' es un Error antes de acceder a 'message'
          if (err instanceof Error) {
              // Si es un Error, mostrar el mensaje de error
              console.error('Token inválido o expirado:', err.message);
          } else {
              // Si no es un Error, manejar el caso adecuado
              console.error('Error desconocido:', err);
          }

          // Si el token no es válido, continuar con el siguiente middleware
          next();
      }
  } else {
      // Si no hay token, continuar con el siguiente middleware/ruta
      next();
  }
}

// Middleware para autenticar al usuario
export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Agregar la propiedad userId al objeto req de manera local
    (req as Request & { userId?: number }).userId = decoded.userId;

    next();
  } catch (err) {
    return res.redirect('/login');
  }
}

// Función para generar un token JWT
export function generateToken(data: object, expirationTime: string): string {
  return jwt.sign({ data }, process.env.JWT_SECRET as string, { expiresIn: expirationTime });
}

// Función para obtener el hash de una contraseña
export async function getHash(passwordString: string): Promise<string> {
  const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS as string, 10);
  const password_hash = await bcrypt.hash(passwordString, saltRounds);
  return password_hash;
}
