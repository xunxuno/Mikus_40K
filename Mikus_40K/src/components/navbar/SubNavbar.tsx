import React from 'react';
import './NavCont.css'; 
import { useNavigate } from 'react-router-dom';

const SubNavbar: React.FC = () => {
  return (
    <div className="sub-navbar">
      <ul className="sub-navbar-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/catalog">Catálogo</a></li>
        <li><a href="/about-us">Acerca de</a></li>
        <li><a href="/contact-support">Contacto</a></li>
      </ul>
      {/* Botón de carrito de compras */}
      <button className="cart-button">
        🛒
      </button>
    </div>
  );
};

export default SubNavbar;
