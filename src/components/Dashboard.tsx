import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios.ts';
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [code, setCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      const email = localStorage.getItem('email'); // Obtener el email del localStorage
      if (!email) {
        console.error('Email no encontrado en localStorage.');
        return;
      }

      try {
        const response = await api.post('/auth/generate-2fa-secret', { email });
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error('Error al generar el QR code:', error.response?.data?.message || error);
      }
    };

    fetchQrCode();
  }, []);

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('email');
      const response = await api.post('/auth/verify-2fa', { email, code });
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirigir al dashboard
    } catch (error) {
      console.error(error.response?.data?.message || 'Código 2FA inválido');
      alert(error.response?.data?.message || 'Código 2FA inválido');
    }
  };

  const progress = [
    { area: "Diseño", porcentaje: 20 },
    { area: "Base de Datos", porcentaje: 35 },
    { area: "Frontend", porcentaje: 25 },
    { area: "Backend", porcentaje: 15 },
  ];

  const team = [
    {
      title: "Jefes de Área",
      members: [
        { name: "Jonathan Sanchez", role: "Probador de control de calidad" },
        { name: "Marta Lopez", role: "Gestor de proyecto" },
        { name: "Alfonso Garza", role: "Scrum Master" },
      ],
    },
    {
      title: "Administradores",
      members: [
        { name: "Saul Rodriguez", role: "Jefe de proyecto" },
        { name: "Julian Maldonado", role: "Dueño" },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Columna izquierda */}
      <div className={styles.column}>
        <h1 className={styles.title}>Proyecto</h1>
        <p className={styles.subtitle}>01 - 25 March, 2020</p>

        {team.map((section, idx) => (
          <div key={idx}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div>
              {section.members.map((member, idx) => (
                <div key={idx} className="mb-4">
                  <span className={styles.memberName}>{member.name}</span>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Columna derecha */}
      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>Progreso de equipo</h2>
        <div className={styles.progressContainer}>
          {progress.map((item, idx) => (
            <div key={idx} className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>{item.area}</span>
                <span>{item.porcentaje}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${item.porcentaje}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Contenedor del QR Code y formulario 2FA */}
        <div className={styles.qrCodeContainer}>
          {qrCode && <img src={qrCode} alt="QR Code para Google Authenticator" />}
        </div>
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
    </div>
  );
};

export default Dashboard;
