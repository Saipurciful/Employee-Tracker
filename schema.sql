DROP DATABASE IF EXISTS schemaDB;
CREATE database schemaDB;

USE schemaDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10,2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department (name) 
VALUES ("Manager"),
("Accounting"),
("Marketing"),
("Sale");

INSERT INTO role (title, salary, department_id) 
VALUES ("Office Manager", "10000", 1),
("Sale Manager", "15000",1),
("Lead Accounting", "15000",2),
("Accounting Assistant", "20000", 2),
("General Marketing ", "20000", 3),
("Marketing Assistant", "130000", 3),
("Sale representative", "40000", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Britney", "Spear", 1, NULL),
("Mariah", "Carrie", 2, NULL),
("Sam", "Smith", 3, NULL),
("Justin", "Timberlake", 4, NULL),
("Ryan", "Gooseling", 5, 1),
("Katie", "Cruz", 6, 2),
("Jennifer", "Lopez", 7, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;