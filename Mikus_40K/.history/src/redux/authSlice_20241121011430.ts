import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;  // El username puede ser null también
  token: string | null;     // El token puede ser string o null
  password: string | null;  // Agregamos el campo password
  userId: number | null;    // Añadimos el campo userId
}

const initialState: AuthState = {
  username: null,
  token: null,
  password: null,
  userId: null,  // Inicializamos el userId como null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string; token: string; userId: number }>) {
      state.username = action.payload.username;
      state.password = action.payload.password; // Guardamos la contraseña
      state.token = action.payload.token;       // Guardamos el token
      state.userId = action.payload.userId;     // Guardamos el userId
    },
    logout(state) {
      state.username = null;
      state.password = null;  // Limpiamos la contraseña al hacer logout
      state.token = null;     // Limpiamos el token
      state.userId = null;    // Limpiamos el userId
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
