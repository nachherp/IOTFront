import { useState } from 'react';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import "../assets/Login.css";
import api from '../api/axios.ts';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1); // 1: Login, 2: 2FA, 3: Acceso checkmark
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });

            if (response.data.message === 'Configura 2FA antes de iniciar sesión') {
                alert(response.data.message);
                return;
            }

            localStorage.setItem('email', email);
            localStorage.setItem('rol', response.data.rol || 'miembro');
            setStep(2);
        } catch (error) {
            alert(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/verify-2fa', { email, code });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setStep(3);
            setTimeout(() => {
                const rol = localStorage.getItem('rol');
                navigate(rol === 'admin' ? '/dashboard' : '/miembro-dashboard');
            }, 2000);
        } catch (error) {
            console.error(error.response?.data?.message || 'Código 2FA inválido');
            alert(error.response?.data?.message || 'Código 2FA inválido');
        }
    };

    return (
        <div className="login-container">
            <div className="login-image"></div>
            <div className="login-form">
                {step === 1 && <h2>Login</h2>}
                {step === 2 && <h2>Verificación 2FA</h2>}
                {step === 3 && <h2 className="success">¡Acceso concedido!</h2>}
                
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
                        <button type="submit" className="btn-login">LOGIN</button>
                    </form>
                ) : step === 2 ? (
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
                ) : (
                    <div className="success-container">
                        <CheckCircle className="success-icon" size={60} color="green" />
                        <p>Redirigiendo...</p>
                    </div>
                )}

                {step === 1 && (
                    <div className="form-footer">
                        <p>
                            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
