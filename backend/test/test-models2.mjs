import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const modelos = [
  'gemini-2.5-pro', 
  'gemini-2.5-flash-preview-04-17',
  'gemini-2.5-flash-preview-05-20',
  'gemini-2.5-flash-002',
  'gemini-2.5-flash-latest',
  'gemini-2.5-flash-8b',
  'gemini-2.5-flash-8b-latest',
];
for (const m of modelos) {
  try {
    const r = await ai.models.generateContent({ model: m, contents: 'Responda apenas: ok', config: { temperature: 0.1 } });
    console.log('✅ OK:', m);
  } catch(e) {
    console.log('❌ ERRO:', m, '|', e.message?.slice(0, 80));
  }
}
