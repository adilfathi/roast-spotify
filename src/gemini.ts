import { GoogleGenerativeAI } from "@google/generative-ai";

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateMusicRoast(artists: any[], tracks: any[]) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const artistNames = artists.map(a => a.name).join(", ");
    const trackNames = tracks.map(t => `${t.name} by ${t.artists.map((a: any) => a.name).join(", ")}`).join(", ");

    const prompt = `Kamu adalah kritikus musik yang merasa seleranya paling 'paling' se-Indo, dengan tingkat nyinyir setara netizen TikTok yang hobi komen. Roasting selera musikku secara brutal, lucu, dan absurd berdasarkan top artist: ${artistNames} dan top lagu: ${trackNames}.

Gunakan jokes internet Indonesia yang lagi rame (seperti "minimal mandi", "menyala abangku", "info loker", "pov", atau "puncak komedi"), meme "anak senja", "musik buat nemenin nangis di pojokan" dan sejenisnya, dan sindiran soal Spotify Wrapped sebagai ajang pamer penderitaan. Pakai bahasa Indonesia santai, slang Jakarta/Twitter, 3–4 kalimat saja, savage tapi ngakak, jangan sopan, dan jangan pakai klarifikasi atau minta maaf di akhir.`;


    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini roast failed", error);
        return "Your music taste is so bad, even Gemini is speechless.";
    }
}
