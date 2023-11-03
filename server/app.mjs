import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./apps/auth.js";
import registRouter from "./Website_Router/registRouter.js";
import uploadRouter from "./Website_Router/uploadRouter.js";
import jobRouter from "./apps/jobs.js";
import categoryRouter from "./apps/category.js";
import typeRouter from "./apps/type.js";
import applyappliRouter from "./apps/applyappli.js";
import jobAppRouter from "./apps/jobApp.js";
import profileRouter from "./apps/profile.js";
import followingRouter from "./apps/following.js";

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
export default app;
