// src/components/SidebarUser.tsx
//import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import { toggleSidebar } from '../../redux/sidebarSlice';
import { useNavigate } from 'react-router-dom';
import './SidebarUser.css';

function SidebarUser() {
  const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);
  const { token, username } = useSelector((state: RootState) => state.auth); // Obtener token y username
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = () => dispatch(toggleSidebar());
  const handleLogout = () => dispatch(logout());

  const goToHelpCenter = () => navigate('/help-center');
  const goToContactSupport = () => navigate('/contact-support');
  const goToProfile = () => navigate('/profile');
  const goToHistory = () => navigate('/purchase-history');
  const goToPoints = () => navigate('/user-points');
  const changePassword = () => navigate('/change-password');
  const goToPayment = () => navigate('/payment-method');
  const shippingAddressesView = () => navigate('/shipping-addresses');
  const goToCart = () => navigate('/cart');
  const goToWishList = () => navigate('/wishlist');
  const goToOrders = () => navigate('/orders');
  const trackOrder = () => navigate('/track-order');
  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

  return (
    <div>
      {isVisible && <div className="overlay" onClick={handleOverlayClick} />}
      <div className={`sidebar-user ${isVisible ? 'visible' : ''}`}>
        <div className="sidebar-section">
          <h3>Perfil de usuario</h3>
          <ul>
            {token ? (
              <div>
                <p>Hola, {username}</p> {/* Mostrar el nombre de usuario si está logueado */}
              </div>
            ) : (
              <li><button onClick={goToLogin}>Iniciar sesión</button></li>
            )}
            <li><button onClick={goToProfile}>Perfil</button></li>
            <li><button onClick={goToHistory}>Historial de compras</button></li>
            <li><button onClick={goToPoints}>Puntos de fidelidad</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Configuración de cuenta</h3>
          <ul>
            <li><button onClick={changePassword}>Cambiar contraseña</button></li>
            <li><button onClick={goToPayment}>Métodos de pago</button></li>
            <li><button onClick={shippingAddressesView}>Direcciones de envío</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Carrito de compras</h3>
          <ul>
            <li><button onClick={goToCart}>Ver carrito</button></li>
            <li><button onClick={goToWishList}>Lista de deseos</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Gestión de pedidos</h3>
          <ul>
            <li><button onClick={goToOrders}>Ver pedidos</button></li>
            <li><button onClick={trackOrder}>Rastrear envíos</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Soporte y ayuda</h3>
          <ul>
            <li><button onClick={goToHelpCenter}>Centro de ayuda</button></li>
            <li><button onClick={goToContactSupport}>Contactar con soporte</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <ul>
            {token ? (
              <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            ) : (
            <ul>
              <li><button onClick={goToLogin}>Iniciar sesión</button></li>
              <li><button onClick={goToRegister}>Registrate</button></li>
            </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;
