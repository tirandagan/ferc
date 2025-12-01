"use client"

import { useState } from "react"
import { X, MapPin, ChevronRight, Minus, Plus } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GeospatialMapPanelProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  docket: string
}

// Mock extracted location data
const mockLocations = [
  { id: 1, name: "Compressor Station 1", lat: 40.7128, lng: -74.006, type: "facility", milepost: "MP 0.0" },
  { id: 2, name: "Meter Station A", lat: 40.758, lng: -73.9855, type: "meter", milepost: "MP 12.5" },
  {
    id: 3,
    name: "Pipeline Crossing - Hudson River",
    lat: 40.7589,
    lng: -73.9851,
    type: "crossing",
    milepost: "MP 15.2",
  },
  { id: 4, name: "Delivery Point - Newark", lat: 40.7357, lng: -74.1724, type: "delivery", milepost: "MP 28.7" },
  { id: 5, name: "Compressor Station 2", lat: 40.6892, lng: -74.0445, type: "facility", milepost: "MP 35.0" },
]

const mockCounties = ["Essex County, NJ", "Hudson County, NJ", "Bergen County, NJ", "Union County, NJ"]

export default function GeospatialMapPanel({ isOpen, onClose, projectName, docket }: GeospatialMapPanelProps) {
  const [selectedLocation, setSelectedLocation] = useState<(typeof mockLocations)[0] | null>(null)
  const [zoom, setZoom] = useState(10)

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
                <MapPin className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Project Vision: Geospatial View</DialogTitle>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="font-mono">
                  {docket}
                </Badge>
                <span className="text-sm text-muted-foreground">{projectName}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 relative bg-slate-100">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
              {/* Grid overlay to simulate map */}
              <svg className="w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Simulated pipeline route */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 200 150 Q 300 200 400 180 T 600 250 T 750 300"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />
                {/* Location markers */}
                {mockLocations.map((loc, i) => {
                  const positions = [
                    { x: 200, y: 150 },
                    { x: 350, y: 185 },
                    { x: 400, y: 180 },
                    { x: 550, y: 220 },
                    { x: 750, y: 300 },
                  ]
                  return (
                    <g key={loc.id} className="cursor-pointer" onClick={() => setSelectedLocation(loc)}>
                      <circle
                        cx={positions[i].x}
                        cy={positions[i].y}
                        r={selectedLocation?.id === loc.id ? 12 : 8}
                        fill={loc.type === "facility" ? "#dc2626" : loc.type === "crossing" ? "#2563eb" : "#16a34a"}
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all"
                      />
                      <text
                        x={positions[i].x}
                        y={positions[i].y - 15}
                        textAnchor="middle"
                        className="text-xs font-medium fill-slate-700"
                      >
                        {loc.milepost}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Map Labels */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                <p className="text-xs font-semibold text-slate-700 mb-2">Extracted from Documents</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-600" />
                    <span>Compressor Stations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <span>Meter/Delivery Points</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <span>River Crossings</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-0.5 bg-orange-500" style={{ borderStyle: "dashed" }} />
                    <span>Proposed Pipeline Route</span>
                  </div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white rounded-lg shadow-lg">
                <Button variant="ghost" size="icon" onClick={() => setZoom((z) => Math.min(18, z + 1))}>
                  <Plus className="w-4 h-4" />
                </Button>
                <div className="text-xs text-center py-1 border-t border-b">{zoom}x</div>
                <Button variant="ghost" size="icon" onClick={() => setZoom((z) => Math.max(1, z - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l bg-background flex flex-col flex-shrink-0">
            <div className="p-4 border-b flex-shrink-0">
              <h3 className="font-semibold text-sm mb-1">AI-Extracted Locations</h3>
              <p className="text-xs text-muted-foreground">Found {mockLocations.length} locations in 47 documents</p>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {/* Counties */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">AFFECTED COUNTIES</p>
                <div className="flex flex-wrap gap-1">
                  {mockCounties.map((county) => (
                    <Badge key={county} variant="secondary" className="text-xs">
                      {county}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">KEY LOCATIONS</p>
                {mockLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedLocation?.id === loc.id ? "bg-primary/10 border-primary/30" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{loc.name}</p>
                        <p className="text-xs text-muted-foreground">{loc.milepost}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Source Documents */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-xs font-medium text-muted-foreground mb-2">SOURCE DOCUMENTS</p>
                <div className="space-y-2">
                  <Card className="p-2">
                    <p className="text-xs font-medium">Environmental Assessment</p>
                    <p className="text-xs text-muted-foreground">Pages 45-67 • Route Description</p>
                  </Card>
                  <Card className="p-2">
                    <p className="text-xs font-medium">Resource Report 1</p>
                    <p className="text-xs text-muted-foreground">Pages 12-34 • Facility Locations</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
