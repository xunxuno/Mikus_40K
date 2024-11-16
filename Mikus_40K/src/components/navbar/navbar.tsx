import React from 'react';
import './NavCont.css';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbolsMenu } from '../icons/MaterialSymbolsMenu'; 
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import backgroundImage from '../../images/mikus_logo.png'; // Asegúrate que esta ruta sea correcta

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para cambiar el estado
  };

  return (
    <div
      className="navbar"
      style={{
        display: 'flex', /* Para alinear los elementos dentro del navbar */
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
      }}
    >
      <div
        onClick={() => navigate('/')}
        style={{
          width: '100px', /* Ajusta el tamaño del logo */
          height: '50px', /* Ajusta el tamaño del logo */
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', /* Ajusta el tamaño de la imagen al tamaño del div */
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
      ></div>

      <button className="navbar-icon" onClick={handleSidebarToggle}>
        <MaterialSymbolsMenu width="24" height="24" color="white" />
      </button>

      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
      </div>

      <p className="navbar-text">Mikus_40K</p>
    </div>
  );
};

export default Navbar;
