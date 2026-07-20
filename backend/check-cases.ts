import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const cases = await prisma.cases.findMany();
  for (const c of cases) {
    console.log(c.slug);
  }
}
main().finally(() => prisma.$disconnect());
