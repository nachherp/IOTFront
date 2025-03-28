
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Asegúrate que este endpoint existe en tu backend

const ParcelasEliminadas = () => {
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
  const fetchEliminadas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sensor/eliminadas");
      setParcelas(response.data || []); // <-- asegura que sea array
    } catch (error) {
      console.error("Error al obtener parcelas eliminadas:", error);
    }
  };

  fetchEliminadas();
}, []);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900"> Parcelas Eliminadas</h1>
      
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Tipo de Cultivo</th>
              <th className="py-3 px-4 text-left">Responsable</th>
              <th className="py-3 px-4 text-left">Latitud</th>
              <th className="py-3 px-4 text-left">Longitud</th>
              <th className="py-3 px-4 text-left">Fecha de Eliminación</th>
            </tr>
          </thead>
          <tbody>
            {parcelas.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2 px-4">{p.nombre}</td>
                <td className="py-2 px-4">{p.tipo_cultivo}</td>
                <td className="py-2 px-4">{p.responsable}</td>
                <td className="py-2 px-4">{p.latitud}</td>
                <td className="py-2 px-4">{p.longitud}</td>
                <td className="py-2 px-4">
                  {new Date(p.fecha_eliminacion).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parcelas.length === 0 && (
          <p className="mt-4 text-gray-500 text-center">No hay parcelas eliminadas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default ParcelasEliminadas;

