import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const modelos = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash', 'gemini-2.5-flash-lite'];
for (const m of modelos) {
  try {
    const r = await ai.models.generateContent({ model: m, contents: 'Responda: ok', config: { temperature: 0.1 } });
    console.log('✅ OK:', m, '|', r.text?.trim().slice(0, 40));
  } catch(e) {
    console.log('❌ ERRO:', m, '|', e.message?.slice(0, 100));
  }
}
