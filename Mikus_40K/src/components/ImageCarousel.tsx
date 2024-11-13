// /components/ImageCarousel.tsx

import React from 'react';
import { useImageCarouselController } from '../controllers/useImageCarouselController';
import './ImageCarousel.css';

interface ImageCarouselProps {
    images: string[]; // Recibe un array de strings, que serán las rutas de las imágenes
}

function ImageCarousel({ images }: ImageCarouselProps) {
    const { currentIndex, goToSlide } = useImageCarouselController(images);

    return (
        <div className="carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>

            {/* Botones circulares para navegar entre las imágenes */}
            <div className="carousel-controls">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-control ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)} // Al hacer clic, cambia al índice correspondiente
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel;
