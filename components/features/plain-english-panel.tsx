"use client"

import { useState } from "react"
import { X, Languages, ChevronRight, CheckCircle, FileText } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlainEnglishPanelProps {
  isOpen: boolean
  onClose: () => void
  document: {
    title: string
    docket: string
  }
}

const mockOriginalText = `
Pursuant to section 205 of the Federal Power Act, 16 U.S.C. § 824d, and section 35.13 of the Commission's regulations, 18 C.F.R. § 35.13, Applicant hereby submits for filing proposed revisions to its Open Access Transmission Tariff ("OATT") to implement a new Attachment Z-2 concerning reactive power compensation for generating facilities interconnected to the transmission system. 

The Commission has previously determined that reactive power is a necessary component of reliable transmission service and that public utilities may include reasonable reactive power costs in their transmission rates. See Standardizing Generator Interconnection Agreements and Procedures, Order No. 2003, 104 FERC ¶ 61,103 (2003). The proposed revisions establish a formulaic rate methodology consistent with Commission precedent for recovery of reactive power capability costs from transmission customers on a load-ratio share basis.
`

const mockPlainEnglishText = `
## What This Filing Is About

The electric company is asking permission to change how it charges for a special service called "reactive power." Think of reactive power like the stabilizers on a bicycle - it helps keep electricity flowing smoothly and prevents outages.

## What It Means For You

**If you're a homeowner or renter:**
- Your electricity bill may include a small additional charge
- The change helps ensure your power stays on reliably
- The exact amount depends on how much electricity your area uses

**Key Changes:**
1. The company can now charge for reactive power services
2. The cost is split among all customers based on usage
3. This follows rules the government already approved for other companies

## What Happens Next

- The government will review this request
- You can submit comments if you have concerns
- A decision is expected within 60 days

## Important Dates
- **Comment deadline:** 30 days from publication
- **Expected decision:** Within 60 days
`

const impactSummary = [
  { icon: "💡", label: "Affects your electric bill", detail: "Small increase possible" },
  { icon: "⚡", label: "Improves grid reliability", detail: "Better power quality" },
  { icon: "📅", label: "Takes effect in 60 days", detail: "After FERC approval" },
]

export default function PlainEnglishPanel({ isOpen, onClose, document }: PlainEnglishPanelProps) {
  const [readingLevel, setReadingLevel] = useState<"simple" | "detailed">("simple")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="fixed top-[5%] left-[5%] right-[5%] bottom-[5%] w-[90%] h-[90%] max-w-none p-0 flex flex-col translate-x-0 translate-y-0"
        showCloseButton={false}
      >
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Languages className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Plain English Translation</DialogTitle>
                <Badge className="bg-green-100 text-green-800 text-xs">8th Grade Reading Level</Badge>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="font-mono">
                  {document.docket}
                </Badge>
                <span className="text-sm text-muted-foreground truncate">{document.title}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <Tabs defaultValue="translated" className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                <TabsList>
                  <TabsTrigger value="translated">Plain English</TabsTrigger>
                  <TabsTrigger value="original">Original Text</TabsTrigger>
                  <TabsTrigger value="sidebyside">Side by Side</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button
                    variant={readingLevel === "simple" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReadingLevel("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    variant={readingLevel === "detailed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReadingLevel("detailed")}
                  >
                    Detailed
                  </Button>
                </div>
              </div>

              <TabsContent value="translated" className="flex-1 overflow-auto p-6 mt-0">
                <div className="max-w-3xl mx-auto">
                  {/* Impact Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {impactSummary.map((item, i) => (
                      <Card key={i} className="p-4 text-center">
                        <span className="text-3xl mb-2 block">{item.icon}</span>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </Card>
                    ))}
                  </div>

                  {/* Translated Content */}
                  <div className="prose prose-slate max-w-none">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-900 m-0">What This Filing Is About</h3>
                      </div>
                      <p className="text-green-800 m-0">
                        The electric company is asking permission to change how it charges for a special service called
                        "reactive power." Think of reactive power like the stabilizers on a bicycle - it helps keep
                        electricity flowing smoothly and prevents outages.
                      </p>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">What It Means For You</h3>

                    <Card className="p-4 mb-4">
                      <h4 className="font-medium mb-2">If you're a homeowner or renter:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>Your electricity bill may include a small additional charge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>The change helps ensure your power stays on reliably</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>The exact amount depends on how much electricity your area uses</span>
                        </li>
                      </ul>
                    </Card>

                    <h3 className="text-lg font-semibold mb-4">Key Changes</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <span className="text-sm">The company can now charge for reactive power services</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <span className="text-sm">The cost is split among all customers based on usage</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <span className="text-sm">
                          This follows rules the government already approved for other companies
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Important Dates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 border-l-4 border-l-amber-500">
                        <p className="text-xs text-muted-foreground">Comment Deadline</p>
                        <p className="font-semibold">30 days from publication</p>
                      </Card>
                      <Card className="p-4 border-l-4 border-l-green-500">
                        <p className="text-xs text-muted-foreground">Expected Decision</p>
                        <p className="font-semibold">Within 60 days</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="original" className="flex-1 overflow-auto p-6 mt-0">
                <div className="max-w-3xl mx-auto">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-semibold">Original Legal Text</h3>
                      <Badge variant="outline" className="text-xs">
                        Flesch-Kincaid: Graduate Level
                      </Badge>
                    </div>
                    <div className="prose prose-slate prose-sm max-w-none">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{mockOriginalText}</p>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sidebyside" className="flex-1 overflow-auto p-6 mt-0">
                <div className="grid grid-cols-2 gap-6 h-full">
                  <Card className="p-4 overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">Original</Badge>
                      <Badge variant="secondary" className="text-xs">
                        Graduate Level
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{mockOriginalText}</p>
                  </Card>
                  <Card className="p-4 overflow-auto bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-green-600">Plain English</Badge>
                      <Badge variant="secondary" className="text-xs">
                        8th Grade
                      </Badge>
                    </div>
                    <div className="prose prose-sm prose-slate max-w-none">
                      <p className="text-sm">
                        <strong>What This Filing Is About</strong>
                        <br />
                        The electric company is asking permission to change how it charges for a special service called
                        "reactive power." Think of reactive power like the stabilizers on a bicycle - it helps keep
                        electricity flowing smoothly and prevents outages.
                      </p>
                      <p className="text-sm mt-4">
                        <strong>What It Means For You</strong>
                        <br />
                        Your electricity bill may include a small additional charge. The change helps ensure your power
                        stays on reliably.
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-72 border-l bg-muted/20 flex flex-col flex-shrink-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-sm mb-1">Accessibility Options</h3>
              <p className="text-xs text-muted-foreground">Customize your reading experience</p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium mb-2 block">Text Size</label>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    A-
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    A
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    A+
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block">Language</label>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  🇺🇸 English
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block">Read Aloud</label>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  🔊 Listen to Summary
                </Button>
              </div>
            </div>

            <div className="mt-auto p-4 border-t">
              <Card className="p-3 bg-blue-50 border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Feedback Welcome!</strong> Help us improve translations.
                  <button className="text-blue-600 underline ml-1">Report an issue</button>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
