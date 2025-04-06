import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { BookOpen, Clock, Video } from "lucide-react"

interface Resource {
  title: string
  description: string
  type: string
  duration: string
  image: string
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="h-4 w-4" />
      case "article":
      case "guide":
      case "course":
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={resource.image || "/placeholder.svg"}
          alt={resource.title}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            {getIcon(resource.type)}
            <span className="ml-1">{resource.type}</span>
          </div>
          <div className="inline-flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {resource.duration}
          </div>
        </div>
        <h3 className="font-semibold">{resource.title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="outline" className="w-full">
          View Resource
        </Button>
      </CardFooter>
    </Card>
  )
}

