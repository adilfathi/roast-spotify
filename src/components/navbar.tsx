import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="spotify-logo-primary">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.496 17.304c-.218.358-.684.469-1.042.251-2.863-1.748-6.464-2.144-10.707-1.177-.41.094-.817-.164-.911-.574-.094-.411.164-.817.575-.911 4.644-1.06 8.614-.614 11.834 1.348.358.218.469.684.251 1.043zm1.467-3.259c-.274.444-.852.583-1.296.309-3.274-2.013-8.263-2.597-12.133-1.422-.501.152-1.026-.135-1.178-.636-.152-.501.135-1.026.636-1.178 4.425-1.343 9.916-.69 13.662 1.619.445.274.584.852.31 1.296-.001.001-.001.001-.001.001zm.135-3.391C15.118 8.1 8.52 7.881 4.717 9.034c-.611.186-1.258-.167-1.444-.778-.186-.611.167-1.258.778-1.444 4.368-1.326 11.66-1.065 16.257 1.664.55.327.734 1.037.407 1.587-.327.551-1.037.734-1.587.407h-.001z"/>
          </svg>
          <span className="font-bold hidden sm:inline-block">Spotify Explorer</span>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
