import React, { useState } from 'react';
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

  // Estado para capturar la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Obtener el estado de autenticación desde el store
  const { token, userName } = useSelector((state: RootState) => state.auth);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar()); // Despacha la acción para cambiar el estado
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleProfile = () => navigate('/profile'); // Navegar al perfil

  // Manejar el cambio de texto en la barra de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Manejar la acción de búsqueda
  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Si está vacío, no hacer nada

    try {
      // Aquí haces la petición a tu API de búsqueda
      const response = await fetch(
        `/api/products/search?query=${encodeURIComponent(searchQuery)}`
      );
      const results = await response.json();

      if (response.ok) {
        console.log('Resultados de búsqueda:', results);
        // Navegar a una página con los resultados o actualizar un estado global/local
        navigate('/search-results', { state: { results } });
      } else {
        console.error('Error al buscar:', results);
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
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

      {/* Barra de búsqueda */}
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">🔍</button>
      </form>

      <p className="navbar-text">{userName || ''}</p>

      <div className="auth-buttons">
        {!token ? (
          <>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <button className="register-btn" onClick={handleRegister}>Register</button>
          </>
        ) : (
          <button className="profile-btn" onClick={handleProfile}>
            <span role="img" aria-label="profile">👤</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
