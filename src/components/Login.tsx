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
        } catch (error: unknown) {
            const err = error as Error;
            alert(err.message || 'Error al iniciar sesión');
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
        } catch (error: unknown) {
            const err = error as Error;
            alert(err.message || 'Código 2FA inválido');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-900">
            <div className="bg-white shadow-2xl rounded-3xl flex flex-col items-center p-10 w-full max-w-md">
                {step === 1 && (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Inicio de Sesión</h2>
                        <form className="w-full" onSubmit={handleLogin}>
                            <div className="mb-4 flex items-center border-b border-gray-300 py-2">
                                <Mail className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    className="outline-none w-full py-2"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6 flex items-center border-b-2 border-gray-200 py-2">
                                <Lock className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    className="outline-none w-full py-2"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-gray-700 hover:to-gray-800 text-white font-semibold py-2 rounded-lg w-full transition duration-300"
                            >
                                LOGIN
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verificación 2FA</h2>
                        <form onSubmit={handleVerify2FA} className="w-full">
                            <div className="mb-6 flex items-center border-b-2 border-gray-200 py-2">
                                <input
                                    type="text"
                                    className="outline-none w-full py-2 text-center"
                                    placeholder="Código 2FA"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg w-full transition duration-300"
                            >
                                VERIFICAR
                            </button>
                        </form>
                    </>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center">
                        <CheckCircle className="text-green-500 animate-pulse" size={80} />
                        <h2 className="text-2xl font-bold text-green-500 mt-4">¡Acceso concedido!</h2>
                        <p className="text-gray-600 mt-2">Redirigiendo...</p>
                    </div>
                )}

                {step === 1 && (
                    <div className="mt-6 text-sm">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">
                            Regístrate aquí
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
