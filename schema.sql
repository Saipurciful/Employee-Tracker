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
    title VARCHAR(30) NULL,
    salary DECIMAL (10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO department (name) 
VALUES ("Manager"),
("Accounting"),
("Marketing"),
("Sale");

INSERT INTO role (title, salary, department_id) 
VALUES ("Office Manager", "10000", 1),
("Lead Accounting", "15000",2),
("Accounting Assistant", "20000", 2),
("Lead Marketing", "20000", 3),
("Marketing Assistant", "130000", 3),
("Sale", "40000", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Britney", "Spear", 1, 1),
("Mariah", "Carrie", 2, 2),
("Sam", "Smith", 3, NULL),
("Justin", "Timberlake", 3, NULL),
("Ryan", "Gooseling", 4, 3),
("Tom", "Cruz", 5, NULL),
("Jennifer", "Lopez", 6, NULL);
