import React from 'react';
import './NavCont.css';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbolsMenu } from '../icons/MaterialSymbolsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import { RootState } from '../../redux/store'; // Asegúrate de importar el estado raíz
import backgroundImage from '../../images/logo_temporal.jpg'; // Asegúrate que esta ruta sea correcta

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el estado de autenticación desde el store
  const { token, userName } = useSelector((state: RootState) => state.auth);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para cambiar el estado
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleProfile = () => navigate('/profile'); // Navegar al perfil

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

      <p className="navbar-text">{userName || ''}</p>

      <div className="auth-buttons">
        {!token ? (  // Si no hay token, mostrar login y register
          <>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <button className="register-btn" onClick={handleRegister}>Register</button>
          </>
        ) : (
          <button className="profile-btn" onClick={handleProfile}>
            <span role="img" aria-label="profile">👤</span> {/* Ícono de perfil */}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
