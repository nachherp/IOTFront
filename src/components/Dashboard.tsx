import React from "react"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const progress = [
    { area: "Diseño", porcentaje: 20 },
    { area: "Base de Datos", porcentaje: 35 },
    { area: "Frontend", porcentaje: 25 },
    { area: "Backend", porcentaje: 15 },
  ]

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
  ]

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
      </div>
    </div>
  )
}

export default Dashboard

