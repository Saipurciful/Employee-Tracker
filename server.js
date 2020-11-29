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
                "View All Employees By Role",
                "View All Employees By Manager",
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

                case "View All Employees By Role":
                    emByRole();
                    break;

                case "View All Employees By Manager":
                    emByManager();
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
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}
function emByRole() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}

function emByManager() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee LEFT JOIN employee e ON employee.manager_id = e.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        runQuestion();
    });
}

function addEm(){
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is employee's last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is employee's role ID? (1-6)"
        },
        {
            name: "manager",
            type: "input",
            message: "Who is employee's Manager ID? (1-3)"
            
        },
    ])

    
    .then(function(answers) {
        
        
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager
            },
        function(err,results) {
            if(err) throw err;
            console.log("Successfully added " + answers.firstName + " " + answers.lastName );
        runQuestion();
        });   

    })}


    function removeEm(){
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is employee's first name, would you like to be removed?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is employee's last name, would you like to be removed?"
            },
            {
                name: "role",
                type: "input",
                message: "What is employee's role ID? (1-6)"
            },
            {
                name: "manager",
                type: "input",
                message: "Who is employee's Manager ID? (1-3)"
                
            },
        ])
    
        .then(function(answers) {
       
            console.log("Deleting Employee...\n")
            connection.query("DELETE FROM employee WHERE e.first_name = ? AND e.last_name = ? AND e.role = ? AND e.manager =?"
            [firstName, lastName, role, manager],
                // {
                //     first_name: 'answers.firstName',
                //     last_name: 'answers.lastName',
                //     role_id: 'answers.role',
                //     manager_id: 'answers.manager'
                // },
            function(err,res) {
                if(err) throw err;
                console.log(res);
            runQuestion();
            });   
    
        })}