import React from "react";
import "../assets/Proyectos.css";

function Proyectos({ setIsAddingProject }) {
  const proyectos = [
    {
      nombre: "Proyecto 1",
      prioridad: "Baja",
      tipo: "Móvil",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      equipo: "Nombre del equipo",
    },
    {
      nombre: "Proyecto 2",
      prioridad: "Alta",
      tipo: "Aplicación Web",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      equipo: "Nombre del equipo",
    },
    {
      nombre: "Proyecto 3",
      prioridad: "Media",
      tipo: "Sitio Web",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      equipo: "Nombre del equipo",
    },
    {
      nombre: "Proyecto 4",
      prioridad: "Baja",
      tipo: "Móvil",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      equipo: "Nombre del equipo",
    },
  ];

  const handleAgregarClick = () => {
    setIsAddingProject(true); // Activar la vista de agregar proyecto
  };

  return (
    <div className="proyectos-container">
      <h2>Lista de Proyectos</h2>
      <table className="proyectos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Prioridad</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Equipo a cargo</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto, index) => (
            <tr key={index}>
              <td>{proyecto.nombre}</td>
              <td className={`prioridad ${proyecto.prioridad.toLowerCase()}`}>
                {proyecto.prioridad}
              </td>
              <td>{proyecto.tipo}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.equipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={handleAgregarClick}>
        Agregar
      </button>
    </div>
  );
}

export default Proyectos;
