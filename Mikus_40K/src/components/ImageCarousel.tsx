// src/components/ImageCarousel.tsx
import React, { useEffect, useState } from 'react';
import './ImageCarousel.css';
import image1 from '../images/HALLOWEEN(1).png';
import image2 from '../images/HALLOWEEN.png';

const images = [
    image1,
    image2
];

function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <div className="carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel;
