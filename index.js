const questions = require('./utils/questions');
const inquirer = require('inquirer');
const db = require('./db/connection');

const init = async () => {
    try {
        const responses = await inquirer.prompt(questions);
    }
    catch (err) {
        console.error(err)
    }
};

// init();


async function viewAllDepartments() {
    let query = 'SELECT * FROM department'
    db.query(query, (err, res) => {
        console.table(res)
    })
}
viewAllDepartments()

// switch statements for what they choose call the function when they choose it