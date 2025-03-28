import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { WiThermometer, WiHumidity, WiRain, WiDaySunny } from "react-icons/wi";

const API_URL = "http://localhost:5000/sensor/dashboard"; 

const Dashboard = () => {
  const [sensores, setSensores] = useState({
    temperatura: 0,
    humedad: 0,
    lluvia: 0,
    sol: 0,
  });
  const [parcelas, setParcelas] = useState<{ id_parcela: number; latitud: number; longitud: number; nombre: string; tipo_cultivo: string; responsable: string; ultimo_riego: string; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        await axios.get("http://localhost:5000/sensor/sync");

       
        const response = await axios.get(API_URL);

        if (response.data.lastRecord) {
          setSensores({
            temperatura: response.data.lastRecord.temperatura ?? 0,
            humedad: response.data.lastRecord.humedad ?? 0,
            lluvia: response.data.lastRecord.lluvia ?? 0,
            sol: response.data.lastRecord.sol ?? 0,
          });
        }

        if (response.data.parcelas) {
          setParcelas(response.data.parcelas);
        }
      } catch (error) {
        console.error("error al obtener datos del backend:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Cultivos del Sur | Mapa de Ubicaciones
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
          <MapContainer
            center={[21.065014, -86.887961]}
            zoom={13}
            className="w-full h-[500px]" 
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {parcelas.map((parcela) => (
              <Marker key={parcela.id_parcela} position={[parcela.latitud, parcela.longitud]}>
                <Popup>
                  <strong>{parcela.nombre}</strong> <br />
                  Cultivo: {parcela.tipo_cultivo} <br />
                  Responsable: {parcela.responsable} <br />
                  Último riego: {new Date(parcela.ultimo_riego).toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

       
        <div className="grid grid-cols-2 gap-4">
         
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <WiThermometer className="text-6xl text-red-500" />
            <h2 className="text-xl font-semibold mt-2">Temperatura</h2>
            <p className="text-4xl font-bold text-gray-900">{sensores.temperatura}°C</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <WiHumidity className="text-6xl text-blue-500" />
            <h2 className="text-xl font-semibold mt-2">Humedad</h2>
            <p className="text-4xl font-bold text-gray-900">{sensores.humedad}%</p>
          </div>

      
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <WiRain className="text-6xl text-blue-400" />
            <h2 className="text-xl font-semibold mt-2">Lluvia</h2>
            <p className="text-4xl font-bold text-gray-900">
              {sensores.lluvia}
            </p>
          </div>

    
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <WiDaySunny className="text-6xl text-yellow-500" />
            <h2 className="text-xl font-semibold mt-2">Intensidad del Sol</h2>
            <p className="text-4xl font-bold text-gray-900">
              {sensores.sol > 50 ? "Alta" : "Baja"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
