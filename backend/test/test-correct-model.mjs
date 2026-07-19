import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI, Type } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Testar os modelos disponíveis com nome completo
const modelos = ['models/gemini-2.5-flash', 'models/gemini-2.5-flash-lite', 'models/gemini-2.0-flash', 'models/gemini-2.5-pro'];
for (const m of modelos) {
  try {
    const r = await ai.models.generateContent({ model: m, contents: 'Responda apenas: ok', config: { temperature: 0.1 } });
    console.log('✅ OK:', m, '|', r.text?.trim().slice(0, 30));
  } catch(e) {
    console.log('❌ ERRO:', m, '|', e.message?.slice(0, 80));
  }
}
