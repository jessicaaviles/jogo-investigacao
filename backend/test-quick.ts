import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    classification: { type: Type.STRING, description: "YES, NO, PARTIAL, IRRELEVANT, UNKNOWN, AMBIGUOUS, MULTI_PREMISE" },
    premises: { type: Type.ARRAY, items: { type: Type.STRING } },
    factualExplanation: { type: Type.STRING }
  },
  required: ["classification", "premises", "factualExplanation"]
};

(async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Fatos do caso:\n- O presente sumiu no dia 25 de dezembro.\n- A família estava reunida.\n\nPergunta: "Algum parente roubou o presente?"\n\nClassifique.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema as any,
        temperature: 0.1
      }
    });
    console.log('SUCESSO:', response.text);
  } catch (err: any) {
    console.error('ERRO:', err.message);
    console.error('STATUS:', err.status);
    console.error('STACK:', err.stack);
  }
})();
