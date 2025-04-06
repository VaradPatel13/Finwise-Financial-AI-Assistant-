import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your AI-Powered Financial Assistant
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                FinWise simplifies financial decision-making with personalized guidance, real-time insights, and
                educational resources to help you invest smarter.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-950 dark:to-teal-950 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold">FinWise Assistant</div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">How should I start investing with a small budget?</p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg max-w-[80%] ml-auto">
                        <p className="text-sm">
                          For beginners with a small budget, I recommend starting with index funds or ETFs. They offer
                          diversification with low minimum investments. Would you like me to explain more about these
                          options?
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                        <p className="text-sm text-gray-400">Ask me anything about investing...</p>
                      </div>
                      <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

