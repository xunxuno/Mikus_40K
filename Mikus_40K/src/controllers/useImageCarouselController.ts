// /controllers/useImageCarouselController.ts

import { useEffect, useState } from 'react';
import { ImageCarouselModel } from '../models/ImageCarouselModel';

export const useImageCarouselController = (images: string[]) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselModel = new ImageCarouselModel(images);

    useEffect(() => {
        if (isPaused) return; // Si está pausado, no cambia automáticamente

        const intervalId = setInterval(() => {
            carouselModel.goToNextSlide();
            setCurrentIndex(carouselModel.getCurrentIndex());
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [isPaused, images.length]); // Dependemos de isPaused para pausar el carrusel

    const goToSlide = (index: number) => {
        carouselModel.setIsPaused(true);
        carouselModel.setCurrentIndex(index);
        setCurrentIndex(carouselModel.getCurrentIndex());

        // Después de 10 segundos, reanuda el carrusel
        setTimeout(() => {
            carouselModel.setIsPaused(false);
            setIsPaused(false);
        }, 10000); // 10 segundos
    };

    return { currentIndex, goToSlide };
};
