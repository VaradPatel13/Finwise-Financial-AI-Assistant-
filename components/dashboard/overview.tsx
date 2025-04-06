"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    value: 12000,
  },
  {
    name: "Feb",
    value: 15000,
  },
  {
    name: "Mar",
    value: 14000,
  },
  {
    name: "Apr",
    value: 16500,
  },
  {
    name: "May",
    value: 18000,
  },
  {
    name: "Jun",
    value: 17500,
  },
]

export function Overview() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip formatter={(value: number) => [`₹${value}`, "Portfolio Value"]} cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

