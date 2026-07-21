const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const room = await prisma.rooms.findUnique({
    where: { id: "d294c9f8-3cfb-4ba1-9948-c7cc261e1f73" }
  });
  console.log("Current Host ID:", room.host_user_id);
  
  // Update the room host
  await prisma.rooms.update({
    where: { id: "d294c9f8-3cfb-4ba1-9948-c7cc261e1f73" },
    data: { host_user_id: "aa83f5b5-bb89-43d1-b30c-fdf7a212925d" }
  });
  
  // Update the player record
  await prisma.room_players.updateMany({
    where: { 
      room_id: "d294c9f8-3cfb-4ba1-9948-c7cc261e1f73",
      anonymous_user_id: room.host_user_id 
    },
    data: { anonymous_user_id: "aa83f5b5-bb89-43d1-b30c-fdf7a212925d" }
  });
  
  console.log("Updated Host and Player to aa83f5b5-bb89-43d1-b30c-fdf7a212925d!");
}
run().catch(console.error).finally(() => prisma.$disconnect());
