import React from 'react';
import './NavCont.css'; 
const SubNavbar: React.FC = () => {
  return (
    <div className="sub-navbar">
      <ul className="sub-navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#acerca">Acerca de</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </div>
  );
};

export default SubNavbar;
