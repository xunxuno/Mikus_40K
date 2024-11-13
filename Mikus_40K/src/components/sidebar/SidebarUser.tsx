import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/sidebarSlice'; // Asegúrate de importar la acción
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './SidebarUser.css';

function SidebarUser() {
  const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Función para ocultar el sidebar cuando se haga clic en el overlay
  const handleOverlayClick = () => {
    dispatch(toggleSidebar()); // Llama a la acción para cambiar el estado
  };

  // Funciones para manejar la navegación
  const goToHelpCenter = () => {
    navigate('/help-center'); // Redirige a la ruta del centro de ayuda
  };

  const goToContactSupport = () => {
    navigate('/contact-support'); // Redirige a la ruta de contactar con soporte
  };

  return (
    <div>
      {/* Fondo oscuro (overlay) que cubre toda la pantalla cuando el sidebar está visible */}
      {isVisible && <div className="overlay" onClick={handleOverlayClick} />}

      {/* Sidebar */}
      <div className={`sidebar-user ${isVisible ? 'visible' : ''}`}>
        <div className="sidebar-section">
          <h3>Perfil de usuario</h3>
          <ul>
            <li><button>Ver perfil</button></li>
            <li><button>Historial de compras</button></li>
            <li><button>Puntos de fidelidad</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Configuración de cuenta</h3>
          <ul>
            <li><button>Cambiar contraseña</button></li>
            <li><button>Métodos de pago</button></li>
            <li><button>Direcciones de envío</button></li>
            <li><button>Preferencias de notificaciones</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Carrito de compras</h3>
          <ul>
            <li><button>Ver carrito</button></li>
            <li><button>Lista de deseos</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Gestión de pedidos</h3>
          <ul>
            <li><button>Ver pedidos</button></li>
            <li><button>Rastrear envíos</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Soporte y ayuda</h3>
          <ul>
            <li><button onClick={goToHelpCenter}>Centro de ayuda</button></li>
            <li><button onClick={goToContactSupport}>Contactar con soporte</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Ofertas y promociones</h3>
          <ul>
            <li><button>Ofertas especiales</button></li>
            <li><button>Programa de referidos</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Configuración avanzada</h3>
          <ul>
            <li><button>Modo oscuro/claro</button></li>
            <li><button>Idioma y región</button></li>
            <li><button>Cerrar sesión</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;
