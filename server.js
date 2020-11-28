// Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require('console.table');

require("dotenv").config();
// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "schemaDB",
});

// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) throw err;
    console.log()
    console.log("EMPLOYEE TRACKER")
    console.log()
    runQuestion();
});


function runQuestion(){
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
    .then(function(answer){
        switch (answer.action) {
            case "View All Employees":
                allEmployee();
                break;

            case "View All Employees By Manager":
                employeeByManager();
                break;

            case "Add Employee":
                addEmployees();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Update Employee Manager":
                updateEmployeeManager();
                break;

            case "View All Role":
                viewAllRole();
                break;

            case "Add Role":
                addRole();
                break;

            case "Remove Role":
                removeRole();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "View All Department":
                viewAllDepartment();
                break;

            case "Remove Department":
                removeDepartment();
                break;

            case "exit":
                connection.end();
                break;
        }
    });
}
function allEmployee() {
    connection.query("SELECT * FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id", function(err, res){
        if(err) throw err; 
        console.table(res);
        runQuestion();
    });
      }

    
