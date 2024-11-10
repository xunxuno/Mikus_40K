import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';
import sidebarReducer from './sidebarSlice'; // Importa el reducer del sidebar

const store = configureStore({
  reducer: {
    carousel: carouselReducer, // Tu reducer actual del carousel
    sidebar: sidebarReducer,   // Agrega el reducer del sidebar
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
