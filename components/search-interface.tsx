"use client"

import type React from "react"
import { useState } from "react"
import { Search, Sparkles, Filter, Calendar, FileText, TrendingUp, ArrowRight } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchResults from "./search-results"
import AIChatPanel from "./ai-chat-panel"
import FilterPanel from "./filter-panel"
import Header from "./header"

export default function SearchInterface() {
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)
  }

  const popularSearches = [
    { label: "Interconnection Queue Reform", icon: TrendingUp },
    { label: "Natural Gas Pipeline Rates", icon: FileText },
    { label: "Renewable Energy Credits", icon: FileText },
    { label: "Last 30 Days Filings", icon: Calendar },
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${showAIChat ? "mr-[420px]" : ""}`}
      >
        <Header showAIChat={showAIChat} setShowAIChat={setShowAIChat} />

        <div className="flex-1 overflow-y-auto">
          {/* Search Hero Section */}
          <div className="bg-gradient-to-b from-primary/5 via-primary/3 to-transparent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
                  Search Regulatory Documents
                </h2>
                <p className="text-muted-foreground text-balance">
                  Access over 2 million filings, orders, and regulatory documents
                </p>
              </div>

              {/* Search Tabs */}
              <Tabs defaultValue="keyword" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
                  <TabsTrigger value="keyword">Keyword</TabsTrigger>
                  <TabsTrigger value="docket">Docket</TabsTrigger>
                  <TabsTrigger value="ai" className="gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Search
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="keyword" className="mt-0">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search by keywords, description, or document ID..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 pr-24 py-6 text-base rounded-xl shadow-lg border-2 focus-visible:ring-2 focus-visible:ring-primary/20"
                      />
                      <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                        Search
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="docket" className="mt-0">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter docket number (e.g., ER11-4046, GP04-1-000)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 pr-24 py-6 text-base rounded-xl shadow-lg border-2 focus-visible:ring-2 focus-visible:ring-primary/20"
                      />
                      <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                        Search
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="ai" className="mt-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setShowAIChat(true)
                    }}
                  >
                    <div className="relative">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                      <Input
                        type="text"
                        placeholder="Ask a question about FERC regulations..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 pr-32 py-6 text-base rounded-xl shadow-lg border-2 border-primary/20 focus-visible:ring-2 focus-visible:ring-primary/20"
                      />
                      <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 gap-2" size="sm">
                        Ask AI
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Filter Toggle and Popular Searches */}
              <div className="flex items-center justify-between gap-4 mt-4 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>

                <div className="flex gap-2 flex-wrap">
                  {popularSearches.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => setQuery(item.label)}
                    >
                      <item.icon className="w-3 h-3 mr-1" />
                      {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-b bg-muted/30">
              <FilterPanel activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
          )}

          {/* Results Section */}
          {hasSearched && (
            <div className="bg-muted/20">
              <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <SearchResults />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && <AIChatPanel onClose={() => setShowAIChat(false)} />}
    </div>
  )
}
