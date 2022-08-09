const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

connection.connect((err:Error) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  });

module.exports = connection;