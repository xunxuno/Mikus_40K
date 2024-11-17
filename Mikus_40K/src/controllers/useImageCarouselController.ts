// /controllers/useImageCarouselController.ts
import { useState, useEffect, useRef } from 'react';

export function useImageCarouselController(images: string[]) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isPausedRef = useRef(false);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        pauseCarousel(); // Pausa el carrusel al cambiar de slide
    };

    const pauseCarousel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        isPausedRef.current = true;
        setTimeout(() => {
            isPausedRef.current = false;
            startCarousel();
        }, 10000); // Pausa por 10 segundos
    };

    const startCarousel = () => {
        if (!isPausedRef.current) {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000); // Cambia cada 3 segundos cuando no está pausado
        }
    };

    useEffect(() => {
        startCarousel();
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex]);

    return { currentIndex, goToSlide };
}
