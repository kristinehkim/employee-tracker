const connection = require('../config/connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        return this.connection.query(
            `
            SELECT
                 department.id,
                 department.name
            FROM 
                department
            `
        )
    }
    viewAllRoles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title,
                role.salary,
                department.name
            FROM
                role
            LEFT JOIN
                department ON role.department_id = department.id

            `
        )
    }
    viewAllEmployees() {
        return this.connection.query(
            `
            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM
                employee
            LEFT JOIN
                role ON employee.role_id = role.id
            LEFT JOIN
                employee manager ON employee.manager_id = manager.id
            
            `
        )
    }
    addDepartment(department) {
        return this.connection.query(
            `INSERT INTO 
                department
            SET ?`,
            department

        )
    }
    addRole(role) {
        return this.connection.query(
            `INSERT INTO 
                role
            SET ?`,
            role

        )
    }
    addEmployee(employee) {
        return this.connection.query(
            `INSERT INTO 
                employee
            SET ?`,
            employee

        )
    }

    updateEmployee(employee, role_id) {
        return this.connection.query(
            `UPDATE 
                employee
            SET ?
            WHERE id = ?`,
            [employee, role_id]
        )
    }
  

}


module.exports = new DB(connection)