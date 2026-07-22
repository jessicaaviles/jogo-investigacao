import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const STYLE_PREFIX = `Dark cinematic noir aesthetic, photorealistic, high-detail, film-quality rendering. Low-key lighting, deep shadows, warm golden highlights. Color palette: desaturated cool shadows (deep teals, navy, charcoal) with selective warm tones (amber, rust, gold). Atmospheric haze, fog. No text or graphic overlays. 16:9 aspect ratio.`;

const ROOMS = [
  {
    id: 'scene_living_room',
    prompt: `${STYLE_PREFIX} A luxurious old living room at night, dimly lit by a fireplace. In the fireplace, faint burned paper remnants glow. On the dark carpet, a subtle blood stain is barely visible. Near an armchair, shards of a broken wine glass are scattered on the floor.`,
  },
  {
    id: 'scene_library',
    prompt: `${STYLE_PREFIX} A classic dark library with tall bookshelves. On the main desk, an opened letter with a red seal lies under a book. A small wall safe is visible behind a slightly displaced painting. In a crystal ashtray on the desk, a half-smoked premium cigar rests.`,
  },
  {
    id: 'scene_bedroom',
    prompt: `${STYLE_PREFIX} A grand master bedroom with an unmade canopy bed. On the vanity, an antique mirror reflects a faint message written on its surface. A open leather suitcase filled with heavy winter coats sits on the floor. On the nightstand, a spilled bottle of pills lies on its side.`,
  },
  {
    id: 'scene_garden',
    prompt: `${STYLE_PREFIX} A dark misty garden at night with an old stone fountain. Near the fountain base, a charred ledger book with leather binding lies half-buried. On the muddy path, two sets of footprints lead away from the house. Scattered bones with a small collar lie near the iron gate.`,
  },
];

const CLUES = [
  { id: 'ev_matches', prompt: `${STYLE_PREFIX} Close-up of burned paper fragments with "Aerolíneas Del Sur" logo visible, resting on cold ash in a dark fireplace. Cinematic macro shot, shallow depth of field, warm amber light from the side.` },
  { id: 'ev_receipt', prompt: `${STYLE_PREFIX} Close-up of a dark red blood stain on an ornate carpet, glowing faintly under UV light. The stain has an artificial splatter pattern. Cinematic macro shot, moody lighting.` },
  { id: 'ev_glass', prompt: `${STYLE_PREFIX} Close-up of shattered wine glass pieces on a dark hardwood floor. One large curved shard still has a trace of red wine. Cinematic macro shot, dramatic side lighting.` },
  { id: 'ev_ledger', prompt: `${STYLE_PREFIX} Close-up of an old leather-bound ledger on a dark wooden desk, pages open showing financial records. A red wax seal hangs from the binding. Cinematic macro shot, warm golden light.` },
  { id: 'ev_safe', prompt: `${STYLE_PREFIX} Close-up of an antique iron wall safe with a brass numerical dial, slightly ajar, revealing darkness inside. Cinematic shot, dusty atmosphere, single beam of light.` },
  { id: 'ev_cigar', prompt: `${STYLE_PREFIX} Close-up of a half-smoked premium cigar resting in a crystal ashtray on mahogany wood. Curling ash and smoke wisps. Cinematic macro shot, warm amber light.` },
  { id: 'ev_mirror', prompt: `${STYLE_PREFIX} Close-up of an ornate antique mirror on a vanity. Faint handwritten message in invisible ink becomes visible under dim light: "O jardim esconde a verdade". Cinematic shot, ethereal glow.` },
  { id: 'ev_suitcase', prompt: `${STYLE_PREFIX} Close-up of an open vintage leather suitcase on a bedroom floor, packed with heavy winter coats and thermal clothing. Dim hotel-like lighting. Cinematic shot, desaturated.` },
  { id: 'ev_pills', prompt: `${STYLE_PREFIX} Close-up of a small amber prescription bottle lying on its side on a dark wooden nightstand, white pills scattered around it. Prescription label visible. Cinematic macro shot.` },
  { id: 'ev_fountain', prompt: `${STYLE_PREFIX} Close-up of an old stone garden fountain with moss and water stains. A charred book ledger peeks out from a hidden cavity in the stone base. Cinematic shot, misty moonlight.` },
  { id: 'ev_mud', prompt: `${STYLE_PREFIX} Close-up of muddy ground with two distinct sets of footprints: one with heel marks, one with flat soles. Rain puddles reflect faint moonlight. Cinematic ground-level shot.` },
  { id: 'ev_bones', prompt: `${STYLE_PREFIX} Close-up of small animal bones scattered on dark soil near a rusted iron gate. A weathered leather dog collar with the name "Buster" lies beside them. Cinematic macro shot.` },
];

const imageModels = [
  'gemini-3.1-flash-lite-image',
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
  'gemini-3-pro-image'
];

const NEW_API_MODELS = new Set(['gemini-3.1-flash-lite-image', 'gemini-3.1-flash-image', 'gemini-3-pro-image']);

const outputPath = "c:/Users/jbarbalho/Projetos/ultimo-vestigio/frontend/public/backgrounds";

function loadApiKey() {
  const envPath = path.join(import.meta.dirname, '.env');
  const envFile = fs.readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('GEMINI_API_KEY=')) {
      let key = trimmed.split('=').slice(1).join('=').trim();
      key = key.replace(/^["']|["']$/g, '');
      return key;
    }
  }
  throw new Error('GEMINI_API_KEY not found in .env');
}

async function generateImage(ai, prompt) {
  for (const model of imageModels) {
    try {
      const useNewApi = NEW_API_MODELS.has(model);
      if (useNewApi) {
        const interaction = await ai.interactions.create({
          model,
          input: [{ type: 'text', text: prompt }],
          response_modalities: ['text', 'image'],
        });
        if (interaction.output_image?.data) {
          return Buffer.from(interaction.output_image.data, 'base64');
        }
      }
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseModalities: ['TEXT', 'IMAGE'] }
      });
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          return Buffer.from(part.inlineData.data, 'base64');
        }
      }
    } catch (e) {
      console.error(`  ${model} failed:`, e.message);
    }
  }
  throw new Error('All models failed');
}

async function main() {
  const apiKey = loadApiKey();
  const ai = new GoogleGenAI({ apiKey });
  console.log(`Generating ${ROOMS.length} room scenes and ${CLUES.length} clue images...\n`);

  // Generate room scenes
  for (let i = 0; i < ROOMS.length; i++) {
    const room = ROOMS[i];
    console.log(`[${i + 1}/${ROOMS.length}] Generating room: ${room.id}...`);
    try {
      const buffer = await generateImage(ai, room.prompt);
      fs.writeFileSync(path.join(outputPath, `${room.id}.png`), buffer);
      console.log(`  ✅ Saved ${room.id}.png`);
    } catch (e) {
      console.error(`  ❌ Failed: ${e.message}`);
    }
  }

  console.log('');

  // Generate clue images
  for (let i = 0; i < CLUES.length; i++) {
    const clue = CLUES[i];
    console.log(`[${i + 1}/${CLUES.length}] Generating clue: ${clue.id}...`);
    try {
      const buffer = await generateImage(ai, clue.prompt);
      fs.writeFileSync(path.join(outputPath, `${clue.id}.png`), buffer);
      console.log(`  ✅ Saved ${clue.id}.png`);
    } catch (e) {
      console.error(`  ❌ Failed: ${e.message}`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
