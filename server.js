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
connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected as Id" + connection.threadId)

    runQuestion();
});



function runQuestion() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Role",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Add Role",
                "Remove Role",
                "Add Department",
                "Remove Department",
                "exit",

            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEm();
                    break;

                case "View All Employees By Department":
                    emByDepartment();
                    break;

                case "View All Role":
                    viewAllRole();
                    break;

                case "Add Employee":
                    addEm();
                    break;

                case "Remove Employee":
                    removeEm();
                    break;

                case "Update Employee Role":
                    updateEmRole();
                    break;

                case "Update Employee Manager":
                    updateEmManager();
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



                case "Remove Department":
                    removeDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function allEm() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}

function emByDepartment() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}
function viewAllRole() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}

// function addEm() {
//     inquirer.prompt({
//             name: "addEmFirst",
//             type: "input",
//             message: "What is employee's first name?",
//         }, {
//             name: "addEmLast",
//             type: "input",
//             message: "What is employee's last name?",
//         }, {
//             name: "addEmRole",
//             type: "input",
//             message: "What is employee's role id?"
//         }, {
//             name: "addEmManager",
//             type: "input",
//             message: "What is employee's manager id?"

//         })

//         .then(function (answer) {
//                 addEm(answer.addEmFirst, answer.addEmLast, answer.addEmRole, answer.addEmManager);
//             },

//             function addEm() {
//                 connection.query("INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?", [addEmFirst, addEmLast, addEmRole, addEmManager], function (err, res) {
//                     if (err) throw err;
//                     console.table(res);
//                     runQuestion();
//                 });