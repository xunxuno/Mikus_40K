import React from 'react';
import Router from './router/router';
import ImageCarousel from './components/ImageCarousel';

function App() {
    return (
        <div className="App">
            <Router />
            <ImageCarousel />
        </div>
    );
}

export default App;