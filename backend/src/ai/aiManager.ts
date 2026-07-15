import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askMaster = async (question: string, facts: string) => {
  try {
    const prompt = `Você é o Mestre de um jogo de investigação. 
Baseado nestes fatos: ${facts}
Responda à pergunta do jogador: "${question}"
Sua resposta deve ser determinística: "Sim", "Não", "Irrelevante" ou "Parcialmente", seguida de no máximo duas frases explicando com base APENAS nos fatos. Nunca invente informações.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error('AI Error:', error);
    return "Falha de conexão com a IA. Resposta temporariamente bloqueada.";
  }
};
