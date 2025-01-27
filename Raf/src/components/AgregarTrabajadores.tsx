"use client"

import type React from "react"
import { useState } from "react"
import styles from "./AgregarTrabajador.module.css"

interface AgregarTrabajadorProps {
  setIsAddingWorker: (isAdding: boolean) => void
}

const AgregarTrabajador: React.FC<AgregarTrabajadorProps> = ({ setIsAddingWorker }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    edad: "",
    telefono: "",
    rol: "",
    equipo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    setIsAddingWorker(false)
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Agregar Trabajador</h2>
      <div className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className={`form-label ${styles.formLabel}`}>
                Nombre Completo
              </label>
              <input
                type="text"
                className={`form-control ${styles.formInput}`}
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese nombre completo"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="correo" className={`form-label ${styles.formLabel}`}>
                Correo Electrónico
              </label>
              <input
                type="email"
                className={`form-control ${styles.formInput}`}
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="edad" className={`form-label ${styles.formLabel}`}>
                Edad
              </label>
              <input
                type="number"
                className={`form-control ${styles.formInput}`}
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ingrese edad"
                required
                min="18"
                max="100"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="telefono" className={`form-label ${styles.formLabel}`}>
                Teléfono
              </label>
              <input
                type="tel"
                className={`form-control ${styles.formInput}`}
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingrese número de teléfono"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="rol" className={`form-label ${styles.formLabel}`}>
                Rol
              </label>
              <select
                className={`form-select ${styles.formSelect}`}
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="desarrollador">Desarrollador</option>
                <option value="disenador">Diseñador</option>
                <option value="gerente">Gerente de Proyecto</option>
                <option value="qa">QA</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="equipo" className={`form-label ${styles.formLabel}`}>
                Equipo Enrolado
              </label>
              <select
                className={`form-select ${styles.formSelect}`}
                id="equipo"
                name="equipo"
                value={formData.equipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un equipo</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps</option>
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelButton} onClick={() => setIsAddingWorker(false)}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AgregarTrabajador

