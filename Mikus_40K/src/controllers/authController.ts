// authController.ts
import { AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
import { fakeUser } from '../models/UserModel';

export const loginUser = (dispatch: AppDispatch, username: string, password: string) => {
  // Simula el inicio de sesión y la verificación de la contraseña
  if (username === fakeUser.username && password === fakeUser.password) {
    const token = fakeUser.token;
    dispatch(login({ username, password, token }));
  } else {
    console.error('Credenciales inválidas');
  }
};

export const logoutUser = (dispatch: AppDispatch) => {
  dispatch(logout());
};
