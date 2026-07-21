const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function run() {
    const casesList = await prisma.cases.findMany();
    for (const c of casesList) {
        if (c.cover_image_data) {
            const b64 = c.cover_image_data.replace(/^data:image\/\w+;base64,/, '');
            fs.writeFileSync(c.slug + '.png', Buffer.from(b64, 'base64'));
            console.log('Saved', c.slug + '.png');
        }
    }
}
run().catch(console.error).finally(()=>prisma.$disconnect());
