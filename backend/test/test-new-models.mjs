import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Testar modelos mais novos disponíveis na lista
const modelos = [
  'gemini-3.5-flash',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-pro-latest',
];
for (const m of modelos) {
  try {
    const r = await ai.models.generateContent({ model: m, contents: 'Responda apenas: ok', config: { temperature: 0.1 } });
    console.log('✅ OK:', m, '|', r.text?.trim().slice(0, 30));
  } catch(e) {
    console.log('❌ ERRO:', m, '|', e.message?.slice(0, 80));
  }
}
