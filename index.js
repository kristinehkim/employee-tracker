const questions = require('./utils/questions');
const inquirer = require('inquirer');
const db = require('./config/connection');

const init = async () => {
    try {
        const responses = await inquirer.prompt(questions);
        switch (responses) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Exit Program':
                break
        }
    }
    catch (err) {
        console.error(err)
    }
};

init();


async function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        console.table(res);
    })
}

viewAllDepartments();

async function viewAllRoles() {
    let query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        console.table(res);
    })
}
viewAllRoles();

async function viewAllEmployees() {
    let query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        console.table(res);
    })
}
viewAllEmployees();


// switch statements for what they choose call the function when they choose it
// a separate page of the query functions
// make const so you can import in both files
// .then(function ({task}) {
//     switch(task) {
//         case 'View All Departments':
//             viewAllDepartments();
//             break;  
//     }