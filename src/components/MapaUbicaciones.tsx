import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaTemperatureHigh, FaTint, FaCloudRain, FaSun } from "react-icons/fa";

const Dashboard = () => {
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(53);
  const [lluvia, setLluvia] = useState(false);
  const [sol, setSol] = useState(true);

  // Ubicaciones de pines en el mapa (latitud, longitud)
  const locations = [
    { id: 1, lat: 37.7749, lng: -122.4194, name: "Ubicación 1" },
    { id: 2, lat: 37.7849, lng: -122.4294, name: "Ubicación 2" },
    { id: 3, lat: 37.7949, lng: -122.4394, name: "Ubicación 7" },
    { id: 4, lat: 37.8049, lng: -122.4494, name: "Ubicación 4" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Título */}
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Cultivos del Sur | Mapa de Ubicaciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Mapa interactivo */}
        <div className="w-full h-full">
          <MapContainer center={[37.7749, -122.4194]} zoom={13} className="w-full h-[350px] rounded-lg shadow-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Tarjetas de datos */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-center">
            <FaTemperatureHigh className="text-blue-600 text-6xl mx-auto mb-2" />
            <h2 className="text-2xl font-semibold text-gray-700">Temperatura</h2>
            <p className="text-4xl font-bold text-blue-600">{temperatura}°C</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-center">
            <FaTint className="text-blue-600 text-6xl mx-auto mb-2" />
            <h2 className="text-2xl font-semibold text-gray-700">Humedad</h2>
            <p className="text-4xl font-bold text-blue-600">{humedad}%</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-center">
            <FaCloudRain className="text-blue-600 text-6xl mx-auto mb-2" />
            <h2 className="text-2xl font-semibold text-gray-700">Lluvia</h2>
            <p className="text-4xl font-bold">{lluvia ? "Sí" : "No"}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-center">
            <FaSun className="text-blue-600 text-6xl mx-auto mb-2" />
            <h2 className="text-2xl font-semibold text-gray-700">Intensidad del Sol</h2>
            <p className="text-4xl font-bold">{sol ? "Alta" : "Baja"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
