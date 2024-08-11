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

async function getMembers(council_id, tenure_id) {
  try {
    const members = await prisma.members.findMany({
      where: {
        council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    return members;
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function getActivities(council_id, tenure_id) {
  try {
    const activities = await prisma.activities.findMany({
      where: {
        council_id: council_id,
        tenure_id: tenure_id,
      },
    });
    return activities;
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function getPending(council_id, tenure_id) {
  try {
    // Fetch pending activities, members, and certificates
    const pendingActivitiesID = await prisma.activity_faculty_approval.findMany({
      where: {
        approval_status: {
          in: ["Pending", "Rejected"]
        }
      }
    });
    
    const pendingMembersID = await prisma.member_faculty_approval.findMany({
      where: {
        approval_status: {
          in: ["Pending", "Rejected"]
        }
      }
    });
    
    const pendingCertificateID = await prisma.certificate_faculty_approval.findMany({
      where: {
        approval_status: {
          in: ["Pending", "Rejected"]
        }
      }
    });

    // Extract IDs for querying
    const activityIds = pendingActivitiesID.map(item => item.activity_id);
    const memberIds = pendingMembersID.map(item => item.member_id);
    const certificateIds = pendingCertificateID.map(item => item.certificate_id);

    // Fetch details for activities, members, and certificates
    const activities = await prisma.activities.findMany({
      where: {
        activity_id: {
          in: activityIds
        }
      }
    });
    
    const members = await prisma.members.findMany({
      where: {
        member_id: {
          in: memberIds
        }
      }
    });
    
    const certificates = await prisma.certificates.findMany({
      where: {
        certificate_id: {
          in: certificateIds
        }
      }
    });

    // Create lookup maps for approval status
    const activityApprovalStatus = new Map(
      pendingActivitiesID.map(item => [item.activity_id, item.approval_status])
    );
    
    const memberApprovalStatus = new Map(
      pendingMembersID.map(item => [item.member_id, item.approval_status])
    );
    
    const certificateApprovalStatus = new Map(
      pendingCertificateID.map(item => [item.certificate_id, item.approval_status])
    );

    // Add approval status to each activity
    const activitiesWithStatus = activities.map(activity => ({
      ...activity,
      approval_status: activityApprovalStatus.get(activity.activity_id) || 'Unknown'
    }));
    
    // Add approval status to each member
    const membersWithStatus = members.map(member => ({
      ...member,
      approval_status: memberApprovalStatus.get(member.member_id) || 'Unknown'
    }));
    
    // Add approval status to each certificate
    const certificatesWithStatus = certificates.map(certificate => ({
      ...certificate,
      approval_status: certificateApprovalStatus.get(certificate.certificate_id) || 'Unknown'
    }));

    return { members: membersWithStatus, certificates: certificatesWithStatus, activities: activitiesWithStatus };
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
  getMembers,
  getActivities,
  getPending
};
