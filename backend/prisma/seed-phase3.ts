import { PrismaClient } from '@prisma/client';
import { sealSecret } from '../src/security/secrets';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed Fase 3 (Pistas e Teorias)...');
  const caso = await prisma.cases.findUnique({ where: { slug: 'o-presente-desaparecido' } });
  if (!caso) return;
  const caseVersion = await prisma.case_versions.findFirst({ where: { case_id: caso.id } });
  if (!caseVersion) return;

  // 1. Inserir Pistas
  const hints = [
    { index: 1, content: 'A água não veio do céu (Ah, esse era do tutorial, vamos usar outra: A caixa já estava vazia antes da festa).', rule: '{}' },
    { index: 2, content: 'O brinde foi o momento de distração perfeito para a caixa sumir.', rule: '{}' },
    { index: 3, content: 'O anfitrião planejou tudo para iniciar uma caça ao tesouro.', rule: '{}' }
  ];

  for (const h of hints) {
    await prisma.case_hints.upsert({
      where: {
        case_version_id_hint_index: { case_version_id: caseVersion.id, hint_index: h.index }
      },
       update: { content_encrypted: sealSecret(h.content) },
      create: {
        case_version_id: caseVersion.id,
        hint_index: h.index,
         content_encrypted: sealSecret(h.content),
        unlock_rule: h.rule,
        penalty_points: 100,
        is_available_from_start: h.index === 1
      }
    });
  }

  // 2. Inserir Campos de Solução
  const fields = [
    { key: 'what_happened', label: 'O que aconteceu?', order: 1 },
    { key: 'who', label: 'Quem foi o responsável?', order: 2 },
    { key: 'how', label: 'Como foi feito?', order: 3 },
    { key: 'why', label: 'Qual foi o motivo?', order: 4 }
  ];

  for (const f of fields) {
    await prisma.case_solution_fields.upsert({
      where: { case_version_id_field_key: { case_version_id: caseVersion.id, field_key: f.key } },
       update: { accepted_answers_encrypted: sealSecret('[]') },
      create: {
        case_version_id: caseVersion.id,
        field_key: f.key,
        label: f.label,
        is_required: true,
        evaluation_weight: 1.0,
         accepted_answers_encrypted: sealSecret('[]'),
        display_order: f.order
      }
    });
  }

  const officialCase = await prisma.cases.findUnique({ where: { slug: 'o-quarto-7' } });
  const officialVersion = officialCase ? await prisma.case_versions.findFirst({ where: { case_id: officialCase.id } }) : null;
  if (officialVersion) {
    const officialHints = ['A câmera não registrou a entrada no quarto.', 'O relógio foi quebrado depois que a cena foi preparada.', 'A chave reserva reduz o número de pessoas capazes de entrar.'];
    for (let index = 0; index < officialHints.length; index += 1) await prisma.case_hints.upsert({ where: { case_version_id_hint_index: { case_version_id: officialVersion.id, hint_index: index + 1 } }, update: { content_encrypted: sealSecret(officialHints[index]) }, create: { case_version_id: officialVersion.id, hint_index: index + 1, content_encrypted: sealSecret(officialHints[index]), unlock_rule: '{}', penalty_points: 100, is_available_from_start: index === 0 } });
  }

  console.log('Seed Fase 3 concluído!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
