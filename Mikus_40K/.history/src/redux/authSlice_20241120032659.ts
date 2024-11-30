import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;  // El username puede ser null también
  token: string | null;     // El token puede ser string o null
  password: string | null;  // Agregamos el campo password
}

const initialState: AuthState = {
  username: null,
  token: null,
  password: null,  // Inicializamos la contraseña como null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string; token: string }>) {
      state.username = action.payload.username;
      state.password = action.payload.password; // Guardamos la contraseña
      state.token = action.payload.token; // Acepta un string aquí
    },
    logout(state) {
      state.username = null;
      state.password = null;  // Limpiamos la contraseña al hacer logout
      state.token = null; // Acepta null al hacer logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
