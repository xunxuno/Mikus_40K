import React, { useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';  // Importa el tipo de estado global
import { loginUser } from '../../controllers/authController';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Inicializa useNavigate
  const { username: loggedUsername, token } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      loginUser(dispatch, username, password);  // Se pasa también la contraseña
      setMessage('¡Inicio de sesión exitoso!');
      setMessageType('success');

      // Redirige a la página de inicio ("/")
      navigate('/');  // Redirige al inicio
    } else {
      setMessage('Usuario o contraseña incorrectos');
      setMessageType('error');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Inicia sesión</h3>
        <form onSubmit={handleSubmit} className="square_login">
          <p>Usuario: </p>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Ingresa tu usuario" 
          />
          <p>Contraseña: </p>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Ingresa tu contraseña" 
          />
          <button type="submit">Entrar</button>
        </form>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        {token && (
          <div>
            <p>Bienvenido, {loggedUsername}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
