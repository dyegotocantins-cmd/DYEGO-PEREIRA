
import { GoogleGenAI, Type } from "@google/genai";
import type { Question } from '../types';

const MAX_RETRIES = 3;

export async function generateQuizQuestions(
  subject: string,
  difficulty: string,
  numQuestions: number,
): Promise<Question[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Generate a JSON array of ${numQuestions} unique multiple-choice quiz questions.
    The topic is ${subject}.
    The difficulty level is ${difficulty}, suitable for public service exams ('concurso público nível ${difficulty}') in Brazil.
    Each question must have exactly 4 options.
    One option must be the correct answer.
    Each question must include a brief explanation for the correct answer.

    The JSON structure for each question is defined by the provided schema.

    Ensure the questions are relevant to the subject and difficulty.
    Do not include any introductory text or explanation outside of the JSON array.
    The entire output must be a single valid JSON array.
  `;

  const questionSchema = {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING, description: "The full text of the question in Portuguese." },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "An array of 4 possible answers."
      },
      correctAnswer: { type: Type.STRING, description: "The exact text of the correct option from the options array." },
      explanation: { type: Type.STRING, description: "A brief explanation for why the correct answer is right, in Portuguese." }
    },
    required: ["question", "options", "correctAnswer", "explanation"]
  };

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: questionSchema
          },
          temperature: 0.8,
        },
      });

      const jsonText = response.text.trim();
      const questions = JSON.parse(jsonText);

      if (Array.isArray(questions) && questions.length > 0) {
        return questions;
      }
      console.warn(`Attempt ${i + 1}: Received empty or invalid data from API.`);

    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === MAX_RETRIES - 1) {
        throw new Error("Failed to generate quiz questions after multiple attempts.");
      }
    }
  }
  
  throw new Error("Failed to generate quiz questions. Max retries reached.");
}