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
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
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
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
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
function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, function (err, res) {
    console.table(res);
    toDo();
  });
}

//View all Roles
function viewRoles() {
  const sql = "SELECT * FROM name_role";
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
    .then(function (data) {
      const newEmployee = data.firstName;
      const newEmyee = data.lastName;
      const nwEmploye = data.addRoleId;
      const nwElyee = data.addManagerId;
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${newEmployee}','${newEmyee}','${nwEmploye}','${nwElyee}')`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}
//add role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Please enter the new role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please enter role salary",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Please enter department ID. Please select one from 1-4",
      },
    ])
    .then(function (data) {
      const title = data.roleTitle;
      const salary = data.roleSalary;
      const department = data.departmentId;
      console.log(title, salary, department);
      const sql = `INSERT INTO name_role (title, salary, department_id)
      VALUES ('${title}', ${salary}, ${department})`;
      console.log(sql)
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
        name: "updateRoleId",
        message: "Please enter the new role ID",
      },
      {
        type: "input",
        name: "employeeId",
        message: "Please enter employee ID you wish to update",
      },
    ])
    .then(function (response) {
      const sql = `UPDATE employee SET role_id = ${response.updateRoleId} WHERE id = ${response.employeeId}`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}

//remove employee
function removeEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee",
        message: "Please enter ID you wish to delete",
      },
    ])
    .then(function (answer) {
      const sql = `DELETE FROM employee WHERE id = ${answer.employee}`;
      db.query(sql, function (err, res) {
        console.table(res);
        toDo();
      });
    });
}
