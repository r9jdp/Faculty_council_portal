const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findCouncilDataFromId(council_id, tenure_id) {
  try {
    const certificates = await prisma.certificates.findMany({
      where: {
        // council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    const council = await prisma.councils.findFirst({
      where: {
        council_id: council_id,
      },
    });
    const members = await prisma.members.findMany({
      where: {
        council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    const activities = await prisma.activities.findMany({
      where: {
        council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    const faculty = await prisma.faculty_incharge.findMany({
      where: {
        council_id: council_id,
      },
    });

    // const membersWithDetails = await prisma.members.findMany({
    //     where: {
    //       tenure_id: tenure_id,
    //     },
    //     include: {
    //       tenure: {
    //         include: {
    //           activities: true, 
    //           certificates: true, 
    //         },
    //       },
    //       certificates: true, 


    //     },
    //   });
      
    //   console.log("Member details",membersWithDetails);
      
    
    return { certificates, members, activities, faculty, council };
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function getCertificates(council_id, tenure_id) {
  try {
    const members = await prisma.members.findMany({
      where: {
        council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    const certificates = [];
    members.forEach(async (item) => {
      const data = await prisma.certificates.findFirst({
        where: {
          member_id: item.member_id,
        },
      });
      data ? certificates.push(data) : null;
    });
    return certificates;
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  findCouncilDataFromId,
  getCertificates,
};
