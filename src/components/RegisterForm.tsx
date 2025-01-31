import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.ts';
import '../assets/Register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [qrCode, setQrCode] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await api.post('/auth/register', {
        nombre: formData.username,
        email: formData.email,
        password: formData.password
      });

      const qrResponse = await api.post('/auth/generate-2fa-secret', { email: formData.email });
      setQrCode(qrResponse.data.qrCode);
      setVerificationStep(true);
    } catch (error) {
      console.error('Error al registrar', error.response?.data?.message || error);
      alert('Error al registrar');
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/verify-2fa', { email: formData.email, code });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/miembro-dashboard');
    } catch (error) {
      console.error('Código 2FA inválido', error.response?.data?.message || error);
      alert('Código 2FA inválido');
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
      <div className="login-image"></div>
      <div className="login-form">
        <h2>{!verificationStep ? 'Crear Cuenta' : 'Verificación 2FA'}</h2>
        <br />
        {!verificationStep ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nombre Completo</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nombre Completo"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
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
              <label htmlFor="password">Contraseña</label>
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
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
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
        ) : (
          <div className="twofa-container">
            <p>Escanea este código QR en Google Authenticator y luego ingresa el código generado.</p>
            <img src={qrCode} alt="QR Code para Google Authenticator" className="qr-code" />
            <form onSubmit={handleVerify2FA}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Código 2FA"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-login">VERIFICAR</button>
            </form>
          </div>
        )}

        <div className="form-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
