import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

console.log('API KEY presente:', !!process.env.GEMINI_API_KEY);
console.log('API KEY início:', process.env.GEMINI_API_KEY?.slice(0, 8) + '...');

const { GoogleGenAI, Type } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Teste 1: chamada simples sem schema
console.log('\n--- Teste 1: chamada simples ---');
try {
  const r1 = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Responda apenas: "funcionando"',
    config: { temperature: 0.1 }
  });
  console.log('Resultado:', r1.text);
} catch(e) {
  console.error('ERRO T1:', e.message, '| status:', e.status);
}

// Teste 2: com responseSchema
console.log('\n--- Teste 2: com responseSchema ---');
try {
  const schema = {
    type: Type.OBJECT,
    properties: {
      classification: { type: Type.STRING },
      factualExplanation: { type: Type.STRING }
    },
    required: ["classification", "factualExplanation"]
  };
  const r2 = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Fatos: O gato é preto.\nPergunta: "O gato é preto?"\nClassifique: YES ou NO',
    config: { responseMimeType: 'application/json', responseSchema: schema, temperature: 0.1 }
  });
  console.log('Resultado:', r2.text);
} catch(e) {
  console.error('ERRO T2:', e.message, '| status:', e.status);
  console.error('Full error:', JSON.stringify(e, null, 2).slice(0, 500));
}
