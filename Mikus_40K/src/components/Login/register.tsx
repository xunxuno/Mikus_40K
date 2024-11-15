import React from "react";
import './register.css';

function Register() {
    return (
        <div className="register-container">
            <h3>Registrarse</h3>
            <form className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Ingresa tu nombre de usuario"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu correo electrónico"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirma tu contraseña"
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
