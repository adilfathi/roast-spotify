# 🔥 Roast Spotify Profile

A fun web app that connects to your Spotify account to display your top artists and songs, then uses **Gemini AI** to deliver a brutally hilarious roast of your music taste in Indonesian.

## ✨ Features

- 🎵 **Spotify Integration** - View your top artists and top songs
- 🤖 **AI-Powered Roasts** - Get savage, meme-worthy commentary on your music taste
- 🌙 **Dark/Light Mode** - Toggle between themes
- 💾 **Session Persistence** - Stay logged in for 30 minutes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **APIs**: Spotify Web API + Google Gemini AI
- **Auth**: Spotify OAuth 2.0 with PKCE

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Spotify Developer Account
- Google AI (Gemini) API Key

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/roast-spotify-profile.git
   cd roast-spotify-profile
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create `.env` file

   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`

   ```
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Open http://localhost:5173 in your browser

### Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:5173/callback` to Redirect URIs
4. Copy the Client ID to your `.env` file

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn UI components
│   ├── roast/        # Roast section components
│   └── spotify/      # Spotify profile components
├── spotify.ts        # Spotify API functions
├── gemini.ts         # Gemini AI integration
├── useSpotifyAuth.ts # Authentication hook
└── App.tsx           # Main application
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Google Gemini AI](https://ai.google.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
