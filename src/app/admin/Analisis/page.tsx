"use client";

import React, { useEffect, useState } from "react";
import SentimentDashboard from "@/componentes/SentimentDashboard";
import Link from "next/link";

type Tweet = {
  sentimiento: string;
  user: string;
  cluster: string | number;
  text: string;
};

export default function AdminPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetch("/api/sentiment")
      .then((res) => res.json())
      .then((data) => setTweets(data));
  }, []);

  const exportCSV = () => {
    const headers = ["Usuario", "Sentimiento", "Clúster", "Texto"];
    const rows = tweets.map((t) =>
      [
        t.user,
        t.sentimiento,
        t.cluster,
        `"${t.text.replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tweets_analizados_dashboard.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-[#4EDCD8] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
        📤 Análisis General
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button
          onClick={exportCSV}
          className="px-5 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-white transition shadow-md"
        >
          📥 Exportar Tweets Analizados CSV
        </button>

        <Link
          href="/admin"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition shadow-md text-center"
        >
          ⬅️ Volver al Panel Admin
        </Link>
      </div>

      <div className="clases">
        <SentimentDashboard />
      </div>
    </div>
  );
}
