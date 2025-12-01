"use client"

import { useState } from "react"
import { X, History, GitCompare, AlertTriangle } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TariffTimeTravelPanelProps {
  isOpen: boolean
  onClose: () => void
}

const mockVersions = [
  { id: "v4", date: "11/15/2024", label: "Current", docket: "ER24-5678-000" },
  { id: "v3", date: "06/01/2023", label: "Previous", docket: "ER23-4567-000" },
  { id: "v2", date: "03/15/2022", label: "2022 Update", docket: "ER22-3456-000" },
  { id: "v1", date: "01/01/2020", label: "Original", docket: "ER20-1234-000" },
]

const mockChanges = [
  {
    section: "Section 15.3 - Liability Provisions",
    type: "Semantic Shift",
    severity: "high",
    oldText: "The Transmission Provider shall be liable for damages caused by its negligence or willful misconduct.",
    newText:
      "The Customer assumes liability for damages arising from use of transmission services, except where caused by Transmission Provider's gross negligence.",
    semanticAnalysis:
      "This revision shifts the liability burden from the Transmission Provider to the Customer, reversing the standard set in the 2022 version. This represents a significant change in risk allocation.",
    legalImplication: "Customers may face increased exposure to operational risks previously borne by the provider.",
  },
  {
    section: "Section 8.1 - Curtailment Priority",
    type: "Order Change",
    severity: "medium",
    oldText: "Network customers shall have equal priority with Native Load customers for curtailment purposes.",
    newText: "Native Load customers shall have priority over Network customers during curtailment events.",
    semanticAnalysis:
      "The revision establishes a clear hierarchy favoring Native Load over Network customers during curtailments, changing from the previous equal treatment standard.",
    legalImplication: "Network customers may face more frequent curtailments during system emergencies.",
  },
  {
    section: "Section 22.4 - Force Majeure",
    type: "Scope Expansion",
    severity: "low",
    oldText: "Force Majeure events include natural disasters, acts of war, and government actions.",
    newText:
      "Force Majeure events include natural disasters, acts of war, government actions, pandemics, cyber attacks, and supply chain disruptions.",
    semanticAnalysis:
      "The definition has been expanded to include modern risks (pandemics, cyber attacks, supply chain issues) reflecting post-2020 operational realities.",
    legalImplication:
      "Broader protection for the Transmission Provider against liability in modern disruption scenarios.",
  },
]

export default function TariffTimeTravelPanel({ isOpen, onClose }: TariffTimeTravelPanelProps) {
  const [compareFrom, setCompareFrom] = useState("v3")
  const [compareTo, setCompareTo] = useState("v4")

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
                <History className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Semantic Tariff Time-Travel</DialogTitle>
                <Badge variant="secondary" className="text-xs">
                  AI Analysis
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Track how tariff language and meaning have evolved over time
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-4 border-b bg-muted/30 flex-shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Compare:</span>
              <Select value={compareFrom} onValueChange={setCompareFrom}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.label} ({v.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <GitCompare className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">To:</span>
              <Select value={compareTo} onValueChange={setCompareTo}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockVersions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.label} ({v.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline" className="ml-auto">
              {mockChanges.length} semantic changes detected
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Timeline visualization */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2" />
              {mockVersions.map((version, i) => (
                <div key={version.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      version.id === compareFrom || version.id === compareTo
                        ? "bg-primary border-primary"
                        : "bg-background border-muted-foreground"
                    }`}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{version.label}</p>
                    <p className="text-xs text-muted-foreground">{version.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Change Cards */}
          <div className="space-y-6">
            {mockChanges.map((change, i) => (
              <Card
                key={i}
                className={`overflow-hidden border-l-4 ${
                  change.severity === "high"
                    ? "border-l-red-500"
                    : change.severity === "medium"
                      ? "border-l-amber-500"
                      : "border-l-blue-500"
                }`}
              >
                <div className="p-4 bg-muted/30 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{change.section}</h3>
                      <Badge variant={change.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                        {change.type}
                      </Badge>
                    </div>
                    {change.severity === "high" && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-medium">Significant Change</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  {/* Side by side comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-2">Previous Version</p>
                      <div className="p-3 rounded bg-red-50 border border-red-200 text-sm">
                        <span className="line-through text-red-700">{change.oldText}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-600 mb-2">Current Version</p>
                      <div className="p-3 rounded bg-green-50 border border-green-200 text-sm">
                        <span className="text-green-700">{change.newText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Semantic Analysis */}
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-3">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Semantic Analysis</p>
                    <p className="text-sm text-blue-800">{change.semanticAnalysis}</p>
                  </div>

                  {/* Legal Implication */}
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Legal Implication</p>
                    <p className="text-sm text-amber-800">{change.legalImplication}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
