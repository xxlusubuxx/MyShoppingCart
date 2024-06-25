const express = require("express");
const app = express();
const port = 3000;
const mysql = require('mysql2')
// connect to mySQL
  const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myshoppingcart'
})
//sign_up
  app.post('/api/user_data', (req, res) => {

    let user_check_for_duplicate = 'SELECT COUNT(*) FROM user_info WHERE email = ?';
    connection.connect((err) => {
      connection.query(user_check_for_duplicate, "hungdoan160796@gmail.com", (err, res) => {
        console.log(res)
      });
    })
    connection.end();  
  })
