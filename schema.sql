DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);


INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Research");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Production");


INSERT INTO role (title, salary, department_id)
VALUE ("Lead Researcher", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Production Lead", 75000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 125000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Reasearch Lead", 130000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Production", 200000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Will", "Smith", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Melanie", "Hardhome", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John","Jackson",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tod", "Packer", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jim", "Halpert", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dwight", "Schrute", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Creed", "Bratton", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;