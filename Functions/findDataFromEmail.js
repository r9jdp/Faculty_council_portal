const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function FindCouncilDataFromEmail(value) {
    try {
        const council = await prisma.councils.findFirst({
            where: {
                council_email: email
            }
        });
        return council?council:null; 
    } catch (error) {
        console.error('Error querying the database:', error);
        return false; 
    } finally {
        await prisma.$disconnect();
    }
}

async function FindYears(){
    try {
        const years = await prisma.tenure.findMany();
        return years; 
    } catch (error) {
        console.error('Error querying the database:', error);
        return false; 
    } finally {
        await prisma.$disconnect();
    }    
}

// async function certificateDataFetch(council_id,tenure) {
//     try {
//         const years = await prisma.tenure.findMany();
//         return years; 
//     } catch (error) {
//         console.error('Error querying the database:', error);
//         return false; 
//     } finally {
//         await prisma.$disconnect();
//     }    
// }

module.exports = {
    FindCouncilDataFromEmail,
    FindYears
};
