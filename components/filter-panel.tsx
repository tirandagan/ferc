"use client"

import { useState } from "react"
import { X, RotateCcw } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

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

  const resetFilters = () => {
    setDateFrom("")
    setDateTo("")
    setDocketNumber("")
    setDocType("")
    setActiveFilters([])
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm">Advanced Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5 text-xs">
          <RotateCcw className="w-3 h-3" />
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="date-from" className="text-xs font-medium">
            Date From
          </Label>
          <Input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="date-to" className="text-xs font-medium">
            Date To
          </Label>
          <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-9" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="docket" className="text-xs font-medium">
            Docket Number
          </Label>
          <Input
            id="docket"
            type="text"
            placeholder="e.g., ER11-4046"
            value={docketNumber}
            onChange={(e) => setDocketNumber(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="doc-type" className="text-xs font-medium">
            Document Type
          </Label>
          <Select value={docType} onValueChange={setDocType}>
            <SelectTrigger id="doc-type" className="h-9">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="report">Report/Form</SelectItem>
              <SelectItem value="issuance">Issuance</SelectItem>
              <SelectItem value="submittal">Submittal</SelectItem>
              <SelectItem value="filing">Filing</SelectItem>
              <SelectItem value="order">Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="security" className="text-xs font-medium">
            Security Level
          </Label>
          <Select>
            <SelectTrigger id="security" className="h-9">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="ceii">CEII</SelectItem>
              <SelectItem value="privileged">Privileged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Options */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Checkbox id="description" defaultChecked />
          <Label htmlFor="description" className="text-xs">
            Search Description
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="fulltext" defaultChecked />
          <Label htmlFor="fulltext" className="text-xs">
            Full Text Search
          </Label>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 pt-4 border-t flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Active:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1 text-xs">
              {filter}
              <button onClick={() => removeFilter(filter)} className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
