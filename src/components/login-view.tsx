import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginViewProps {
  onLogin: () => void
}

export function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-spotify-green bg-clip-text text-transparent">
            Spotify Profile Explorer
          </CardTitle>
          <CardDescription className="text-lg">
            Hubungkan akun Spotify kamu untuk melihat top artists, top songs, dan dapatkan roasting selera musik dari Gemini AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onLogin} variant="spotify" className="w-full py-6 text-lg">
            Connect with Spotify
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
