import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params?: { symbol?: string } }) {
  try {
    // Ensure the symbol is present in the request parameters
    if (!context?.params?.symbol) {
      return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
    }

    const symbol = context.params.symbol.toUpperCase(); // Convert symbol to uppercase for consistency

    // Fetch stock data from Yahoo Finance API with 5-minute intervals for last 15 days
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=5m&range=15d`
    );

    if (!response.ok) throw new Error("Failed to fetch stock data from Yahoo Finance");

    const data = await response.json();

    // Check if data is valid and contains the necessary properties
    if (!data.chart?.result || !data.chart.result[0]) {
      throw new Error("Invalid data received from Yahoo Finance");
    }

    const chartData = data.chart.result[0];
    const timestamps = chartData.timestamp || [];
    const indicators = chartData.indicators?.quote?.[0];

    // Ensure valid data for processing
    if (!timestamps.length || !indicators) {
      throw new Error("Incomplete stock data received");
    }

    // Format the chart data as required
    const formattedData = timestamps
      .map((time: number, index: number) => {
        const open = indicators.open?.[index] ?? null;
        const high = indicators.high?.[index] ?? null;
        const low = indicators.low?.[index] ?? null;
        const close = indicators.close?.[index] ?? null;

        // Skip if any of the required data points is missing
        if (open === null || high === null || low === null || close === null) {
          return null;
        }

        // Convert time (in Unix timestamp) to a Date object
        const dateTime = new Date(time * 1000);
        const hours = dateTime.getUTCHours() + 5; // Adjust for IST (UTC+5:30)
        const minutes = dateTime.getUTCMinutes() + 30; // Adjust for IST
        const adjustedHours = Math.floor((hours * 60 + minutes) / 60) % 24;
        const adjustedMinutes = (hours * 60 + minutes) % 60;

        // Filter for regular trading hours (9:15 AM to 3:30 PM IST)
        const timeInMinutes = adjustedHours * 60 + adjustedMinutes;
        const startTime = 9 * 60 + 15; // 9:15 AM in minutes
        const endTime = 15 * 60 + 30; // 3:30 PM in minutes

        if (timeInMinutes < startTime || timeInMinutes > endTime) {
          return null; // Skip data outside regular trading hours
        }

        // Format the time as a string
        const formattedTime = `${dateTime.toISOString().split("T")[0]} ${adjustedHours
          .toString()
          .padStart(2, "0")}:${adjustedMinutes.toString().padStart(2, "0")}:00`;

        return {
          time: formattedTime,
          open,
          high,
          low,
          close,
        };
      })
      .filter((entry) => entry !== null); // Remove null values

    console.log("✅ Formatted Chart Data (5m candles, last 15 days, 9:15 AM to 3:30 PM IST):", formattedData);

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Stock API Error:", error);
    return NextResponse.json({ error: "Unable to fetch stock data" }, { status: 500 });
  }
}