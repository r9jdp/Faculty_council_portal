const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function FacultyDataFromEmail(email) {
    try {
        const facultyData = await prisma.faculty_incharge.findFirst({
            where: {
                faculti_email: email
            }
        });
        return facultyData; 
    } catch (error) {
        console.error('Error querying the database:', error);
        return false; 
    } finally {
        await prisma.$disconnect();
    }
}

async function councilDetaills(id) {
    try {
        const data = await prisma.councils.findFirst({
            where:{
                council_id : id,
            }
        });
        return data; 
    } catch (error) {
        console.error('Error querying the database:', error);
        return false; 
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    FacultyDataFromEmail,
    councilDetaills
};