const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const rooms = await prisma.rooms.findMany({
    where: { id: "d294c9f8-3cfb-4ba1-9948-c7cc261e1f73" }
  });
  console.log(rooms[0].settings, typeof rooms[0].settings);
}
run().catch(console.error).finally(() => prisma.$disconnect());
