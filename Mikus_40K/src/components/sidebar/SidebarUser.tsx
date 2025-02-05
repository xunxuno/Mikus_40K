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
  const { token, userName } = useSelector((state: RootState) => state.auth); // Obtener token y username
  console.log(userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = () => dispatch(toggleSidebar());
  const handleLogout = () => dispatch(logout());

  const goToAboutUs = () => navigate('/about-us');
  const goToContactSupport = () => navigate('/contact-support');
  const goToProfile = () => navigate('/profile');
  const goToHistory = () => navigate('/purchase-history');
  const goToCart = () => navigate('/cart');
  const goToWishList = () => navigate('/wishlist');
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
                <p>Hola, {userName}</p> {/* Mostrar el nombre de usuario si está logueado */}
              </div>
            ) : (
              <li><button onClick={goToLogin}>Iniciar sesión</button></li>
            )}
            <li><button onClick={goToProfile}>Perfil</button></li>
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
          <li><button onClick={goToHistory}>Historial de pedidos</button></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3>Soporte y ayuda</h3>
          <ul>
            <li><button onClick={goToAboutUs}>Sobre nosotros</button></li>
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
