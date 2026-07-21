import { GoogleGenAI } from "@google/genai";

const api = import.meta.env.VITE_GEMINI_API_KEY;

if (!api) {
  console.warn("Warning: VITE_GEMINI_API_KEY is not defined. Please verify your .env file configuration.");
}

const ai = new GoogleGenAI({ apiKey: api || "" });

async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting response from Gemini API: " + error.message;
  }
}

export default run;