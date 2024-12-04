// Router.tsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home/home';
import ProductDetail from '../components/product/ProductDetail';
import HelpCenter from '../components/helpCenter/HelpCenter';
import ContactSupport from '../components/helpCenter/ContactSupport';
import AboutUs from '../components/AboutUs/AboutUs';
import Catalog from '../components/Catalog/Catalog';
import Profile from '../components/profile/profile';
import PurchaseHistory from "../components/profile/PurchaseHistory";
import Points from "../components/profile/Points";
import ChangePass from "../components/User/ChangePass";
import PaymentMethod from "../components/User/Payment";
import ShippingAddresses from "../components/User/ShippingAddresses";
import Cart from "../components/User/Cart";
import WishList from "../components/User/WishList";
import Orders from "../components/User/Orders";
import TrackOrder from "../components/User/TrackOrder";
import Login from "../components/Login/login";
import Register from "../components/Login/register";
import SearchResults from '../components/Catalog/SearchResults';
import UserDetails from '../components/User/userDetails';

const userId = localStorage.getItem('userId');
const userIdNumber = Number(userId);

const isAuthenticated = () => {
    // Verifica si el usuario tiene un token o está autenticado
    const token = localStorage.getItem('token');
    return token !== null; // Si tiene un token, está autenticado
}

function Router() {
    return (
        <div className="router-container">
            <Routes>
                {/* Rutas protegidas: si el usuario ya está autenticado, lo redirige al home */}
                <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <Register />} />

                {/* Otras rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/contact-support" element={<ContactSupport />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/profile" element={<Profile userId={userIdNumber} />} />
                <Route path="/purchase-history" element={<PurchaseHistory />} />
                <Route path="/user-points" element={<Points />} />
                <Route path="/change-password" element={<ChangePass />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/shipping-addresses" element={<ShippingAddresses />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/user-deatails" element={<UserDetails />} />

                {/* Redirige cualquier ruta no encontrada al home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default Router;
