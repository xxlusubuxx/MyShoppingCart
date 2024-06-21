const express = require("express");
const app = express();
const path = require("path");
const port = 2222;

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const fs = require("fs");

app.get("/api/length", (req, res) => {
  const length = fs.readdirSync("./slide_backgrounds").length;
  res.json(length);
});
