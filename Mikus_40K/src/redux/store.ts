import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';
import sidebarReducer from './sidebarSlice';
import authReducer from './authSlice';
import { authMiddleware } from '../middlewares/authMiddleware';


const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
