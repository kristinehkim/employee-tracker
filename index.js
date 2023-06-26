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
            case 'Add Role':
                addRole();
                break;
        }
    })

};

init();


async function viewAllDepartments() {
    let query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        console.table(res);
        init();
    })
};


async function viewAllRoles() {
    let query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        console.table(res);
        init();
    })
};


async function viewAllEmployees() {
    let query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        console.table(res);
        init();
    })
};

async function addRole() {
    let role = await db.query('SELECT title, salary, department_id FROM role');

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleTitle'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does the role belong to?',
            choices: role.map(obj => obj.name),
            name: 'department'
        }
    ]).then(response => {
        let roleId = role.find(obj => obj.name === response.department).id
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', [[response.roleTitle, response.salary, roleId]]);
        init();
    })
    
};



// switch statements for what they choose call the function when they choose it
// a separate page of the query functions
// make const so you can import in both files
// .then(function ({task}) {
//     switch(task) {
//         case 'View All Departments':
//             viewAllDepartments();
//             break;  
//     }