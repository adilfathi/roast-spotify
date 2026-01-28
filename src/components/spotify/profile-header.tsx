import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileHeaderProps {
  profile: any
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="mb-8">
      <CardContent className="flex flex-col sm:flex-row items-center gap-6 pt-6">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage src={profile?.images?.[0]?.url} alt={profile?.display_name} />
          <AvatarFallback>{profile?.display_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Logged in as</p>
          <h2 className="text-3xl font-bold">{profile?.display_name || 'User'}</h2>
          <p className="text-sm text-muted-foreground mt-1">Spotify ID: {profile?.id}</p>
        </div>
      </CardContent>
    </Card>
  )
}
