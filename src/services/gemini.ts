import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateQuestions(
  subject: Subject,
  count: number,
  difficulty: Difficulty,
  topic: string
): Promise<Question[]> {
  const prompt = `Buatkan ${count} soal latihan Olimpiade Sains Nasional (OSN) tingkat SMP untuk mata pelajaran ${subject}.
  Tingkat kesulitan: ${difficulty}.
  Topik spesifik: ${topic || 'Umum'}.
  
  Format output harus berupa JSON array of objects dengan struktur:
  {
    "question": "teks pertanyaan",
    "options": ["A. pilihan", "B. pilihan", "C. pilihan", "D. pilihan", "E. pilihan"],
    "answer": "A/B/C/D/E",
    "explanation": "penjelasan singkat"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              answer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const questions = JSON.parse(text) as Question[];
    return questions.map((q, index) => ({
      ...q,
      id: `${subject}-${Date.now()}-${index}`
    }));
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}
