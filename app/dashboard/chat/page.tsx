"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ChatPage() {
  const openChatWindow = () => {
    window.open("https://app.inciteai.com/chat", "_blank")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Insight AI</h1>
        <Card className="border-0 shadow-none">
          <div className="p-4">
            <Button onClick={openChatWindow}>Open Insight AI Chat</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
