import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

try {
  const modelsPage = await ai.models.list();
  console.log('Modelos disponíveis:');
  for await (const model of modelsPage) {
    if (model.name?.includes('flash') || model.name?.includes('pro')) {
      console.log('-', model.name, '|', model.displayName);
    }
  }
} catch(e) {
  console.error('ERRO ao listar:', e.message);
}
