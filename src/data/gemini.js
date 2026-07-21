import { GoogleGenAI } from "@google/genai";

const api = import.meta.env.VITE_GEMINI_API_KEY;

if (!api) {
  console.warn("Warning: VITE_GEMINI_API_KEY is not defined. Please verify your .env file configuration.");
}

const ai = new GoogleGenAI({ apiKey: api || "" });

async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.message && error.message.includes("UNAUTHENTICATED")) {
      return "⚠️ Invalid API Key! Please get a free API Key from https://aistudio.google.com/app/apikey and paste it into your .env file as VITE_GEMINI_API_KEY.";
    }
    return "Error getting response from Gemini API: " + error.message;
  }
}

export default run;