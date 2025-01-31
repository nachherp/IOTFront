import React from "react";
import "../assets/Recursos.css";

function RecursosAdmin() {
  const recursos = [
    {
      nombre: "Laptop Dell",
      tipo: "Electrónico",
      estado: "Pendiente",
      proyecto: "Proyecto 1",
      miembro: "Juan Pérez",
    },
    {
      nombre: "Impresora HP",
      tipo: "Oficina",
      estado: "Aprobado",
      proyecto: "Proyecto 2",
      miembro: "María López",
    },
    {
      nombre: "Cámara Canon",
      tipo: "Electrónico",
      estado: "Rechazado",
      proyecto: "Proyecto 3",
      miembro: "Carlos García",
    },
  ];

  return (
    <div className="recursos-container">
      <h2>Recursos Solicitados</h2>
      <table className="recursos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Proyecto</th>
            <th>Miembro</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso, index) => (
            <tr key={index}>
              <td>{recurso.nombre}</td>
              <td>{recurso.tipo}</td>
              <td className={`estado ${recurso.estado.toLowerCase()}`}>{recurso.estado}</td>
              <td>{recurso.proyecto}</td>
              <td>{recurso.miembro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecursosAdmin;
