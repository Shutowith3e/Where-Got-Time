// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// require("./models/connection"); 
import express from "express";
import cors from "cors";
import env from "dotenv";
import supabase from "./models/connection.js";
import pkg from 'rrule';
const { datetime, RRule, RRuleSet, rrulestr } = pkg;
env.config();

const app = express();

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);

app.listen(3000, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${3000}...`
  )
);
