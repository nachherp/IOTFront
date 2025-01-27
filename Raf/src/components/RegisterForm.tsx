import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple para confirmar que las contraseñas coincidan
        if (formData.password === formData.confirmPassword) {
            // Aquí puedes agregar lógica para manejar el registro, como una API call

            // Redirigir al inicio de sesión después de registrarse
            navigate('/login');
        } else {
            alert("Las contraseñas no coinciden.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="login-container">
            <div className="login-image"></div> {/* Imagen de fondo opcional */}

            <div className="login-form">
                <h2>Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="bi bi-envelope input-icon"></i> Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="bi bi-lock input-icon"></i> Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <i className="bi bi-lock input-icon"></i> Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login">Registrarse</button>
                </form>

                <div className="form-footer">
                    <p>
                        Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
