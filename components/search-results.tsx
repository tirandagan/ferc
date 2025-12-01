"use client"

import { FileText, Download, Eye, Calendar, Building, Grid3X3, List, Star, Map, Languages } from "@/components/icons"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import PDFViewerModal from "@/components/pdf-viewer-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockResults = [
  {
    id: "20251124-5033",
    category: "Submittal",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "GP04-1-000",
    description: "Report / Form of Test under GP04-1-000.",
    classType: "Report/Form | Gas Producer Report",
    securityLevel: "Public",
    fileSize: "5 MB",
    relevanceScore: 98,
    hasGeospatial: false,
  },
  {
    id: "20251124-5032",
    category: "Submittal",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "CP24-1234-000",
    description: "New Jersey Expansion Project - Environmental Assessment",
    classType: "Environmental | Pipeline Certificate",
    securityLevel: "Public",
    fileSize: "45 MB",
    relevanceScore: 95,
    hasGeospatial: true,
  },
  {
    id: "20251124-5030",
    category: "Submittal",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "GP04-1-000",
    description: "Report / Form of Test under GP04-1-000.",
    classType: "Report/Form | Gas Producer Report",
    securityLevel: "Public",
    fileSize: "5 MB",
    relevanceScore: 92,
    hasGeospatial: false,
  },
  {
    id: "20251122-4000",
    category: "Issuance",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "ER24-5678-000",
    description: "Order Accepting Tariff Revisions for Reactive Power Compensation",
    classType: "Order | Rate Filing",
    securityLevel: "Public",
    fileSize: "3 MB",
    relevanceScore: 88,
    hasGeospatial: false,
  },
  {
    id: "20251122-3000",
    category: "Issuance",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "GP04-1-000",
    description: "PW GPOS Production Test",
    classType: "ALJ Issuance | Initial Decision",
    securityLevel: "Public",
    fileSize: "10 MB",
    relevanceScore: 85,
    hasGeospatial: false,
  },
]

interface SearchResultsProps {
  onOpenPlainEnglish?: () => void
  onOpenGeospatial?: () => void
}

export default function SearchResults({ onOpenPlainEnglish, onOpenGeospatial }: SearchResultsProps) {
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string
    docket: string
    description: string
    filedDate: string
  } | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const handleViewPDF = (result: (typeof mockResults)[0]) => {
    setSelectedDocument({
      id: result.id,
      docket: result.docket,
      description: result.description,
      filedDate: result.filedDate,
    })
  }

  const handleClosePDF = () => {
    setSelectedDocument(null)
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Search Results</h3>
            <p className="text-sm text-muted-foreground">Showing 1-100 of 14,312 documents</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>

            <Select defaultValue="date-newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-newest">Date (Newest)</SelectItem>
                <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
          {mockResults.map((result) => (
            <Card key={result.id} className="p-4 hover:shadow-md transition-all hover:border-primary/20 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2 min-w-0">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm">{result.id}</h4>
                        <Badge variant={result.category === "Issuance" ? "default" : "outline"} className="text-xs">
                          {result.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {result.securityLevel}
                        </Badge>
                        {result.hasGeospatial && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <Map className="w-3 h-3 mr-1" />
                            Map Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">{result.description}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap pl-11">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span className="font-mono">{result.docket}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{result.filedDate}</span>
                    </div>
                    <span className="text-muted-foreground/60">{result.classType}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Save to favorites</TooltipContent>
                  </Tooltip>

                  {result.category === "Issuance" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600"
                          onClick={onOpenPlainEnglish}
                        >
                          <Languages className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Translate to Plain English</TooltipContent>
                    </Tooltip>
                  )}

                  {result.hasGeospatial && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-green-600"
                          onClick={onOpenGeospatial}
                        >
                          <Map className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View Project Map</TooltipContent>
                    </Tooltip>
                  )}

                  <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                    <Eye className="w-3 h-3" />
                    Preview
                  </Button>
                  <Button size="sm" variant="default" className="gap-1.5 text-xs" onClick={() => handleViewPDF(result)}>
                    <Download className="w-3 h-3" />
                    PDF
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">Page 1 of 144</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">144</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* PDF viewer modal */}
        {selectedDocument && (
          <PDFViewerModal
            isOpen={true}
            onClose={handleClosePDF}
            document={{
              docket: selectedDocument.docket,
              title: selectedDocument.description,
              date: selectedDocument.filedDate,
            }}
            highlights={[
              {
                page: 1,
                text: "Site control and commercial readiness demonstrations required",
                context:
                  "...requiring site control and commercial readiness demonstrations, implementing a first-ready, first-served cluster study approach...",
              },
            ]}
          />
        )}
      </div>
    </TooltipProvider>
  )
}
