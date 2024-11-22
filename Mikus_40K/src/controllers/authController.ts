// authController.ts
import { AppDispatch } from '../redux/store';
import { login, logout } from '../redux/authSlice';
//import { User } from '../models/UserModel';

export const loginUser = (dispatch: AppDispatch, username: string, password: string) => {
  // Simula el inicio de sesión y la verificación de la contraseña
  if (username === "1") {
    const token = "onwe";
    dispatch(login({ username, password, token }));
  } else {
    console.error('Credenciales inválidas');
  }
};

export const logoutUser = (dispatch: AppDispatch) => {
  dispatch(logout());
};
