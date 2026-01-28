export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export const redirectToAuthCodeFlow = async (clientId: string) => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${window.location.origin}/callback`);
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

function generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const getAccessToken = async (clientId: string, code: string): Promise<string> => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${window.location.origin}/callback`);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    if (!result.ok) {
        throw new Error(data.error_description || data.error || "Failed to fetch access token");
    }
    
    return data.access_token;
};

export const fetchProfile = async (token: string) => {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
};

export const fetchTopArtists = async (token: string) => {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=6", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
};

export const fetchTopTracks = async (token: string) => {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=8", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
};
