const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const { FindYears } = require("../Functions/findDataFromEmail");
const { councilDetaills } = require("../Functions/FacultyData");
const { getCertificates, getMembers, getActivities, getPending } = require("../Functions/findDataFromId");

router.get("/faculty", requiresAuth(), (req, res) => {
  async function FacultyHomePage() {
    const years = await FindYears();
    const council_data = await councilDetaills(parseInt(req.query.council_id));

    res.render("FacultyPage\\HomePage\\homePage", {
      academic_year: years,
      council_id: req.query.council_id,
      faculty_id: req.query.faculty_id,
      councils: council_data,
    });
  }
  FacultyHomePage();
});

router.get("/faculty/viewCertificates", requiresAuth(), (req, res) => {
  async function FacultyViewCertificate() {
    const data = await getCertificates(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );
    res.render("FacultyPage\\ViewPage\\ViewCertificate\\viewCertificate", {
      council_id: req.query.council_id,
      tenure_id: req.query.tenure_id,
      faculty_id : req.query.faculty_id,
      data,
    });
  }
  FacultyViewCertificate();
});

router.get("/faculty/viewMember", requiresAuth(), (req, res) => {
  async function FacultyviewMember() {
    const data = await getMembers(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );    
    
    res.render("FacultyPage\\ViewPage\\ViewMember\\viewMember", {
      council_id: req.query.council_id,
      tenure_id: req.query.tenure_id,
      faculty_id : req.query.faculty_id,
      data,
    });
  }
  FacultyviewMember();
});

router.get("/faculty/viewActivity", requiresAuth(), (req, res) => {
  async function FacultyviewActivities() {
    const data = await getActivities(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );    

    res.render("FacultyPage\\ViewPage\\ViewActivity\\viewActivity", {
      council_id: req.query.council_id,
      tenure_id: req.query.tenure_id,
      faculty_id : req.query.faculty_id,
      data
    });
  }
  FacultyviewActivities();
});

router.get("/faculty/viewPending", requiresAuth(), (req, res) => {
  async function FacultyviewPendings() {   
    const data = await getPending(
        parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    )
    console.log(data);
    
    res.render("FacultyPage\\ViewPage\\ViewPending\\viewPending", {
      council_id: req.query.council_id,
      tenure_id: req.query.tenure_id,
      faculty_id : req.query.faculty_id,
      ...data
    });
  }
  FacultyviewPendings();
});

module.exports = router;
