import React from "react";
import "../assets/Trabajadores.css";

interface TrabajadoresProps {
  setIsAddingWorker: (isAdding: boolean) => void;
}

const Trabajadores: React.FC<TrabajadoresProps> = ({ setIsAddingWorker }) => {
  const trabajadores = [
    { nombre: "Jane Cooper", edad: 24, telefono: "(225) 555-0118", email: "jane@microsoft.com", rol: "Desarrollador Front-end", equipo: "Nombre del equipo" },
    { nombre: "Floyd Miles", edad: 26, telefono: "(205) 555-0100", email: "floyd@yahoo.com", rol: "Diseñador", equipo: "Nombre del equipo" },
    { nombre: "Mariana Cruz", edad: 45, telefono: "(556) 678-0987", email: "cruz_m@gmail.com", rol: "Diseñador", equipo: "Nombre del equipo" }
    // Otros trabajadores...
  ];

  return (
    <div className="trabajadores-container">
      <h1 className="trabajadores-title">Trabajadores</h1>
      <table className="trabajadores-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Equipo asignado</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador, index) => (
            <tr key={index}>
              <td>{trabajador.nombre}</td>
              <td>{trabajador.edad}</td>
              <td>{trabajador.telefono}</td>
              <td>{trabajador.email}</td>
              <td>{trabajador.rol}</td>
              <td>{trabajador.equipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="agregar-button" onClick={() => setIsAddingWorker(true)}>
        Agregar
      </button>
    </div>
  );
};

export default Trabajadores;
