import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2"; 

const indicesToFetch = [
  { name: "NIFTY 50", symbol: "^NSEI" },
  { name: "SENSEX", symbol: "^BSESN" },
  { name: "NIFTY BANK", symbol: "^NSEBANK" },
  { name: "MRF", symbol: "MRF.NS" },
];

export async function GET() {
  try {
    const dataPromises = indicesToFetch.map(async (index) => {
      const result = await yahooFinance.quoteSummary(index.symbol, { modules: ["price"] });

      return {
        name: index.name,
        value: result.price.regularMarketPrice.toFixed(2),
        change: result.price.regularMarketChange.toFixed(2),
        percentChange: `${result.price.regularMarketChangePercent.toFixed(2)}%`,
        isPositive: result.price.regularMarketChange >= 0,
      };
    });

    const results = await Promise.all(dataPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching market data:", error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
