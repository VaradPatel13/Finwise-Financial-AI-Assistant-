import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  
  // In production, replace this with actual market data API call
  const mockData = {
    time: new Date().toISOString(),
    open: 1500 + Math.random() * 20,
    high: 1510 + Math.random() * 10,
    low: 1495 + Math.random() * 10,
    close: 1505 + Math.random() * 10,
    volume: 10000 + Math.random() * 5000
  };

  res.status(200).json([mockData]);
}