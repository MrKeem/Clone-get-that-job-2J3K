const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./apps/auth.js");
const registRouter = require("./Website_Router/registRouter.js");
const uploadRouter = require("./Website_Router/uploadRouter.js");
const jobRouter = require("./apps/jobs.js");
const categoryRouter = require("./apps/category.js");
const typeRouter = require("./apps/type.js");
const applyappliRouter = require("./apps/applyappli.js");
const jobAppRouter = require("./apps/jobApp.js");
const profileRouter = require("./apps/profile.js");
const followingRouter = require("./apps/following.js");

async function init() {
  dotenv.config();
  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.API_KEY,
  //   api_secret: process.env.API_SECRET,
  //   secure: true,
  // });
  const app = express();
  // const port = 4000;
  const port = process.env.PORT || 4000;

  app.use(cors());

  app.use(bodyParser.json());

  // router
  app.use("/regist", registRouter);
  app.use("/auth", authRouter);
  app.use("/upload", uploadRouter);
  app.use("/jobs", jobRouter);
  app.use("/jobapp", jobAppRouter);
  app.use("/following", followingRouter);
  app.use("/category", categoryRouter);
  app.use("/type", typeRouter);
  app.use("/apply", applyappliRouter);
  app.use("/profile", profileRouter);
  // router

  // test route
  app.get("/", (req, res) => {
    res.json("Hello Get That Job!");
    res.send("Hello Get That Job!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found, Check route");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // test route
  });
}

init();
