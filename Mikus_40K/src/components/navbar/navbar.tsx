import React from 'react';
import './NavCont.css';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbolsMenu } from '../icons/MaterialSymbolsMenu'; 
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import backgroundImage from '../../images/logo_temporal.jpg'; 

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para cambiar el estado
  };

  return (
    <>
      <div
        className="navbar"
        onClick={() => navigate('/')}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '10% 100%',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
      >
        <button className="navbar-icon" onClick={handleSidebarToggle}>
          <MaterialSymbolsMenu width="24" height="24" color="white" />
        </button>
        
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
        </div>
        
        <p className="navbar-text">Mikus_40K</p>
      </div>

      {/* Componente SubNavbar */}
    </>
  );
};

export default Navbar;
