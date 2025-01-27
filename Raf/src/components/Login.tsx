import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import "../assets/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <Mail className="input-icon" />
            <input
              type="email"
              placeholder="Correo"
              required
            />
          </div>
          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="form-remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Recuerdame</label>
          </div>
          <button type="submit" className="btn-login">LOGIN</button>
        </form>
        <div className="form-footer">
          <a href="#forgot">Olvidaste la contraseña?</a>
          <p>
            no tienes una cuenta? <Link to="/register">Registrate</Link> {/* Cambia a Link */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
