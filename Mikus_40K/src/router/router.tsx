import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home/home';
import ProductDetail from '../components/product/ProductDetail';
import HelpCenter from '../components/helpCenter/HelpCenter';
import ContactSupport from '../components/helpCenter/ContactSupport';
import AboutUs from '../components/AboutUs/AboutUs';
import Services from "../components/Services/Services";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Router;
