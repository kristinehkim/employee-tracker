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
            case 'Update Employee Role':
                updateEmployee();
                break;
            default:
                console.log('Please choose an option above.');
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
    await db.addDepartment(department);
    init();
};

async function addRole() {
    const departments = await db.viewAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
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
    await db.addRole(role);
    init();
};

async function addEmployee() {
    const roles = await db.viewAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const managers = await db.viewAllEmployees();
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
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
    await db.addEmployee(employee);
    init();
};

async function updateEmployee() {
    const updateEmployees = await db.viewAllEmployees();
    const updateEmployeeChoices = updateEmployees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const assignRoles = await db.viewAllRoles();
    const assignRolesChoices = assignRoles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const employee = await inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: updateEmployeeChoices,
            name: 'first_name'
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            choices: assignRolesChoices,
            name: 'role_id'
        },
    ])
    await db.updateEmployee(employee.role_id, employee.first_name);
    init();
};


