import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const API_URL = "http://localhost:5000/sensor/historial";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [intervalo, setIntervalo] = useState(2); // minutos

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(API_URL);
        setHistorial(response.data);
      } catch (error) {
        console.error("Error al obtener los datos históricos:", error);
      }
    };

    fetchHistorial();
  }, []);

  
  const filtrado = (() => {
    const intervaloMs = intervalo * 60 * 1000;
    let ultimo = 0;
    return historial.filter((item: any) => {
      const actual = new Date(item.fecha_registro).getTime();
      if (actual - ultimo >= intervaloMs) {
        ultimo = actual;
        return true;
      }
      return false;
    });
  })();

  const labels = filtrado.map((data) =>
    new Date(data.fecha_registro).toLocaleTimeString()
  );

  const temperaturaData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: filtrado.map((data) => data.temperatura),
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.5)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const humedadData = {
    labels,
    datasets: [
      {
        label: "Humedad (%)",
        data: filtrado.map((data) => data.humedad),
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.5)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const lluviaData = {
    labels,
    datasets: [
      {
        label: "Lluvia (mm)",
        data: filtrado.map((data) => data.lluvia),
        backgroundColor: "#34d399",
        borderColor: "#059669",
        borderWidth: 1,
      },
    ],
  };

  const solData = {
    labels: labels.slice(-10),
    datasets: [
      {
        label: "Intensidad del Sol (%)",
        data: filtrado.slice(-10).map((data) => data.sol),
        backgroundColor: [
          "#fbbf24",
          "#f59e0b",
          "#f97316",
          "#fdba74",
          "#fb923c",
          "#fca5a5",
          "#f87171",
          "#fde68a",
          "#fcd34d",
          "#facc15",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Historial de Sensores</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="intervalo" className="font-medium">
            Mostrar datos cada:
          </label>
          <select
            id="intervalo"
            className="border rounded px-2 py-1"
            value={intervalo}
            onChange={(e) => setIntervalo(parseInt(e.target.value))}
          >
            <option value={1}>1 minuto</option>
            <option value={2}>2 minutos</option>
            <option value={5}>5 minutos</option>
            <option value={10}>10 minutos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-11 h-[300px] overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">Temperatura</h2>
          <Line
            data={temperaturaData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-11 h-[300px] overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">Humedad</h2>
          <Line
            data={humedadData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-11 h-[300px] overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">Nivel de Lluvia (mm)</h2>
          <Bar
            data={lluviaData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-11 h-[300px] overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">Intensidad del Sol</h2>
          <Doughnut
            data={solData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Historial;
