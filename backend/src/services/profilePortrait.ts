import { GoogleGenAI } from '@google/genai';

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const imageModels = [
  process.env.GEMINI_IMAGE_MODEL,
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
  'gemini-3-pro-image'
].filter(Boolean) as string[];

const profilePortraitPrompt = `EDIT THIS PHOTO — do NOT generate a new person.

Take the supplied reference photograph and transform it according to the description below. The face, hair, body, age and all physical characteristics must remain exactly as in the reference photo. Do not recreate or reinterpret the person — edit the existing photo.

Now apply this transformation:

Instruction for the AI: Generate a high-quality, circular-framed profile image, strictly based on the input photograph.

Subject: Accurately preserve the facial features, bone structure, hairstyle, and any distinctive accessories (such as glasses or piercings) of the person in the original image.

Attire: The person must be wearing a dark, utilitarian trench coat. On the lapel or chest of the coat, there must be a circular, embossed gold metal badge, featuring the number "12" in a classic style.

Setting: The original background is replaced by a dark, rugged, and stormy coastal landscape. On a distant cliff, an ancient, gloomy manor house is visible, with a few faint, yellow lights in its windows.

Lighting and Atmosphere: The lighting must be dramatic, chiaroscuro style, with a strong contrast between deep shadows (navy blue/black) and warm light highlights (gold). The mood is melancholic and mysterious.

Style: The final image must have a tactile film texture, with visible grain, emulated from high-caliber photographic film.`;

export const generateProfilePortrait = async (sourceDataUrl: string) => {
  const match = sourceDataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || !allowedMimeTypes.has(match[1])) throw new Error('Unsupported profile image');
  if (Buffer.byteLength(match[2], 'base64') > 4 * 1024 * 1024) throw new Error('Profile image is too large');

  if (!process.env.GEMINI_API_KEY) throw new Error('Image generation is unavailable');

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let lastError: unknown;
  for (const model of imageModels) {
    try {
      const response: any = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ inlineData: { mimeType: match[1], data: match[2] } }, { text: profilePortraitPrompt }] }],
        config: { responseModalities: ['TEXT', 'IMAGE'] }
      } as any);
      const imagePart = response.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData?.data);
      if (imagePart?.inlineData?.data) {
        const mimeType = imagePart.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${imagePart.inlineData.data}`;
      }
      lastError = new Error(`${model} returned no portrait`);
    } catch (error) { lastError = error; }
  }
  throw lastError instanceof Error ? lastError : new Error('Image generation returned no portrait');
};
