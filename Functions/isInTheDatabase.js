const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function isInTheCouncilTable(email) {
    try {
        const council = await prisma.councils.findFirst({
            where: {
                council_email: email
            }
        });
        return council !== null; 
    } catch (error) {
        console.error('Error querying the database:', error);
        return false; 
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = isInTheCouncilTable;
