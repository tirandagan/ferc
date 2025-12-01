"use client"

import { useState } from "react"
import { X, Table, Download, BarChart3, FileText } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataScoutPanelProps {
  isOpen: boolean
  onClose: () => void
}

// Mock synthesized data
const mockROEData = [
  {
    company: "National Grid USA",
    docket: "ER24-1234-000",
    filedDate: "03/15/2024",
    proposedROE: "10.57%",
    currentROE: "10.02%",
    status: "Pending",
  },
  {
    company: "Eversource Energy",
    docket: "ER24-2345-000",
    filedDate: "04/22/2024",
    proposedROE: "10.90%",
    currentROE: "10.57%",
    status: "Approved",
  },
  {
    company: "Avangrid Networks",
    docket: "ER24-3456-000",
    filedDate: "05/10/2024",
    proposedROE: "10.25%",
    currentROE: "9.85%",
    status: "Pending",
  },
  {
    company: "Central Maine Power",
    docket: "ER24-4567-000",
    filedDate: "06/01/2024",
    proposedROE: "10.75%",
    currentROE: "10.12%",
    status: "Under Review",
  },
  {
    company: "NSTAR Electric",
    docket: "ER24-5678-000",
    filedDate: "07/18/2024",
    proposedROE: "10.40%",
    currentROE: "9.95%",
    status: "Pending",
  },
]

export default function DataScoutPanel({ isOpen, onClose }: DataScoutPanelProps) {
  const [query, setQuery] = useState("Return on Equity for ISO-NE transmission owners in 2024")
  const [isSearching, setIsSearching] = useState(false)
  const [hasResults, setHasResults] = useState(true)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setHasResults(true)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="fixed inset-4 translate-x-0 translate-y-0 top-4 left-4 right-4 bottom-4 max-w-none w-auto h-auto p-0 flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Table className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Cross-Docket Data Scout</DialogTitle>
                <Badge variant="secondary" className="text-xs">
                  AI-Powered
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Extract and synthesize data from tables across multiple filings
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-6">
          {/* Query Input */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">What data would you like to extract?</label>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Compare O&M costs for natural gas pipelines filed in 2023"
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "Searching..." : "Extract Data"}
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => setQuery("ROE proposals for transmission owners 2024")}
              >
                ROE Proposals
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => setQuery("O&M costs for interstate pipelines 2023")}
              >
                O&M Costs
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => setQuery("Depreciation rates for hydroelectric facilities")}
              >
                Depreciation Rates
              </Badge>
            </div>
          </div>

          {hasResults && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Synthesized Results</h3>
                  <p className="text-sm text-muted-foreground">Extracted from 12 dockets across 47 documents</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export Excel
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="table" className="flex-1 flex flex-col min-h-0">
                <TabsList className="w-fit">
                  <TabsTrigger value="table" className="gap-1">
                    <Table className="w-3 h-3" />
                    Table View
                  </TabsTrigger>
                  <TabsTrigger value="chart" className="gap-1">
                    <BarChart3 className="w-3 h-3" />
                    Chart View
                  </TabsTrigger>
                  <TabsTrigger value="sources" className="gap-1">
                    <FileText className="w-3 h-3" />
                    Sources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="flex-1 overflow-auto mt-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Company</th>
                          <th className="text-left p-3 text-sm font-medium">Docket</th>
                          <th className="text-left p-3 text-sm font-medium">Filed Date</th>
                          <th className="text-left p-3 text-sm font-medium">Proposed ROE</th>
                          <th className="text-left p-3 text-sm font-medium">Current ROE</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockROEData.map((row, i) => (
                          <tr key={i} className="border-t hover:bg-muted/30">
                            <td className="p-3 text-sm font-medium">{row.company}</td>
                            <td className="p-3 text-sm font-mono text-primary">{row.docket}</td>
                            <td className="p-3 text-sm text-muted-foreground">{row.filedDate}</td>
                            <td className="p-3 text-sm font-semibold text-green-600">{row.proposedROE}</td>
                            <td className="p-3 text-sm">{row.currentROE}</td>
                            <td className="p-3">
                              <Badge variant={row.status === "Approved" ? "default" : "secondary"} className="text-xs">
                                {row.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Card className="p-4 mt-4 bg-blue-50 border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">AI Analysis</p>
                    <p className="text-sm text-blue-800">
                      The average proposed ROE across ISO-NE transmission owners is <strong>10.57%</strong>,
                      representing a <strong>0.52%</strong> increase from current authorized rates. National Grid has
                      the highest proposed increase at 55 basis points above current.
                    </p>
                  </Card>
                </TabsContent>

                <TabsContent value="chart" className="flex-1 mt-4">
                  <Card className="p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Interactive chart visualization would appear here</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="sources" className="flex-1 overflow-auto mt-4">
                  <div className="space-y-2">
                    {mockROEData.map((row, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{row.company} - Rate Filing</p>
                            <p className="text-xs text-muted-foreground font-mono">{row.docket}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Data extracted from Exhibit No. 1, Schedule 1, Page 4
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View PDF
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
