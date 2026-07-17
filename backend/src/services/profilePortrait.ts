import { GoogleGenAI } from '@google/genai';

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const imageModels = [
  process.env.GEMINI_IMAGE_MODEL,
  'gemini-2.5-flash-image',
  'gemini-3.1-flash-image',
  'gemini-3-pro-image'
].filter(Boolean) as string[];

const profilePortraitPrompt = `Create an ultra-realistic cinematic investigator profile portrait using the reference photos.

The portrait MUST preserve the exact identity of the person.

Do not alter facial structure, bone proportions, eyes, nose, mouth, jawline, ears, skin tone, age, body type or any distinctive facial characteristics.

Do not beautify, idealize or stylize the person.
Maintain natural asymmetries, pores, skin texture, freckles, expression lines and all individual identity traits.

The result should look exactly like the same real person photographed professionally.

STYLE

Premium contemporary investigative thriller.

Inspired by high-end streaming crime dramas and cinematic photography.

The image should feel sophisticated, realistic and mysterious without looking like horror, cyberpunk or fantasy.

COLOR PALETTE

Muted blue-gray

Olive green

Warm beige

Dark burgundy

Soft charcoal

Avoid neon colors, saturated blues, glowing effects and pure black.

WARDROBE

Simple contemporary investigator clothing.

Dark jacket or overshirt.

Neutral t-shirt or shirt underneath.

No visible logos.

Minimal accessories.

POSE

Chest-up portrait.

Body slightly turned (3/4 angle).

Eyes looking directly at camera.

Calm, intelligent and observant expression.

Subtle confidence.

No exaggerated smile.

LIGHTING

Soft cinematic lighting.

Natural window-light feeling.

Gentle shadows.

High dynamic range.

No dramatic rim light.

BACKGROUND

Softly blurred investigative environment.

Hints of evidence boards, archived documents, maps, detective office, police files or research materials.

Everything heavily out of focus.

The person remains the visual focus.

CAMERA

Professional full-frame camera.

85mm lens.

Shallow depth of field.

Extremely sharp eyes.

Natural skin rendering.

EDITORIAL DIRECTION

Looks like an official investigator profile from a premium investigation game.

Elegant.

Minimal.

Believable.

Cinematic.

Timeless.

IMAGE QUALITY

Ultra realistic.

Photographic.

8K.

Natural colors.

No AI artifacts.

No cartoon style.

No illustration.

No fantasy armor.

No exaggerated contrast.

No beauty filter.

No skin smoothing.

Identity preservation is the highest priority.`;

const generateWithOpenAI = async (mimeType: string, base64Data: string) => {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
  if (!apiKey) throw new Error('OpenAI image generation is unavailable');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const form = new FormData();
  form.append('model', process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1');
  form.append('prompt', profilePortraitPrompt);
  form.append('size', '1024x1024');
  form.append('image', new Blob([imageBuffer], { type: mimeType }), `profile.${mimeType.split('/')[1]}`);
  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });
  const payload = await response.json() as any;
  if (!response.ok) throw new Error(payload?.error?.message || 'OpenAI image generation failed');
  const image = payload?.data?.[0]?.b64_json;
  if (!image) throw new Error('OpenAI returned no portrait');
  return `data:image/png;base64,${image}`;
};

export const generateProfilePortrait = async (sourceDataUrl: string) => {
  const match = sourceDataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || !allowedMimeTypes.has(match[1])) throw new Error('Unsupported profile image');
  if (Buffer.byteLength(match[2], 'base64') > 4 * 1024 * 1024) throw new Error('Profile image is too large');
  let lastError: unknown;
  if (process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY) {
    try { return await generateWithOpenAI(match[1], match[2]); }
    catch (error) { lastError = error; }
  }

  if (!process.env.GEMINI_API_KEY) throw lastError instanceof Error ? lastError : new Error('Image generation is unavailable');

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
