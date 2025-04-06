"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface IndexData {
  name: string;
  value: string;
  change: string;
  percentChange: string;
  isPositive: boolean;
}

export function MarketOverview() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("/api/market");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setIndices(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        <p>Loading market data...</p>
      ) : (
        indices.map((index, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">{index.name}</span>
                <span className="text-2xl font-bold">{index.value}</span>
                <div className="flex items-center mt-1">
                  <span className={`flex items-center text-sm ${index.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {index.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {index.change} ({index.percentChange})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
