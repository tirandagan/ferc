"use client"

import { useState } from "react"
import { X, Send, Sparkles, FileText, Calendar, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
}

interface AIChatPanelProps {
  onClose: () => void
}

export default function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your FERC eLibrary AI assistant. I can help you find documents, understand filings, and answer questions about regulatory documents. What can I help you with?",
      suggestions: [
        "Find all filings for docket ER11-4046",
        "Show me recent gas producer reports",
        "What are the latest rate case filings?",
      ],
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content: `I found several relevant documents related to "${input}". Here's what I can tell you...`,
      },
    ])
    setInput("")
  }

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-card border-l shadow-2xl flex flex-col z-20">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by RAG</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>

              {message.suggestions && (
                <div className="ml-10 space-y-2">
                  <p className="text-xs text-muted-foreground">Suggested queries:</p>
                  {message.suggestions.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 px-3 bg-transparent"
                      onClick={() => setInput(suggestion)}
                    >
                      <span className="text-xs text-pretty">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground mb-2 px-1">Quick actions:</p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-2 gap-1 bg-transparent"
            onClick={() => setInput("Find recent filings")}
          >
            <FileText className="w-4 h-4" />
            <span className="text-xs">Filings</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-2 gap-1 bg-transparent"
            onClick={() => setInput("Show me dockets")}
          >
            <Building className="w-4 h-4" />
            <span className="text-xs">Dockets</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-2 gap-1 bg-transparent"
            onClick={() => setInput("Last 30 days")}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Recent</span>
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about documents..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
