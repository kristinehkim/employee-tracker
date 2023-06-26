const questions = require('./utils/questions');
const inquirer = require('inquirer');
const db = require('./config/connection');

const init = async () => {
    inquirer.prompt(questions).then(response => {
        switch (response.choices) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
        }
    })

};

init();


async function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        console.table(res);
    })
}


async function viewAllRoles() {
    let query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        console.table(res);
    })
}


async function viewAllEmployees() {
    let query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        console.table(res);
    })
}



// switch statements for what they choose call the function when they choose it
// a separate page of the query functions
// make const so you can import in both files
// .then(function ({task}) {
//     switch(task) {
//         case 'View All Departments':
//             viewAllDepartments();
//             break;  
//     }