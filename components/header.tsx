"use client"

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
}

export default function Header({ showAIChat, setShowAIChat }: HeaderProps) {
  return (
    <header className="border-b bg-card sticky top-0 z-30 shadow-sm flex-shrink-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="https://elibrary.ferc.gov/eLibrary/faviconferc.ico" alt="FERC Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-lg font-semibold text-foreground leading-tight">FERC eLibrary</h1>
                <p className="text-xs text-muted-foreground">Federal Energy Regulatory Commission</p>
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

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
