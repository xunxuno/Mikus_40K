import React, { useState } from 'react';
import './register.css';  // Asegúrate de tener este archivo en el directorio adecuado
import { registrarUsuario_ } from '../../controllers/userController'; 
import { useNavigate } from 'react-router-dom'; 

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setMessageType('error');
      return;
    }

    try {
        const response = await registrarUsuario_(username, email, password);

        setMessage(response.mensaje); // Usa el mensaje que devuelve tu backend
        setMessageType('success');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        navigate('/'); 
    } catch (error: unknown) {
      setMessage('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
      setMessageType('error');
    }
  };

  // Controla la visibilidad del mensaje emergente
  const showModal = messageType ? 'block' : 'none';

  return (
    <div className="register-container">
      <h3>Registrarse</h3>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Registrarse</button>
        </div>
      </form>

      {/* Ventana emergente para el mensaje */}
      <div className="modal" style={{ display: showModal }}>
        {message}
      </div>
    </div>
  );
};

export default Register;
