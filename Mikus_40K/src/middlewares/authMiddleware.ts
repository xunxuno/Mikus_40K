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
