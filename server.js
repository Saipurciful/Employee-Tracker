const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pladsri1",
    database: "schemaDB"
});

connection.connect(function(err) {
    if (err) throw err;
});

function runPrompt(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Role",
            "Add Role",
            "Remove Role",
            "Add Department",
            "View All Department",
            "Remove Department",
            "exit",

        ]
    })
    .then(function (answer){
        switch (answer.action) {
            case "View All Employees":
                allEmployeeSearch();
                break;

            case "View All Employees By Manager":
                employeeByManagerSearch();
                break;

            case "Add Employee":
                addEmployeesSearch();
                break;

            case "Remove Employee":
                removeEmployeeSearch();
                break;

            case "Update Employee Role":
                updateEmployeeRoleSearch();
                break;

            case "Update Employee Manager":
                updatEmployeeManagerSearch();
                break;

            case "View All Role":
                viewAllRoleSearch();
                break;

            case "Add Role":
                addRoleSearch();
                break;

            case "Remove Role":
                removeRoleSearch();
                break;

            case "Add Department":
                addDepartmentSearch();
                break;

            case "View All Department":
                viewAllDepartmentSearch();
                break;

            case "Remove Department":
                removeDepartmentSearch();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}
function allEmployeeSearch() {
    
    }
