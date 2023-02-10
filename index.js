const { prompt } = require("inquirer");
const db = require("./db/connection");
const {printTable} = require("console-table-printer")
//require("console.table");

//init();

function loadMain() {
    prompt({
        type: "list",
        name: "task",
        message: "select task from list",
        choices: ["Add Department", "View Department", "Add Role", "View Roles", "Add Employee", "View Employees"]


    }).then(({ task }) => {
        switch (task) {
            case "Add Department":
                addDepartment()
                break;
            case "View Department":
                viewDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "View Employees":
                viewEmployees()
                break;
            default:
                break;
        }
    })
}
function viewDepartment (){
    db.promise().query("SELECT * FROM department").then(([res]) => {
        printTable(res);
        loadMain();
    })
    

}
function viewRoles (){
    db.promise().query("SELECT * FROM role").then(([res]) => {
        printTable(res);
        loadMain();
    })
    

}
function viewEmployees (){
    db.promise().query("SELECT * FROM employee").then(([res]) => {
        printTable(res);
        loadMain();
    })
    

}
function addDepartment (){
    prompt({
        type: "input",
        name: "name",
        message: "Enter Department Name",
    }).then(({name})=> {
        let Department = {department_name:name}
        db.promise().query("INSERT INTO department SET ?", Department).then(res=> console.log(res)).then(()=>loadMain())
    })
}

function addRole (){
    prompt([{
        type: "input",
        name: "title",
        message: "Enter Role Name",
    },{
        type: "input",
        name: "salary",
        message: "Enter Salary",
    },{
        type: "input",
        name: "department_id",
        message: "Enter Department id",
    }]).then(({department_id, title, salary})=> {
        let Role = {title, salary, department_id}
        db.promise().query("INSERT INTO role SET ?", Role).then(res=> console.log(res)).then(()=>loadMain())
    })
}

function addEmployee (){
    prompt([{
        type: "input",
        name: "first_name",
        message: "Enter Employee first name",
    },{
        type: "input",
        name: "last_name",
        message: "Enter Employee last name"
    },{
        type: "input",
        name: "role_id",
        message: "Enter Role id",
    },{
        type: "input",
        name: "manager_id",
        message: "Enter Manager id"
    }]).then(({first_name, last_name, role_id, manager_id})=> {
        let Employee = {first_name, last_name, role_id, manager_id}
        db.promise().query("INSERT INTO employee SET ?", Employee).then(res=> console.log(res)).then(()=>loadMain())
    })
}

loadMain()