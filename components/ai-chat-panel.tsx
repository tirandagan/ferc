"use client"

import { useState } from "react"
import { X, Send, Sparkles, FileText, Calendar, Building, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import PDFViewerModal from "./pdf-viewer-modal"

interface DocumentSource {
  docket: string
  title: string
  date: string
  excerpt: string
  highlights?: Array<{
    page: number
    text: string
    context: string
  }>
}

interface Message {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
  sources?: DocumentSource[]
}

interface AIChatPanelProps {
  onClose: () => void
}

const DEMO_CONVERSATION: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm your FERC eLibrary AI assistant. I can help you find documents, understand filings, and answer questions about regulatory documents using advanced search. What can I help you with?",
    suggestions: [
      "What are the renewable energy interconnection requirements?",
      "Explain the rate increase justification in docket ER11-4046",
      "What settlements were approved in recent gas pipeline cases?",
    ],
  },
  {
    role: "user",
    content: "What are the renewable energy interconnection requirements?",
  },
  {
    role: "assistant",
    content:
      "Based on recent FERC documents, renewable energy interconnection requirements include several key components:\n\n1. **Interconnection Studies**: Generators must complete feasibility, system impact, and facilities studies to assess grid impacts and necessary upgrades.\n\n2. **Technical Standards**: Projects must meet IEEE 1547 standards for distributed energy resources and comply with regional reliability standards.\n\n3. **Queue Management**: FERC Order 2023 reformed the generator interconnection queue process, requiring reasonable readiness deposits and implementing a first-ready, first-served cluster study approach.\n\n4. **Cost Allocation**: Interconnection customers are responsible for direct assignment facilities, while network upgrade costs may be shared based on regional tariffs.\n\nWould you like more details on any specific aspect?",
    sources: [
      {
        docket: "RM22-14-000",
        title: "Order No. 2023 - Improvements to Generator Interconnection Procedures and Agreements",
        date: "07/28/2023",
        excerpt:
          "...requiring site control and commercial readiness demonstrations, implementing a first-ready, first-served cluster study approach...",
        highlights: [
          {
            page: 1,
            text: "Requiring site control and commercial readiness demonstrations",
            context:
              "The Commission adopts the following requirements for generator interconnection: requiring site control and commercial readiness demonstrations, implementing a first-ready, first-served cluster study approach...",
          },
          {
            page: 1,
            text: "Commercial readiness deposits of $10,000 per MW",
            context:
              "To further demonstrate project viability, the Commission establishes commercial readiness deposits of $10,000 per MW for Phase I studies and additional amounts for later phases...",
          },
          {
            page: 1,
            text: "IEEE 1547 standards for distributed energy resources",
            context:
              "All interconnecting generators must comply with applicable technical standards, including IEEE 1547 standards for distributed energy resources and regional reliability standards...",
          },
        ],
      },
      {
        docket: "AD21-9-000",
        title: "Supplemental Notice of Technical Conference - Interconnection Process Reform",
        date: "04/15/2022",
        excerpt:
          "...address the backlog of generation interconnection requests and improve the interconnection process for renewable energy resources...",
        highlights: [
          {
            page: 1,
            text: "Address the backlog of generation interconnection requests",
            context:
              "The Commission seeks to address the backlog of generation interconnection requests and improve the interconnection process for renewable energy resources through comprehensive reforms...",
          },
        ],
      },
      {
        docket: "ER20-1960-000",
        title: "PJM Interconnection Agreement - Technical Requirements",
        date: "09/12/2020",
        excerpt:
          "...renewable generators must meet IEEE 1547 standards and provide voltage and frequency ride-through capabilities...",
        highlights: [
          {
            page: 1,
            text: "Voltage and frequency ride-through capabilities",
            context:
              "Renewable generators must meet IEEE 1547 standards and provide voltage and frequency ride-through capabilities to ensure grid stability during disturbances...",
          },
        ],
      },
    ],
    suggestions: [
      "What is the timeline for interconnection studies?",
      "Tell me about cost allocation for network upgrades",
      "What changed in Order 2023?",
    ],
  },
  {
    role: "user",
    content: "What changed in Order 2023?",
  },
  {
    role: "assistant",
    content:
      "Order 2023, issued in July 2023, introduced major reforms to FERC's generator interconnection process:\n\n**Key Changes:**\n\n• **Cluster Study Process**: Shifted from serial first-come, first-served to cluster studies with a first-ready, first-served approach within each cluster\n\n• **Site Control Requirements**: Interconnection customers must demonstrate site control at the time of interconnection request (with limited exceptions)\n\n• **Commercial Readiness Deposits**: Introduced refundable deposits showing financial commitment ($10,000/MW for Phase I, additional amounts for later phases)\n\n• **Affected System Studies**: Reformed processes for analyzing impacts on neighboring transmission systems\n\n• **Transition Mechanisms**: Provided guidance for moving from old processes to new cluster approach\n\nThese reforms aim to reduce the massive backlog of interconnection requests (over 2,000 GW in queues) and speed up renewable energy deployment.",
    sources: [
      {
        docket: "RM22-14-000",
        title: "Order No. 2023 - Final Rule",
        date: "07/28/2023",
        excerpt:
          "...adopts a first-ready, first-served cluster study process to replace the current first-come, first-served serial study process...",
        highlights: [
          {
            page: 1,
            text: "First-ready, first-served cluster study process",
            context:
              "The Commission adopts a first-ready, first-served cluster study process to replace the current first-come, first-served serial study process, ensuring viable projects advance efficiently...",
          },
          {
            page: 1,
            text: "Projects on federal lands or where state permitting prevents early site control",
            context:
              "Interconnection customers must demonstrate site control, with limited exceptions for projects on federal lands or where state or local permitting requirements prevent early site control...",
          },
        ],
      },
      {
        docket: "RM22-14-000",
        title: "Order No. 2023 - Section III Commercial Readiness Requirements",
        date: "07/28/2023",
        excerpt:
          "...commercial readiness deposits of $10,000 per MW for Phase I studies and additional amounts for later phases to demonstrate project viability...",
        highlights: [
          {
            page: 1,
            text: "Commercial readiness deposits structure",
            context:
              "The deposit structure is designed to be meaningful enough to ensure project commitment while not creating an unreasonable barrier to entry for smaller projects or developers...",
          },
        ],
      },
    ],
    suggestions: [
      "How do the commercial readiness deposits work?",
      "What are the site control requirements?",
      "Show me recent interconnection approvals",
    ],
  },
]

function MarkdownText({ content }: { content: string }) {
  const renderMarkdown = (text: string) => {
    const parts = []
    let currentIndex = 0

    // Match bold text **xxx**
    const boldRegex = /\*\*(.+?)\*\*/g
    let match

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index))
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>)
      currentIndex = match.index + match[0].length
    }

    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="text-sm leading-relaxed whitespace-pre-line">
      {content.split("\n").map((line, i) => {
        // Handle bullet points
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          const bulletContent = line.replace(/^[•-]\s*/, "")
          return (
            <div key={i} className="flex gap-2 my-1">
              <span>•</span>
              <span>{renderMarkdown(bulletContent)}</span>
            </div>
          )
        }
        // Handle numbered lists
        if (/^\d+\.\s/.test(line.trim())) {
          return (
            <div key={i} className="my-1">
              {renderMarkdown(line)}
            </div>
          )
        }
        // Regular line
        return <div key={i}>{renderMarkdown(line)}</div>
      })}
    </div>
  )
}

export default function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(DEMO_CONVERSATION)
  const [input, setInput] = useState("")
  const [expandedSources, setExpandedSources] = useState<number[]>([])
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<DocumentSource | null>(null)

  const toggleSources = (messageIndex: number) => {
    setExpandedSources((prev) =>
      prev.includes(messageIndex) ? prev.filter((i) => i !== messageIndex) : [...prev, messageIndex],
    )
  }

  const openPDFViewer = (document: DocumentSource) => {
    setSelectedDocument(document)
    setPdfViewerOpen(true)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const newUserMessage: Message = { role: "user", content: input }
    const newAssistantMessage: Message = {
      role: "assistant",
      content: `I'm searching through FERC documents for information about "${input}". In a production version, this would query the vector database of document chunks and generate an answer with relevant citations.`,
      sources: [
        {
          docket: "Sample-000",
          title: "Sample Document (RAG System Not Connected)",
          date: "11/22/2025",
          excerpt:
            "This is a demo showing how document sources would appear when the RAG system is connected to the vector database...",
          highlights: [
            {
              page: 1,
              text: "Sample highlighted text",
              context: "This demonstrates how relevant text excerpts would be highlighted in the actual document...",
            },
          ],
        },
      ],
      suggestions: ["Show me more details", "What are the key requirements?", "Find related documents"],
    }

    setMessages([...messages, newUserMessage, newAssistantMessage])
    setInput("")
  }

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-[400px] bg-card border-l shadow-2xl flex flex-col z-20 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-primary/5 flex-shrink-0">
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
        <ScrollArea className="flex-1 h-0 p-4">
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
                    className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <MarkdownText content={message.content} />
                  </div>
                </div>

                {message.sources && message.sources.length > 0 && (
                  <div className="ml-10 space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto py-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => toggleSources(index)}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {message.sources.length} source document{message.sources.length > 1 ? "s" : ""}
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform ${expandedSources.includes(index) ? "rotate-180" : ""}`}
                      />
                    </Button>

                    {expandedSources.includes(index) && (
                      <div className="space-y-2">
                        {message.sources.map((source, i) => (
                          <div key={i} className="bg-background border rounded-lg p-3 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {source.docket}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{source.date}</span>
                                </div>
                                <p className="text-xs font-medium mt-1 text-pretty">{source.title}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 flex-shrink-0"
                                onClick={() => openPDFViewer(source)}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2">
                              {source.excerpt}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {message.suggestions && (
                  <div className="ml-10 space-y-2">
                    <p className="text-xs text-muted-foreground">Suggested follow-ups:</p>
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
        <div className="p-3 border-t bg-muted/30 flex-shrink-0">
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
        <div className="p-4 border-t flex-shrink-0">
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

      {selectedDocument && (
        <PDFViewerModal
          isOpen={pdfViewerOpen}
          onClose={() => setPdfViewerOpen(false)}
          document={selectedDocument}
          highlights={
            selectedDocument.highlights || [
              {
                page: 1,
                text: "Sample highlighted text from this document",
                context: "This shows where the AI found relevant information to answer your question...",
              },
            ]
          }
        />
      )}
    </>
  )
}
