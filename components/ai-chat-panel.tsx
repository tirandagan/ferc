"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Sparkles, FileText, ExternalLink, ChevronDown, Maximize2, Minimize2 } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
      "Order 2023, issued in July 2023, introduced major reforms to FERC's generator interconnection process:\n\n**Key Changes:**\n\n- **Cluster Study Process**: Shifted from serial first-come, first-served to cluster studies with a first-ready, first-served approach within each cluster\n\n- **Site Control Requirements**: Interconnection customers must demonstrate site control at the time of interconnection request (with limited exceptions)\n\n- **Commercial Readiness Deposits**: Introduced refundable deposits showing financial commitment ($10,000/MW for Phase I, additional amounts for later phases)\n\n- **Affected System Studies**: Reformed processes for analyzing impacts on neighboring transmission systems\n\n- **Transition Mechanisms**: Provided guidance for moving from old processes to new cluster approach\n\nThese reforms aim to reduce the massive backlog of interconnection requests (over 2,000 GW in queues) and speed up renewable energy deployment.",
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
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          const bulletContent = line.replace(/^[•-]\s*/, "")
          return (
            <div key={i} className="flex gap-2 my-1 ml-2">
              <span className="text-primary">•</span>
              <span>{renderMarkdown(bulletContent)}</span>
            </div>
          )
        }
        if (/^\d+\.\s/.test(line.trim())) {
          return (
            <div key={i} className="my-1">
              {renderMarkdown(line)}
            </div>
          )
        }
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
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

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

  const panelWidth = isExpanded ? "w-[600px]" : "w-[420px]"

  return (
    <TooltipProvider>
      <>
        <div
          className={`fixed right-0 top-0 h-full ${panelWidth} bg-card border-l shadow-2xl flex flex-col z-20 overflow-hidden transition-all duration-300`}
        >
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/15">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Research Assistant</h3>
                <p className="text-xs text-muted-foreground">Powered by RAG</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isExpanded ? "Collapse" : "Expand"}</TooltipContent>
              </Tooltip>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 h-0" ref={scrollRef}>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] ${
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
                        className="h-auto py-1.5 px-3 text-xs text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => toggleSources(index)}
                      >
                        <FileText className="w-3 h-3 mr-1.5" />
                        {message.sources.length} source document{message.sources.length > 1 ? "s" : ""}
                        <ChevronDown
                          className={`w-3 h-3 ml-1 transition-transform ${expandedSources.includes(index) ? "rotate-180" : ""}`}
                        />
                      </Button>

                      {expandedSources.includes(index) && (
                        <div className="space-y-2">
                          {message.sources.map((source, i) => (
                            <div
                              key={i}
                              className="bg-background border rounded-xl p-3 space-y-2 hover:border-primary/30 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="outline" className="text-xs font-mono bg-primary/5">
                                      {source.docket}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{source.date}</span>
                                  </div>
                                  <p className="text-xs font-medium mt-1.5 text-foreground">{source.title}</p>
                                </div>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 flex-shrink-0 hover:bg-primary/10"
                                      onClick={() => openPDFViewer(source)}
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Document</TooltipContent>
                                </Tooltip>
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
                    <div className="ml-10 space-y-1.5">
                      <p className="text-xs text-muted-foreground">Suggested follow-ups:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {message.suggestions.map((suggestion, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5 px-3 text-xs bg-transparent hover:bg-primary/5 hover:border-primary/30"
                            onClick={() => setInput(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/30 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about FERC documents..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-background"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are generated from indexed FERC documents
            </p>
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
    </TooltipProvider>
  )
}
