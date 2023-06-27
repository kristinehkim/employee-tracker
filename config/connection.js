const mysql = require('mysql2');
const util = require('util');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    
);
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to employeeTracker_db database.');
  });

db.connect()

// set up our connection to use promises which allows for async await in queries
db.query = util.promisify(db.query)

module.exports = db

// user: 'root',
// password: '!loveCoding25',
// database: 'employeeTracker_db'