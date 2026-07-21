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
    console.log("Players:", r.players.map(p => ({ id: p.id, anonId: p.anonymous_user_id })));
    console.log("Active Turn player_id:", r.turns[0]?.player_id);
  });
}
run().catch(console.error).finally(() => prisma.$disconnect());
