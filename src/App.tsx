import React, { useState } from 'react';
import { useSpotifyAuth } from './useSpotifyAuth';
import { generateMusicRoast } from './gemini';
import { Navbar } from './components/navbar';
import { LoginView } from './components/login-view';
import { ProfileHeader } from './components/spotify/profile-header';
import { RoastSection } from './components/roast/roast-section';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const App: React.FC = () => {
    const { isAuthenticated, profile, topArtists, topTracks, loading, error, login, logout } = useSpotifyAuth();
    const [roast, setRoast] = useState<string | null>(null);
    const [roasting, setRoasting] = useState(false);

    if (loading) return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium animate-pulse">Loading Spotify Profile...</p>
        </div>
      </div>
    );
    
    if (error) return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                  <CardTitle className="text-destructive">Error Occurred</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{error}</p>
                  <button onClick={() => window.location.href = '/'} className="w-full bg-primary text-white py-2 rounded-md font-medium hover:opacity-90">
                    Try Again
                  </button>
                </CardContent>
            </Card>
        </div>
    );

    const handleRoast = async () => {
        setRoasting(true);
        try {
          const result = await generateMusicRoast(topArtists?.items || [], topTracks?.items || []);
          setRoast(result);
        } catch (e) {
          console.error(e);
        } finally {
          setRoasting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
            
            <main className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                {!isAuthenticated ? (
                    <LoginView onLogin={login} />
                ) : (
                    <div className="space-y-10 lg:space-y-12 animate-in fade-in duration-500">
                        <ProfileHeader profile={profile} />

                        <RoastSection 
                          onRoast={handleRoast} 
                          roast={roast} 
                          loading={roasting} 
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Artists</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                                        {topArtists?.items?.map((artist: any) => (
                                            <div key={artist.id} className="flex flex-col items-center gap-2 text-center group">
                                                <div className="relative h-24 w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full border-2 border-border transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                                                  <img src={artist.images?.[0]?.url} alt={artist.name} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{artist.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Songs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topTracks?.items?.map((track: any) => (
                                            <div key={track.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/50 transition-colors group">
                                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded shadow-sm">
                                                  <img src={track.album?.images?.[0]?.url} alt={track.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{track.name}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1">{track.artists?.map((a: any) => a.name).join(', ')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
