import React from 'react';
import './Navbar.css';
import { MaterialSymbolsMenu } from './icons/MaterialSymbolsMenu'; // Asegúrate de la ruta correcta
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice'; // Importa la acción

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para alternar el sidebar
  };

  return (
    <div className="navbar">
      <button className="navbar-icon" onClick={handleSidebarToggle}>
        <MaterialSymbolsMenu width="24" height="24" color="white" />
      </button>
      <p className="navbar-text">Navbar Temporal</p>
    </div>
  );
};

export default Navbar;
