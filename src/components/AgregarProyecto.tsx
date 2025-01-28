"use client"

import type React from "react"
import { useState } from "react"
import styles from "../assets/AgregarProyecto.module.css"

interface AgregarProyectoProps {
  setIsAddingProject: (isAdding: boolean) => void
}

const AgregarProyecto: React.FC<AgregarProyectoProps> = ({ setIsAddingProject }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    prioridad: "",
    tipo: "",
    descripcion: "",
    equipo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos del formulario enviados:", formData)
    setIsAddingProject(false)
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Agregar Proyecto</h2>
      <div className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className={`form-label ${styles.formLabel}`}>
                Nombre de Proyecto
              </label>
              <input
                type="text"
                className={`form-control ${styles.formInput}`}
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese nombre del proyecto"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="prioridad" className={`form-label ${styles.formLabel}`}>
                Prioridad
              </label>
              <select
                className={`form-select ${styles.formSelect}`}
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una prioridad</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="tipo" className={`form-label ${styles.formLabel}`}>
                Tipo de proyecto
              </label>
              <select
                className={`form-select ${styles.formSelect}`}
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="desarrollo">Desarrollo</option>
                <option value="diseno">Diseño</option>
                <option value="investigacion">Investigación</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="equipo" className={`form-label ${styles.formLabel}`}>
                Equipo a cargo
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
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="descripcion" className={`form-label ${styles.formLabel}`}>
                Descripción
              </label>
              <textarea
                className={`form-control ${styles.formTextarea}`}
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción del proyecto"
                rows={3}
                required
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelButton} onClick={() => setIsAddingProject(false)}>
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

export default AgregarProyecto

