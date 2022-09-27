const mysql = require("mysql")

const inquirer = require("inquirer")



const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Myharto1@",
    database: "employee_DB"
  });



connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    choiceList();
});


function choiceList() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "Would you like to view all employees?", 
              "Want to view by role?",
              "Want to view by department?", 
              "Employee update",
              "Want to add an employee?",
              "choose a role",
              "Want to view by role?"
            ]
    }


]).then(function(val) {
        switch (val.choice) {

            case "Would you like to view all employees?":
              allemployees();
            break;
    
          case "Want to view by role?":
              allRoles();
            break;



          case "Want to view by department?":
              allDepartments();
            break;
          
          case "Add Employee?":
            addTeammember();
              break;

          case "Update Employee":
                employeeEdit();
              break;
      
            case "Choose employee role":
                addRole();
              break;
      
            case "Choose Dept for employee":
                deptAdd();
              break;
    
            }
    })
}

function allemployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      choiceList()
  })
}

function allRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  choiceList()
  })
}

function allDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    choiceList()
  })
}


var roleArr = [];
function chooseRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

var managersArr = [];
function chooseManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}


function addTeammember() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the patient first name?"
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the last name?"
        },
        {
          name: "role",
          type: "list",
          message: "Choose role",
          choices: chooseRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Supervisor name?",
            choices: chooseManager()
        }
    ]).then(function (val) {
      var roleId = chooseRole().indexOf(val.role) + 1
      var managerId = chooseManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          choiceList()
      })

  })
}



  function employeeEdit() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {


     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "Team member last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "Choose title ",
            choices: chooseRole()
          },
      ]).then(function(val) {
        var roleId = chooseRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            choiceList()
        })
  
    });
  });

  }

  

function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "Choose title"
        },
        {
          name: "Salary",
          type: "input",
          message: "Employee salary"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                choiceList();
            }
        )

    });
  });
  }

  

function deptAdd() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "Choose dept"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                choiceList();
            }
        )
    })
  }

  
