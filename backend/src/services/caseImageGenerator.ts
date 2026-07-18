import { GoogleGenAI } from '@google/genai';

const imageModels = [
  process.env.GEMINI_IMAGE_MODEL,
  'gemini-3.1-flash-lite-image',
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
  'gemini-3-pro-image'
].filter(Boolean) as string[];

const NEW_API_MODELS = new Set(['gemini-3.1-flash-lite-image', 'gemini-3.1-flash-image', 'gemini-3-pro-image']);

function buildPrompt(title: string, synopsis: string): string {
  return `Create a dark cinematic cover image for a detective mystery case.

Case title: "${title}"
Case synopsis: "${synopsis}"

Style requirements:
- Dark, moody, noir aesthetic — low-key lighting, deep shadows, warm golden highlights
- Cinematic composition — as if it is a frame from a prestige thriller or detective film
- Color palette: desaturated, cool-leaning shadows (deep teals, navy, charcoal) with selective warm tones (amber, rust, gold)
- Atmospheric: subtle haze, rain, fog, or steam where appropriate to the scene
- No people or faces in the image — focus on the environment, objects, and atmosphere described in the synopsis
- Photorealistic, high-detail, film-quality rendering
- 16:9 aspect ratio (landscape / cinematic widescreen)
- The image should evoke mystery, tension, and a sense of hidden truth

Do not include text, titles, or graphic overlays. The image should feel like a standalone movie still.`
}

export const generateCaseImage = async (title: string, synopsis: string): Promise<string> => {
  if (!process.env.GEMINI_API_KEY) throw new Error('Image generation is unavailable');

  const prompt = buildPrompt(title, synopsis);
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let lastError: unknown;
  for (const model of imageModels) {
    try {
      const useNewApi = NEW_API_MODELS.has(model) || (model.startsWith('gemini-3.') && !model.includes('flash-lite'));

      if (useNewApi) {
        const interaction = await ai.interactions.create({
          model,
          input: [{ type: 'text' as const, text: prompt }],
          response_modalities: ['text', 'image'],
        } as any);
        if (interaction.output_image?.data) {
          const mime = interaction.output_image.mime_type || 'image/png';
          return `data:${mime};base64,${interaction.output_image.data}`;
        }
        throw new Error(`${model} returned no image via Interactions API`);
      }

      const response: any = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseModalities: ['TEXT', 'IMAGE'] }
      } as any);
      const imageParts = response.candidates?.[0]?.content?.parts?.filter((part: any) => part.inlineData?.data) || [];
      if (imageParts.length > 0) {
        const part = imageParts[imageParts.length - 1];
        const mime = part.inlineData.mimeType || 'image/png';
        return `data:${mime};base64,${part.inlineData.data}`;
      }
      throw new Error(`${model} returned no image via generateContent`);
    } catch (error) {
      lastError = error;
      console.error(`[caseImageGenerator] ${model} failed:`, error instanceof Error ? error.message : error);
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Image generation returned no result');
};
