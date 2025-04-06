import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

const stocksToFetch = [
  { name: "Reliance Industries", symbol: "RELIANCE.NS" },
  { name: "HDFC Bank", symbol: "HDFCBANK.NS" },
  { name: "Infosys", symbol: "INFY.NS" },
  { name: "Tata Consultancy Services", symbol: "TCS.NS" },
  { name: "Bharti Airtel", symbol: "BHARTIARTL.NS" },
  { name: "State Bank of India", symbol: "SBIN.NS" },
  { name: "ICICI Bank", symbol: "ICICIBANK.NS" },
  { name: "Hindustan Unilever", symbol: "HINDUNILVR.NS" },
  { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK.NS" },
  { name: "Larsen & Toubro", symbol: "LT.NS" },
  { name: "Asian Paints", symbol: "ASIANPAINT.NS" },
  { name: "Axis Bank", symbol: "AXISBANK.NS" },
  { name: "Maruti Suzuki India", symbol: "MARUTI.NS" },
  { name: "Tata Motors", symbol: "TATAMOTORS.NS" },
  { name: "Bajaj Finance", symbol: "BAJFINANCE.NS" },
  { name: "HCL Technologies", symbol: "HCLTECH.NS" },
  { name: "Tata Steel", symbol: "TATASTEEL.NS" },
  { name: "Mahindra & Mahindra", symbol: "M&M.NS" },
  { name: "Wipro", symbol: "WIPRO.NS" },
  { name: "Tech Mahindra", symbol: "TECHM.NS" },
  { name: "Adani Enterprises", symbol: "ADANIENT.NS" },
  { name: "UltraTech Cement", symbol: "ULTRACEMCO.NS" },
  { name: "Nestle India", symbol: "NESTLEIND.NS" },
  { name: "SBI Life Insurance", symbol: "SBILIFE.NS" },
  { name: "Grasim Industries", symbol: "GRASIM.NS" },
  { name: "IndusInd Bank", symbol: "INDUSINDBK.NS" },
  { name: "Dr. Reddy's Laboratories", symbol: "DRREDDY.NS" },
  { name: "Cipla", symbol: "CIPLA.NS" },
  { name: "Titan Company", symbol: "TITAN.NS" },
  { name: "Bharat Petroleum", symbol: "BPCL.NS" },
];

export async function GET() {
  try {
    const stockData = await Promise.all(
      stocksToFetch.map(async (stock) => {
        try {
          const result = await yahooFinance.quoteSummary(stock.symbol, { modules: ["price"] });

          return {
            name: stock.name,
            symbol: stock.symbol,
            price: result.price.regularMarketPrice.toFixed(2),
            change: result.price.regularMarketChange.toFixed(2),
            percentChange: `${result.price.regularMarketChangePercent.toFixed(2)}%`,
            isPositive: result.price.regularMarketChange >= 0,
          };
        } catch (err) {
          console.error(`Error fetching data for ${stock.name}:`, err);
          return { name: stock.name, symbol: stock.symbol, error: "Failed to fetch" };
        }
      })
    );

    return NextResponse.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
