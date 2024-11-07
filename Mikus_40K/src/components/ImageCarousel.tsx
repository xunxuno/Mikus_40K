import React, { useEffect, useState } from 'react';
import './ImageCarousel.css';

interface ImageCarouselProps {
    images: string[]; // Recibe un array de strings, que serán las rutas de las imágenes
}

function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Cambiar al siguiente slide de manera automática cada 3 segundos si no está pausado
    useEffect(() => {
        if (isPaused) return; // Si está pausado, no cambia automáticamente

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [images.length, isPaused]); // Dependemos de isPaused para pausar el carrusel

    const goToSlide = (index: number) => {
        setIsPaused(true); // Pausa el carrusel
        setCurrentIndex(index); // Cambia al índice de la imagen seleccionada

        // Después de 10 segundos, reanuda el carrusel
        setTimeout(() => {
            setIsPaused(false); // Reactiva el carrusel
        }, 10000); // 10 segundos
    };

    return (
        <div className="carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>

            {/* Botones numerados para navegar entre las imágenes */}
            <div className="carousel-controls">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-control ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)} // Al hacer clic, cambia al índice correspondiente
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel;
