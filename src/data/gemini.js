import { GoogleGenAI } from "@google/genai";

const api = "AQ.Ab8RN6LLzMiHpeRW0vSym6EFsnpEuykSbF1sBPxlSxd3kDyt7Q";

const ai = new GoogleGenAI({ apiKey: api });

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