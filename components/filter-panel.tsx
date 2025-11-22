"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface FilterPanelProps {
  activeFilters: string[]
  setActiveFilters: (filters: string[]) => void
}

export default function FilterPanel({ activeFilters, setActiveFilters }: FilterPanelProps) {
  const [dateFrom, setDateFrom] = useState("2025-09-23")
  const [dateTo, setDateTo] = useState("2025-11-22")
  const [docketNumber, setDocketNumber] = useState("")
  const [docType, setDocType] = useState("")

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date-from" className="text-sm font-medium">
            Filed Date From
          </Label>
          <Input id="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-to" className="text-sm font-medium">
            Filed Date To
          </Label>
          <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="docket" className="text-sm font-medium">
            Docket Number
          </Label>
          <Input
            id="docket"
            type="text"
            placeholder="e.g., ER11-4046"
            value={docketNumber}
            onChange={(e) => setDocketNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doc-type" className="text-sm font-medium">
            Document Type
          </Label>
          <Select value={docType} onValueChange={setDocType}>
            <SelectTrigger id="doc-type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="report">Report/Form</SelectItem>
              <SelectItem value="issuance">Issuance</SelectItem>
              <SelectItem value="submittal">Submittal</SelectItem>
              <SelectItem value="filing">Filing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button onClick={() => removeFilter(filter)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
