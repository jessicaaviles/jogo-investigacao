import { PrismaClient } from '@prisma/client';
import { sealSecret } from '../src/security/secrets';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // 1. Criar o Caso: O Presente Desaparecido
  const caso = await prisma.cases.upsert({
    where: { slug: 'o-presente-desaparecido' },
    update: {},
    create: {
      slug: 'o-presente-desaparecido',
      title: 'O Presente Desaparecido',
      short_synopsis: 'Durante uma comemoração em família, um presente desaparece de uma mesa diante de todos. Ninguém saiu do ambiente.',
      case_type: 'Rápido',
      difficulty: 'Fácil',
      estimated_duration_minutes: 8,
      min_players: 2,
      max_players: 6,
      tension_level: 1,
      status: 'PUBLISHED'
    }
  });

  // 2. Criar a Versão do Caso
  const caseVersion = await prisma.case_versions.upsert({
    where: {
      case_id_version_number: {
        case_id: caso.id,
        version_number: '1.0'
      }
    },
    update: {
      solution_summary_encrypted: sealSecret('O anfitrião planejou iniciar uma caça ao tesouro e guardou a caixa sob a toalha.'),
      full_solution_encrypted: sealSecret('A caixa era apenas cenográfica (sem presente dentro). O anfitrião (responsável), dobrou a caixa vazia de papel e colocou sob a toalha da mesa durante o brinde como distração, para iniciar uma caça ao tesouro.'),
      chronology_encrypted: sealSecret(JSON.stringify([]))
    },
    create: {
      case_id: caso.id,
      version_number: '1.0',
      opening: 'Durante uma comemoração em família, um presente desaparece de uma mesa diante de todos. Ninguém saiu do ambiente e nenhuma pessoa admite ter tocado na caixa.',
      master_style: JSON.stringify({ tone: "familiar", humorAllowed: false, maxSentences: 2 }),
      scoring_rules: JSON.stringify({ baseScore: 1000, penaltyPerHint: 100 }),
       solution_summary_encrypted: sealSecret('O anfitrião planejou iniciar uma caça ao tesouro e guardou a caixa sob a toalha.'),
       full_solution_encrypted: sealSecret('A caixa era apenas cenográfica (sem presente dentro). O anfitrião (responsável), dobrou a caixa vazia de papel e colocou sob a toalha da mesa durante o brinde como distração, para iniciar uma caça ao tesouro.'),
       chronology_encrypted: sealSecret(JSON.stringify([])),
      publication_status: 'PUBLISHED',
      published_at: new Date()
    }
  });

  // 3. Fatos Essenciais (case_facts)
  const facts = [
    { fact_key: 'no_theft', statement: 'Ninguém roubou o conteúdo naquele momento.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' },
    { fact_key: 'box_was_empty', statement: 'A caixa estava vazia desde antes.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' },
    { fact_key: 'host_action', statement: 'O anfitrião planejou a ação.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' },
    { fact_key: 'present_hidden', statement: 'O presente real estava escondido em outro lugar da casa.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' },
    { fact_key: 'box_folded', statement: 'A caixa era de papel rígido e foi dobrada.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' },
    { fact_key: 'hid_under_table', statement: 'A caixa foi colocada sob a toalha da mesa.', visibility: 'ANSWER', pre_unlock_policy: 'ANSWER' }
  ];

  for (const f of facts) {
    await prisma.case_facts.upsert({
      where: {
        case_version_id_fact_key: {
          case_version_id: caseVersion.id,
          fact_key: f.fact_key
        }
      },
      update: {},
      create: {
        case_version_id: caseVersion.id,
        fact_key: f.fact_key,
        statement: f.statement,
        visibility: f.visibility,
        pre_unlock_policy: f.pre_unlock_policy,
        is_solution_critical: true
      }
    });
  }

  // Caso oficial da direção de arte: O Quarto 7.
  const officialCase = await prisma.cases.upsert({
    where: { slug: 'o-quarto-7' },
    update: { status: 'PUBLISHED' },
    create: {
      slug: 'o-quarto-7',
      title: 'O Quarto 7',
      short_synopsis: 'Helena Duarte foi encontrada no Hotel Vesper. Uma chave, uma câmera e um relógio quebrado aguardam uma explicação.',
      case_type: 'Caso Oficial', difficulty: 'Fácil', estimated_duration_minutes: 20, min_players: 2, max_players: 6, tension_level: 3, status: 'PUBLISHED'
    }
  });
  const officialVersion = await prisma.case_versions.upsert({
    where: { case_id_version_number: { case_id: officialCase.id, version_number: '1.0' } },
    update: {},
    create: {
      case_id: officialCase.id, version_number: '1.0',
      opening: 'Helena Duarte foi encontrada no Hotel Vesper. A porta do Quarto 7 estava trancada, uma câmera apontava para o corredor e um relógio quebrado marcava 23h17.',
      master_style: JSON.stringify({ tone: 'investigative', maxSentences: 2 }), scoring_rules: JSON.stringify({ baseScore: 1000, penaltyPerHint: 100 }),
      solution_summary_encrypted: sealSecret('A cena foi preparada para parecer um quarto trancado por dentro.'),
      full_solution_encrypted: sealSecret('O gerente do Hotel Vesper usou uma chave reserva para entrar no Quarto 7, posicionou a câmera para criar um álibi e quebrou o relógio durante a encenação. O bilhete e a digital parcial ligam a preparação ao gerente.'),
      chronology_encrypted: sealSecret(JSON.stringify([{ time: '23h17', event: 'A câmera registra o corredor' }])), publication_status: 'PUBLISHED', published_at: new Date()
    }
  });
  const officialFacts = [
    ['door_locked', 'A porta foi trancada usando uma chave reserva.', 'ANSWER'],
    ['camera_positioned', 'A câmera foi posicionada para produzir um álibi.', 'ANSWER'],
    ['broken_clock', 'O relógio foi quebrado durante a encenação.', 'ANSWER'],
    ['partial_fingerprint', 'A digital parcial pertence ao gerente do hotel.', 'ANSWER'],
    ['note_relevant', 'O bilhete foi deixado para direcionar a investigação.', 'ANSWER']
  ];
  for (const [fact_key, statement, visibility] of officialFacts) await prisma.case_facts.upsert({ where: { case_version_id_fact_key: { case_version_id: officialVersion.id, fact_key } }, update: {}, create: { case_version_id: officialVersion.id, fact_key, statement, visibility, pre_unlock_policy: 'ANSWER', is_solution_critical: true } });

  console.log('Seed dos casos oficiais concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
