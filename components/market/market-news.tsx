"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarIcon, ExternalLink } from "lucide-react";

export function MarketNews() {
  const [news, setNews] = useState<any[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=Indian stock market OR Sensex OR Nifty OR BSE&apiKey=e22a600c6d5b40e6a038bc54649c959e`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="space-y-4">
      {news.length === 0 ? (
        <p className="text-center text-white">Loading news...</p>
      ) : (
        news.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.source.name}
                </span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {new Date(item.publishedAt).toLocaleString()}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="link" className="p-0 h-auto" asChild>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Read more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
      <div className="flex justify-center mt-4">
        <Button variant="outline">View All News</Button>
      </div>
    </div>
  );
}
