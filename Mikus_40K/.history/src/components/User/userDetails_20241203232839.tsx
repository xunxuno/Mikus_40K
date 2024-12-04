import React, { useState } from 'react';
import './userDetails.css'; // Archivo CSS para estilizar el formulario
import { createUserDetails } from '../../models/UserModel'; // Ruta de tu modelo
import { useNavigate } from 'react-router-dom';

const UserDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    country: '',
    city: '',
    zip_code: '',
    street: '',
    house_number: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = 1; // Este ID debe provenir de tu autenticación o contexto

    try {
      await createUserDetails({
        user_id: userId,
        ...formData,
      });

      setMessage('Detalles de usuario guardados exitosamente.');
      setMessageType('success');
      setFormData({
        first_name: '',
        last_name: '',
        phone_number: '',
        country: '',
        city: '',
        zip_code: '',
        street: '',
        house_number: '',
      });
      navigate('/'); // Redirige a la página de perfil o donde desees
    } catch (error) {
      console.error('Error al guardar los detalles del usuario:', error);
      setMessage('Hubo un error al guardar los detalles. Inténtalo nuevamente.');
      setMessageType('error');
    }
  };

  const showModal = messageType ? 'block' : 'none';

  return (
    <div className="user-details-container">
      <h3>Detalles del Usuario</h3>
      <form className="user-details-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Nombre</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Número de Teléfono</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Ingresa tu número de teléfono"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Ingresa tu país"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ingresa tu ciudad"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip_code">Código Postal</label>
          <input
            type="text"
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            placeholder="Ingresa tu código postal"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Calle</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Ingresa tu calle"
          />
        </div>
        <div className="form-group">
          <label htmlFor="house_number">Número de Casa</label>
          <input
            type="text"
            id="house_number"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            placeholder="Ingresa el número de tu casa"
          />
        </div>
        <div className="form-group">
          <button type="submit">Guardar</button>
        </div>
      </form>

      {/* Modal para mensajes */}
      <div className="modal" style={{ display: showModal }}>
        {message}
      </div>
    </div>
  );
};

export default UserDetailsForm;
