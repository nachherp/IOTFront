import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import "../assets/Login.css";
import api from '../api/axios.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llamar al backend para validar credenciales y enviar código 2FA
      const response = await api.post('/auth/login', { email, password });
      alert(response.data.message); // "Código 2FA enviado"
      setStep(2); // Ir al siguiente paso
    } catch (error) {
      console.error(error.response?.data?.message || 'Error al iniciar sesión');
      alert('Error al iniciar sesión');
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      // Llamar al backend para verificar el código 2FA
      const response = await api.post('/auth/verify-2fa', { email, code });
      const token = response.data.accessToken;

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', token);
      alert('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirigir al dashboard
    } catch (error) {
      console.error(error.response?.data?.message || 'Código 2FA inválido');
      alert('Código 2FA inválido');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2>{step === 1 ? 'Login' : 'Verificación 2FA'}</h2>
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recuerdame</label>
            </div>
            <button type="submit" className="btn-login">LOGIN</button>
          </form>
        ) : (
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
        )}
        {step === 1 && (
          <div className="form-footer">
            <a href="#forgot">Olvidaste la contraseña?</a>
            <p>
              no tienes una cuenta? <Link to="/register">Registrate</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
