"use client"

import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "@/components/icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    docket: string
    title: string
    date: string
  }
  highlights: Array<{
    page: number
    text: string
    context: string
  }>
}

export default function PDFViewerModal({ isOpen, onClose, document, highlights }: PDFViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = 15

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="fixed top-[5%] left-[5%] right-[5%] bottom-[5%] w-[90%] h-[90%] max-w-none p-0 flex flex-col translate-x-0 translate-y-0"
        showCloseButton={false}
      >
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg mb-2 truncate">{document.title}</DialogTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="font-mono">
                  {document.docket}
                </Badge>
                <span className="text-sm text-muted-foreground">{document.date}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* PDF Viewer */}
          <div className="flex-1 flex flex-col min-w-0 bg-muted/30">
            {/* Toolbar */}
            <div className="p-3 border-b bg-background flex items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-[100px] text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom((z) => Math.min(200, z + 10))}
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8">
              <div
                className="mx-auto bg-white shadow-lg"
                style={{
                  width: `${(8.5 * zoom) / 100}in`,
                  minHeight: `${(11 * zoom) / 100}in`,
                  padding: `${(0.75 * zoom) / 100}in`,
                }}
              >
                <div className="space-y-4 text-gray-900">
                  {/* Mockup PDF Content */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">FEDERAL ENERGY REGULATORY COMMISSION</h1>
                    <h2 className="text-xl font-semibold mb-4">{document.title}</h2>
                    <p className="text-sm">Docket No. {document.docket}</p>
                    <p className="text-sm text-gray-600">Issued: {document.date}</p>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed">
                    <p className="font-semibold">I. BACKGROUND</p>
                    <p className="text-justify">
                      On July 28, 2023, the Federal Energy Regulatory Commission issued Order No. 2023, which introduces
                      comprehensive reforms to the generator interconnection process. These reforms address the
                      significant backlog of interconnection requests and modernize procedures to accommodate the rapid
                      growth of renewable energy resources.
                    </p>

                    <p className="font-semibold mt-6">II. INTERCONNECTION REQUIREMENTS</p>
                    <p className="text-justify">
                      The Commission adopts the following requirements for generator interconnection:{" "}
                      <mark className="bg-yellow-200">
                        requiring site control and commercial readiness demonstrations, implementing a first-ready,
                        first-served cluster study approach
                      </mark>
                      , and establishing clear timelines for study completion. These changes are designed to ensure that
                      only viable projects proceed through the interconnection queue.
                    </p>

                    <p className="text-justify mt-4">
                      Specifically, interconnection customers must demonstrate site control at the time of submitting
                      their interconnection request. The Commission will allow limited exceptions for{" "}
                      <mark className="bg-yellow-200">
                        projects on federal lands or where state or local permitting requirements prevent early site
                        control
                      </mark>
                      . This requirement addresses concerns that speculative projects were clogging the interconnection
                      queue without genuine intent to proceed.
                    </p>

                    <p className="font-semibold mt-6">III. COMMERCIAL READINESS DEPOSITS</p>
                    <p className="text-justify">
                      To further demonstrate project viability, the Commission establishes{" "}
                      <mark className="bg-yellow-200">
                        commercial readiness deposits of $10,000 per MW for Phase I studies and additional amounts for
                        later phases
                      </mark>
                      . These deposits are refundable upon successful completion of the interconnection process and
                      commencement of commercial operation, or if the customer withdraws prior to the System Impact
                      Study.
                    </p>

                    <p className="text-justify mt-4">
                      The deposit structure is designed to be meaningful enough to ensure project commitment while not
                      creating an unreasonable barrier to entry for smaller projects or developers. The Commission finds
                      this approach balances the need for queue discipline with the goal of promoting renewable energy
                      development.
                    </p>

                    <p className="font-semibold mt-6">IV. TECHNICAL STANDARDS</p>
                    <p className="text-justify">
                      All interconnecting generators must comply with applicable technical standards, including{" "}
                      <mark className="bg-yellow-200">
                        IEEE 1547 standards for distributed energy resources and regional reliability standards
                      </mark>
                      . These standards ensure that interconnecting generation will not adversely affect the reliable
                      operation of the transmission system.
                    </p>

                    {currentPage === 1 && (
                      <div className="mt-8 pt-4 border-t text-xs text-gray-500 text-center">Page 1 of {totalPages}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-72 border-l bg-background flex flex-col flex-shrink-0">
            <div className="p-4 border-b flex-shrink-0">
              <h3 className="font-semibold text-sm mb-1">Relevant Excerpts</h3>
              <p className="text-xs text-muted-foreground">
                {highlights.length} highlight{highlights.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg border bg-yellow-50 hover:bg-yellow-100 transition-colors"
                    onClick={() => setCurrentPage(highlight.page)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Page {highlight.page}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium mb-1 text-balance">{highlight.text}</p>
                    <p className="text-xs text-muted-foreground italic mt-2 line-clamp-2">{highlight.context}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
