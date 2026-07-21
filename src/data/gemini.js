import { GoogleGenAI } from "@google/genai";

const api = import.meta.env.VITE_GEMINI_API_KEY;

if (!api) {
  console.warn("Warning: VITE_GEMINI_API_KEY is not defined. Please verify your .env file configuration.");
}

const ai = new GoogleGenAI({ apiKey: api || "" });

async function run(prompt) {
  if (!api) {
    return "⚠️ API Key is missing! If this site is deployed on Netlify, please add VITE_GEMINI_API_KEY in Netlify Site Settings > Environment variables and trigger a re-deploy.";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.message && error.message.includes("UNAUTHENTICATED")) {
      return "⚠️ Invalid API Key! Please get a free API Key from https://aistudio.google.com/app/apikey and paste it into your .env file as VITE_GEMINI_API_KEY.";
    }
    if (error.message && (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED"))) {
      return "⚠️ Free Tier Quota / Rate Limit reached! Please wait 20-30 seconds and try again, or create a new free key at https://aistudio.google.com/app/apikey.";
    }
    return "Error getting response from Gemini API: " + error.message;
  }
}

export default run;