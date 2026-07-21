const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API key");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

function fileToGenerativePart(pathStr, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(pathStr)).toString("base64"),
            mimeType
        },
    };
}

async function analyze() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const parts = [
        fileToGenerativePart("c:/Users/jbarbalho/Projetos/ultimo-vestigio/frontend/public/backgrounds/mapa-da-investigacao.png", "image/png"),
        fileToGenerativePart("c:/Users/jbarbalho/Projetos/ultimo-vestigio/frontend/public/backgrounds/cena-do-crime.png", "image/png"),
        fileToGenerativePart("c:/Users/jbarbalho/Projetos/ultimo-vestigio/frontend/public/backgrounds/lobby.png", "image/png"),
        "Please describe the exact artistic style of these three images in extreme detail in Portuguese. What is the art style? Is it 2D vector, digital painting, realistic, stylized, cel-shaded? What is the color palette? What is the lighting like? I need to write an image generation prompt to generate more images in this EXACT same style. Give me the perfect prompt style prefix to use."
    ];

    try {
        const result = await model.generateContent(parts);
        console.log(result.response.text());
    } catch (e) {
        console.error(e);
    }
}

analyze();
