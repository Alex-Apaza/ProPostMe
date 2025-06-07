"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function SentimentDashboard() {
  type Tweet = {
    sentimiento: string;
    user: string;
    cluster: string | number;
    text: string;
  };
  const [tweets, setTweets] = useState<Tweet[]>([]);
  type Usuario = {
    Usuario: string;
    "Cantidad de tweets": string | number;
  };
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  type Cluster = {
    Cluster: string | number;
    "Palabras clave": string;
    "Cantidad de Tweets": string | number;
  };
  const [clusters, setClusters] = useState<Cluster[]>([]);

  useEffect(() => {
    fetch("/api/sentiment")
      .then((res) => res.json())
      .then(setTweets);
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then(setUsuarios);
    fetch("/api/clusters")
      .then((res) => res.json())
      .then(setClusters);
  }, []);

  // Contadores por sentimiento
  const counts = {
    Positivo: tweets.filter((t) => t.sentimiento === "Positivo").length,
    Negativo: tweets.filter((t) => t.sentimiento === "Negativo").length,
    Neutral: tweets.filter((t) => t.sentimiento === "Neutral").length,
  };

  const pieData = {
    labels: ["Positivo", "Neutral", "Negativo"],
    datasets: [
      {
        label: "Sentimientos",
        data: [counts.Positivo, counts.Neutral, counts.Negativo],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
      },
    ],
  };

  const barData = {
    labels: usuarios.map((u) => u.Usuario),
    datasets: [
      {
        label: "Tweets por usuario",
        data: usuarios.map((u) => parseInt(String(u["Cantidad de tweets"]))),
        backgroundColor: "#60a5fa",
      },
    ],
  };
  const clusterPieData = {
    labels: clusters.map((c) => `Clúster ${c.Cluster}`),
    datasets: [
      {
        label: "Distribución de Clústeres",
        data: clusters.map((c) => Number(c["Cantidad de Tweets"])),
        backgroundColor: [
          "#a78bfa",
          "#fca5a5",
          "#fcd34d",
          "#6ee7b7",
          "#93c5fd",
        ],
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard de Sentimientos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 justify-items-center items-start">
        {/* Distribución de Sentimientos */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-b-blue-600 w-full max-w-xs">
          <h2 className="text-md font-semibold mb-2 text-center text-gray-700">
            Distribución de Sentimientos
          </h2>
          <Pie data={pieData} />
        </div>

        {/* Usuarios Más Activos */}
        <div className="bg-white p-4 rounded-2xl shadow-md border  border-b-blue-600 w-full max-w-sm">
          <h2 className="text-md font-semibold mb-2 text-center text-gray-700">
            Usuarios Más Activos
          </h2>
          <Bar data={barData} />
        </div>

        {/* Distribución de Clústeres */}
        <div className="bg-white p-4 rounded-2xl shadow-md border  border-b-blue-600 w-full max-w-xs">
          <h2 className="text-md font-semibold mb-2 text-center text-gray-700">
            Distribución de Clústeres
          </h2>
          <Doughnut data={clusterPieData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-8 text-black">
        <h2 className="text-xl font-semibold mb-4">Resumen de Clústeres</h2>
        <table className="w-full text-sm border">
          <thead className="bg-black text-white">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Palabras Clave</th>
              <th className="border px-2 py-1">Cantidad de Tweets</th>
            </tr>
          </thead>
          <tbody>
            {clusters.map((c, i) => (
              <tr key={i}>
                <td className="border px-2 py-1 text-center">{c.Cluster}</td>
                <td className="border px-2 py-1">{c["Palabras clave"]}</td>
                <td className="border px-2 py-1 text-center">
                  {c["Cantidad de Tweets"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="text-xl text-black font-semibold mb-4">
          Muestra de Tweets Analizados
        </h2>
        <table className="w-full text-sm border">
          <thead className="bg-black text-white">
            <tr>
              <th className="border px-2 py-1">Usuario</th>
              <th className="border px-2 py-1">Sentimiento</th>
              <th className="border px-2 py-1">Clúster</th>
              <th className="border px-2 py-1">Texto</th>
            </tr>
          </thead>
          <tbody>
            {tweets.slice(0, 20).map((t, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{t.user}</td>
                <td className="border px-2 py-1">{t.sentimiento}</td>
                <td className="border px-2 py-1 text-center">{t.cluster}</td>
                <td className="border px-2 py-1">
                  {t.text ? t.text.slice(0, 100) + "..." : "[Sin texto]"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
