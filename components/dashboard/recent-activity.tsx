import { Button } from "@/components/ui/button"

export function RecentActivity() {
  const activities = [
    {
      title: "Dividend Received",
      description: "HDFC Bank Ltd. paid a dividend of ₹500",
      date: "Today, 10:30 AM",
      type: "credit",
    },
    {
      title: "Investment Made",
      description: "Invested ₹10,000 in SBI Blue Chip Fund",
      date: "Yesterday, 2:15 PM",
      type: "debit",
    },
    {
      title: "Goal Achieved",
      description: "Reached your emergency fund target of ₹50,000",
      date: "2 days ago",
      type: "achievement",
    },
    {
      title: "Market Alert",
      description: "Nifty 50 increased by 2.5% today",
      date: "3 days ago",
      type: "alert",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.date}</p>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              activity.type === "credit"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : activity.type === "debit"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : activity.type === "achievement"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Activity
      </Button>
    </div>
  )
}

