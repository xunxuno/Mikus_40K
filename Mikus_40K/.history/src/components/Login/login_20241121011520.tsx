import React, { useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';  // Importa el tipo de estado global
import { logearUsuario_ } from '../../controllers/userController';  // Importa la función corregida
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { login } from '../../redux/authSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');  // Cambié `username` a `email` para que coincida con la función
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Inicializa useNavigate
  const { username: loggedUsername, token } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Llamamos a la función logearUsuario_ con email y password
        const response = await logearUsuario_(email, password);
        
        // Si la respuesta tiene result, significa que el login fue exitoso
        if (response.result) {
          setMessage('¡Inicio de sesión exitoso!');
          setMessageType('success');
          
          dispatch(login({
            username: email,     // Utiliza el email como username
            password: password,  // Guarda la contraseña también
            token: response.result.token,
            userId: response.result.userId
          }));

          // Redirige a la página de inicio ("/")
          navigate('/');  
        } else {
          setMessage(response.mensaje);  // Muestra el mensaje de error
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error al intentar logear:', error);
        setMessage('Hubo un error al intentar logear el usuario');
        setMessageType('error');
      }
    } else {
      setMessage('Por favor, ingresa un email y una contraseña');
      setMessageType('error');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Inicia sesión</h3>
        <form onSubmit={handleSubmit} className="square_login">
          <p>Email: </p>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Ingresa tu email" 
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
