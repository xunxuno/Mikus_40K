import React from 'react';
import './Navbar.css';  // Asegúrate de que el archivo CSS esté bien importado
import { MaterialSymbolsMenu } from './icons/MaterialSymbolsMenu'; // Asegúrate de la ruta correcta
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';

// Importa la imagen desde la ruta
import backgroundImage from '../images/logo_temporal.jpg'; // Ajusta la ruta según tu estructura

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para alternar el sidebar
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '10% 100%',  // Ajusta la imagen al 100% del ancho y alto
        backgroundPosition: 'left',   // Alinea la imagen a la izquierda
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
      }}
    >
      <button className="navbar-icon" onClick={handleSidebarToggle}>
        <MaterialSymbolsMenu width="24" height="24" color="white" />
      </button>
      
      <p className="navbar-text">Mikus_40K</p>
    </div>
  );
};

export default Navbar;
