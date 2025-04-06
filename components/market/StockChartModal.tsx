import { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function StockChartModal({
  symbol,
  chartData,
  onClose,
}: {
  symbol: string;
  chartData: any[];
  onClose: () => void;
}) {
  const [showStockInfo, setShowStockInfo] = useState(false);
  const [stockInfo, setStockInfo] = useState<any>(null);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  // Fetching stock information
  const fetchStockInfo = async (symbol: string) => {
    try {
      const response = await fetch(`/api/stock/${symbol}/info`);
      if (response.ok) {
        const data = await response.json();
        setStockInfo(data);
      } else {
        console.error("Failed to fetch stock info");
      }
    } catch (error) {
      console.error("Error fetching stock info:", error);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    // Create chart with enhanced styling
    const chart = createChart(chartContainerRef.current, {
      width: 850,
      height: 450,
      layout: {
        background: { color: "#0F172A" },
        textColor: "#F1F5F9",
      },
      grid: {
        vertLines: { color: "#1E293B" },
        horzLines: { color: "#1E293B" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        borderColor: "#334155",
        fixLeftEdge: true,
        timeVisible: true,
        secondsVisible: false,
        minBarSpacing: 2,  // More spacing for clearer view
      },
    });

    // Add Candlestick Series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22C55E",
      downColor: "#EF4444",
      borderUpColor: "#22C55E",
      borderDownColor: "#EF4444",
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    // Filter and format the data
    const formattedData = chartData.map((data: any) => ({
      time: new Date(data.time).getTime() / 1000, // Convert to Unix timestamp in seconds
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }));

    candleSeries.setData(formattedData);
    candleSeriesRef.current = candleSeries;

    // Add Volume Bars
    const volumeSeries = chart.addHistogramSeries({
      color: "#64748B",
      priceScaleId: "",
      lineWidth: 2,
      priceFormat: { type: "volume" },
    });

    // Volume data (assumed volume is not provided, adjust accordingly)
    const volumeData = formattedData.map((candle: any) => ({
      time: candle.time,
      value: 0, // Replace with actual volume data if available
      color: candle.close > candle.open ? "#22C55E" : "#EF4444",
    }));

    volumeSeries.setData(volumeData);
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
    };
  }, [chartData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/stock/${symbol}/chart`);
        if (!response.ok) return;

        const newData = await response.json();
        if (newData.length > 0 && candleSeriesRef.current) {
          candleSeriesRef.current.update(newData[newData.length - 1]);
          volumeSeriesRef.current?.update({
            time: newData[newData.length - 1].time,
            value: newData[newData.length - 1].volume,
            color: newData[newData.length - 1].close > newData[newData.length - 1].open ? "#22C55E" : "#EF4444",
          });
        }
      } catch {}
    }, 60000); // Fetch new data every 1 min

    return () => clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    if (showStockInfo) {
      fetchStockInfo(symbol);
    }
  }, [showStockInfo, symbol]);

  const toggleStockInfo = () => {
    setShowStockInfo((prevState) => !prevState);
  };

  const renderStockInfo = () => {
    if (!stockInfo) {
      return <p>Loading stock information...</p>;
    }

    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-200">Company Fundamentals</h3>
        <ul className="text-gray-300">
          <li><strong>Revenue and Earnings:</strong> {stockInfo.revenue}</li>
          <li><strong>Profit Margins:</strong> {stockInfo.profitMargins}</li>
          <li><strong>Balance Sheet:</strong> {stockInfo.balanceSheet}</li>
          <li><strong>Cash Flow:</strong> {stockInfo.cashFlow}</li>
          <li><strong>Dividends:</strong> {stockInfo.dividends}</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-200 mt-4">Stock Valuation Metrics</h3>
        <ul className="text-gray-300">
          <li><strong>P/E Ratio:</strong> {stockInfo.peRatio}</li>
          <li><strong>P/B Ratio:</strong> {stockInfo.pbRatio}</li>
          <li><strong>P/S Ratio:</strong> {stockInfo.psRatio}</li>
          <li><strong>PEG Ratio:</strong> {stockInfo.pegRatio}</li>
          <li><strong>Market Cap:</strong> {stockInfo.marketCap}</li>
        </ul>

        {/* Add other sections as needed */}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#1E293B] p-5 rounded-xl shadow-lg w-[900px]">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">{symbol} Stock Chart</h2>
        <div ref={chartContainerRef} className="w-full h-[450px] rounded-lg overflow-hidden" />

        <button
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full"
          onClick={toggleStockInfo}
        >
          {showStockInfo ? "Hide Stock Info" : "Show Stock Info"}
        </button>

        {showStockInfo && (
          <div className="mt-4 p-4 bg-[#2D3748] rounded-lg text-white">
            {renderStockInfo()}
          </div>
        )}

        <button
          className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
