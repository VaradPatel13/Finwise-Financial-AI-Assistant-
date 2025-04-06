"use client"; // Ensure it's a client component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketOverview } from "@/components/market/market-overview";
import { StockList } from "@/components/market/stock-list";
import { MarketNews } from "@/components/market/market-news";
import { MutualFundList } from "@/components/market/mutual-fund-list";

export default function MarketPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Market Insights</h1>
      <p className="text-muted-foreground">
        Stay updated with the latest market trends, stock prices, and financial news.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>Key market indices and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <MarketOverview />
        </CardContent>
      </Card>

      <Tabs defaultValue="stocks" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Stocks</CardTitle>
              <CardDescription>Stocks with the highest gains in the market</CardDescription>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mutual-funds" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Mutual Funds</CardTitle>
              <CardDescription>Best performing mutual funds based on returns</CardDescription>
            </CardHeader>
            <CardContent>
              <MutualFundList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="news" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Financial News</CardTitle>
              <CardDescription>Recent updates and developments in the financial world</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketNews />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
