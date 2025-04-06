"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Expanded investment options with risk levels and average returns
const investments = [
  { name: "Stocks", description: "Invest in top market stocks.", minAmount: 1000, risk: "Higher", return: 10, tooltip: "Equity in companies, volatile but high potential returns." },
  { name: "Mutual Funds", description: "Diversified portfolio for steady growth.", minAmount: 5000, risk: "Moderate", return: 8, tooltip: "Pooled funds managed by professionals." },
  { name: "Crypto", description: "High-risk, high-reward digital assets.", minAmount: 2000, risk: "Highest", return: 20, tooltip: "Decentralized digital currencies like Bitcoin." },
  { name: "Bonds", description: "Low-risk debt securities issued by governments or corporations.", minAmount: 1000, risk: "Low to Moderate", return: 5, tooltip: "Fixed-income securities with regular interest." },
  { name: "ETFs", description: "Exchange-traded funds tracking indices or sectors.", minAmount: 1, risk: "Moderate", return: 7, tooltip: "Diversified funds traded like stocks." },
  { name: "REITs", description: "Real Estate Investment Trusts for property investments.", minAmount: 500, risk: "Highest", return: 9, tooltip: "Income from real estate without owning property." },
  { name: "Commodities", description: "Raw materials like gold or oil for hedging.", minAmount: 1, risk: "Highest", return: 6, tooltip: "Physical goods traded via futures or ETFs." },
];

export default function InvestmentPage() {
  const [amount, setAmount] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [portfolio, setPortfolio] = useState([]); // Portfolio tracking
  const [filterRisk, setFilterRisk] = useState("All"); // Risk filter

  // Handle investment selection
  const handleInvest = (investment) => {
    setSelectedInvestment(investment);
    setAmount(""); // Reset amount when selecting a new investment
  };

  // Confirm investment and add to portfolio
  const confirmInvestment = () => {
    if (amount >= selectedInvestment.minAmount) {
      const newInvestment = {
        name: selectedInvestment.name,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };
      setPortfolio([...portfolio, newInvestment]);
      setSelectedInvestment(null); // Reset after confirmation
      setAmount("");
      alert(`Successfully invested $${amount} in ${selectedInvestment.name}!`);
    }
  };

  // Filter investments by risk level
  const filteredInvestments = filterRisk === "All"
    ? investments
    : investments.filter((inv) => inv.risk === filterRisk);

  // Calculate total portfolio value (simple sum for demo)
  const totalPortfolioValue = portfolio.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Investment Opportunities</h1>

      {/* Risk Filter */}
      <div className="mb-4">
        <label className="mr-2 text-gray-300">Filter by Risk Level:</label>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="p-2 bg-gray-800 rounded text-white"
        >
          <option value="All">All</option>
          <option value="Low to Moderate">Low to Moderate</option>
          <option value="Moderate">Moderate</option>
          <option value="Higher">Higher</option>
          <option value="Highest">Highest</option>
        </select>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredInvestments.map((inv) => (
          <Card key={inv.name} className="bg-gray-800 p-4 rounded-xl relative">
            <CardContent>
              <h2 className="text-xl font-semibold">{inv.name}</h2>
              <p className="text-gray-400 text-sm mb-2">{inv.description}</p>
              <p className="text-gray-300 text-sm">Min Investment: ${inv.minAmount}</p>
              <p className="text-gray-300 text-sm">Risk: {inv.risk}</p>
              <p className="text-gray-300 text-sm">Avg Return: {inv.return}%</p>
              {/* Tooltip (simplified as hover text) */}
              <p className="text-gray-500 text-xs italic mt-1" title={inv.tooltip}>
                Hover for info
              </p>
              {/* Placeholder for Chart */}
              <div className="mt-2 p-2 bg-gray-700 rounded text-center text-xs">
                [Chart Placeholder: 5-Year Performance]
              </div>
              <Button
                className="mt-3 w-full bg-green-500 hover:bg-green-600"
                onClick={() => handleInvest(inv)}
              >
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investment Form */}
      {selectedInvestment && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-lg font-semibold">Invest in {selectedInvestment.name}</h2>
          <p className="text-gray-400 mb-2">Minimum Amount: ${selectedInvestment.minAmount}</p>
          <p className="text-gray-400 mb-2">Risk: {selectedInvestment.risk} | Avg Return: {selectedInvestment.return}%</p>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mb-3 p-2 w-full text-black"
          />
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={amount < selectedInvestment.minAmount || !amount}
            onClick={confirmInvestment}
          >
            Confirm Investment
          </Button>
        </div>
      )}

      {/* Portfolio Tracking */}
      {portfolio.length > 0 && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-lg font-semibold">Your Portfolio</h2>
          <p className="text-gray-300">Total Value: ${totalPortfolioValue.toFixed(2)}</p>
          <ul className="mt-2">
            {portfolio.map((inv, index) => (
              <li key={index} className="text-gray-400 text-sm">
                {inv.name}: ${inv.amount} (Invested on {inv.date})
              </li>
            ))}
          </ul>
          {/* Placeholder for Real-Time Data */}
          <div className="mt-2 p-2 bg-gray-700 rounded text-center text-xs">
            [Real-Time Data Placeholder: Market Updates]
          </div>
        </div>
      )}

      {/* Educational Resources */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold">Learn More</h2>
        <p className="text-gray-400 text-sm">
          Explore investment basics at{" "}
          <a
            href="https://www.investopedia.com/articles/basics/11/3-s-simple-investing.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Investopedia
          </a>.
        </p>
      </div>
    </div>
  );
}