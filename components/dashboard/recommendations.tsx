import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Recommendations() {
  const recommendations = [
    {
      title: "HDFC Bank Ltd.",
      type: "Stock",
      description: "Leading private sector bank with strong growth potential",
      action: "Buy",
    },
    {
      title: "SBI Blue Chip Fund",
      type: "Mutual Fund",
      description: "Large-cap fund with consistent performance",
      action: "Invest",
    },
    {
      title: "Nifty 50 ETF",
      type: "ETF",
      description: "Track the performance of India's top 50 companies",
      action: "Invest",
    },
  ]

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <div key={index} className="flex flex-col space-y-2 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{recommendation.title}</h4>
              <p className="text-sm text-muted-foreground">{recommendation.type}</p>
            </div>
            <Button size="sm" variant="outline">
              {recommendation.action}
            </Button>
          </div>
          <p className="text-sm">{recommendation.description}</p>
          <Button variant="link" size="sm" className="px-0 py-0 h-auto w-fit">
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}

