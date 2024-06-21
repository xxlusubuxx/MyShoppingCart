const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const fs = require("fs");

app.get("/api/length", (req, res) => {
  const length = fs.readdirSync("./slide_backgrounds").length;
  res.json(length);
});

app.get("/api/port", (req, res) => {
  res.json(port);
})

app.post("/api/user_data", (req, res) => {
  const {inputValue,agree}  = req.body;
  const {authorization} = req.headers;
  res.send({
    inputValue,
    agree,
    authorization,
  });
})