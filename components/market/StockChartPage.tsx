'use client';

import { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode, UTCTimestamp } from "lightweight-charts";

interface StockChartPageProps {
  symbol: string;
  chartData: any[];
}

interface FormattedCandleData {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface FormattedVolumeData {
  time: UTCTimestamp;
  value: number;
  color: string;
}

interface SimplifiedStockInfo {
  companyName: string;
  symbol: string;
  price: string;
  change: string;
  revenue: string;
  netProfitMargin: string;
  eps: string;
  debtToEquity: string;
  roe: string;
  roa: string;
  peRatio: string;
  pbRatio: string;
  dividendYield: string;
}

export default function StockChartPage({ symbol, chartData: initialChartData }: StockChartPageProps) {
  const [stockInfo, setStockInfo] = useState<SimplifiedStockInfo | null>(null);
  const [chartData, setChartData] = useState(initialChartData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  // Formatting helpers
  const formatCurrency = (value: string) => {
    if (value === "N/A") return value;
    const number = parseFloat(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formatPercentage = (value: string) => {
    if (value === "N/A") return value;
    const number = parseFloat(value);
    return `${number > 0 ? '+' : ''}${number.toFixed(2)}%`;
  };

  const formatNumber = (value: string) => {
    if (value === "N/A") return value;
    const number = parseFloat(value);
    return number.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  // Convert UTC timestamp to IST time string (HH:MM)
  const toIST = (timestamp: UTCTimestamp): string => {
    const date = new Date(timestamp * 1000);
    date.setMinutes(date.getMinutes() + 330);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace('24:', '00:');
  };

  // Fetch stock information
  const fetchStockInfo = async (symbol: string) => {
    try {
      const response = await fetch(`/api/stock/${symbol}/info`);
      if (response.ok) {
        const data = await response.json();
        setStockInfo(data);
      } else {
        throw new Error("Failed to fetch stock info");
      }
    } catch (error) {
      console.error("Error fetching stock info:", error);
      setError("Failed to load stock information");
    } finally {
      setLoading(false);
    }
  };

  // Format candle data with proper UTCTimestamp
  const formatCandleData = (data: any[]): FormattedCandleData[] => {
    if (!data || !Array.isArray(data)) {
      console.error('Invalid chart data received:', data);
      return [];
    }

    return data.map((item) => ({
      time: (new Date(item.time).getTime() / 1000) as UTCTimestamp,
      open: parseFloat(item.open) || 0,
      high: parseFloat(item.high) || 0,
      low: parseFloat(item.low) || 0,
      close: parseFloat(item.close) || 0,
    }));
  };

  // Format volume data
  const formatVolumeData = (candleData: FormattedCandleData[]): FormattedVolumeData[] => {
    return candleData.map((candle) => ({
      time: candle.time,
      value: 0, // Replace with actual volume data if available
      color: candle.close > candle.open ? "#22C55E" : "#EF4444",
    }));
  };

  // Fetch stock info when component mounts or symbol changes
  useEffect(() => {
    fetchStockInfo(symbol);
  }, [symbol]);

  // Set the "Last updated" timestamp in IST
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330);
    setLastUpdated(now.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  }, []);

  // Chart setup
  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: { background: { color: "#0F172A" }, textColor: "#F1F5F9" },
      grid: { vertLines: { color: "#1E293B" }, horzLines: { color: "#1E293B" } },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { 
        borderColor: "#334155", 
        timeVisible: true, 
        secondsVisible: false,
        rightOffset: 12,
        tickMarkFormatter: (time: UTCTimestamp) => toIST(time),
      },
      rightPriceScale: {
        borderColor: "#334155",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22C55E",
      downColor: "#EF4444",
      borderUpColor: "#22C55E",
      borderDownColor: "#EF4444",
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    const formattedCandleData = formatCandleData(chartData);
    candleSeries.setData(formattedCandleData);
    candleSeriesRef.current = candleSeries;

    const volumeSeries = chart.addHistogramSeries({
      color: "#64748B",
      priceFormat: { type: "volume" },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const volumeData = formatVolumeData(formattedCandleData);
    volumeSeries.setData(volumeData);
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 600);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData]);

  // Real-time chart updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/stock/${symbol}/chart`);
        if (!response.ok) return;
        const newData = await response.json();
        setChartData(newData);
        
        if (newData.length > 0 && candleSeriesRef.current) {
          const lastData = newData[newData.length - 1];
          const formattedLastData = {
            time: (new Date(lastData.time).getTime() / 1000) as UTCTimestamp,
            open: parseFloat(lastData.open),
            high: parseFloat(lastData.high),
            low: parseFloat(lastData.low),
            close: parseFloat(lastData.close),
          };
          
          candleSeriesRef.current.update(formattedLastData);
          
          if (volumeSeriesRef.current) {
            volumeSeriesRef.current.update({
              time: formattedLastData.time,
              value: lastData.volume || 0,
              color: lastData.close > lastData.open ? "#22C55E" : "#EF4444",
            });
          }

          const now = new Date();
          now.setMinutes(now.getMinutes() + 330);
          setLastUpdated(now.toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
        }
      } catch (error) {
        console.error("Error in real-time update:", error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [symbol]);

  // Render stock information
  const renderStockInfo = () => {
    if (loading) return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
    
    if (error) return (
      <div className="bg-red-900/20 rounded-lg p-4 text-red-500">
        {error}
      </div>
    );

    if (!stockInfo) return null;

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Stock Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Basic Info */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-amber-400">Basic Information</h3>
            <p><span className="font-medium">Company:</span> {stockInfo.companyName}</p>
            <p><span className="font-medium">Symbol:</span> {stockInfo.symbol}</p>
            <p><span className="font-medium">Price:</span> {formatCurrency(stockInfo.price)}</p>
            <p className={parseFloat(stockInfo.change) >= 0 ? "text-green-400" : "text-red-400"}>
              <span className="font-medium">Change:</span> {formatPercentage(stockInfo.change)}
            </p>
          </div>

          {/* Valuation Metrics */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-amber-400">Valuation</h3>
            <p><span className="font-medium">P/E Ratio:</span> {formatNumber(stockInfo.peRatio)}</p>
            <p><span className="font-medium">P/B Ratio:</span> {formatNumber(stockInfo.pbRatio)}</p>
            <p><span className="font-medium">EPS:</span> {formatNumber(stockInfo.eps)}</p>
            <p><span className="font-medium">Dividend Yield:</span> {formatPercentage(stockInfo.dividendYield)}</p>
          </div>

          {/* Financial Health */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-amber-400">Financial Health</h3>
            <p><span className="font-medium">Revenue:</span> {formatCurrency(stockInfo.revenue)}</p>
            <p><span className="font-medium">Profit Margin:</span> {formatPercentage(stockInfo.netProfitMargin)}</p>
            <p><span className="font-medium">ROE:</span> {formatPercentage(stockInfo.roe)}</p>
            <p><span className="font-medium">ROA:</span> {formatPercentage(stockInfo.roa)}</p>
            <p><span className="font-medium">Debt/Equity:</span> {formatNumber(stockInfo.debtToEquity)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {stockInfo?.companyName || symbol} Stock Chart
            </h1>
            <p className="text-gray-400 mt-1">{stockInfo?.symbol}</p>
          </div>
          <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
            Last updated: {lastUpdated || 'Loading...'}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-8">
          <div ref={chartContainerRef} className="w-full h-[600px] rounded-lg overflow-hidden" />
        </div>

        {/* Stock Information Section */}
        {renderStockInfo()}
      </div>
    </div>
  );
}