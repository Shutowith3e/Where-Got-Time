require('dotenv').config();
const express = require("express");
const cors = require("cors");
require("./models/connection");
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule';

const app = express();

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);

app.listen(3000, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${3000}...`
  )
);
