/*
import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";
*/

const express = require("express");
const { pool } = require("../utils/db_connection.js");
const { protect } = require("../utils/protect.js");

const jobAppRouter = express.Router();
jobAppRouter.use(protect);

jobAppRouter.get("/", async (req, res) => {
  try {
    // const userid = `${req.query.userId}`;
    const userid = req.user.user_id;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    // console.log(`user id is ${userid}`);

    let query = "";
    let values = [];

    query = `SELECT job_id
    FROM application
    WHERE user_id = $1`;
    values = [userid];

    const result = await pool.query(query, values);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

//export default jobAppRouter;

module.exports = jobAppRouter;
