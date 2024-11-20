import React from "react";
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

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/catalog" element={<Catalog/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/purchase-history" element={<PurchaseHistory/>} />
            <Route path="/user-points" element={<Points/>} />
            <Route path="/change-password" element={<ChangePass/>} />
            <Route path="/payment-method" element={<PaymentMethod/>} />
            <Route path="/shipping-addresses" element={<ShippingAddresses/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/wishlist" element={<WishList/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/track-order" element={<TrackOrder/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Navigate to="/" />} />
            
        </Routes>
    );
}

export default Router;
