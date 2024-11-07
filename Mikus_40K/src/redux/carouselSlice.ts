// src/redux/carouselSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
    currentIndex: number;
    images: string[];
}

const initialState: CarouselState = {
    currentIndex: 0,
    images: [], // Inicialmente, estará vacío hasta que se seteen las imágenes
};

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload; // Cambiar el índice del carrusel
        },
        nextImage: (state) => {
            state.currentIndex = (state.currentIndex + 1) % state.images.length; // Avanzar al siguiente índice
        },
        setImages: (state, action: PayloadAction<string[]>) => {
            state.images = action.payload; // Establecer las imágenes en el estado
        },
    },
});

export const { setIndex, nextImage, setImages } = carouselSlice.actions;

export default carouselSlice.reducer;
