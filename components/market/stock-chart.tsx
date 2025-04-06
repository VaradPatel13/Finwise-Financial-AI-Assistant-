"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line, Legend, ComposedChart } from "recharts";

export function StockChart({ symbol }: { symbol: string }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch(`/api/stock/${symbol}/chart`);
        if (!response.ok) throw new Error("Failed to fetch chart data");

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, [symbol]);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Candlestick Chart: {symbol}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="close" fill="#8884d8" name="Close Price" />
          <Line type="monotone" dataKey="high" stroke="green" name="High Price" />
          <Line type="monotone" dataKey="low" stroke="red" name="Low Price" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
