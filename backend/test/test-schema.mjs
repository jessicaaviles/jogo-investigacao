import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI, Type } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    classification: { type: Type.STRING, description: "YES, NO, PARTIAL, IRRELEVANT ou UNKNOWN" },
    premises: { type: Type.ARRAY, items: { type: Type.STRING } },
    factualExplanation: { type: Type.STRING }
  },
  required: ["classification", "premises", "factualExplanation"]
};

try {
  const r = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: 'Fato: O gato é preto.\nPergunta: "O gato é branco?"\nClassifique.',
    config: { responseMimeType: 'application/json', responseSchema: schema, temperature: 0.1 }
  });
  console.log('✅ Com schema JSON:', r.text);
} catch(e) {
  console.error('❌ ERRO com schema:', e.message?.slice(0, 200));
}
