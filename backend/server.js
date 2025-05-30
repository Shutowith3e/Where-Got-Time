import express from "express";

const app = express();

app.get("/", (_, response) =>
  response.json({ info: "Express app with Supabase" })
);

app.listen(3000, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${3000}...`
  )
);
