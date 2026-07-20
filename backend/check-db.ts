import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const cases = await prisma.cases.findMany({
    include: {
      versions: {
        include: {
          hints: true,
          solution_fields: true,
          facts: true
        }
      }
    }
  });
  for (const c of cases) {
    const v = c.versions[0];
    console.log(`- ${c.title}: ${v?.facts?.length || 0} fatos, ${v?.hints?.length || 0} pistas, ${v?.solution_fields?.length || 0} campos.`);
  }
}
main().finally(() => prisma.$disconnect());
