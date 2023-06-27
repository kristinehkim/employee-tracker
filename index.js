const questions = require('./utils/prompt');
const inquirer = require('inquirer');
const db = require('./db')
const cTable = require('console.table');


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
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
        }
    })

};

init();


async function viewAllDepartments() {
    const departments = await db.viewAllDepartments();
    console.table(departments);
    init();
};


async function viewAllRoles() {
    const roles = await db.viewAllRoles();
    console.table(roles);
        init();
};


async function viewAllEmployees() {
    const employees = await db.viewAllEmployees();
    console.table(employees);
        init();
};

async function addDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name'
        }
    ])
    await db.addDepartment(department)
    init();
};

async function addRole() {
    const departments = await db.viewAllDepartments();
    const departmentChoices = departments.map(({id, name}) => ({
        name: name, 
        value: id
    }));


    const role = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does the role belong to?',
            choices: departmentChoices,
            name: 'department_id'
        }
    ])
    await db.addRole(role)
    init();
};

async function addEmployee() {
    const roles = await db.viewAllRoles();
    console.log(roles);
    const roleChoices = roles.map(({id, title}) => ({
        name: title,
        value: id
    }));
    const managers = await db.viewAllEmployees();
    console.log(managers);
    const managerChoices = managers.map(({id, manager}) => ({
        name: manager,
        value: id
    }));

    const employee = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last_name'
        },
        {
            type: 'list',
            message: "What is the employer's role?",
            choices: roleChoices,
            name: 'role_id'
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            choices: managerChoices,
            name: 'manager_id'
        },

    ]) 
    await db.addEmployee(employee) 
    init();
    };

async function updateEmployee() {
    let updateEmployee = await db.query('SELECT * FROM employee');
    let assignedRole = await db.query('SELECT title FROM role');
    inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: updateEmployee.map(obj => obj.first_name && obj.last_name),
            name: 'employeeName'
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            choices: assignedRole.map(obj => obj.title),
            name: 'assignRole'
        },
    ]).then(response => {
        let employeeToBeUpdated = updateEmployee.find((obj) => obj.first_name && obj.last_name === response.employee);
        let assignRoleToEmployee = assignedRole.find((obj) => obj.title);
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