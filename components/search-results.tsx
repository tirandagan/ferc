"use client"

import { FileText, Download, Eye, Calendar, Building } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import PDFViewerModal from "@/components/pdf-viewer-modal"

// Mock data based on the screenshot
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
  },
  {
    id: "20251124-5032",
    category: "Submittal",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "GP04-1-000",
    description: "Report / Form of Test under GP04-1-000.",
    classType: "Report/Form | Gas Producer Report",
    securityLevel: "Public",
    fileSize: "5 MB",
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
  },
  {
    id: "20251122-4000",
    category: "Issuance",
    filedDate: "11/22/2025",
    documentDate: "11/22/2025",
    docket: "GP04-1-000",
    description: "OE Production Test",
    classType: "Agreement/Understanding/MOU/Memoranda of Understanding",
    securityLevel: "Public",
    fileSize: "3 MB",
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
  },
]

export default function SearchResults() {
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string
    docket: string
    description: string
    filedDate: string
  } | null>(null)

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
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">Search Results</h3>
          <p className="text-sm text-muted-foreground mt-1">Showing 1-100 of 14,312 documents</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded-md px-3 py-1.5 bg-background">
            <option>Date Filed (Newest)</option>
            <option>Date Filed (Oldest)</option>
            <option>Relevance</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4">
        {mockResults.map((result) => (
          <Card key={result.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{result.id}</h4>
                      <Badge variant="outline" className="text-xs">
                        {result.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {result.securityLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{result.description}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    <span>Docket: {result.docket}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Filed: {result.filedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>{result.classType}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button size="sm" variant="default" className="gap-2" onClick={() => handleViewPDF(result)}>
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">Page 1 of 144</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
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
  )
}
