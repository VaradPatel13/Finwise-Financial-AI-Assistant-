import yahooFinance from "yahoo-finance2";
import { NextRequest, NextResponse } from "next/server";

// Define the shape of the response for better TypeScript support (optional)
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

// API route handler
export async function GET(req: NextRequest, context: { params?: { symbol?: string } }) {
  try {
    // Extract symbol from dynamic route params
    const { symbol } = context.params || {};

    // Validate symbol presence
    if (!symbol) {
      console.log("❌ No symbol provided in request");
      return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
    }

    // Format symbol to uppercase for consistency
    const formattedSymbol = symbol.toUpperCase();
    console.log(`🔍 Fetching stock info for: ${formattedSymbol}`);

    // Fetch stock data from Yahoo Finance
    const stockInfo = await yahooFinance.quoteSummary(formattedSymbol, {
      modules: [
        "quoteType",          // Company name, etc.
        "summaryDetail",      // Price, change, P/E, P/B, dividend yield
        "financialData",      // Revenue, profit margins, debt ratios
        "defaultKeyStatistics" // EPS, ROE, ROA
      ],
    });

    // Check if data was returned
    if (!stockInfo) {
      console.log(`❌ No data returned for symbol: ${formattedSymbol}`);
      return NextResponse.json({ error: "No data found for symbol" }, { status: 404 });
    }

    // Log raw response for debugging
    console.log("📋 Raw stockInfo:", JSON.stringify(stockInfo, null, 2));

    // Map data to simplified format, with fallback to "N/A"
    const simplifiedStockInfo: SimplifiedStockInfo = {
      companyName: stockInfo.quoteType?.longName || "N/A",
      symbol: formattedSymbol,
      price: stockInfo.summaryDetail?.regularMarketPrice?.toString() || "N/A",
      change: stockInfo.summaryDetail?.regularMarketChangePercent?.toString() || "N/A",
      revenue: stockInfo.financialData?.totalRevenue?.toString() || "N/A",
      netProfitMargin: stockInfo.financialData?.profitMargins?.toString() || "N/A",
      eps: stockInfo.defaultKeyStatistics?.trailingEps?.toString() || "N/A",
      debtToEquity: stockInfo.financialData?.debtToEquity?.toString() || "N/A",
      roe: stockInfo.financialData?.returnOnEquity?.toString() || "N/A",
      roa: stockInfo.financialData?.returnOnAssets?.toString() || "N/A",
      peRatio: stockInfo.summaryDetail?.trailingPE?.toString() || "N/A",
      pbRatio: stockInfo.summaryDetail?.priceToBook?.toString() || "N/A",
      dividendYield: stockInfo.summaryDetail?.dividendYield?.toString() || "N/A",
    };

    console.log("✅ Simplified Stock Info:", simplifiedStockInfo);
    console.log("ℹ️ Note: 'N/A' indicates missing data from Yahoo Finance");

    // Return the response
    return NextResponse.json(simplifiedStockInfo);
  } catch (error) {
    // Log detailed error
    console.error("❌ API Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Unable to fetch stock info" }, { status: 500 });
  }
}

// Optional: Export config if needed (e.g., for larger response bodies)
export const config = {
  api: {
    bodyParser: false, // Not needed for GET requests, but included for completeness
  },
};