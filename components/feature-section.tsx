import { BarChart3, BookOpen, BrainCircuit, Lock, MessageSquare, UserCircle } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "Conversational Financial Guidance",
      description:
        "Get answers to your investment questions through our AI-driven chat interface that provides personalized financial advice.",
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "Personalized Recommendations",
      description: "Receive tailored investment suggestions based on your goals, preferences, and risk tolerance.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "Financial Literacy Hub",
      description:
        "Access curated educational resources to enhance your financial knowledge and make informed decisions.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "Real-Time Market Insights",
      description:
        "Stay updated with the latest market trends, stock prices, and product comparisons through integrated financial data.",
    },
    {
      icon: <UserCircle className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "User Profile Management",
      description:
        "Create and manage your profile, set financial goals, and save preferences for a personalized experience.",
    },
    {
      icon: <Lock className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      title: "Secure Data Handling",
      description:
        "Rest assured that your data and conversations are protected with encryption and secure database management.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-600 dark:text-blue-400">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Empowering Your Financial Journey</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              FinWise combines AI technology with financial expertise to provide a comprehensive platform for your
              investment needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

