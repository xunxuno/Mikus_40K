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
////////////////////////////////////////////////////////////////////

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';



function verificarToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    res.status(401).json({ mensaje: 'Token not provided' });
    return;
  }

  // Verifica si el token es válido
  const token = tokenHeader.split(' ')[1]; // "Bearer <token>"
  if (validTokens.has(token)) {
    next();
  } else {
    res.status(401).json({ mensaje: 'Invalid token' });
  }
}

// Almacenar tokens válidos
const validTokens = new Set<string>();

// Función para obtener el hash de una contraseña
export async function getHash(passwordString: string): Promise<string> {
  //const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS || '10', 10);
  const saltRounds = parseInt(import.meta.env.VITE_PASSWORD_SALT_ROUNDS, 10);
  return bcrypt.hash(passwordString, saltRounds);
}
