// components/market/stock-list.tsx
"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StockList() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch stock data
  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch("/api/stock");
        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, []);

  if (loading) return <p>Loading stock data...</p>;

  const displayedStocks = showAll ? stocks : stocks.slice(0, 5);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Price (₹)</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedStocks.map((stock, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell>{stock.symbol}</TableCell>
              <TableCell className="text-right">{stock.price || "N/A"}</TableCell>
              <TableCell className="text-right">
                {stock.error ? (
                  <span className="text-red-500">Failed to fetch</span>
                ) : (
                  <span className={`flex items-center justify-end ${stock.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {stock.change} ({stock.percentChange})
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Link href={`/stock/${stock.symbol}/chart`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All Stocks"}
        </Button>
      </div>
    </div>
  );
}   