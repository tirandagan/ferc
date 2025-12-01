"use client"

import { useState } from "react"
import { X, Scale, Upload, AlertTriangle, CheckCircle, FileText } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DevilsAdvocatePanelProps {
  isOpen: boolean
  onClose: () => void
}

const personas = [
  { id: "enviro", name: "Environmental NGO", icon: "🌿", description: "Sierra Club, NRDC perspective" },
  { id: "industrial", name: "Industrial Customers", icon: "🏭", description: "Large load, manufacturing interests" },
  { id: "state", name: "State Regulator", icon: "⚖️", description: "State commission perspective" },
  { id: "consumer", name: "Consumer Advocate", icon: "👥", description: "Residential ratepayer interests" },
]

const mockObjections = [
  {
    severity: "high",
    category: "Legal Precedent",
    title: "Missing citation to Order No. 2222",
    description:
      "Your filing fails to address how the proposed tariff changes comply with Order No. 2222's requirements for DER aggregation. Historical protests from environmental groups have successfully challenged similar omissions.",
    historicalCase: "Docket ER21-2456 - NRDC Protest (Granted)",
  },
  {
    severity: "medium",
    category: "Cost Allocation",
    title: "Inequitable cost burden on residential customers",
    description:
      "The proposed rate design shifts disproportionate costs to residential ratepayers. Consumer advocates have historically protested similar structures citing violation of cost causation principles.",
    historicalCase: "Docket EL20-1234 - Consumer Advocate Protest",
  },
  {
    severity: "high",
    category: "Environmental Impact",
    title: "Insufficient environmental justice analysis",
    description:
      "The filing lacks analysis of impacts on environmental justice communities as required by recent FERC policy statements. This has been a successful protest point in 7 of the last 10 pipeline proceedings.",
    historicalCase: "Docket CP22-1234 - Sierra Club Protest (Granted)",
  },
  {
    severity: "low",
    category: "Technical",
    title: "Outdated load forecast methodology",
    description:
      "The load forecast relies on pre-pandemic growth assumptions. State regulators have challenged similar methodologies as overstating need.",
    historicalCase: "Docket ER23-4567 - NY PSC Comments",
  },
]

export default function DevilsAdvocatePanel({ isOpen, onClose }: DevilsAdvocatePanelProps) {
  const [selectedPersona, setSelectedPersona] = useState<string | null>("enviro")
  const [hasAnalysis, setHasAnalysis] = useState(true)
  const [uploadedFile, setUploadedFile] = useState<string | null>("Draft_Rate_Filing_2024.pdf")

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
                <Scale className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Devil's Advocate Strategy Simulator</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Anticipate objections before you file using AI-powered opposition analysis
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Panel - Configuration */}
          <div className="w-80 border-r bg-muted/20 p-4 flex flex-col flex-shrink-0">
            {/* Upload Section */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Your Draft Filing</label>
              {uploadedFile ? (
                <Card className="p-3 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{uploadedFile}</p>
                    <p className="text-xs text-muted-foreground">42 pages • Uploaded</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Draft</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC up to 50MB</p>
                </Card>
              )}
            </div>

            {/* Persona Selection */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Opposition Persona</label>
              <div className="space-y-2">
                {personas.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedPersona === persona.id ? "bg-primary/10 border-primary/30" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{persona.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{persona.name}</p>
                        <p className="text-xs text-muted-foreground">{persona.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-4" disabled={!uploadedFile || !selectedPersona}>
              Generate Opposition Analysis
            </Button>
          </div>

          {/* Right Panel - Analysis Results */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {hasAnalysis ? (
              <>
                <div className="p-4 border-b bg-amber-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <span className="text-xl">🌿</span>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-900">Mock Protest: Environmental NGO Perspective</p>
                      <p className="text-sm text-amber-700">
                        Based on analysis of 234 historical protests from Sierra Club, NRDC, and similar groups
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Likely Objections</h3>
                    <div className="flex gap-2">
                      <Badge variant="destructive">
                        {mockObjections.filter((o) => o.severity === "high").length} High Risk
                      </Badge>
                      <Badge variant="secondary">
                        {mockObjections.filter((o) => o.severity === "medium").length} Medium
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockObjections.map((objection, i) => (
                      <Card
                        key={i}
                        className={`p-4 border-l-4 ${
                          objection.severity === "high"
                            ? "border-l-red-500"
                            : objection.severity === "medium"
                              ? "border-l-amber-500"
                              : "border-l-blue-500"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            {objection.severity === "high" ? (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {objection.category}
                            </Badge>
                          </div>
                          <Badge
                            variant={objection.severity === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {objection.severity === "high"
                              ? "High Risk"
                              : objection.severity === "medium"
                                ? "Medium Risk"
                                : "Low Risk"}
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-2">{objection.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{objection.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <FileText className="w-3 h-3" />
                          <span className="text-primary font-mono">{objection.historicalCase}</span>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <Card className="p-4 mt-6 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Strengthening Recommendations</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>• Add explicit citation to Order No. 2222 compliance in Section III</li>
                      <li>• Include environmental justice analysis per Policy Statement PL21-3</li>
                      <li>• Update load forecast with post-pandemic data and methodology</li>
                      <li>• Add cost causation analysis demonstrating residential rate impact</li>
                    </ul>
                  </Card>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Scale className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload a draft and select a persona to begin analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
