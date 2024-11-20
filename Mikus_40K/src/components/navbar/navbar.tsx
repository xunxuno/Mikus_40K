import React from 'react';
import './NavCont.css';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbolsMenu } from '../icons/MaterialSymbolsMenu'; 
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import backgroundImage from '../../images/logo_temporal.jpg'; // Asegúrate que esta ruta sea correcta

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para cambiar el estado
  };

  return (
    <div className="navbar">
      <div
        onClick={() => navigate('/')}
        style={{
          width: '100px',
          height: '50px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
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

      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
