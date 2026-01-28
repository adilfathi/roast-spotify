import { useState, useEffect, useRef } from 'react';
import { getAccessToken, fetchProfile, fetchTopArtists, fetchTopTracks, clientId, redirectToAuthCodeFlow } from './spotify';

const SESSION_KEY = 'spotify_session';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

interface SessionData {
    profile: any;
    topArtists: any;
    topTracks: any;
    timestamp: number;
}

export function useSpotifyAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [topArtists, setTopArtists] = useState<any>(null);
    const [topTracks, setTopTracks] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const authStarted = useRef(false);

    // Save session to localStorage
    const saveSession = (prof: any, artists: any, tracks: any) => {
        const sessionData: SessionData = {
            profile: prof,
            topArtists: artists,
            topTracks: tracks,
            timestamp: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    };

    // Load session from localStorage
    const loadSession = (): SessionData | null => {
        try {
            const stored = localStorage.getItem(SESSION_KEY);
            if (!stored) return null;

            const session: SessionData = JSON.parse(stored);
            const now = Date.now();
            const elapsed = now - session.timestamp;

            // Check if session is still valid (within 30 minutes)
            if (elapsed < SESSION_DURATION) {
                return session;
            } else {
                // Session expired, clear it
                localStorage.removeItem(SESSION_KEY);
                return null;
            }
        } catch (err) {
            console.error('Failed to load session:', err);
            return null;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
        setProfile(null);
        setTopArtists(null);
        setTopTracks(null);
        console.log('User logged out');
    };

    useEffect(() => {
        if (authStarted.current) return;
        
        console.log("useSpotifyAuth: Initializing...");
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        async function initAuth() {
            // First, try to restore session from localStorage
            const existingSession = loadSession();
            if (existingSession) {
                console.log("useSpotifyAuth: Restoring session from localStorage");
                setProfile(existingSession.profile);
                setTopArtists(existingSession.topArtists);
                setTopTracks(existingSession.topTracks);
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }

            if (code) {
                authStarted.current = true;
                console.log("useSpotifyAuth: Authorization code found, fetching token...");
                
                // Cleanup URL immediately to prevent double-exchange
                window.history.replaceState({}, document.title, window.location.pathname);

                try {
                    const token = await getAccessToken(clientId, code);
                    console.log("useSpotifyAuth: Token received, fetching profile data...");
                    
                    const [prof, artists, tracks] = await Promise.all([
                        fetchProfile(token),
                        fetchTopArtists(token),
                        fetchTopTracks(token)
                    ]);
                    
                    if (prof.error) throw new Error(prof.error.message);
                    
                    setProfile(prof);
                    setTopArtists(artists);
                    setTopTracks(tracks);
                    setIsAuthenticated(true);
                    
                    // Save session to localStorage
                    saveSession(prof, artists, tracks);
                    
                    console.log("useSpotifyAuth: Auth successful and session saved!");
                } catch (err: any) {
                    console.error("useSpotifyAuth: Auth failed", err);
                    setError(err.message || "Authentication failed. Your authorization code might be expired.");
                }
            } else {
                console.log("useSpotifyAuth: No authorization code found.");
            }
            setLoading(false);
        }

        initAuth();
    }, []);

    const login = () => {
        console.log("useSpotifyAuth: Redirecting to login...");
        redirectToAuthCodeFlow(clientId);
    };

    return { isAuthenticated, profile, topArtists, topTracks, loading, error, login, logout };
}
