import React from "react";
import "../assets/Recursos.css";

function RecursosMiembro() {
  const recursos = [
    {
      nombre: "Laptop Dell",
      tipo: "Electrónico",
      estado: "Disponible",
      proyecto: "Proyecto 1",
    },
    {
      nombre: "Impresora HP",
      tipo: "Oficina",
      estado: "Disponible",
      proyecto: "Proyecto 2",
    },
    {
      nombre: "Cámara Canon",
      tipo: "Electrónico",
      estado: "Disponible",
      proyecto: "Proyecto 3",
    },
  ];

  return (
    <div className="recursos-container">
      <h2>Recursos Disponibles</h2>
      <table className="recursos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Proyecto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso, index) => (
            <tr key={index}>
              <td>{recurso.nombre}</td>
              <td>{recurso.tipo}</td>
              <td className={`estado ${recurso.estado.toLowerCase()}`}>{recurso.estado}</td>
              <td>{recurso.proyecto}</td>
              <td>
                <button className="btn-solicitar">Solicitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecursosMiembro;
