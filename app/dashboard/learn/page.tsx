import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceCard } from "@/components/learn/resource-card"

export default function LearnPage() {
  const beginnerResources = [
    {
      title: "Introduction to Investing",
      description: "Learn the basics of investing and why it's important for your financial future.",
      type: "Article",
      duration: "10 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Understanding Risk and Return",
      description: "Explore the relationship between risk and return in different investment options.",
      type: "Video",
      duration: "15 min watch",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Building Your First Portfolio",
      description: "Step-by-step guide to creating a diversified investment portfolio.",
      type: "Guide",
      duration: "20 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const intermediateResources = [
    {
      title: "Asset Allocation Strategies",
      description: "Learn how to distribute your investments across different asset classes.",
      type: "Article",
      duration: "15 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Technical Analysis Fundamentals",
      description: "Introduction to reading charts and identifying market trends.",
      type: "Video",
      duration: "25 min watch",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Tax-Efficient Investing",
      description: "Strategies to minimize tax impact on your investment returns.",
      type: "Guide",
      duration: "18 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const advancedResources = [
    {
      title: "Options Trading Strategies",
      description: "Advanced techniques for using options to enhance portfolio returns.",
      type: "Course",
      duration: "5 modules",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Factor Investing",
      description: "Understanding and implementing factor-based investment strategies.",
      type: "Article",
      duration: "20 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Alternative Investments",
      description: "Exploring real estate, private equity, and other alternative asset classes.",
      type: "Guide",
      duration: "25 min read",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Financial Literacy Hub</h1>
      <p className="text-muted-foreground">Enhance your financial knowledge with our curated educational resources.</p>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="beginner" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beginnerResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="intermediate" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {intermediateResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Personalized Learning Path</CardTitle>
          <CardDescription>
            Based on your profile and investment goals, we recommend these resources to enhance your financial
            knowledge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              resource={{
                title: "Retirement Planning Essentials",
                description: "Learn how to plan and save effectively for your retirement.",
                type: "Guide",
                duration: "15 min read",
                image: "/placeholder.svg?height=200&width=300",
              }}
            />
            <ResourceCard
              resource={{
                title: "Understanding Mutual Funds",
                description: "A comprehensive guide to investing in mutual funds in India.",
                type: "Video",
                duration: "20 min watch",
                image: "/placeholder.svg?height=200&width=300",
              }}
            />
            <ResourceCard
              resource={{
                title: "Emergency Fund Strategies",
                description: "How to build and maintain an emergency fund for financial security.",
                type: "Article",
                duration: "10 min read",
                image: "/placeholder.svg?height=200&width=300",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

