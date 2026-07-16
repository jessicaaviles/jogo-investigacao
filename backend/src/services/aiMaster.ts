import { GoogleGenAI, Type, Schema } from '@google/genai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Mestre IA - Fase 2 do MVP
export const processQuestion = async (roomId: string, questionText: string, caseVersionId: string) => {
  try {
    const cleanQuestion = String(questionText || '').trim().slice(0, 500);
    if (!cleanQuestion) throw new Error('Empty question');
    if (/(ignore|esqueça|revele|mostre|prompt|instruções|system message|segredo|solução completa)/i.test(cleanQuestion)) {
      return { classification: 'BLOCKED', rendered_text: 'Essa pergunta não pode alterar as regras da investigação. Reformule usando os fatos do caso.' };
    }
    // 1. Obter todos os fatos do caso do banco de dados (A Verdade Absoluta)
    const facts = await prisma.case_facts.findMany({
      where: { case_version_id: caseVersionId, visibility: { not: 'SECRET' } }
    });

    const factListText = facts.map(f => `- ${f.statement}`).join('\n');

    // 2. Definir o Schema de Resposta (Interpretação Semântica + Classificação Factual)
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        classification: {
          type: Type.STRING,
          description: "Deve ser exatamente um destes: YES, NO, PARTIAL, IRRELEVANT, UNKNOWN, AMBIGUOUS, MULTI_PREMISE",
        },
        premises: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "As premissas extraídas da pergunta."
        },
        factualExplanation: {
          type: Type.STRING,
          description: "O contexto permitido que justifica a classificação, baseado APENAS nos fatos fornecidos."
        }
      },
      required: ["classification", "premises", "factualExplanation"]
    };

    const prompt = `Você atua como o motor lógico (Mestre IA) de um jogo de investigação.
Sua função é interpretar a pergunta do jogador e classificá-la ESTRITAMENTE baseada nos fatos fornecidos abaixo.
Você NÃO pode inventar fatos, usar conhecimento externo ou tentar adivinhar o que não está escrito.

Fatos Absolutos do Caso:
${factListText}

Regras de Classificação:
- YES: a pergunta/afirmação é verdadeira segundo os fatos.
- NO: a pergunta/afirmação é falsa segundo os fatos.
- PARTIAL: parte é verdade, parte é falsa ou incompleta.
- IRRELEVANT: não tem relação nenhuma com os fatos ou com a solução.
- UNKNOWN: os fatos não dizem nada sobre isso (não invente!).
- AMBIGUOUS: a pergunta usa pronomes soltos ou não faz sentido direto.

Pergunta do Jogador: "${questionText}"

Analise a pergunta, extraia as premissas, compare com os Fatos Absolutos e gere a saída.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.1 // Baixa temperatura para ser estrito e determinístico
      }
    });

    if (!response.text) {
      throw new Error("Erro na geração do motor lógico");
    }

    const logicResult = JSON.parse(response.text);
    const allowedClassifications = new Set(['YES', 'NO', 'PARTIAL', 'IRRELEVANT', 'UNKNOWN', 'BLOCKED', 'AMBIGUOUS', 'MULTI_PREMISE']);
    if (!allowedClassifications.has(logicResult.classification) || !Array.isArray(logicResult.premises) || typeof logicResult.factualExplanation !== 'string') {
      throw new Error('Invalid interpretation');
    }

    // 3. Camada 3 - Redação Narrativa (Geração de Texto Final)
    const narrativePrompt = `Você é o narrador do Mestre IA em um jogo de mistério familiar.
Sua resposta final ao jogador deve refletir a seguinte decisão factual:
Classificação: ${logicResult.classification}
Justificativa factual: ${logicResult.factualExplanation}

Regras:
1. Responda em no máximo 2 frases curtas.
2. Não invente nada fora da justificativa factual.
3. Se a classificação for YES, comece com "Sim.". Se NO, comece com "Não.". Se PARTIAL, comece com "Parcialmente.". Se IRRELEVANT, comece com "Isso é irrelevante.".
4. Use um tom intrigante e levemente misterioso.`;

    const narrativeResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: narrativePrompt,
      config: {
        temperature: 0.5
      }
    });

    const finalAnswerText = (narrativeResponse.text?.trim() || "Não foi possível analisar sua pergunta com segurança. Reformule.").slice(0, 360);

    return {
      classification: logicResult.classification,
      rendered_text: finalAnswerText,
      fallback_used: false
    };

  } catch (error) {
    console.error("Erro no Mestre IA:", error);
    // 4. Camada 4 - Fallback Seguro
    return {
      classification: "UNKNOWN",
      rendered_text: "Não foi possível analisar sua pergunta com segurança. Reformule.",
      fallback_used: true
    };
  }
};

export const evaluateTheory = async (theoryAnswers: any, trueSolutionText: string) => {
  const stopWords = new Set(['para', 'como', 'uma', 'que', 'foi', 'com', 'dos', 'das', 'por', 'antes', 'durante', 'the', 'and']);
  const tokens = (value: string) => new Set(String(value || '').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]{4,}/g)?.filter((word) => !stopWords.has(word)) || []);
  const solutionTokens = tokens(trueSolutionText);
  const fields = ['what_happened', 'who', 'how', 'why'];
  const dimensionResults = fields.reduce<Record<string, number>>((result, field) => {
    const answerTokens = tokens(theoryAnswers?.[field]);
    const overlap = [...answerTokens].filter((token) => solutionTokens.has(token)).length;
    result[field] = answerTokens.size ? Math.min(100, Math.round((overlap / Math.min(answerTokens.size, 6)) * 100)) : 0;
    return result;
  }, {});
  const score = Math.max(0, Math.min(100, Math.round(Object.values(dimensionResults).reduce((sum, value) => sum + value, 0) / fields.length)));
  return { score, feedback: score >= 75 ? 'A teoria acompanha os fatos essenciais do caso.' : score >= 40 ? 'Há conexões corretas, mas alguns detalhes ainda não fecham a linha do tempo.' : 'A hipótese se afasta dos fatos disponíveis. Volte ao histórico e observe as pequenas inconsistências.', dimensionResults };
};
