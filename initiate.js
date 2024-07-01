//------Backend Stuff------
  // Port info to landing page
    const express = require("express");
    const app = express();
    const port = 3000;
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
    const path = require("path");
    const fs = require("fs"); 
    app.use(express.static(path.join(__dirname)));
    app.get("/api/length", (req, res) => {
      const length = fs.readdirSync("./main_interface/img/slide_backgrounds").length;
      res.json(length);
    });
  //Connect to Data
  const mysql = require('mysql2/promise')
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myshoppingcart',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  })
  //sign_up
  async function checkEmail(email) {
    try {
      const checkEmail = `SELECT COUNT(*) as count FROM user_info WHERE email = ?`
      const [result] = await pool.query(checkEmail,[email]);  
        if (result[0].count > 0) {return true} else {return false};
    } catch (error) {
      console.error(error);
      return false; // Handle the error appropriately
    }
  }
  async function insertUser({username, email, password}) {
    try {
      const insertUser = `INSERT INTO user_info SET ?`
      await pool.query(insertUser,{user_name: username, email: email, password: password});
    } catch (error) {
      console.error(error);
      return false; // Handle the error appropriately
    }
  }
  app.post('/api/user_data/duplicate', async (req, res) => {
    console.log(req.body.email)
    const duplicate = await checkEmail(req.body.email)
    if (duplicate) {
      res.send({duplicate})
      console.log({duplicate})
      return false
    }
    else app.post('/api/user_data', async (req, res) => {
      console.log(req.body)
      const {
        username: username,
        email: email,
        password: password,
        user_type: user_type,
      } = req.body;
      insertUser({username, email, password});
      res.redirect('/main_interface/html files/verifying_email.html');
    });
  });
  //sign_in
  app.post('/api/user_sign_in', async (req, res) => {
    console.log(req.body.email_phone)
    const exist = await checkEmail(req.body.email_phone)
    console.log({exist})
    res.send({exist})
  })
  async function checkPassword(email) {
    try {
      const checkEmail = `SELECT * FROM user_info WHERE email = ?`
      const [result] = await pool.query(checkEmail,[email]);  
        return result[0].password;
    } catch (error) {
      console.error(error);
      return false; // Handle the error appropriately
    }
  }
  app.post('/api/user_password', async (req, res) => {
    console.log(req.body.email_phone)
    console.log(req.body.password)
    const correct = await checkPassword(req.body.email_phone) === req.body.password
    console.log({correct: correct})
    res.send({correct: correct})
  })