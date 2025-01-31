import React from "react";
import "../assets/Equipos.css";

function Equipos({ setIsAddingEquipo }) {
  const equipos = [
    {
      nombre: "Equipo Alpha",
      id_proyecto: "Proyecto 1",
    },
    {
      nombre: "Equipo Beta",
      id_proyecto: "Proyecto 2",
    },
    {
      nombre: "Equipo Gamma",
      id_proyecto: "Proyecto 3",
    },
    {
      nombre: "Equipo Delta",
      id_proyecto: "Proyecto 4",
    },
  ];

  const handleAgregarClick = () => {
    setIsAddingEquipo(true); 
  };

  return (
    <div className="equipos-container">
      <h2>Lista de Equipos</h2>
      <table className="equipos-tabla">
        <thead>
          <tr>
            <th>Nombre del Equipo</th>
            <th>Proyecto Asignado</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => (
            <tr key={index}>
              <td>{equipo.nombre}</td>
              <td>{equipo.id_proyecto}</td>
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

export default Equipos;
