import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home';
import ProductDetail from '../components/ProductDetail';
import HelpCenter from '../components/HelpCenter';
import ContactSupport from '../components/ContactSupport';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Router;
