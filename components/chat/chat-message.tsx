import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rounded-lg p-3 max-w-[80%]",
          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}

