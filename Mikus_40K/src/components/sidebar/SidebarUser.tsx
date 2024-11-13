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

  const goToProfile = () => {
    navigate('/profile');
  }

  const goToHistory = () => {
    navigate('/purchase-history');
  }

  const goToPoints = () => {
    navigate("/user-points");
  }

  const chagePassword = () => {
    navigate("/change-password");
  }

  const goToPayment = () => {
    navigate("/payment-method");
  }

  const ShippingAddressesView = () => {
    navigate("/shipping-addresses");
  }

  const goToCart = () => {
    navigate("/cart");
  }

  const goToWishList = () => {
    navigate ("/wishlist");
  }

  const goToOrders = () => {
    navigate ("/orders");
  }

  const trackOrder = () => {
    navigate ("/track-order");
  }

  return (
    <div>
      {/* Fondo oscuro (overlay) que cubre toda la pantalla cuando el sidebar está visible */}
      {isVisible && <div className="overlay" onClick={handleOverlayClick} />}

      {/* Sidebar */}
      <div className={`sidebar-user ${isVisible ? 'visible' : ''}`}>
        <div className="sidebar-section">
          <h3>Perfil de usuario</h3>
          <ul>
            <li><button onClick={goToProfile}>Perfil</button></li>
            <li><button onClick={goToHistory}>Historial de compras</button></li>
            <li><button onClick={goToPoints}>Puntos de fidelidad</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Configuración de cuenta</h3>
          <ul>
            <li><button onClick={chagePassword}>Cambiar contraseña</button></li>
            <li><button onClick={goToPayment}>Métodos de pago</button></li>
            <li><button onClick={ShippingAddressesView}>Direcciones de envío</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Carrito de compras</h3>
          <ul>
            <li><button onClick={goToCart}>Ver carrito</button></li>
            <li><button onClick={goToWishList}>Lista de deseos</button></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Gestión de pedidos</h3>
          <ul>
            <li><button onClick={goToOrders}>Ver pedidos</button></li>
            <li><button onClick={trackOrder}>Rastrear envíos</button></li>
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
          <ul>
            <li><button>Cerrar sesión</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;
