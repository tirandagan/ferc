"use client"

import { useState } from "react"
import {
  Search,
  Sparkles,
  Menu,
  HelpCircle,
  Settings,
  Bell,
  User,
  BookOpen,
  FileText,
  Clock,
  Star,
  ChevronDown,
  Map,
  Table,
  Scale,
  History,
  Languages,
  X,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  showAIChat: boolean
  setShowAIChat: (show: boolean) => void
  onOpenGeospatial?: () => void
  onOpenDataScout?: () => void
  onOpenDevilsAdvocate?: () => void
  onOpenTariffTimeTravel?: () => void
  onOpenPlainEnglish?: () => void
}

export default function Header({
  showAIChat,
  setShowAIChat,
  onOpenGeospatial,
  onOpenDataScout,
  onOpenDevilsAdvocate,
  onOpenTariffTimeTravel,
  onOpenPlainEnglish,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="border-b bg-card sticky top-0 z-30 shadow-sm flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img src="https://elibrary.ferc.gov/eLibrary/faviconferc.ico" alt="FERC Logo" className="w-10 h-10" />
                <div>
                  <h1 className="text-lg font-semibold text-foreground leading-tight">FERC eLibrary</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Federal Energy Regulatory Commission</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      Search
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <DropdownMenuItem className="flex items-center gap-3 p-3">
                      <Search className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">General Search</div>
                        <p className="text-xs text-muted-foreground">Search across all documents</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">Docket Search</div>
                        <p className="text-xs text-muted-foreground">Find specific docket numbers</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium">AI-Powered Search</span>
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      AI Tools
                      <Badge variant="secondary" className="text-xs ml-1">
                        New
                      </Badge>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72">
                    <DropdownMenuItem className="flex items-center gap-3 p-3" onClick={onOpenGeospatial}>
                      <Map className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium">Project Vision Map</div>
                        <p className="text-xs text-muted-foreground">Visualize pipeline routes & facilities</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3" onClick={onOpenDataScout}>
                      <Table className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Data Scout</div>
                        <p className="text-xs text-muted-foreground">Extract & compare data across filings</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3" onClick={onOpenDevilsAdvocate}>
                      <Scale className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-medium">Devil's Advocate</div>
                        <p className="text-xs text-muted-foreground">Anticipate objections to your filing</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3" onClick={onOpenTariffTimeTravel}>
                      <History className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="font-medium">Tariff Time-Travel</div>
                        <p className="text-xs text-muted-foreground">Track semantic changes over time</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3" onClick={onOpenPlainEnglish}>
                      <Languages className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="font-medium">Plain English</div>
                        <p className="text-xs text-muted-foreground">Translate legal jargon for everyone</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      Resources
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <DropdownMenuItem className="flex items-center gap-3 p-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">User Guide</div>
                        <p className="text-xs text-muted-foreground">Learn how to use eLibrary</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">Help Center</div>
                        <p className="text-xs text-muted-foreground">Get support and answers</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={showAIChat ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAIChat(!showAIChat)}
                className="gap-2 hidden sm:flex"
              >
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </Button>

              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Bell className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Star className="w-4 h-4 mr-2" />
                    Saved Searches
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2" />
                    Subscriptions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img src="https://elibrary.ferc.gov/eLibrary/faviconferc.ico" alt="FERC Logo" className="w-8 h-8" />
                <span className="font-semibold">FERC eLibrary</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-65px)] p-4">
              {/* AI Assistant Button */}
              <Button
                variant={showAIChat ? "default" : "outline"}
                className="w-full gap-2 mb-6"
                onClick={() => {
                  setShowAIChat(!showAIChat)
                  setMobileMenuOpen(false)
                }}
              >
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </Button>

              {/* Search Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Search</h3>
                <div className="space-y-1">
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Search className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">General Search</div>
                      <p className="text-xs text-muted-foreground">Search across all documents</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Docket Search</div>
                      <p className="text-xs text-muted-foreground">Find specific docket numbers</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI-Powered Search</span>
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    </div>
                  </button>
                </div>
              </div>

              {/* AI Tools Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  AI Tools
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                </h3>
                <div className="space-y-1">
                  <button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => {
                      onOpenGeospatial?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Map className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">Project Vision Map</div>
                      <p className="text-xs text-muted-foreground">Visualize pipeline routes & facilities</p>
                    </div>
                  </button>
                  <button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => {
                      onOpenDataScout?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Table className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Data Scout</div>
                      <p className="text-xs text-muted-foreground">Extract & compare data across filings</p>
                    </div>
                  </button>
                  <button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => {
                      onOpenDevilsAdvocate?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Scale className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-medium">Devil's Advocate</div>
                      <p className="text-xs text-muted-foreground">Anticipate objections to your filing</p>
                    </div>
                  </button>
                  <button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => {
                      onOpenTariffTimeTravel?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <History className="w-4 h-4 text-orange-600" />
                    <div>
                      <div className="font-medium">Tariff Time-Travel</div>
                      <p className="text-xs text-muted-foreground">Track semantic changes over time</p>
                    </div>
                  </button>
                  <button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => {
                      onOpenPlainEnglish?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Languages className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-medium">Plain English</div>
                      <p className="text-xs text-muted-foreground">Translate legal jargon for everyone</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Resources Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Resources</h3>
                <div className="space-y-1">
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">User Guide</div>
                      <p className="text-xs text-muted-foreground">Learn how to use eLibrary</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Help Center</div>
                      <p className="text-xs text-muted-foreground">Get support and answers</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Account</h3>
                <div className="space-y-1">
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">Saved Searches</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Recent Documents</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Bell className="w-4 h-4" />
                    <span className="font-medium">Subscriptions</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left">
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
