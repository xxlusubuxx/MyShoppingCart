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

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Deadmonster0909205863**',
  database: 'users'
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})