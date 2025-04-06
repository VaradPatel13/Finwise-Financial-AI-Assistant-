// app/stock/[symbol]/chart/page.tsx
import StockChartPage from '@/components/market/StockChartPage';

interface StockChartPageProps {
  params: {
    symbol: string;
  };
}

export default async function StockChart({ params }: StockChartPageProps) {
  const { symbol } = params;

  try {
    const response = await fetch(`http://localhost:3000/api/stock/${symbol}/chart`);
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    const chartData = await response.json();

    // Generate timestamp on the server
    const lastUpdated = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    return <StockChartPage symbol={symbol} chartData={chartData} lastUpdated={lastUpdated} />;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return <StockChartPage symbol={symbol} chartData={[]} lastUpdated="N/A" />;
  }
}