const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;
const mysql = require('mysql2')





//------Backend Stuff------
  // Port info to landing page
    app.get("/api/port", (req, res) => {
      res.json(port);
    });
  // Start server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:3000/main_interface/html%20files/landing.html?`);
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        })
    });
  // connect to mySQL
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myshoppingcart'
  })
  // Read data from submissions
    const bodyParser = require('body-parser');
    // Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // Parse application/json
    app.use(bodyParser.json());








//------Frontend Stuff------
// main_interface:
  //slide
    app.use(express.static(path.join(__dirname)));
    app.get("/api/length", (req, res) => {
      const length = fs.readdirSync("./main_interface/img/slide_backgrounds").length;
      res.json(length);
    });

  //sign_up
    app.post('/api/user_data', (req, res) => {
      console.log(req.body);
      let user_data = {
          user_name: req.body.username,
          email: req.body.email,
          password: req.body.password1
      };
      connection.connect((err) => {
        connection.query('INSERT INTO user_info SET ?', user_data, function (err, results, fields) {
          console.log("New user created!");
        });
    })
      connection.end();
      res.redirect('/main_interface/html files/verifying_email.html');
    });