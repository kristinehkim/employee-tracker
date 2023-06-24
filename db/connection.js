const mysql = require('mysql2');
const util = require('util')  


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

db.query = util.promisify(db.query)

module.exports = db