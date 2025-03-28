import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.ts";
import { Mail, Lock, User, QrCode, CheckCircle } from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [qrCode, setQrCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await api.post("/auth/register", {
        nombre: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const qrResponse = await api.post("/auth/generate-2fa-secret", {
        email: formData.email,
      });
      setQrCode(qrResponse.data.qrCode);
      setVerificationStep(true);
    } catch (error) {
      console.error("Error al registrar", error.response?.data?.message || error);
      alert("Error al registrar");
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/verify-2fa", { email: formData.email, code });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/miembro-dashboard");
    } catch (error) {
      console.error("Código 2FA inválido", error.response?.data?.message || error);
      alert("Código 2FA inválido");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white bg-opacity-10 shadow-2xl rounded-3xl flex flex-col items-center p-10 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-bold text-gray-200 mb-6">
          {verificationStep ? "Verificación 2FA" : "Crear Cuenta"}
        </h2>

        {!verificationStep ? (
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Input Nombre Completo */}
            <div className="mb-4 flex items-center border-b border-gray-300 py-2">
              <User className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                className="outline-none w-full py-2 bg-transparent text-gray-200 placeholder-gray-400"
                placeholder="Nombre Completo"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Correo */}
            <div className="mb-4 flex items-center border-b border-gray-300 py-2">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                className="outline-none w-full py-2 bg-transparent text-gray-200 placeholder-gray-400"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="mb-4 flex items-center border-b border-gray-300 py-2">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                className="outline-none w-full py-2 bg-transparent text-gray-200 placeholder-gray-400"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Confirmar Contraseña */}
            <div className="mb-6 flex items-center border-b border-gray-300 py-2">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                className="outline-none w-full py-2 bg-transparent text-gray-200 placeholder-gray-400"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botón de Registro */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-gray-700 hover:to-gray-800 text-white font-semibold py-2 rounded-lg w-full transition duration-300"
            >
              REGISTRARSE
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-300">Escanea este código QR en Google Authenticator:</p>
            <div className="flex justify-center mt-4">
              <img src={qrCode} alt="QR Code para Google Authenticator" className="w-40 h-40 rounded-md shadow-lg" />
            </div>
            <form className="mt-6" onSubmit={handleVerify2FA}>
              <div className="mb-6 flex items-center border-b border-gray-300 py-2">
                <QrCode className="text-gray-400 mr-2" />
                <input
                  type="text"
                  className="outline-none w-full py-2 bg-transparent text-gray-200 placeholder-gray-400 text-center"
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
          </div>
        )}

        {/* Link a Login */}
        {!verificationStep && (
          <div className="mt-6 text-sm text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
