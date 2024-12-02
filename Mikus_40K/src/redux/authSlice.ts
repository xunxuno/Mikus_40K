import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Leemos los datos del localStorage (si existen)
const userName = localStorage.getItem('userName');
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const password = localStorage.getItem('password');
const userEmail = localStorage.getItem('userEmail');


interface AuthState {
  userName: string | null;
  token: string | null;
  password: string | null;
  userId: number | null;
  userEmail: string | null;

}

const initialState: AuthState = {
  userName: userName ? userName : null,
  token: token ? token : null,
  password: password ? password : null,
  userId: userId ? Number(userId) : null,
  userEmail: userEmail ? userEmail : null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userName: string; password: string; token: string; userId: number; userEmail: string; }>) {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.userId = action.payload.userId;

      state.userEmail = action.payload.userEmail;


      // Guardamos los datos en localStorage
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('password', action.payload.password);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId.toString());

      localStorage.setItem('userEmail', action.payload.userEmail);

    },
    logout(state) {
      state.userName = null;
      state.password = null;
      state.token = null;
      state.userId = null;
      state.userEmail = null;


      // Limpiamos los datos de localStorage
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;