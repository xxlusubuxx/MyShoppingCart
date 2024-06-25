const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;
const mysql = require('mysql2')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myshoppingcart'
})





//------Backend Stuff------
  // Port info to landing page
    app.get("/api/port", (req, res) => {
      res.json(port);
    });
  // Start server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:3000/main_interface/html%20files/landing.html?`);
    });
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
  async function checkEmail(email) {
    try {
      await pool.getConnection((err, connection) => {
        const [result] = pool.query(
          `SELECT COUNT(*) as count FROM user_info WHERE email = ?`,
          [email]
        );  
        if (result[0].count > 0) {return true} else {return false};
      })
    } catch (error) {
      console.error('Error checking email and username:', error);
      return false; // Handle the error appropriately
    }
  }

  app.post('/api/user_data', async (req, res) => {
    const { username, email, password1 } = req.body;
    const duplicate = await checkEmail(req.body.email)
    if (!duplicate) {
      pool.getConnection((err, connection) => {
        pool.query(
          `INSERT INTO user_info SET ?`,
          { user_name: username, email: email, password: password1 }
        );
        res.redirect('/main_interface/html files/verifying_email.html');
      })
    } 
    if (duplicate) {
      console.log(`Has there been a user registered with this email of ${email}: ` + duplicate);
      return res.status(400).send('Email or username already in use.');
    }
  });
