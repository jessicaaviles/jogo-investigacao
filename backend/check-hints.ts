import { PrismaClient } from '@prisma/client';
import { unsealSecret } from './src/security/secrets';
const prisma = new PrismaClient();
async function main() {
  const cases = await prisma.cases.findMany({ include: { versions: { include: { hints: true } } } });
  for (const c of cases) {
    console.log(`\n--- ${c.title} ---`);
    for (const h of c.versions[0]?.hints || []) {
      console.log(`Hint ${h.hint_index}: ${unsealSecret(h.content_encrypted)}`);
    }
  }
}
main().finally(() => prisma.$disconnect());
