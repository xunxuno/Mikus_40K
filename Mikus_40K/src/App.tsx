import React from 'react';
import Router from './router/router';
import ImageCarousel from './components/ImageCarousel';
import image1 from './images/HALLOWEEN(1).png';
import image2 from './images/HALLOWEEN.png';

const images = [image1, image2];

function App() {
    return (
        <div className="App">
            <Router />
            {/* Pasa las imágenes como prop al componente ImageCarousel */}
            <ImageCarousel images={images} />
        </div>
    );
}

export default App;
