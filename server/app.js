import express from "express"; //const express = require("express"); import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

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

  const authRouter = await import("./apps/auth.js");
  const registRouter = await import("./Website_Router/registRouter.js");
  const uploadRouter = await import("./Website_Router/uploadRouter.js");
  const jobRouter = await import("./apps/jobs.js");
  const categoryRouter = await import("./apps/category.js");
  const typeRouter = await import("./apps/type.js");
  const applyappliRouter = await import("./apps/applyappli.js");
  const jobAppRouter = await import("./apps/jobApp.js");
  const profileRouter = await import("./apps/profile.js");
  const followingRouter = await import("./apps/following.js");

  // router
  app.use("/regist", registRouter.default);
  app.use("/auth", authRouter.default);
  app.use("/upload", uploadRouter.default);
  app.use("/jobs", jobRouter.default);
  app.use("/jobapp", jobAppRouter.default);
  app.use("/following", followingRouter.default);
  app.use("/category", categoryRouter.default);
  app.use("/type", typeRouter.default);
  app.use("/apply", applyappliRouter.default);
  app.use("/profile", profileRouter.default);
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
