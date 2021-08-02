const db = require("./lib/connection");
const inquirer = require("inquirer");
const { response } = require("express");

var figlet = require("figlet");

figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  toDo();
});

//innquirer prompt questions
function toDo() {
  inquirer
    .prompt({
      type: "list",
      name: "toDo",
      message: "What would like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
      ],
    })
    .then(function (userInput) {
      switch (userInput.toDo) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Employees By Department":
          viewEmployeesbyDepart();
          break;
        case "View All Employees By Manager":
          viewEmployeesbyManager();
          break;
        case "Add Employee":
          addEmployee();
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeMan();
          break;
        case "View All Roles":
          viewRoles();
          break;
      }
    });
}

//view all employees
function viewEmployees() {
  const sql = "SELECT * FROM employee";
  db.query(sql, function (err, res) {
    console.table(res);
    toDo();
  });
}

// view employess by department
function viewEmployeesbyDepart() {
  const sql =
    "SELECT * FROM employee LEFT JOIN departments ON employee.role_id= departments.id";
  db.query(sql, function (err, res) {
    console.table(res);
    toDo();
  });
}

// view employess by manager
function viewEmployeesbyManager() {
  const sql = "SELECT * FROM manager";
  db.query(sql, function (err, res) {
    console.table(res);
    toDo();
  });
}

// add a new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name",
      },
      {
        type: "input",
        name: "addRoleId",
        message: "Enter the employee's role ID",
      },

      {
        type: "input",
        name: "addManagerId",
        message: "What is the employee's manager ID",
      },
    ])
    .then(function (response) {
      const sql = `(first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}','${response.lastName}','${response.lastName}','${addManagerId}')`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}

// update current employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Please enter ID you wish to update",
      },
      {
        type: "input",
        name: "updateRoleId",
        message: "Please enter the new role ID",
      },
    ])
    .then(function (response) {
      const sql = `UPDATE employee SET role_id =  ('${response.updateRoleId}' WHERE id = ('${response.employeeId})`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}

// update current employee role
function updateEmployeeMan() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Please enter ID you wish to update",
      },
      {
        type: "input",
        name: "updateManId",
        message: "Please enter the new Manager ID",
      },
    ])
    .then(function (response) {
      const sql = `UPDATE employee SET role_id =  ('${response.updateManId}' WHERE id = ('${response.employeeId})`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}
//View all Roles
function viewRoles() {
  const sql = "SELECT * FROM name_role";
  db.query(sql, function (err, res) {
    console.table(res);
  });
}

toDo();
