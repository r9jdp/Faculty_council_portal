const router = require("express").Router();
const { auth, requiresAuth } = require("express-openid-connect");
const isInTheCouncilTable = require("../Functions/isInTheDatabase");
const {
  FindCouncilDataFromEmail,
  FindYears,
} = require("../Functions/findDataFromEmail");
const {
  findCouncilDataFromId,
  getCertificates,
} = require("../Functions/findDataFromId");

router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    async function check_for_council() {
      email = req.oidc.user.email;
      try {
        const exists = await isInTheCouncilTable(email);
        console.log(`Email exists: ${exists}`);
        return exists;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (check_for_council()) {
      // if (req.oidc.user.email == "rajdeepvp273@gmail.com") {
      //   async function checkEmail() {
      //     email = req.oidc.user.email;
      //     try {
      //       const exists = await isInTheDatabase(email);
      //       console.log(`Email exists: ${exists}`);
      //     } catch (error) {
      //       console.error("Error:", error);
      //     }
      //   }
      //   checkEmail();

      async function councilData() {
        const data = await FindCouncilDataFromEmail(req.oidc.user.email);
        res.redirect(
          `/council?name=${data.council_name}&council_id=${data.council_id}`
        );
      }
      councilData();
    } else {
      res.redirect("/logout");
    }
  } else {
    res.redirect("/login");
  }
});

router.get("/council", requiresAuth(), (req, res) => {
  async function council_page_data() {
    years = await FindYears();
    console.log(years);
    res.render("council_login\\Welcome", {
      name: req.query.name,
      academic_year: years,
      council_id: req.query.council_id,
      tenure_id: req.query.tenure_id,
    });
  }
  council_page_data();
});

router.get("/view", requiresAuth(), (req, res) => {
  res.render("council_login\\view", {
    name: req.query.name,
    council_id: req.query.council_id,
    year: req.query.year,
    tenure_id: req.query.tenure_id,
  });
});

router.get("/viewcertificate", requiresAuth(), (req, res) => {
  async function certificates_view() {
    const data = await getCertificates(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );
    console.log({
      name: req.query.name,
      council_id: req.query.council_id,
      year: req.query.year,
      tenure_id: req.query.tenure_id,
      data,
    });

    res.render("council_login\\viewcertificate", {
      name: req.query.name,
      council_id: req.query.council_id,
      year: req.query.year,
      tenure_id: req.query.tenure_id,
      data,
    });
  }
  certificates_view();
});

router.get("/viewmember", requiresAuth(), (req, res) => {
  async function members_view() {
    const { members } = await findCouncilDataFromId(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );
    console.log(req.query);
    res.render("council_login\\viewmember", {
      members,
      name: req.query.name,
      council_id: req.query.council_id,
      year: req.query.year,
      tenure_id: req.query.tenure_id,
    });
  }
  members_view();
});

router.get("/viewactivities", requiresAuth(), (req, res) => {
  async function activities_view() {
    const { activities } = await findCouncilDataFromId(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );
    // console.log({activities,data:req.query.name});
    // console.log(req.query.name);

    res.render("council_login\\viewactivities", {
      activities,
      data: req.query.name,
    });
  }
  activities_view();
});

router.get("/summary", requiresAuth(), (req, res) => {
  res.render("council_login\\summary", {
    name: req.query.name,
    council_id: req.query.council_id,
    year: req.query.year,
    tenure_id: req.query.tenure_id,
  });
});

router.get("/summary_new", requiresAuth(), (req, res) => {
  async function summary_view() {
    const data = await findCouncilDataFromId(
      parseInt(req.query.council_id),
      parseInt(req.query.tenure_id)
    );
    console.log(req.query);
    res.render("council_login\\Summary_new", data);
    // res.json({name:"received"})
  }
  summary_view();
});

router.get("/new_edit", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\new_edit", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/editcertificate", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\editcertificate", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/editmember", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\editmember", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/editactivity", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\editactivity", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/addmember", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\addmember", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/addcertificate", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\addcertificate", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

router.get("/addactivity", requiresAuth(), (req, res) => {
  console.log(req.query);
  res.render("council_login\\addactivity", {
    name: req.oidc.user.name,
    academic_year: ["2024-2025", "2025-2026"],
    council_id: req.query.council_id,
    year: req.query.year,
  });
});

module.exports = router;
