import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta raíz "/" que muestra Home */}
                <Route path="/" element={<Home />} />
                
                {/* Redirige cualquier otra ruta no definida a "/" */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;