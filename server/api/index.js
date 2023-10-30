const app = require("express");
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "../apps/auth";
import dotenv from "dotenv";
import registRouter from "../Website_Router/registRouter";
import uploadRouter from "../Website_Router/uploadRouter";
import jobRouter from "../apps/jobs";
import categoryRouter from "../apps/category";
import typeRouter from "../apps/type";
import applyappliRouter from "../apps/applyappli";
import jobAppRouter from "../apps/jobApp";
import profileRouter from "../apps/profile";
import followingRouter from "../apps/following";

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
module.exports = app;
