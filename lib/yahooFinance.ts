import yahooFinance from "yahoo-finance2";

export const getStockData = async (symbol: string) => {
  try {
    const result = await yahooFinance.quote(symbol);
    return result;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
