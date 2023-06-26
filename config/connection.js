const mysql = require('mysql2');
const util = require('util'); 


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '!loveCoding25',
        database: 'employeeTracker_db'
    },
    console.log('Connected to employeeTracker_db database.')
);

db.connect()

// set up our connection to use promises which allows for async await in queries
db.query = util.promisify(db.query)

module.exports = db