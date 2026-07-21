const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const rooms = await prisma.rooms.findMany({
    where: { status: 'IN_PROGRESS' },
    include: {
      players: true,
      turns: { where: { status: 'ACTIVE' } }
    }
  });
  rooms.forEach(r => {
    console.log("Room", r.id);
    console.log("Players:", r.players.map(p => ({ id: p.anonymous_user_id, turn_order: p.turn_order })));
    console.log("Active Turn:", r.turns);
  });
}
run().catch(console.error).finally(() => prisma.$disconnect());
