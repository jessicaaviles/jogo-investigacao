const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf8');
let apiKey = '';
envFile.split('\n').forEach(line => {
    if (line.startsWith('GEMINI_API_KEY=')) {
        apiKey = line.split('=')[1].trim();
    }
});

if (!apiKey) {
    console.error("No API key");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const STYLE_PREFIX = "Ilustração digital 2D estilo vetor (flat design), temática de detetive e mistério. Estilo de desenho animado/comic europeu, linhas limpas, SEM fotorrealismo. Paleta de cores sóbrias e vintage (tons de bege, marrom, cinza, azul escuro). Iluminação dramática com sombras marcadas. Arte para jogo de point-and-click. CENÁRIO: ";

const SCENES = [
  { id: "scene_living_room", prompt: STYLE_PREFIX + "Uma luxuosa sala de estar antiga, escura. Há um cofre embutido na parede e uma lareira. Uma caixa de fósforos gasta repousa sobre a mesa de centro. Tudo no estilo 2D vetor cartoon." },
  { id: "scene_library", prompt: STYLE_PREFIX + "Uma biblioteca clássica, estantes cheias de livros, iluminação sombria. Há uma taça de vinho quase vazia sobre a mesa principal, e um espelho antigo na parede refletindo um detalhe misterioso. Tudo no estilo 2D vetor cartoon." },
  { id: "scene_bedroom", prompt: STYLE_PREFIX + "Um quarto requintado e misterioso. Uma maleta executiva está sobre a cama desarrumada. No chão há algumas pílulas derrubadas e, num canto escuro, um pedaço de osso pequeno. Tudo no estilo 2D vetor cartoon." },
  { id: "scene_garden", prompt: STYLE_PREFIX + "Um jardim escuro com uma fonte de pedra. Perto da fonte há um livro contábil (ledger) escondido. O chão tem pegadas de lama (mud). Há um charuto parcialmente consumido no parapeito da fonte. Tudo no estilo 2D vetor cartoon." }
];

const CLUES = [
    { id: "ev_safe", prompt: STYLE_PREFIX + "Close-up de um cofre de parede antigo com mostrador numérico." },
    { id: "ev_matches", prompt: STYLE_PREFIX + "Close-up de uma caixa de fósforos meio gasta." },
    { id: "ev_receipt", prompt: STYLE_PREFIX + "Close-up de um recibo amassado e rasgado." },
    { id: "ev_glass", prompt: STYLE_PREFIX + "Close-up de uma taça de vinho com um fundo de vinho tinto." },
    { id: "ev_mirror", prompt: STYLE_PREFIX + "Close-up de um espelho de mão antigo." },
    { id: "ev_mud", prompt: STYLE_PREFIX + "Close-up de pegadas de lama no chão de pedra." },
    { id: "ev_suitcase", prompt: STYLE_PREFIX + "Close-up de uma maleta executiva de couro antiga." },
    { id: "ev_pills", prompt: STYLE_PREFIX + "Close-up de comprimidos caídos de um frasco." },
    { id: "ev_bones", prompt: STYLE_PREFIX + "Close-up de um pequeno pedaço de osso polido." },
    { id: "ev_fountain", prompt: STYLE_PREFIX + "Close-up de uma fonte de pedra de jardim clássica." },
    { id: "ev_ledger", prompt: STYLE_PREFIX + "Close-up de um livro contábil antigo encadernado em couro." },
    { id: "ev_cigar", prompt: STYLE_PREFIX + "Close-up de um charuto premium parcialmente fumado." }
];

const outputPath = "c:/Users/jbarbalho/Projetos/ultimo-vestigio/frontend/public/backgrounds";

async function generate() {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    // Generate Scenes
    for (const scene of SCENES) {
        console.log("Generating scene: " + scene.id);
        try {
            const result = await model.generateContent(scene.prompt);
            const base64Data = result.response.text();
            fs.writeFileSync(path.join(outputPath, `${scene.id}.png`), Buffer.from(base64Data, 'base64'));
            console.log("Saved " + scene.id);
        } catch (e) {
            console.error("Error generating " + scene.id, e);
        }
    }

    // Generate Clues
    for (const clue of CLUES) {
        console.log("Generating clue: " + clue.id);
        try {
            const result = await model.generateContent(clue.prompt);
            const base64Data = result.response.text();
            fs.writeFileSync(path.join(outputPath, `${clue.id}.png`), Buffer.from(base64Data, 'base64'));
            console.log("Saved " + clue.id);
        } catch (e) {
            console.error("Error generating " + clue.id, e);
        }
    }
}

generate();
