"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles, Filter, Calendar, FileText, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchResults from "./search-results"
import AIChatPanel from "./ai-chat-panel"
import FilterPanel from "./filter-panel"

export default function SearchInterface() {
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
  }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${showAIChat ? "mr-[400px]" : ""}`}>
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">FERC eLibrary</h1>
                  <p className="text-xs text-muted-foreground">Federal Energy Regulatory Commission</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAIChat(!showAIChat)} className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </Button>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">Search Regulatory Documents</h2>
              <p className="text-lg text-muted-foreground text-balance">
                Find filings, dockets, and reports with AI-powered search
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by docket number, filing date, description, or ask a question..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl shadow-lg border-2 focus-visible:ring-2"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>

                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => setQuery("ER11-4046")}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Docket ER11-4046
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => setQuery("Report Form Gas Producer")}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Gas Producer Reports
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => setQuery("filed:last-30-days")}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Last 30 Days
                  </Badge>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-b bg-muted/30">
            <FilterPanel activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
          </div>
        )}

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchResults />
        </div>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && <AIChatPanel onClose={() => setShowAIChat(false)} />}
    </div>
  )
}
