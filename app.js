const express = require("express");
const app = express();
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
const bodyParser = require("body-parser");
const PORT = 4444 || process.env.PORT;
const mainRouter = require("./routes/main");


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "99f5dd86dc25fae67c71806dd817b786a683d0f59d3a0ecd9c3e41f2baeb7ab6",
  baseURL: "http://localhost:4444",
  clientID: "LItpp2OobdzjyXPIrMlWusc5H2IPGPWv",
  issuerBaseURL: "https://dev-s3hok5sjnjxe44h3.us.auth0.com",
};

app.use(auth(config));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(mainRouter);


app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
