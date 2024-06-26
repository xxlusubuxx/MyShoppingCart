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

  //sign_up
  const mysql = require('mysql2/promise')
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Deadmonster0909205863**',
    database: 'myshoppingcart',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  })
  app.set('views', './views');
  app.set('view engine', 'ejs');
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
      await pool.query(insertUser,{username, email, password});
    } catch (error) {
      console.error(error);
      return false; // Handle the error appropriately
    }
  }

  app.post('/', async (req, res) => {
    const {username: username, email: email, password: password1} = req.body;
    const duplicate = await checkEmail(req.body.email)
    if (!duplicate) {
      insertUser({username, email, password1});
      res.redirect('/main_interface/html files/verifying_email.html');
    } 
    if (duplicate) {
      //no idea what to do here
    }
  });
